import { Component } from 'react';
import {
  Col,
  Container,
  Jumbotron,
  Row,
  Form,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";

class ViewRecipe extends Component{
  state={
    
  }
  render(){
  return (
   <>
 {typeof this.props.viewRecipe=='undefined'?<div></div>:  
<ListGroup>
                   
                   <ListGroup.Item>
                   {this.props.viewRecipe.dataRecipeChange.map((ele)=>{
          return <p>{ele}</p>
        })}
                   </ListGroup.Item>
                  
             </ListGroup>
  

  }
   </>
  );
  
  }
}


export default ViewRecipe;