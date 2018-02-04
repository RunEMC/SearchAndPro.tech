import React from 'react';
import ReactDOM from 'react-dom';

import UserCategoryWrapper from './UserCategoryWrapper.js';
import UserAnalysisSelect from './UserAnalysisSelect.js';
import SingleUserPanel from './SingleUserPanel.js';

export default class AllUserWrapper extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            showPanel: true,
            users : [
                {"username" : "tetsuo", "risk" : 95, "_id" : 124623475356 },
                {"username" : "sadboy", "risk" : 90, "_id" : 124623475356 },
                {"username" : "loserman", "risk" : 65, "_id" : 124623475356 },
                {"username" : "cccc", "risk" : 35, "_id" : 124623475356 }
            ]
        }

        this.updateUser = this.updateUser.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
    }

    updateUser(requestedName) {
        this.setState({
            username: requestedName
        })
    }

    togglePanel(panelStatus) {
        this.setState({
            showPanel: panelStatus
        })
    }

    render() {
        return (
            <div className="user-wrap">
                <UserAnalysisSelect updateUser={this.updateUser} togglePanel={this.togglePanel}/>
                <UserCategoryWrapper users={this.state.users} updateUser={this.updateUser} togglePanel={this.togglePanel}/>
                <SingleUserPanel showPanel={this.state.showPanel} users={this.state.users} username={this.state.username} togglePanel={this.togglePanel}/>
            </div>
        )
    }
} 