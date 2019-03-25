import React from "react";
import { Button } from 'react-materialize'


const Login = () => {
  return (
    <div style={{textAlign:'center'}}>
    <br/><br/><br/><br/>
      <div>Please Login</div>
      <a href="/auth/google"><Button>Login With Google</Button></a>
    </div>
  );
};

export default Login;