import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BestBooks from './BestBooks';
import Nav from './components/NAV';
import Home from './components/Home';
import Profile from './components/Profile';
import BookFormModal from './components/BookFormModal';
import axios from 'axios';
import { Button } from 'react-bootstrap';

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
      owner: {
        ownerName: "Razan Armouti",
        email: "admin@gmail.com"
      },
      title: '',
      description: '',
      image: '',
      showModal: false

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
  handleClose = () => {
    this.setState({
      showModal: false
    })
  }
  handleOpen = (image, title, description) => {
    this.setState({
      showModal: true,
      image: image,
      title: title,
      description: description

    })
  }

  deleteBook = async (bookID) => {
    // let catsInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteCat?catID=${catID}`)
    let books = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/books/${bookID}?ownerName=${this.state.owner.email}`);
    this.setState({
      booksData: books.data
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

        <BestBooks booksData={this.state.booksData} />

        <br />
        <Button variant="primary" onClick={this.handleBookInput} >Add New Book</Button>


        {

          this.state.showModal ? <BookFormModal showModal={this.state.showModal} handleOpen={this.handleOpen} handleClose={this.handleClose} /> : ''

        }

        <br />
        <Button variant="danger" onClick={this.deleteBook}>Delete Book</Button>

      </div >
    )
  }
}

export default App
