import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import { Icon,NavItem,Dropdown /*, SideNav, SideNavItem, Button  */} from 'react-materialize'
import { NavLink } from "react-router-dom";

class SurveyList extends Component {
  componentWillMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <div className="right">
            <Dropdown trigger={
              // eslint-disable-next-line
              <a href="#"><Icon>more_vert</Icon></a>
              }>
              <li><NavLink to={"/survey/edit/"+survey._id}>Edit</NavLink></li>
              <NavItem divider />
              <li><NavLink to={"/survey/show/"+survey._id}>See Details</NavLink></li>
            </Dropdown>
            </div>
            <span className="card-title"><NavLink to={"/survey/show/"+survey._id}>{survey.title}</NavLink></span>
            <p>{survey.body}</p>
          </div>
          <div className="card-action">
            <div className="row" style={{"marginBottom": "0px"}}>
              <div className="col s1"><span>Yes: {survey.yes}</span></div>
              <div className="col s1"><span>No: {survey.no}</span></div>
              <div className="col s10 "><span className="right">Sent On: {new Date(survey.dateCreated).toLocaleDateString()}</span></div>
            </div>
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
