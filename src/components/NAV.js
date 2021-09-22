import React, { Component } from 'react';
import {Link} from "react-router-dom";

 class NAV extends Component {
    render() {
        return (

            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Profile">Profile</Link></li>
                    <li><Link to="/test">Test API</Link></li>
                </ul>
            </div>
        )
    }
}

export default NAV
