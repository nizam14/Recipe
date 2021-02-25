import React, { Component } from 'react'
import View from '../viewRecipe'
import firebase from '../Firebase'

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
  import { FiEdit } from "react-icons/fi";
  
  import { RiDeleteBin5Fill } from "react-icons/ri";
  import { GrFormView } from "react-icons/gr";
  
class Card extends Component{

    state={
        view:false
    }
    AllRecipeDelete = async()=>{
       
        let res = await firebase.firestore().collection("Recipe").doc(this.props.NameCard.id).delete()
        // let temp = this.state.allRecipe.slice()

        // temp.splice(1)
        // this.setState({allRecipe: temp})
       
    }

    

    viewChange=()=>{
        this.setState({view:!this.state.view})
    }
    render(){
        // let temp = this.props.data
        console.log(this.props.NameCard);
        return(
            
             <ListGroup>
                   
                        <ListGroup.Item>
                        <p className="p-0 m-0">{this.props.NameCard.addRecipeName} 
                        <Badge
                            // variant="info"
                            onClick={this.viewChange}
                          >
                            <GrFormView />
                          </Badge>
                          <Badge
                            // variant="danger"
                            onClick={()=> this.props.clickme2(this.props.NameCard)}
                          >
                           <FiEdit />
                          </Badge>
                          <Badge
                            // variant="danger"
                            onClick={()=> this.AllRecipeDelete()}
                          >
                            <RiDeleteBin5Fill />
                          </Badge>
                        </p>
                        </ListGroup.Item>
                        {this.state.view?<View viewRecipe={this.props.NameCard}></View>:null}
                  </ListGroup>
            
        )
    }
}

export default Card




