const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = mongoose.model("Survey");
const surveyController = require('../controllers/SurveyController');

module.exports = app => {

  app.route("/api/surveys")
  .get(requireLogin, surveyController.list_all_surveys)
  .post(requireLogin,requireCredits, surveyController.create_survey);

  app.route('/api/survey/:surveyId')
    .get(requireLogin,surveyController.read_a_survey)
    .put(requireLogin,surveyController.update_a_survey)
    .delete(requireLogin,surveyController.delete_a_survey);

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() //remove the values false, null, 0, "", undefined, and NaN
      .uniqBy("email", "surveyId")
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false } //find recipients by this conditions
            }
          },
          {
            $inc: { [choice]: 1 }, //increase choice +1 to what value we get from each
            $set: { "recipients.$.responded": true }, //set the responded true for each found element
            lastResponded: new Date()
          }
        ).exec(); //save the update query
      })
      .value(); //get the result
    res.send({});
  });
};
