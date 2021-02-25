import React, { Component } from "react";
import firebase from "../Firebase";
import AllRecipe from "../AllRecipe";
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

class AddRecipe extends Component {
  state = {
    addRecipeName: "",
    addRecipeValue: "",
    dataRecipeChange: [],
    dataAddRecipe: {},
    allRecipe: [],
    eidtRecipe: false,
    editIndex: null,
    editRecipeIndex: null,
    saveRecipeButton: false,
    saveEditRecipeIndex: null,
    id: null,
  };

  componentDidMount = async () => {
    let db = firebase.firestore();

    let res = await db.collection("Recipe").onSnapshot((doc) => {
      let temp = [];
      console.log(res);
      doc.forEach((ele) => {
        console.log(ele.data());
        temp.push({ ...ele.data(), id: ele.id });
      });
      this.setState({ allRecipe: [...temp] });
    });
  };

  viewRecipe = () => {
    console.log("working");
  };
  setInputs = (obj, ind) => {
    console.log(obj);
    this.setState({
      id: obj.id,
      addRecipeName: obj.addRecipeName,
      dataRecipeChange: [...obj.dataRecipeChange],
      eidtRecipe: true,
      editIndex: ind,
    });
  };

  editAddRecipe = async () => {
    // let temp = this.state.allRecipe.slice()
    // temp.splice(this.state.editIndex, 1, {name:this.state.addRecipeName, value: [...this.state.dataRecipeChange]})
    // this.setState({allRecipe: [...temp],eidtRecipe:false,dataRecipeChange:[],addRecipeName:'    '})
    await firebase
      .firestore()
      .collection("Recipe")
      .doc(this.state.id)
      .update({
        addRecipeName: this.state.addRecipeName,
        dataRecipeChange: [...this.state.dataRecipeChange],
      });
    this.setState({
      eidtRecipe: false,
      dataRecipeChange: [],
      addRecipeName: "    ",
    });
  };

  editRecipe = (ele, ind) => {
    // let temp = this.state.dataRecipeChange.slice()
    // temp.splice(ind, 1)
    this.setState({
      addRecipeValue: ele,
      editRecipeIndex: ind,
      saveRecipeButton: true,
    });
    // console.log(addRecipeValue)
  };

  EditSaveRecipe = () => {
    let temp = this.state.dataRecipeChange.slice();
    temp.splice(this.state.editRecipeIndex, 1, this.state.addRecipeValue);

    this.setState({ dataRecipeChange: temp, saveRecipeButton: false });
  };
  addRecipeName = (e) => {
    this.setState({ addRecipeName: e.target.value });
  };

  addRecipeChange = (e) => {
    this.setState({ addRecipeValue: e.target.value });
  };

  addValueRecipe = () => {
    if (this.state.addRecipeValue === "") {
      alert("Please fill Ingerident");
    } else {
      const temp = this.state.dataRecipeChange.slice();
      temp.push(this.state.addRecipeValue);
      this.setState({ dataRecipeChange: temp, addRecipeValue: "" });
    }
    // let temp = this.state.addRecipeValue.slice()
    // temp.push= (this.state.addRecipeValue)

    // this.setState({dataRecipeChange: temp})
  };

  clickMeDelete2 = (ind) => {};

  // studentUpdat = async(id) =>{

  //     await firebase.firestore().collection("Student").doc(this.state.id).update({name:this.state.name,age:this.state.age})
  //         }
  mainAddRecipe = async (id) => {
    console.log(this.state.dataRecipeChange.length);
    if (
      this.state.addRecipeName === "" ||
      this.state.dataRecipeChange.length === 0
    ) {
      alert("please fill");
    } else {
      let res = await firebase.firestore().collection("Recipe").add({
        addRecipeName: this.state.addRecipeName,
        dataRecipeChange: this.state.dataRecipeChange,
      });

      // aise karnekana
      this.setState({
        addRecipeName: "",
        addRecipeValue: "",
        dataRecipeChange: [],
      });
      // console.log(this.state.allRecipe)
    }
  };

  removeRecipe = (ind) => {
    let temp = this.state.dataRecipeChange.slice();

    temp.splice(ind, 1);
    this.setState({ dataRecipeChange: temp });
  };

  mainCancelRecipe = () =>{
      this.setState({addRecipeValue: '', addRecipeName:'', dataRecipeChange: []})
  }
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <h1 className="mt-3 mb-4 text-center">Recipe App</h1>
            </Col>
          </Row>
        </Container>
        <Jumbotron>
          <Container fluid>
            <Row>
              <Col>
                <h3 className="mt-3 mb-4 text-center">Add Recipe</h3>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        value={this.state.addRecipeName}
                        onChange={(e) => this.addRecipeName(e)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Recipe
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        value={this.state.addRecipeValue}
                        onChange={(e) => this.addRecipeChange(e)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      {/* <Button type="submit">Sign in</Button> */}
                      {this.state.saveRecipeButton === true ? (
                        <Button variant="danger" onClick={this.EditSaveRecipe}>
                          Edit save
                        </Button>
                      ) : (
                        <Button onClick={this.addValueRecipe}>Add</Button>
                      )}
                    </Col>
                  </Form.Group>
                </Form>
                <Col className="mb-4 p-0" sm={{ span: 10, offset: 2 }}>
                  <ListGroup>
                    {this.state.dataRecipeChange.map((ele, ind) => {
                      return (
                        <ListGroup.Item>
                          {ele}

                          <Badge
                            // variant="light"
                            onClick={() => this.editRecipe(ele, ind)}
                          >
                            <FiEdit />
                          </Badge>
                          <Badge
                            // variant="danger"
                            onClick={() => this.removeRecipe(ind)}
                          >
                            <RiDeleteBin5Fill></RiDeleteBin5Fill>
                          </Badge>
                        </ListGroup.Item>
                        // <ul>
                        //     <li>{ele}
                        //     <span onClick={()=>this.editRecipe(ele, ind)}>Edit </span>
                        //  <span onClick={()=>this.removeRecipe(ind)}>delete </span></li>
                        // </ul>
                      );
                    })}
                  </ListGroup>
                </Col>
                <Col>
                  {this.state.eidtRecipe === false ? (
                    <Button onClick={this.mainAddRecipe}>Add Recipe</Button>
                  ) : (
                    <Button onClick={this.editAddRecipe}>Edit Recipe</Button>
                  )}

                  {/* ye kya chutiyapa kiya hai bhai button ko props ? bhai aise check karra tha hota karke ok */}
                  <Button
                    className="ml-2"
                    variant="danger"
                    onClick={this.mainCancelRecipe}
                  >
                    Cancel
                  </Button>
                </Col>

               

                
                  {/* <div>
        {this.state.allRecipe.map((ele)=>{
            return(
                <div>
                    <ul>
                        <li>{ele}</li>
                    </ul>
                </div>
            )
        })}
        
    </div> */}
                
              </Col>
              <Col>
                <AllRecipe
                  clickme={(obj, ind) => {
                    this.setInputs(obj, ind);
                  }}
                  clickMeDelete2={(ind) => {
                    this.AllRecipeDelete(ind);
                  }}
                  /* name={this.state.addRecipeName} value={this.state.addRecipeValue} */ 
                  data={
                    this.state.allRecipe
                  }
                ></AllRecipe>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </>
    );
  }
}

export default AddRecipe;
