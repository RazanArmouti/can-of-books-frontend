import React, { Component } from 'react'

import { Carousel, Toast } from 'react-bootstrap';


class BestBooks extends Component { 

  render() {
    return (
      <>
        <Carousel>
          {this.props.booksData.length > 0 ? this.props.booksData.map((element,idx) => {
            return <Carousel.Item key={`${idx}`}>
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
