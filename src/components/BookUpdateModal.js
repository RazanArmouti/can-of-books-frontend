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
            
        }
        console.log(this.props.showUpdateModal)
        console.log(this.props.bookId)
    }

    


    handleUpdateForm = () => {
        console.log(this.state.image, this.state.title, this.state.description, this.state.email);
        this.props.handleOpen(this.state.image, this.state.title, this.state.description, this.state.email)
        let config = {
            method: "PUT",
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: `/update-student/${this.state.bookId}`,
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
        });
        window.location.reload(true);
        console.log(this.state.booksData);
    }

    handleNewtitle = e => {
        console.log(e.target.value)
        this.setState({
            title: e.target.value,

        });

        console.log(this.state.title)
    }
    handleNewdesc = e => {
        console.log(e.target.value)
        this.setState({
            description: e.target.value
        });
        console.log(this.state.description)
    }
    handleNewimg = e => {
        console.log(e.target.value)
        this.setState({
            image: e.target.value,

        });
        console.log(this.state.image)
    }
    handleNewemail = e => {
        console.log(e.target.value)
        this.setState({
            image: e.target.value,

        });
        console.log(this.state.email)
    }




    render() {
        return (

            <Modal show={this.props.showUpdateModal} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h1>Update Book</h1></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form >
                        <input id="txtTitle" type="text" placeholder="new book title" style={{ width: "470px", height: "100px" }} onChange={this.handleNewtitle} /> <br />
                        <input type="txtDescription" placeholder="new book description" style={{ width: "470px", height: "100px" }} onChange={this.handleNewdesc} /> <br />
                        <input type="txtemail" placeholder="new email address" style={{ width: "470px", height: "100px" }} onChange={this.handleNewemail} /> <br />
                        <input type="txtImageUrl" placeholder="new book image-url" style={{ width: "470px", height: "100px" }} onChange={this.handleNewimg} /> <br />

                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                    <Button variant="primary"  >Update Book Info</Button>
                    {/* onClick={this.handleUpdateForm} */}
                </Modal.Footer>
            </Modal>


        )
    }
}

export default BookUpdateModal
