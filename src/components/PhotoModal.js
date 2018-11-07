import React, { Component } from 'react';

class PhotoModal extends Component {
    closeImage = () => {
        this.props.closeImage();
    };
    render() {
        return (
            <div
                style={{ display: this.props.showModal ? 'block' : 'none' }}
                className='modal'
            >
                <span className='close' onClick={this.closeImage}>
                  &times;
                </span>
                <div className='modal-content'>
                    <img
                        className='responsive'
                        src={this.props.modalItem.src}
                        alt={this.props.modalItem.caption}
                    />
                    <div>{this.props.modalItem.caption}</div>
                    <div>{this.props.modalItem.description}</div>
                </div>
            </div>
        );
    }
}

export default PhotoModal;