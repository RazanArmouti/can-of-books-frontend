import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BestBooks from './BestBooks';
import Nav from './components/NAV';
import Home from './components/Home';
import Profile from './components/Profile';
import BookFormModal from './components/BookFormModal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import BookUpdateModal from './components/BookUpdateModal';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
      title: '',
      description: '',
      image: '',
      email:'',
      showModal: false,
      showUpdateModal: false,
      bookId:''

    }
  }
  componentDidMount = async () => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`);
    this.setState({
      booksData: data.data
    })
    console.log(this.state.booksData);
  }
  handleBookInput = () => {
    this.setState({
      showModal: true

    })
    console.log(this.state.showModal)

  }
  handleUpdateBook = () => {
    this.setState({
      showUpdateModal: true

    })
    console.log(this.state.showUpdateModal)
    console.log(this.state.bookId)


  }
  handleClose = () => {
    this.setState({
      showModal: false,
      showUpdateModal:false
    })
  }
  handleOpen = (image, title, description,email) => {
    this.setState({
      showModal: true,
      showUpdateModal: true,
      image: image,
      title: title,
      description: description,
      email:email

    })
  }

  handleDelete=(id)=>{
    this.setState({
      bookId:id
    })
        let config={
        method:"DELETE",
        baseURL:`${process.env.REACT_APP_BACKEND_URL}`,
        url:`/delete-books/${this.state.bookId}`,

    }

    axios(config).then(response=>{
      this.setState({
        booksData:response.data
      })
    })
}

  render() {
    return (
      <div>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
        <br />

        <BestBooks booksData={this.state.booksData} bookId={this.state.bookId}/>

        <br />
        <Button variant="primary" onClick={this.handleBookInput} >Add New Book</Button>
        {
          this.state.showModal ? <BookFormModal showModal={this.state.showModal} handleOpen={this.handleOpen} handleClose={this.handleClose} /> : ''
        }

        <br/>
        <Button variant="success" onClick={this.handleUpdateBook}>Update</Button>
        {
          this.state.showUpdateModal ? <BookUpdateModal bookId={this.state.bookId} showUpdateModal={this.state.showUpdateModal} handleOpen={this.handleOpen} handleClose={this.handleClose} /> : ''
        }

        <br />
        <Button variant="danger" onClick={this.deleteBook}>Delete Book</Button>

      </div >
    )
  }
}

export default App
