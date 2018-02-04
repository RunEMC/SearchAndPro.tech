import React from 'react';
import request from 'superagent';

import SingleUserFeed from './SingleUserFeed.js';
import SingleUserMentions from './SingleUserMentions.js';
import SingleUserActions from './SingleUserActions.js';
import ParentTrait from './ParentTrait.js';
import ChildTrait from './ChildTrait.js';
import { isNull } from 'util';

export default class SingleUserPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            analysis: undefined
        }

        this.getUserAnalysis = this.getUserAnalysis.bind(this);
        this.precisionRound = this.precisionRound.bind(this);
    }

    precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    getUserAnalysis(username) {
        request
        .get('https://searchandprotech.lib.id/checkSuicidal@dev/')
        .query('twitterHandle=' + username)
        .accept('json')
        .then((res) => {
            // res.body is the javascript object (NOT JSON) returned
            console.log(res.body);
            console.log("Got analysis for : ", username);
            this.setState({ analysis: res.body });
        });
    }

    // componentDidMount() {
    //     //console.log(this.props.username);
    //     if (this.props.username) {
    //         this.getUserAnalysis(this.props.username);
    //     }
    //     else {
    //         this.setState({ analysis : false });
    //     }
    // }

    // componentWillReceiveProps(nextprops) {
    //     if (nextprops.username) {
    //         this.getUserAnalysis(nextprops.username);
    //     }
    //     else {
    //         this.setState({ analysis : false });
    //     }
    // }

    render() {

        var user = this.props.user ? this.props.user : false;

        if (user) {
            var riskPercentile = 100 - ((user.sentiment.sentiment + 1) * 50);
            
            var riskString = "low";
            if (riskPercentile > 55) riskString = "medium";
            if (riskPercentile > 75) riskString = "high";

            var riskPercentile = this.precisionRound(riskPercentile, 0);
        }


        var personalities = user ? user.personality.map((personality, index) =>
            <ParentTrait trait={personality} key={index} />
        ) : false;
        var needs = user ? user.needs.map((need, index) =>
            <ChildTrait trait={need} key={index} />
        ) : false;
        var values = user ? user.values.map((value, index) =>
            <ChildTrait trait={value} key={index} />
        ) : false;

        return (
            <div className={"user-panel "}>
                {/* <div id="panel-close" onClick={() => { this.props.togglePanel(false) }}>Close</div> */}
                <div className="single-header">
                    <div className="header-username"><span>{user && "Username:  "}</span><span>{user && user.twitterHandle}</span></div>
                    <div className={'user-risk ' + riskString}>{user && riskPercentile}</div>
                </div>

                <div className="panel-menu">
                    <div className="panel-button trait-button">traits</div>
                    <div className="panel-button contact-button">contact</div>
                </div>

                <div className="all-traits">
                    <div className="trait-wall">
                        <h5>Personality</h5>
                        {user && personalities}
                    </div>
                    <div className="trait-wall">
                        <h5>Needs</h5>
                        {user && needs}
                    </div>
                    <div className="trait-wall">
                        <h5>Values</h5>
                        {user && values}
                    </div>
                </div>


                {/* <SingleUserFeed /> */}
                {/* <SingleUserMentions /> */}
                {/* <SingleUserActions /> */}
            </div>
        )
    }
}