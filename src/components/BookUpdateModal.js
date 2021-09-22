import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
require('dotenv').config();
class BookUpdateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            title: '',
            description: '',
            email: '',
            booksData: []

        }

    }

    componentDidMount = async () => {
        let config = {
            method: "get",
            baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
            url: `/get-book?id=${this.props.bookId}`,

        }

        axios(config).then(response => {

            this.setState({
                booksData: response.data,
                image: response.data.image,
                title: response.data.title,
                description: response.data.description,
                email: response.data.email
            })

        })



    }


    handleUpdateForm = () => {

        console.log("inside update", this.state.image, this.state.title, this.state.description, this.state.email, this.props.bookId);
        this.props.handleOpen(this.state.image, this.state.title, this.state.description, this.state.email);
        let config = {
            method: "PUT",
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: `/update-book/${this.props.bookId}`,
            data: {
                image: this.state.image,
                title: this.state.title,
                description: this.state.description,
                email: this.state.email
            }
        }
        axios(config).then(res => {
            this.setState({
                booksData: res.data
            })
           // console.log(this.state.booksData);
        });
        window.location.reload(true);

    }

    handleNewtitle = e => {
        this.setState({
            title: e.target.value,

        });
    }
    handleNewdesc = e => {
      
        this.setState({
            description: e.target.value
        });
       
    }
    handleNewimg = e => {
     
        this.setState({
            image: e.target.value,

        });
     
    }
    handleNewemail = e => {
       
        this.setState({
            email: e.target.value,

        });
      
    }




    render() {
        return (

            <Modal show={this.props.showUpdateModal} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h1>Update Book</h1></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form >
                        <input id="txtTitle" type="text" style={{ width: "470px", height: "100px" }} value={this.state.title} onChange={this.handleNewtitle} /> <br />
                        <input type="txtDescription" style={{ width: "470px", height: "100px" }} value={this.state.description} onChange={this.handleNewdesc} /> <br />
                        <input type="txtemail" style={{ width: "470px", height: "100px" }} value={this.state.email} onChange={this.handleNewemail} /> <br />
                        <input type="txtImageUrl" style={{ width: "470px", height: "100px" }} value={this.state.image} onChange={this.handleNewimg} /> <br />
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                    <Button variant="primary" onClick={this.handleUpdateForm}>Update Book Info</Button>
                  
                </Modal.Footer>
            </Modal>
        
        )
    }
}

export default BookUpdateModal
