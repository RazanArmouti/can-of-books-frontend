import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BestBooks from './BestBooks';
import Nav from './components/NAV';
import Home from './components/Home';
import Profile from './components/Profile';
import BookFormModal from './components/BookFormModal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import LogoutButton from './components/LogoutButton';
import LoginButton from './components/LoginButton';
import { withAuth0 } from '@auth0/auth0-react';
import Test from './components/test';
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
      email: '',
      showModal: false,
      showUpdateModal: false,
      bookId: ''

    }
  }
  componentDidMount = async () => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`);
    this.setState({
      booksData: data.data
    })
    console.log(this.state.booksData);
  }
  callApi = () => {
    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        const jwt = res.__raw;
        const config = {
          headers: {"Authorization" : `Bearer ${jwt}`},
          method: 'get',
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: '/auth'
        }
        axios(config)
          .then(result => console.log(result.data))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }else{
      console.log("user is not authenticated")
    }
  }
  handleBookInput = () => {
    this.setState({
      showModal: true

    })


  }

  handleClose = () => {
    this.setState({
      showModal: false,
      showUpdateModal: false
    })
  }
  handleOpen = (image, title, description, email) => {
    this.setState({
      showModal: true,
      showUpdateModal: true,
      image: image,
      title: title,
      description: description,
      email: email

    })
  }



  render() {
    return (
      <div>
        {
          this.props.auth0.isAuthenticated ?
            <>
              <LogoutButton />           
             
              <Router>
                <Nav />
                <Switch>
                  <Route exact path="/">
                    <Home />
                    <br />
                    <BestBooks booksData={this.state.booksData} bookId={this.state.bookId} />
                    <br />
                    <Button variant="primary" onClick={this.handleBookInput} >Add New Book</Button>
                    {
                      this.state.showModal ? <BookFormModal showModal={this.state.showModal} handleOpen={this.handleOpen} handleClose={this.handleClose} /> : ''
                    }
                  </Route>
                  <Route path="/Profile">
                    <Profile username={this.props.auth0.user.name} userimg={this.props.auth0.user.picture} useremail={this.props.auth0.user.email} />
                  </Route>
                  <Route path="/test">
                    <Test callApi={this.callApi} />
                  </Route>
                </Switch>
              </Router>


            </> :
            <LoginButton />
        }



      </div >
    )
  }
}

export default withAuth0(App);
