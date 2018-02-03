import React from 'react'

import UserTile from './UserTile.js';

export default class UserCategoryWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users : [
                {"username" : "tetsuo", "risk" : 95, "_id" : 124623475356 },
                {"username" : "sadboy", "risk" : 90, "_id" : 124623475356 },
                {"username" : "loserman", "risk" : 65, "_id" : 124623475356 },
                {"username" : "dfasd", "risk" : 35, "_id" : 124623475356 }
            ]
        };
    }

    render() {
        var riskComp = (a,b) => {
            if (a.risk < b.risk)
              return 1;
            if (a.risk > b.risk)
              return -1;
            return 0;
        }

        var sortedUsers = this.state.users.sort(riskComp);
        // console.log(sortedUsers);

        var userTiles = sortedUsers.map((user, index) =>
            <UserTile user={user} key={index}/>
        );

        console.log(userTiles);

        return (
            <div>
                {userTiles}
            </div>
        )
    }
}