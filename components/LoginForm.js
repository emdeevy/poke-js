import React from "react";
import CardProfilePicture from "./CardProfilePicture";
import axios from "axios";

class LoginForm extends React.Component {
    constructor(_props) {
        super(_props);

        this.state = {
            src: '/img/user/default.jpg',
            inputs: {
                email: {focus: false, valid: false}
            }
        };

        this.toggleRememberMe = this.toggleRememberMe.bind(this);
        this.triggerFocus = this.triggerFocus.bind(this);
        this.triggerBlur = this.triggerBlur.bind(this);
        this.triggerChange = this.triggerChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    toggleRememberMe() {
        this.props.rememberMe = !this.props.rememberMe;
        this.props.setCardStatus(this.props.rememberMe);
    }

    triggerFocus(_event, name) {
        this.state.inputs[name].focus = true;
        this.setState(this.state);
    }

    triggerBlur(_event, name) {
        this.state.inputs[name].focus = false;
        this.setState(this.state);
    }

    loginSubmit(_event) {
        if(!this.state.inputs.email.valid) {
            _event.preventDefault();
        }
    }

    triggerChange(_event, name) {

        let value = _event.target.value;

        switch(name) {
            case 'email':
                if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)) {
                    axios.post('/?command=emailcheck', {
                        email: value
                    })
                        .then((response) => {
                            if(response.data.found === 1) {
                                this.state.src = response.data.profile_picture;
                                this.state.inputs.email.valid = true;
                                this.setState(this.state);
                            }
                            else {
                                this.state.src = '/img/user/default.jpg';
                                this.state.inputs.email.valid = false;
                                this.setState(this.state);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                };
                break;
        }

    }

    render() {
        return (
            <div onClick={this.toggleRememberMe} className='inside-login-container'>
                <CardProfilePicture type='login' src={this.state.src} />
                <form onSubmit={this.loginSubmit} className='login-form' action='/?command=login' method='post'>
                    <div className='login-inputs-aligner d-flex align-items-end p-2'>
                        <div className='login-inputs-wrapper'>
                            <div className='login-invisible-input-wrapper login-input-wrapper'>
                                <input autoComplete='off' className='login-remember-input login-text-input' name='rememberMe' type="text" value={(this.props.rememberMe ? 'true' : 'false')} />
                            </div>
                            <div className='login-email-input-wrapper login-input-wrapper'>
                                <input onClick={_event => { _event.stopPropagation() }} name='email' className={`login-email-input login-text-input ${this.state.inputs.email.focus && !this.state.inputs.email.valid ? 'red-input' : ''}`} type="text" placeholder="Email..." onChange={_e => this.triggerChange(_e, 'email')} onFocus={_e => this.triggerFocus(_e, 'email')} onBlur={_e => this.triggerBlur(_e, 'email')} />
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