import React, { Component } from 'react';
import ContentZone from '../components/ContentZone'


class MainTemplate extends Component {
    render() {    
        return (
        <div className="one-column-template">
            <ContentZone name='MainContentZone' {...this.props} />
        </div>
        );
    }
}

export default MainTemplate;
