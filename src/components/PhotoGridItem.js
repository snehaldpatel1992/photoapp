import React, { Component } from 'react';

class PhotoGridItem extends Component {
    openImage = () => {
        this.props.openImage(this.props.whichItem);
    };
    render() {
        return (
            <img
                className='cursor animated fadeIn responsive'
                onClick={this.openImage}
                alt={this.props.whichItem.caption}
                src={this.props.whichItem.thumbnail}
            />
        );
    }
}

export default PhotoGridItem;