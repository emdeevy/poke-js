import React from "react";
import CardProfilePicture from './CardProfilePicture';

class RegisterForm extends React.Component {
    constructor(_props) {
        super(_props);

        this.fileInput = React.createRef();

        this.uploaderClick = this.uploaderClick.bind(this);
        this.uploaderChange = this.uploaderChange.bind(this);
        this.profilePictureCrop = this.profilePictureCrop.bind(this);
        this.doneCropClick = this.doneCropClick.bind(this);

        this.state = {
            src: '../../img/user/default.jpg',
            type: 'register',
            uploaderValue: 'Upload Profile Picture',
            cropValues: { percentages: { x: 0, y:0, width:0, height:0 }, pixels: { x: 0, y:0, width:0, height:0 } },
        };
    }

    profilePictureCrop(_dataPe, _dataPi) {
        this.state.cropValues.percentages = _dataPe;
        this.state.cropValues.pixels = _dataPi;
        this.setState(this.state);
    }

    emailChange(_event) {

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
                <form className='register-form' action='/?command=register' method='post'>
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
                                <input name='first_name' className='register-firstname-input register-text-input' type="text" placeholder="First Name..." />
                                <input name='last_name' className='register-lastname-input register-text-input' type="text" placeholder="Last Name..." />
                            </div>
                            <div className='register-name-input-wrapper register-input-wrapper'>
                                <input name='email' className='register-email-input register-text-input mb-1' type="text" placeholder="Email..." onChange={this.emailChange} />
                            </div>
                            <div className='register-password-input-wrapper register-input-wrapper'>
                                <input name='password' className='register-password-input register-text-input' type="password" placeholder="Password..." />
                            </div>
                            <div className='register-password2-input-wrapper register-input-wrapper mb-1'>
                                <input name='password2' className='register-password2-input register-text-input' type="password" placeholder="Confirm Password..." />
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