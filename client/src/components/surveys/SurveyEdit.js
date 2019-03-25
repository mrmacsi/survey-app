import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import validate from "../../utils/validateForm";
import _ from "lodash";
import FIELDS from "../surveys/formFields";
import SurveyField from "./SurveyFields";
import * as actions from "../../actions";
import ShowMessage from "../ShowMessage";
import Redirect from "react-dom";

class SurveyEdit extends Component {
  //state for message show
  state = {
    message: { title: null, type: null },
    survey: null
  }

  //use the existing survey from the redux store or fetch again in the first action of
  componentWillMount() {
    const { survey } = this.props;
    if (!survey) {
      const surveyId = this.props.match.params.surveyId;
      this.props.fetchSingleSurvey(surveyId).then((data) => {
        if (!data) {
          const message = {
            title: "Survey is not found",
            type: "error"
          }
          this.setState({ message, survey: false })
        } else {
          this.setState({ survey: data })
        }
      })
        .catch(err => {
          const message = {
            title: err.response,
            type: "error"
          }
          this.setState({ message, survey: false })
        });
    }
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
    //console.log(picked)
    const surveyId = this.props.match.params.surveyId;
    this.props.editSurvey(surveyId, picked).then((data) => {
      return <Redirect to={"/survey/show/" + surveyId} />
    })
      .catch(err => {
        //console.log(err)
        const message = {
          title: err.response,
          type: "error"
        }
        this.setState({ message })
      });
    //TODO get suvey id get history and get certain form values
  }

  render() {
    //set the params to ShowMessage by ... operator
    const { survey } = this.props;
    if (survey) {
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
          <ShowMessage {...this.state.message} />
        </div>
      );
    } else if (!this.state.survey) {
      return (
        <div>
          <ShowMessage {...this.state.message} />
        </div>
      );
    } else {
      const message = {
        title: "Survey is Loading...",
        type: "warning"
      }
      return (
        <div>
          <ShowMessage {...message} />
        </div>
      );
    }
  }
}

function mapStateToProps({ surveys }, ownProps) {
  //get the surveyId from url params
  const surveyId = ownProps.match.params.surveyId;
  //find the survey by _id from surveys
  //check if survey is not null
  let survey = Array.isArray(surveys) ? surveys.find(survey => survey._id === surveyId) : null;
  //console.log("old survey",survey)
  if (survey) {
    //... (spread operator) get all items that object has and override the recipients with new value
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
  })(SurveyEdit)
);
