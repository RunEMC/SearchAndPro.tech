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
            showPanel: false
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
                <UserCategoryWrapper updateUser={this.updateUser} togglePanel={this.togglePanel}/>
                <SingleUserPanel showPanel={this.state.showPanel} username={this.state.username} togglePanel={this.togglePanel}/>
            </div>
        )
    }
} 