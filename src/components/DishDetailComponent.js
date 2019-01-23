import React from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';


    const DishDetail = (props) => {
        console.log(props);
        console.log('DishDetail Component render invoked');

        const { dish } = props;
        if (dish != null){
            return (
                <div className='container'>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.dish.comments}/>
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
                </div>
            );
        } else {
            return <div/>
        }
    }
    export default DishDetail;