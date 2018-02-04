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
    }

    componentDidMount() {
        request
            .get('https://searchandprotech.lib.id/checkSuicidal@0.0.0/')
            .query('twitterHandle=' + 'Laggy')//config.twitterHandle)
            .accept('json')
            .then((res) => {
                // res.body is the javascript object (NOT JSON) returned
                console.log(res.body);
                this.setState({ analysis: res.body });
            });
    }

    render() {
        var panelDisplay = this.props.showPanel ? "" : "hidden-panel";

        var analysis = this.state.analysis ? this.state.analysis : false;

        if (this.props.username) {
            for (var i = 0; i < this.props.users.length; i++) {
                if (this.props.users[i].username == this.props.username) {
                    var user = this.props.users[i];
                    
                    var risk = "low";
                    if (user.risk < 50) risk = "low";
                    if (user.risk > 50) risk = "medium";
                    if (user.risk > 80) risk = "high";
                }
            }
        }
        else {
            var user = false;
            var risk = "";
        }

        var personalities = analysis ? analysis.personality.map((personality, index) =>
            <ParentTrait trait={personality} key={index} />
        ) : false;
        var needs = analysis ? analysis.needs.map((need, index) =>
            <ChildTrait trait={need} key={index} />
        ) : false;
        var values = analysis ? analysis.values.map((value, index) =>
            <ChildTrait trait={value} key={index} />
        ) : false;

        return (
            <div className={"user-panel " + panelDisplay}>
                {/* <div id="panel-close" onClick={() => { this.props.togglePanel(false) }}>Close</div> */}
                <div className="single-header">
                    <div className="header-username"><span>{user && "Username:  "}</span><span>{user && user.username}</span></div>
                    <div className={'user-risk ' + risk}>{user && user.risk}</div>
                </div>

                <div className="panel-menu">
                    <div className="panel-button trait-button">traits</div>
                    <div className="panel-button contact-button">contact</div>
                </div>

                <div className="all-traits">
                    <div className="trait-wall">
                        <h5>Personality</h5>
                        {analysis && personalities}
                    </div>
                    <div className="trait-wall">
                        <h5>Needs</h5>
                        {analysis && needs}
                    </div>
                    <div className="trait-wall">
                        <h5>Values</h5>
                        {analysis && values}
                    </div>
                </div>


                {/* <SingleUserFeed /> */}
                {/* <SingleUserMentions /> */}
                {/* <SingleUserActions /> */}
            </div>
        )
    }
}