
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="page-footer site-footer" style={{marginTop:"10px"}}>
        <div className="container">
            <div className="row">
                <div className="col l6 s12">
                    <h5 className="white-text">Maxi Surveys</h5>
                    <p className="grey-text text-lighten-4">Fast, easy and valuable surveys in one click.</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                    <h5 className="white-text">Links</h5>
                    <ul>
                        <li><Link className="grey-text text-lighten-3" to="/surveys">Surveys</Link></li>
                        <li><Link className="grey-text text-lighten-3" to="/surveys/new">Create new survey</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container center-align">
                © 2019 Copyright Maxi Surveys
            </div>
        </div>
    </footer>
  );
};

export default Footer;
