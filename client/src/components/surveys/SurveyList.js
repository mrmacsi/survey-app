import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import { Icon,NavItem,Dropdown /*, SideNav, SideNavItem, Button  */} from 'react-materialize'
import { NavLink } from "react-router-dom";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <div className="right">
            <Dropdown trigger={
              <a href="#"><Icon>more_vert</Icon></a>
              }>
              <li><NavLink to={"/survey/edit/"+survey._id}>Edit</NavLink></li>
              <NavItem divider />
              <NavItem>See Details</NavItem>
            </Dropdown>
            </div>
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateCreated).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <span>Yes: {survey.yes}</span>
            <span>No: {survey.no}</span>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  //console.log(surveys)
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
