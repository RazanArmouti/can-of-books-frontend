import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
require('dotenv').config();
 class BookFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            title: '',
            description: '',
            email:''
        }
        console.log( this.props.showModal)
    }
    getHandleOpen = () => {
       // this.handleNewBook
       console.log(this.state.image, this.state.title, this.state.description);
        this.props.handleOpen(this.state.image, this.state.title, this.state.description)       
        let config={
          method:"POST",
          baseURL:`${process.env.REACT_APP_BACKEND_URL}`,
          url:"/create-book",
          data:{
            image:this.state.image,
            title:this.state.title,
            description:this.state.description,
            email:this.state.email
          }
        }
        axios(config).then(response=>{
            this.setState({
                booksData: response.data
            })
          })
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

    handleDelete=(id)=>{
        let bookId=id;
        let config={
            method:"DELETE",
            baseURL:`${process.env.REACT_APP_BACKEND_URL}`,
            url:`/delete-books/${bookId}`,
    
        }
    
        axios(config).then(response=>{
          this.setState({
            booksData:response.data
          })
        })
    }


    render() {
        return (

            <Modal show={this.props.showModal} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h1>Add New Book</h1></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form >                   
                        <input id="txtTitle" type="text" placeholder="new book title" style={{width:"470px", height:"100px"}} onChange={this.handleNewtitle}/> <br/>
                        <input type="txtDescription" placeholder="new book description" style={{width:"470px", height:"100px"}} onChange={this.handleNewdesc}/> <br/>
                        <input type="txtemail" placeholder="new email address" style={{width:"470px", height:"100px"}} onChange={this.handleNewemail}/> <br/>
                        <input type="txtImageUrl" placeholder="new book image-url" style={{width:"470px", height:"100px"}} onChange={this.handleNewimg}/> <br/>                       

                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                    <Button variant="primary" onClick={this.getHandleOpen} >Save changes</Button>
                </Modal.Footer>
            </Modal>

            
        )
    }
}

export default BookFormModal
