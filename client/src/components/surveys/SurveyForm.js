import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyFields";
import { Link } from "react-router-dom";
import _ from "lodash";
import FIELDS from "../surveys/formFields";
import validate from "../../utils/validateForm";
class SurveyForm extends Component {
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
    <div className="row">
      <div className="col s12 m12 l12">
        <div className="card darken-1">
          <div className="card-content">
            <span className="card-title">Create New Survey</span>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
              <div className="card-action">
              {this.renderFields()}
              <div className="card-content">
                <Link to="/surveys" className="red btn-flat white-text">
                  Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                  Next
                  <i className="material-icons right">done </i>
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
