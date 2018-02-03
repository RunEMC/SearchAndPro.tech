import React from 'react'

import UserTile from './UserTile.js';

export default class UserCategoryWrapper extends React.Component {
    render() {
        return (
            <div>
                Tile Wrapper
                <UserTile />
                <UserTile />
            </div>
        )
    }
}