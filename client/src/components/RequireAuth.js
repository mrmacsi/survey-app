import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 

export default function (ComposedComponent) {
  class Authentication extends Component {
    render() {
      switch (this.props.auth) {
        case null:
          return <div>Loading...</div>;
        case false:
          return <Redirect to='/login' />
        default:
          return <ComposedComponent {...this.props} />
      }
    }
  }

  function mapStateToProps({ auth }) {
    //console.log(state) check 
    return { auth };
  }

  return connect(mapStateToProps)(Authentication);
}
