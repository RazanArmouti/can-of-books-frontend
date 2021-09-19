import React, { Component } from 'react'
import axios from 'axios';

 class BestBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
          booksData: [],
         }}
    componentDidMount = async () => {
        let data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`);
        this.setState({
          booksData: data.data
        })
      }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default BestBooks
