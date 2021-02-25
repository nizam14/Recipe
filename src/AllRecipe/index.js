import React, { Component } from "react";
import Card from "../Card";
// import { AllRecipe } from './allRecipe';
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

class AllRecipe extends Component {
  render() {
    // const temp = this.props.name

    return (
      // let temp = this.props.allrecipe;
      <>
      <Container fluid>
          <Row>
            <Col>
            <h3 className="mt-3 mb-4">All recipe</h3>
            {this.props.data.map((ele, ind) => {
            // console.log(this.props.data)
            return (
              <Card
                NameCard={ele}
                clickme2={(obj) => {
                  this.props.clickme(obj, ind);
                }}
              ></Card>
            );
          })}
            </Col>
          </Row>
        </Container>
       
      </>
    );
  }
}

export default AllRecipe;
