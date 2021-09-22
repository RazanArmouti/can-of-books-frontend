import React, { Component } from 'react'
import {Button} from "react-bootstrap";

 class test extends Component {
    render() {
        return (
            <div>
            <Button variant="secondary" onClick={this.props.callApi}> call AUTH api  </Button>           
           
            </div>
        )
    }
}

export default test
