import React from 'react';

import SingleUserFeed from './SingleUserFeed.js';
import SingleUserMentions from './SingleUserMentions.js';
import SingleUserActions from './SingleUserActions.js';

export default class SingleUserPanel extends React.Component {
    render() {
        return (
            <div>
                Single User Panel
                <SingleUserFeed />
                <SingleUserMentions />
                <SingleUserActions />
            </div>
        )
    }
}