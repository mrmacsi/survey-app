import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import FIELDS from "../surveys/formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormView = ({ onCancel, formValues, createSurvey, history }) => {
  const reviewFields = _.map(FIELDS, ({ label, name }) => {
    if (name !== "recipients") {
      return (
        <div key={name}>
          <label>{label}</label>
          <div className="collection">
            <div className="collection-item">{formValues[name]}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={name}>
          <label>{label}</label>
          <div className="collection">
            {_.map(formValues[name].split(","), (val, key) => <div className="collection-item" key={key}> {val} </div>)}
          </div>
        </div>
      );
    }
  });

  return (
    <div className="row">
      <div className="col s12 m12 l12">
        <div className="card darken-1">
          <div className="card-content">
            <span className="card-title">Please confirm your entries</span>
            <div className="card-action">
            { reviewFields }
              <div className="card-content">
                <button className="yellow darken-3 btn-flat" onClick={onCancel}>
                  Back
                </button>
                <button
                  className="green right white-text btn-flat"
                  onClick={() => createSurvey(formValues, history)}>
                  Send Survey
                  <i className="material-icons right">email</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  //console.log(state);
  //set redux form values to a variable
  return { formValues: state.form.surveyForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormView));
