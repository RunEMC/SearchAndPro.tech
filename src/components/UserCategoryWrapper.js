import React from 'react'

import UserTile from './UserTile.js';

export default class UserCategoryWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var riskComp = (a,b) => {
            if (a.sentiment.sentiment < b.sentiment.sentiment)
              return -1;
            if (a.sentiment.sentiment > b.sentiment.sentiment)
              return 1;
            return 0;
        }

        var sortedUsers = this.props.users.sort(riskComp);
        console.log(sortedUsers);

        var userTiles = sortedUsers.map((user, index) =>
            <UserTile user={user} key={index} updateUser={this.props.updateUser}/>
        );

        //console.log(userTiles);

        return (
            <div className="all-user-tiles">
                {userTiles}
            </div>
        )
    }
}