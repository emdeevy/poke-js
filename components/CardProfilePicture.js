import React from "react";
import Cropper from "react-easy-crop";

class CardProfilePicture extends React.Component {
    constructor(_props) {
        super(_props);

        this.onCropChange = this.onCropChange.bind(this);
        this.onCropInit = this.onCropInit.bind(this);

        this.props.imgStyle = {};

        this.state = {
            crop: { x: 0, y: 0 },
            objectFit: 'vertical-cover',
            cardImgClass: 'poke-card-img reactEasyCrop_Cover_Vertical'
        }
    }

    onCropChange(crop) {
        this.setState({ crop })
    }

    onCropInit(objectSize) {

        let objectRatio = objectSize.naturalWidth / objectSize.naturalHeight;
        let originalRatio = 330 / 400;

        if((objectRatio < originalRatio) && (this.state.objectFit !== 'horizontal-cover')) {
            this.state.objectFit = "horizontal-cover";
            this.state.cardImgClass = 'poke-card-img reactEasyCrop_Cover_Horizontal';
            this.setState(this.state);
        }

    }

    render() {

        let object, containerClass = 'card-profile-picture-container';

        if(this.props.cropValues !== undefined) {
            this.props.imgStyle = {
                transform: `translate(${this.props.cropValues.percentages.x * -1}%, ${this.props.cropValues.percentages.y * -1}%) rotate(0deg) scale(1)`
            }
        }
        if(this.props.type === 'register-crop') {
            object = <Cropper image={this.props.src} objectFit={this.state.objectFit} onMediaLoaded={this.onCropInit} crop={this.state.crop} cropSize={{width:330, height:400}} onCropChange={this.onCropChange} onCropComplete={this.props.onCrop} disableAutomaticStylesInjection={true} />
            containerClass = 'card-profile-picture-container-crop';
        }
        else {
            object = <img alt='Profile Picture' className={this.state.cardImgClass} src={this.props.src} style={this.props.imgStyle} />
        }

        return (
            <div className={containerClass}>
                {object}
            </div>
        );
    }
}

export default CardProfilePicture;