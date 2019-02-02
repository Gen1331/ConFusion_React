import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb, 
    BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, 
    FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleNav =this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }


    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });        
    }

    render() {
        return(
            <div>
            <Button outline onClick={this.toggleModal}>Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Col>
                                <Label> Rating </Label>
                                        <Control.select model='.rating' name='rating' 
                                            className='form-control'>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                <Label htmlFor='author'>Your Name</Label>
                                    <Control.text model='.author' id='author' name='author' placeholder='Your Name'
                                        className='form-control'
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.author'
                                        show='touched'
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                <Label htmlFor='message'>Comments</Label>
                                    <Control.textarea model='.message' id='message' name='message' rows='12'
                                        className='form-control' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                    <Button type='submit' color='primary'>
                                    Submit                                    
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

    const DishDetail = (props) => {
        console.log(props);
        console.log('DishDetail Component render invoked');

        const { dish } = props;
        if (dish != null){
            return (
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}/>
                </div>
                </div>
            );
        } else {
            return <div/>
        }
    }

    function RenderDish({dish}) {
        return (
            <div className='m-1 col-sm-12 col-md-5'>
                <Card>             
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>               
                    <CardTitle>{dish.name}</CardTitle>                
                    <CardText>{dish.description}</CardText>
                </Card>
            </div>
        );
    }

    function RenderComments({comments}) {
        if (comments != null) {
            const commentItems = comments.map((comment) => {
                return (
                    <li key={comment.id} className='list-unstyled'>
                    <div className='mb-2'>{comment.comment}</div>
                    <div className='mb-2'>--{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                    </li>
                );
            });
            return (
                <div className='m-1 col-sm-12 col-md-5'>
                        <h4>Comments</h4>
                    <ul>
                        {commentItems}
                    </ul>
                    <CommentForm />
                </div>
            );
        } else {
            return <div/>
        }
    }
    export default DishDetail;