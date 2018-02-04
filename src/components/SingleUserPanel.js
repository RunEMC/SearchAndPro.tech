import React from 'react';
import request from 'superagent';

import SingleUserFeed from './SingleUserFeed.js';
import SingleUserMentions from './SingleUserMentions.js';
import SingleUserActions from './SingleUserActions.js';



export default class SingleUserPanel extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     hidden: true
        // }
    }

    componentDidMount() {

    }

    render() {
        var panelDisplay = this.props.showPanel ? "" : "hidden-panel"; 

        return (
            <div class={"user-panel " + panelDisplay}>
                <div onClick={() => {this.props.togglePanel(false)}}>Close panel</div>
                Single User Panel
                <SingleUserFeed />
                <SingleUserMentions />
                <SingleUserActions />
            </div>
        )
    }
}