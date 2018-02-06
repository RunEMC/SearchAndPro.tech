import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

import UserCategoryWrapper from './UserCategoryWrapper.js';
import UserAnalysisSelect from './UserAnalysisSelect.js';
import SingleUserPanel from './SingleUserPanel.js';

export default class AllUserWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            showPanel: true,
            analysis: [],
            usernames: [
                "sad_boie",
                "Canucks",
                "RealDonaldTrump",
                "solaggytoday",
                "QuickyBaby",
                "h3h3production",
                "hilakleinh3",
                "kawanocy",
                "BrambossMC",
                "CJSB__"

            ],
            users: [
                { "username": "tetsuo", "risk": 95, "_id": 124623475356 },
                { "username": "sadboy", "risk": 90, "_id": 124623475356 },
                { "username": "loserman", "risk": 65, "_id": 124623475356 },
                { "username": "cccc", "risk": 35, "_id": 124623475356 }
            ]
        }

        this.updateUser = this.updateUser.bind(this);
        this.getUserAnalysis = this.getUserAnalysis.bind(this);
        this.precisionRound = this.precisionRound.bind(this);
    }

    precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    getUserAnalysis(username) {
        if (username) {
            request
                .get('https://searchandprotech.lib.id/checkSuicidal/')
                .query('twitterHandle=' + username)
                .accept('json')
                .then((res) => {
                    // res.body is the javascript object (NOT JSON) returned
                    console.log(res.body);
                    console.log("Got analysis for : ", username);
                    this.setState({ analysis: this.state.analysis.concat([res.body]) });
                });
        }
    }

    componentDidMount() {
        if (this.state.analysis.length == 0) {
            for (var i = 0; i < this.state.usernames.length; i++) {
                this.getUserAnalysis(this.state.usernames[i]);
            }
        }
    }

    updateUser(requestedName) {
        var alreadyAnalyzed = false;
        for(var i = 0; i < this.state.analysis.length; i++) {
            if(this.state.analysis[i].twitterHandle == requestedName) alreadyAnalyzed = true;
        }
        if (!alreadyAnalyzed) this.getUserAnalysis(requestedName);
        this.setState({
            username: requestedName
        }, () => {
            console.log(this.state.username);
        })
    }

    render() {

        var user = false;
        for (var i = 0; i < this.state.analysis.length; i++) {
            if (this.state.analysis[i].twitterHandle == this.state.username) {
                var user = this.state.analysis[i];
            }
        }

        return (
            <div className="user-wrap">
                <UserAnalysisSelect updateUser={this.updateUser} />
                <UserCategoryWrapper users={this.state.analysis} updateUser={this.updateUser} />
                <SingleUserPanel user={user} />
            </div>
        )
    }
} 