import React, { Component } from 'react';
import "./Description.css";

type DestinationDataProps = {
    className: string;
    heading: string;
    text: string;
    source1: string;
    source2: string;
};

class DestinationData extends Component<DestinationDataProps> {
    render() {
        return ( 
            <div className={this.props.className}>
                <div className="des-text">
                    <h2>{this.props.heading}</h2>
                    <p>{this.props.text}</p>
                </div>
                <div className='image'>
                    <img alt="img" src={this.props.source1} />
                    <img alt="img" src={this.props.source2} />
                </div>
            </div>
        )
    }
}

export default DestinationData;
