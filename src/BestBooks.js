import React, { Component } from 'react'

import { Carousel, Toast, Button } from 'react-bootstrap';
import BookUpdateModal from './components/BookUpdateModal';
import axios from 'axios';

require('dotenv').config();

class BestBooks extends Component {
  // activeIndex
  constructor(props) {
    super(props);
    this.state = {
      bookId: '',
     
      showUpdateModal: false

    }
  }

  handleClose = () => {
    this.setState({
      showUpdateModal: false
    })
  }
  handleOpen = (image, title, description, email) => {
    this.setState({
      showUpdateModal: true,
      image: image,
      title: title,
      description: description,
      email: email

    })
  }
  handleUpdateBook = (e) => {
    // console.log(e.target.value);
    this.setState({
      showUpdateModal: true,
      bookId: e.target.value
    })

    //console.log(this.state.bookId);

  }
  handleDelete = (id) => {
      this.setState({
      bookId: id.target.value
    })
    let config = {
      method: "DELETE",
      baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
      url: `/delete-books/${id.target.value}`,

    }
    console.log("inside delete",id.target.value);
    axios(config).then(response => {
      response.status(200).send(response.data);
      // this.setState({
      //   booksData: response.data
      // })
    })
    
   window.location.reload(true);
  }

  render() {
    return (
      <>
        <Carousel  >
          {this.props.booksData.length > 0 ? this.props.booksData.map((element, idx) => {
            return <Carousel.Item key={`${idx}`} >
              {/* onChange={this.handleBookId(element._id)} */}
              <img style={{ width: "300px", height: "600px" }}
                className="d-block w-100"
                src={element.image}
                alt={element.title}
              />
              <Carousel.Caption>
                <h3>{element.title}</h3>
                <p>{element.description}</p>
                <div>
                  <Button variant="success" onClick={this.handleUpdateBook} value={element._id}>Update</Button>
                  {
                    this.state.showUpdateModal ? <BookUpdateModal bookId={this.state.bookId} showUpdateModal={this.state.showUpdateModal} handleOpen={this.handleOpen} handleClose={this.handleClose} /> : ''
                  }
                  <Button variant="danger" onClick={this.handleDelete} value={element._id}>Delete</Button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>

          })


            :

            <Toast>
              <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">BestBooks</strong>
                <small>11 mins ago</small>
              </Toast.Header>
              <Toast.Body>Hello, The collection is empty.</Toast.Body>
            </Toast>

          }



        </Carousel>
      </>
    )
  }
}

export default BestBooks
