import React, { Component } from 'react'
import axios from 'axios';
import { Carousel, Toast } from 'react-bootstrap';


class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
    }
  }
  componentDidMount = async () => {
    let data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`);
    this.setState({
      booksData: data.data
    })
    console.log(this.state.booksData);
  }

  render() {
    return (
      <>
        <Carousel>
          {this.state.booksData.length > 0 ? this.state.booksData.map((element) => {
            return <Carousel.Item>
              <img style={{width:"300px", height:"600px"} }
                className="d-block w-100"
                src={element.image}
                alt={element.title}
              />
              <Carousel.Caption>
                <h3>{element.title}</h3>
                <p>{element.description}</p>
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
