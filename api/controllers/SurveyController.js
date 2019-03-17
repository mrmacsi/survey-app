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
        if (err) res.send(err);
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
    } catch (error) {
      res.status(422).send(err);
    }
  },
  read_a_survey: (req, res) => {
    Survey.find(
      { user: req.user.id, _id: req.params.surveyId },
      { __v: false },
      function(err, survey) {
        if (err) res.send(err);
        res.json(survey);
      }
    );
  },
  update_a_survey: (req, res) => {
    Survey.findOneAndUpdate(
      { user: req.user.id, _id: req.params.surveyId },
      req.body,
      { new: true },
      function(err, survey) {
        if (err) res.send(err);
        res.json(survey);
      }
    );
  },
  delete_a_survey: (req, res) => {
    Survey.deleteOne(
      {
        user: req.user.id,
        _id: req.params.surveyId
      },
      function(err, survey) {
        if (err) res.send(err);
        res.json({ message: "Survey successfully deleted" });
      }
    );
  }
};
