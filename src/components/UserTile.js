import React from 'react';

export default class UserTile extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.updateUser(this.props.user.username);
        this.props.togglePanel(true);
    }

    render() {

        var user = this.props.user;
        var risk = "low";
        if (user.risk < 50) risk = "low";
        if (user.risk > 50) risk = "medium";
        if (user.risk > 80) risk = "high";

        return (
            <div className="user-tile" onClick={this.handleClick}>
                <div className={'user-risk ' + risk}>{user.risk}</div>
                <div className={'user-name '}><span>Username:  </span><span>{user.username}</span><span>User ID:  </span><span>{user._id}</span></div>
            </div>
        )
    }
}