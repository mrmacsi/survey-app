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
import Footer from "./Footer";



class App extends Component {

  componentWillMount() {
    //console.log("componentWillMount")
    this.props.fetchUser();
  }

  render() {
    return (
   <BrowserRouter>
      <main>
        <Header />
        <div className="container page-wrap" style= {{marginTop:"40px"}}>
          <Route exact path="/login" component={RequireNotAuth(Login)} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={RequireAuth(Dashboard)} />
          <Route path="/surveys/new" component={RequireAuth(SurveyNew)} />
          <Route path="/survey/show/:surveyId" component={RequireAuth(SurveyShow)} />
          <Route path="/survey/edit/:surveyId" component={RequireAuth(SurveyEdit)} />
        </div>
      </main>
      <Footer key="2" />
    </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
