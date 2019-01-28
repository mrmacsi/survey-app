const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema], //array with RecipientSchema type
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User" }, //how to use foreign key in mongo db that means the id of the entity
  dateCreated: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
