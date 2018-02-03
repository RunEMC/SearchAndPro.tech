import React from 'react'

import UserTile from './UserTile.js';

export default class UserCategoryWrapper extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            users : [
                
            ]
        };
    }



    render() {
        return (
            <div>
                <UserTile />
                <UserTile />
            </div>
        )
    }
}