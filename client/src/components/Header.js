import React, { Component,Fragment  } from "react";
import { Navbar, NavItem,Dropdown /*, SideNav, SideNavItem, Button  */} from 'react-materialize'
import { connect } from "react-redux";
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "Loading...";
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return (
        <Fragment> 
          <li style={{padding : "0 10px"}}><Payments/></li>
            <Dropdown trigger={
                // eslint-disable-next-line
                <li><a className="dropdown-trigger" >{this.props.auth.name}<i className="material-icons right">arrow_drop_down</i></a></li>
              }>
              <NavItem href="#">Credits : {this.props.auth.credits}</NavItem>
              <NavItem divider />
            <NavItem href="/api/logout">Logout</NavItem>
            </Dropdown>
        </Fragment>);
    }
  }
  renderNav(){
    return (
      <Navbar style={{padding : "0 10px"}} brand='Maxi' href={this.props.auth ? '/surveys':'/'}  right>
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
