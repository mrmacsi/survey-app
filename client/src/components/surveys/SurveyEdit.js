import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import { reduxForm, Field } from "redux-form";
import validate from "../../utils/validateForm";
import _ from "lodash";
import FIELDS from "../surveys/formFields";
import SurveyField from "./SurveyFields";
import { withRouter } from "react-router-dom";

class SurveyEdit extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          label={label}
          type="text"
          name={name}
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h5>Please confirm your entries</h5>
        {this.renderFields()}
        <button className="yellow darken-3 btn-flat" onClick={this.props.history.goBack}>Back</button>
        <button className="green right white-text btn-flat">
          Edit Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}


function mapStateToProps({ surveys }, ownProps) {
  //get the surveyId from url params
  const surveyId = ownProps.match.params.surveyId;
  //find the survey by _id from surveys
  let survey = surveys.find(survey => survey._id === surveyId);
  //console.log("old survey",survey)
  if(survey){
    //... get all items that object has and override the recipients with new value
    const new_survey = { ...survey, recipients: survey.recipients.map(recipient => recipient.email).join(", ") }
    //console.log("new survey",new_survey)
    //initialize form values from survey object
    return { survey, initialValues: new_survey };
  }
  
  return { survey,initialValues: survey };
}

//connect component with redux form and map state functions
export default connect(
  mapStateToProps,
  { fetchSurveys }
)(
  reduxForm({
    form: "surveyEditForm",
    validate
  })(withRouter(SurveyEdit))
);
