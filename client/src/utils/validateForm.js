
import _ from "lodash";
import validateEmails from "./validateEmails";
import FIELDS from "../components/surveys/formFields";

export default function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Please enter a " + name + " value.";
    }
  });

  if (!errors.recipients) {
    errors.recipients = validateEmails(values.recipients);
  }

  return errors;
}