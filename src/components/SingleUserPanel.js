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
            analysis: undefined,
            message: "",
            toggle: "traits"
        }

        this.getUserAnalysis = this.getUserAnalysis.bind(this);
        this.precisionRound = this.precisionRound.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.traitsOn = this.traitsOn.bind(this);
        this.contactOn = this.contactOn.bind(this);
    }

    precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    getUserAnalysis(username) {
        request
            .get('https://searchandprotech.lib.id/checkSuicidal/')
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

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    handleSubmit(event) {
        if (this.props.user.replyURL) {
            request
                .get(this.props.user.replyURL.slice(0, -9))
                .query("message=" + this.state.message)
                .then((res) => {
                    console.log("Sent message res : ", res);
                });
        }
        event.preventDefault();
    }

    traitsOn() {
        this.setState({ toggle: "traits" });
    }

    contactOn() {
        this.setState({ toggle: "contact" });
    }

    render() {

        if (this.state.toggle == "traits") {
            var traitsClass = "";
            var contactClass = "hidden-panel";
            var traitsButton = "panel-active";
            var contactButton = "panel-inactive";
        }
        else if (this.state.toggle == "contact") {
            var traitsClass = "hidden-panel";
            var contactClass = "";
            var traitsButton = "panel-inactive";
            var contactButton = "panel-active";
        }

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

        var sentAutoString = user.sentMessage ? "Automatic message has been sent" : "Automatic message not deemed necessary";
        var sentAuto = user.sentMessage ? "sent-auto" : "unsent-auto";

        return (
            <div className={"user-panel "}>
                {/* <div id="panel-close" onClick={() => { this.props.togglePanel(false) }}>Close</div> */}
                <div className="single-header">
                    <div className="header-username"><span>{user && "Username:  "}</span><span>{user && user.twitterHandle}</span></div>
                    <div className={'user-risk ' + riskString}>{user && riskPercentile}</div>
                </div>

                <div className="panel-menu">
                    <div className={"panel-button trait-button " + traitsButton} onClick={this.traitsOn}>traits</div>
                    <div className={"panel-button contact-button " + contactButton} onClick={this.contactOn}>contact</div>
                </div>

                <div className={"all-traits " + traitsClass}>
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
                        {(user && user.categories) &&
                            <div>
                                <h6>Keywords :</h6>
                                <div className="keyword">{user && user.categories.keywords[0].text}</div>
                                <div className="keyword">{user && user.categories.keywords[1].text}</div>
                                <div className="keyword">{user && user.categories.keywords[2].text}</div>
                            </div>
                        }
                    </div>
                </div>

                <div className={"contact-menu " + contactClass}>
                    <div className={"auto-send " + sentAuto}>{user && sentAutoString}</div>
                    <div className="custom-send">
                        <form id="response-form" onSubmit={this.handleSubmit}>
                            <input id="message-input" type="text" name="twitter-message" value={this.state.message} onChange={this.handleChange}></input>
                            <input id="message-submit" type="submit" value="Send"></input>
                        </form>
                    </div>
                </div>


                {/* <SingleUserFeed /> */}
                {/* <SingleUserMentions /> */}
                {/* <SingleUserActions /> */}
            </div>
        )
    }
}