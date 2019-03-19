"use strict";

const mongoose = require("mongoose");
const Survey = mongoose.model("Survey");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = {
  list_all_surveys: async function(req, res) {
    await Survey.find({ user: req.user.id })
      .select({
        __v: false
      })
      .sort({ dateCreated: "desc" })
      .exec(function(err, surveys) {
        if (err) res.status(422).send(err);
        res.json(surveys);
      });
  },
  create_survey: async function(req, res) {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      user: req.user.id,
      dateCreated: Date.now()
    });

    //send email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);//send unprocessable entity error
    }
  },
  read_a_survey: (req, res) => {
    Survey.find(
      { user: req.user.id, _id: req.params.surveyId },
      { __v: false },
      function(err, survey) {
        if (err) res.status(422).send(err);
        res.json(survey);
      }
    );
  },
  update_a_survey: (req, res) => {
    const {recipients} = req.body;
    const survey = { ...req.body, recipients:recipients.split(",").map(email => ({ email: email.trim() })) };
    Survey.findOneAndUpdate(
      { user: req.user.id, _id: req.params.surveyId },
      survey,
      { new: true },
      function(err, survey) {
        if (err) res.status(422).send(err.message);
        res.json(survey);
      }
    );
  },
  delete_a_survey: (req, res) => {
    Survey.findOneAndDelete(
      {
        user: req.user.id,
        _id: req.params.surveyId
      },
      function(err, survey) {
        if (err) res.status(422).send(err);
        res.json({ message: "Survey successfully deleted" });
      }
    );
  }
};
