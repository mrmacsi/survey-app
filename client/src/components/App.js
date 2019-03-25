import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import SurveyEdit from "./surveys/SurveyEdit";
import SurveyShow from "./surveys/SurveyShow";
import RequireAuth from './RequireAuth';
import RequireNotAuth from './RequireNotAuth';
import Login from "./Login";

class App extends Component {

  componentWillMount() {
    //console.log("componentWillMount")
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/login" component={RequireNotAuth(Login)} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={RequireAuth(Dashboard)} />
              <Route path="/surveys/new" component={RequireAuth(SurveyNew)} />
              <Route path="/survey/show/:surveyId" component={RequireAuth(SurveyShow)} />
              <Route path="/survey/edit/:surveyId" component={RequireAuth(SurveyEdit)} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
