import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class NotAuthentication extends Component {
    render() {
      switch (this.props.auth) {
        case null:
          return <div>Loading...</div>;
        case false:
          return <ComposedComponent {...this.props} />
        default:
          return <Redirect to='/' />
      }
    }
  }


  function mapStateToProps({ auth }) {
    //console.log(state) check 
    return { auth };
  }

  return connect(mapStateToProps)(NotAuthentication);
}
