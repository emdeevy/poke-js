import React from "react";
import ReactDom from "react-dom";

import LoginApp from "../components/LoginApp";

import "../../css/react.css";

ReactDom.render(<LoginApp type='login' />, document.getElementById('login-container'));