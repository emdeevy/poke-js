import React from "react";
import CardProfilePicture from './CardProfilePicture';

class RegisterForm extends React.Component {
    constructor(_props) {
        super(_props);

        this.fileInput = React.createRef();
        this.passwordInput = React.createRef();

        this.uploaderClick = this.uploaderClick.bind(this);
        this.uploaderChange = this.uploaderChange.bind(this);
        this.profilePictureCrop = this.profilePictureCrop.bind(this);
        this.doneCropClick = this.doneCropClick.bind(this);
        this.registerSubmit = this.registerSubmit.bind(this);

        this.state = {
            src: '../../img/user/default.jpg',
            type: 'register',
            uploaderValue: 'Upload Profile Picture',
            cropValues: { percentages: { x: 0, y:0, width:0, height:0 }, pixels: { x: 0, y:0, width:0, height:0 } },
            inputs: {
                firstname: { valid: false, focus: false },
                lastname: { valid: false, focus: false },
                email: { valid: false, focus: false },
                password: { valid: false, focus: false },
                password2: { valid: false, focus: false }
            }
        };
    }

    profilePictureCrop(_dataPe, _dataPi) {
        this.state.cropValues.percentages = _dataPe;
        this.state.cropValues.pixels = _dataPi;
        this.setState(this.state);
    }

    uploaderClick() {
        this.fileInput.current.click();
    }

    doneCropClick() {
        this.state.type = 'register';
        this.setState(this.state);
    }

    uploaderChange(_event) {
        let file = _event.target.files[0];

        this.state.type = 'register-crop';
        this.state.src = URL.createObjectURL(file);

        this.state.uploaderValue = "Change '" + file.name.replace(/\.[^/.]+$/, "") + "'";
        this.setState(this.state);
    }

    registerSubmit(_event) {
        if(!( this.state.inputs.firstname.valid && this.state.inputs.lastname.valid && this.state.inputs.email.valid && this.state.inputs.password.valid && this.state.inputs.password2.valid )) { _event.preventDefault(); }
    }

    triggerFocus(_event, name) {
        this.state.inputs[name].focus = true;
        this.setState(this.state);
    }

    triggerBlur(_event, name) {
        this.state.inputs[name].focus = false;
        this.setState(this.state);
    }

    validateInput(_event, name) {

        let value = _event.target.value;

        switch(name) {
            case 'firstname':
                if(/^[a-zA-Z]+$/.test(value) && value.length > 1) { this.state.inputs.firstname.valid = true; }
                break;
            case 'lastname':
                if(/^[a-zA-Z]+$/.test(value) && value.length > 1) { this.state.inputs.lastname.valid = true; }
                break;
            case 'email':
                if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)) { this.state.inputs.email.valid = true; }
                break;
            case 'password':
                if(value.length > 7) { this.state.inputs.password.valid = true; }
                break;
            case 'password2':
                if(value === this.passwordInput.current.value) { this.state.inputs.password2.valid = true; }
                break;

        }

        this.setState(this.state);

    }


    render() {

        let topLevelControls;

        if(this.state.type === 'register-crop') {
            topLevelControls =
                <div className='register-top-level-controls-wrapper p-2'>
                    <div className='register-top-level-control-aligner d-flex align-items-end'>
                        <div className='register-inputs-wrapper'>
                            <div onClick={this.doneCropClick} className='poke-done-button'>Done</div>
                        </div>
                    </div>
                </div>;
        }

        return (
            <div className='inside-register-container p-2'>
                <CardProfilePicture type={this.state.type} onCrop={this.profilePictureCrop} src={this.state.src} cropValues={this.state.cropValues} />
                <form onSubmit={this.registerSubmit} className='register-form' action='/?command=register' method='post' encType='multipart/form-data'>
                    <div className='register-top-inputs-aligner d-flex align-items-start'>
                        <div className='register-inputs-wrapper'>
                            <div onClick={this.uploaderClick} className='poke-upload-button'>{this.state.uploaderValue}</div>
                        </div>
                        <div className='login-invisible-input-wrapper login-input-wrapper'>
                            <input name='profile_picture' ref={this.fileInput} type='file' onChange={this.uploaderChange} />
                        </div>
                        <div className='login-invisible-input-wrapper login-input-wrapper'>
                            <input name='x' type='text' value={this.state.cropValues.pixels.x} />
                        </div>
                        <div className='login-invisible-input-wrapper login-input-wrapper'>
                            <input name='y' type='text' value={this.state.cropValues.pixels.y} />
                        </div>
                        <div className='login-invisible-input-wrapper login-input-wrapper'>
                            <input name='width' type='text' value={this.state.cropValues.pixels.width} />
                        </div>
                        <div className='login-invisible-input-wrapper login-input-wrapper'>
                            <input name='height' type='text' value={this.state.cropValues.pixels.height} />
                        </div>
                    </div>

                    <div className='register-bottom-inputs-aligner d-flex align-items-end'>
                        <div className='register-inputs-wrapper'>
                            <div className='register-name-input-wrapper register-input-wrapper d-flex justify-content-start'>
                                <input autoComplete='off' name='first_name' onFocus={_e => this.triggerFocus(_e, 'firstname')} onBlur={_e => this.triggerBlur(_e, 'firstname')} onChange={_e => this.validateInput(_e, 'firstname')} className={`register-firstname-input register-text-input ${this.state.inputs.firstname.focus && !this.state.inputs.firstname.valid ? 'red-input' : ''}`} type="text" placeholder="First Name..." />
                                <input autoComplete='off' name='last_name' onFocus={_e => this.triggerFocus(_e, 'lastname')} onBlur={_e => this.triggerBlur(_e, 'lastname')} onChange={_e => this.validateInput(_e, 'lastname')} className={`register-lastname-input register-text-input ${this.state.inputs.lastname.focus && !this.state.inputs.lastname.valid ? 'red-input' : ''}`} type="text" placeholder="Last Name..." />
                            </div>
                            <div className='register-name-input-wrapper register-input-wrapper'>
                                <input autoComplete='off' name='email' onFocus={_e => this.triggerFocus(_e, 'email')} onBlur={_e => this.triggerBlur(_e, 'email')} onChange={_e => this.validateInput(_e, 'email')} className={`register-email-input register-text-input mb-1 ${this.state.inputs.email.focus && !this.state.inputs.email.valid ? 'red-input' : ''}`} type="text" placeholder="Email..." />
                            </div>
                            <div className='register-password-input-wrapper register-input-wrapper'>
                                <input ref={this.passwordInput} name='password' onFocus={_e => this.triggerFocus(_e, 'password')} onBlur={_e => this.triggerBlur(_e, 'password')} onChange={_e => this.validateInput(_e, 'password')} className={`register-password-input register-text-input ${this.state.inputs.password.focus && !this.state.inputs.password.valid ? 'red-input' : ''}`} type="password" placeholder="Password..." />
                            </div>
                            <div className='register-password2-input-wrapper register-input-wrapper mb-1'>
                                <input name='password2' onFocus={_e => this.triggerFocus(_e, 'password2')} onBlur={_e => this.triggerBlur(_e, 'password2')} onChange={_e => this.validateInput(_e, 'password2')} className={`register-password2-input register-text-input ${this.state.inputs.password2.focus && !this.state.inputs.password2.valid ? 'red-input' : ''}`} type="password" placeholder="Confirm Password..." />
                            </div>

                            <div className='register-submit-input-wrapper register-input-wrapper'>
                                <input className='register-submit-input' type='submit' value='Submit' />
                            </div>
                        </div>
                    </div>
                </form>
                {topLevelControls}
            </div>
        );
    }
}

export default RegisterForm;