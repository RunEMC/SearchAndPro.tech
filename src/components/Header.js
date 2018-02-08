import React from 'react';
import ReactDOM from 'react-dom';

import logo from '../../img/shield.png';

export default class Header extends React.Component {

    render() {

        return (
            <div className="nav"> 
                <img src={logo} alt={"logo"} /> 
//                <div className="logo">
//                    <img src={logo} alt={"logo"} /> 
//                    <h1>Search and Protect</h1>
//                </div>
//            <h1>
            </h1>
            </div>
        )
    }
} 