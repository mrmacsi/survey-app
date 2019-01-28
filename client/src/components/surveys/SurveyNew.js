import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormView from "./SurveyFormView";

class SurveyNew extends Component {
  state = { showFormView: false };

  renderContent() {
    if (this.state.showFormView) {
      return (
        <SurveyFormView
          onCancel={() => this.setState({ showFormView: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormView: true })}
      />
    );  
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
