import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Card from "./Card";

class LoginApp extends React.Component {
    constructor(_props) {
        super(_props);

        this.swapClick = this.swapClick.bind(this);

        this.state = {
            type: 'login',
            swapButtonValue: 'Sign Up'
        }
    }

    swapClick() {
        this.state.type = (this.state.type === 'login') ? 'register' : 'login';
        this.state.swapButtonValue = (this.state.swapButtonValue === 'Sign Up') ? 'Log In' : 'Sign Up';
        this.setState(this.state);
    }

    render() {

        let content = (this.state.type === 'login') ? <LoginForm /> : <RegisterForm />;

        return (
            <div className='login-app-wrapper'>
                <Card>
                    {content}
                </Card>
                <div className='p-2'>
                    <div onClick={this.swapClick} className='poke-swap-button'>{this.state.swapButtonValue}</div>
                </div>
            </div>
        );
    }
}
export default LoginApp;