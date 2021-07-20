import React from "react";
import CardProfilePicture from "./CardProfilePicture";

class LoginForm extends React.Component {
    constructor(_props) {
        super(_props);

        this.toggleRememberMe = this.toggleRememberMe.bind(this);
    }

    toggleRememberMe() {
        this.props.rememberMe = !this.props.rememberMe;
        this.props.setCardStatus(this.props.rememberMe);
    }

    emailChange(_event) {

    }

    render() {
        return (
            <div onClick={this.toggleRememberMe} className='inside-login-container'>
                <CardProfilePicture type='login' src='../../img/user/default.jpg' />
                <form className='login-form' action='/?command=login' method='post'>
                    <div className='login-inputs-aligner d-flex align-items-end p-2'>
                        <div className='login-inputs-wrapper'>
                            <div className='login-invisible-input-wrapper login-input-wrapper'>
                                <input className='login-remember-input login-text-input' name='rememberMe' type="text" value={(this.props.rememberMe ? 'true' : 'false')} />
                            </div>
                            <div className='login-email-input-wrapper login-input-wrapper'>
                                <input onClick={_event => { _event.stopPropagation() }} name='email' className='login-email-input login-text-input' type="text" placeholder="Email..." onChange={this.emailChange} />
                            </div>
                            <div className='login-password-input-wrapper login-input-wrapper mb-1'>
                                <input onClick={_event => { _event.stopPropagation() }} name='password' className='login-password-input login-text-input' type="password" placeholder="Password..." />
                            </div>

                            <div className='login-submit-input-wrapper login-input-wrapper'>
                                <input onClick={_event => { _event.stopPropagation() }} className='login-submit-input' type='submit' value='Submit' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;