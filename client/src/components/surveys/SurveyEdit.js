import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import validate from "../../utils/validateForm";
import _ from "lodash";
import FIELDS from "../surveys/formFields";
import SurveyField from "./SurveyFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import ShowMessage from "../ShowMessage";

class SurveyEdit extends Component {
  //state for message show
  state = {
    message : { title : null, type : null }
  }
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
  handleSubmit = (values) => {
    //const new_values = _.pick(values, 'title', 'subject','body','recipients')
    //console.log(new_values)
    //get the values inside of object
    const picked = (({ subject, title, body, recipients }) => ({ subject, title, body, recipients }))(values);
    console.log(picked)
    const surveyId = this.props.match.params.surveyId;
    this.props.editSurvey(surveyId, picked).then((data) => {
      this.props.history.push("/surveys");//redirect
      console.log(data)
    })
    .catch(err => {
      console.log(err)
      const message = {
        title:err.response,
        type:"error"
      }
      this.setState({message})
    });
    //TODO get suvey id get history and get certain form values
  }

  render() {
    //set the params to ShowMessage by ... operator
    return (
      <div>
        <h5>Edit your entries</h5>
        <form onSubmit={this.props.handleSubmit((formValues) => this.handleSubmit(formValues))}>
          {this.renderFields()}
          <button className="yellow darken-3 btn-flat" onClick={this.props.history.goBack}>Back</button>
          <button className="green right white-text btn-flat">
            Edit Survey
            <i className="material-icons right">email</i>
          </button>
        </form>
        <ShowMessage {...this.state.message}/>
      </div>
    );
  }
}

function mapStateToProps({ surveys }, ownProps) {
  //get the surveyId from url params
  const surveyId = ownProps.match.params.surveyId;
  console.log(surveys)
  //find the survey by _id from surveys
  let survey = surveys.find(survey => survey._id === surveyId);
  //console.log("old survey",survey)
  if (survey) {
    //... get all items that object has and override the recipients with new value
    const new_survey = { ...survey, recipients: survey.recipients.map(recipient => recipient.email).join(", ") }
    //console.log("new survey",new_survey)
    //initialize form values from survey object
    return { survey, initialValues: new_survey };
  }

  return { survey, initialValues: survey };
}

//connect component with redux form and map state functions
export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({
    form: "surveyEditForm",
    validate
  })(withRouter(SurveyEdit))
);
