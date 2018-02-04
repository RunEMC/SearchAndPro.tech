import React from 'react';

export default class UserAnalysisSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            requestName: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({requestName: event.target.value});
    }

    handleSubmit(event) {
        this.props.updateUser(this.state.requestName);
        this.props.togglePanel(true);
        event.preventDefault();
    }

    render() {
        return (
            <div className="user-search">
                <form id="name-form" onSubmit={this.handleSubmit}>
                    <input id="name-input" type="text" name="twitter-handle" value={this.state.requestName} onChange={this.handleChange}></input>
                    <input id="name-submit" type="submit" value="Analyze"></input>
                </form>
            </div>
        )
    }
}