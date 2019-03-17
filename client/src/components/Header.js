import React, { Component,Fragment  } from "react";
import { Navbar, NavItem /*, SideNav, SideNavItem, Button  */} from 'react-materialize'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "still deciding";
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return (
        <Fragment> 
          <NavItem><Payments/></NavItem>
          <NavItem>Credits : {this.props.auth.credits}</NavItem>
          <NavItem href="/api/logout">Logout</NavItem>
        </Fragment>);
    }
  }
  renderNav(){
    return (
      <Navbar brand='Maxi' href={this.props.auth ? '/surveys':'/'}  right>
        {this.renderContent()}
      </Navbar>
    )
  }
  render() {
    return (
      <div>
        {this.renderNav()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
