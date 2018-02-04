import React from 'react';

export default class UserTile extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.precisionRound = this.precisionRound.bind(this);
    }

    precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    handleClick() {
        this.props.updateUser(this.props.user.twitterHandle);
    }

    render() {

        var user = this.props.user ? this.props.user : false;

        if (user) {
            var riskPercentile = 100 - ((user.sentiment.sentiment + 1) * 50);
            
            var riskString = "low";
            if (riskPercentile > 55) riskString = "medium";
            if (riskPercentile > 75) riskString = "high";

            var riskPercentile = this.precisionRound(riskPercentile, 0);
        }

        return (
            <div className="user-tile" onClick={this.handleClick}>
                <div className={'user-risk ' + riskString}>{riskPercentile}</div>
                <div className={'user-name '}><span>Username:  </span><span>{user.twitterHandle}</span><span>Time:  </span><span>{user.time}</span><span>{user.date}</span></div>
            </div>
        )
    }
}