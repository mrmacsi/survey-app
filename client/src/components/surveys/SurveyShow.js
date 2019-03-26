import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import FIELDS from "../surveys/formFields";
import * as actions from "../../actions";
import ShowMessage from "../ShowMessage";
import { NavLink } from "react-router-dom";

class SurveyShow extends Component {
  //state for message show
  state = {
    message: { title: null, type: null },
    survey: null
  };

  componentWillMount() {
    const { survey } = this.props;
    if (!survey) {
      const surveyId = this.props.match.params.surveyId;
      this.props
        .fetchSingleSurvey(surveyId)
        .then(data => {
          if (!data) {
            const message = {
              title: "Survey is not found",
              type: "error"
            };
            this.setState({ message, survey: false });
          } else {
            this.setState({ survey: data });
          }
        })
        .catch(err => {
          const message = {
            title: err.response,
            type: "error"
          };
          this.setState({ message, survey: false });
        });
    }
  }

  renderFields() {
    const { survey } = this.props;
    return _.map(FIELDS, ({ label, name }) => {
      if (name !== "recipients") {
        return (
          <div key={name}>
            <label>{label}</label>
            <div className="collection">
              <div className="collection-item">{survey[name]}</div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={name}>
            <label>{label}</label>
            <div className="collection">
              {_.map(survey[name], ({ responded, email }, key) => <div className="collection-item" key={key}> {email} : {responded ? "Yes" : "No"}</div>)}
            </div>
          </div>
        );
      }
    });
  }

  render() {
    //set the params to ShowMessage by ... operator
    const { survey } = this.props;
    if (survey) {
      return (
      <div className="row">
        <div className="col s12 m12 l12">
          <div className="card darken-1">
            <div className="card-content">
              <span className="card-title">View your entry</span>
                <div className="card-action">
                {this.renderFields()}
                <div className="card-content">
                <NavLink to={"/surveys"} className="yellow darken-3 white-text btn-flat">Back
                  <i className="material-icons left">keyboard_return</i>
                </NavLink>
                <NavLink to={"/survey/edit/" + survey._id}
                  className="green right white-text btn-flat">Edit Survey
                  <i className="material-icons right">email</i>
                </NavLink>
                  </div>
                </div>
              <ShowMessage {...this.state.message} />
            </div>
          </div>
        </div>
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
      };
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
  //console.log(surveys)
  //find the survey by _id from surveys
  //check if survey is not null
  let survey = surveys ? surveys.find(survey => survey._id === surveyId) : null;

  return { survey };
}

export default connect(
  mapStateToProps,
  actions
)(SurveyShow);
