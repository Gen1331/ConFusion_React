import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{


    render(){
        const dish = this.props.dish;
        const comments = this.props.dish.comments;
            if (dish != null){
                return (
                <div className='row'>
                {this.renderDish(dish), this.renderComments(comments)}
                </div>
                );
            }
            else{
                return <div/>
            }
    }

    renderDish(dish){
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

    renderComments(comments){
        if (comments != null){
            return (
                <div className='m-1 col-sm-12 col-md-5'>
                    <h4>Comments</h4>
                <ul className='list'>
                    <li>{this.props.dish.comments}</li>
                </ul>
                </div>

            );
        }
        else {
            return(
                <div/>
            );
        }
    }
}



export default DishDetail;