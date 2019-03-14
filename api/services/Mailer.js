
const helper = require("sendgrid").mail;
const keys = require("../../config/keys");
const sendgrid = require("sendgrid")(keys.sendGridKey);

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super(); //use the all dependancies of the parent class
    this.setFrom(new helper.Email("noreply@maxisolutions.co.uk","Maxi Survey"));
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);
    this.addRecipients();
    this.addContent(this.body);
    this.addClickTracking();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    this.recipients.forEach(recipient => {
      const personalize = new helper.Personalization();
      personalize.addTo(recipient);
      personalize.setSubject(this.subject);
      this.addPersonalization(personalize);
    });
  }

  async send() {
    var request = sendgrid.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    await sendgrid.API(request, function(error, response) {
      if (error) {
        console.log("Error response received");
        console.log(response.statusCode);
      }
      return response;
    });
  }
}

module.exports = Mailer;
