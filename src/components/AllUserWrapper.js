import React from 'react';
import ReactDOM from 'react-dom';

import UserCategoryWrapper from './UserCategoryWrapper.js';
import SingleUserPanel from './SingleUserPanel.js';

export default class AllUserWrapper extends React.Component {
    render() {
        return (
            <div className="user-wrap">
                <UserCategoryWrapper />
                <SingleUserPanel />
            </div>
        )
    }
} 