import React from "react";

class Card extends React.Component {
    constructor(_props) {
        super(_props);

        this.setStatus = this.setStatus.bind(this);

        this.state = { status: false };

    }

    setStatus(status) {
        this.state.status = status;
        this.setState(this.state);
    }

    render() {

        let borderClasses = this.state.status ? 'poke-card-border poke-card-border-green' : 'poke-card-border';

        let children = React.Children.map(this.props.children, child => {
            if(React.isValidElement(child)) {
                return React.cloneElement(child, { setCardStatus: this.setStatus, rememberMe: this.state.status });
            }
            return child;
        });

        return (
            <div className='poke-card'>
                <div className={borderClasses} />
                {children}
            </div>
        );
    }
}

export default Card;