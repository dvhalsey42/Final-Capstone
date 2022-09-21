import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Input,
  Card,
  CardTitle,
  Button,
  CardSubtitle,
 ListGroup,
 ListGroupItem,
} from "reactstrap";
import "../Recipes/MyRecipes.css";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";

import RecipeList from "./RecipeList";

import IngredientList from "../Ingredients/IngredientList";


class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_id: "",
      user_id: this.props.user,
      recipe_name: "",
      instructions_list: "",
      ingredients: [],
      counter: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  onCounter = () => {
    this.setState({counter: this.state.counter + 1})
  }

  handleCreateRecipe = async (e) => {
    e.preventDefault();
    const data = {
      recipe_id: "",
      user_id: this.state.user_id,
      recipe_name: this.state.recipe_name,
      instructions_list: this.state.instructions_list,
      ingredients: this.state.recipeIngredients,
    };

    await axios.post(baseUrl + "/recipes/create", data).then(() => {this.onCounter()});

  };

  handleCallback = (childData) => {
    this.setState({ recipeIngredients: childData });
  };

  handleDeleteRecipe = async () => {
    const data = {
      recipe_id: 0,
    };

    await axios.delete(baseUrl + "/myrecipes/" + data.recipe_id + "/delete");
  };

  // INGREDIENT INPUT
  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const mystyle = {
      color: "rgb(204,85,0)",
      padding: "10px",
      maxWidth: "50%",
      border: "none",
    };

    const footerStyle = {
      backgroundColor: "#f0eae1",
      borderTop: "1px solid #E7E7E7",
      textAlign: "center",
      padding: "20px",
      position: "fixed",
      left: "0",
      bottom: "0",
      height: "60px",
      width: "100%",
    };
    const StyledButton = {
      backgroundColor: "#FAC668",
      width: 200,
      height: "3rem",
      border: "none",
      color: "#556b2f",
    };
    return (
      <div className="">
        <h1 className="text-center mb-5">Craft Your Recipes</h1>
        <h2 className="text-center mb-5">
          🧄 Create & Catalogue Recipes You Love 🍲
        </h2>
        <div className="container">
          <Card
            body
            className=""
            id="newRec"
            style={{
              backgroundColor: "#F6F2F0",
              border: "none",
              maxWidth: "50%",
            }}
          >
            {/* <CardTitle id="h5">Create Your Recipe</CardTitle> */}

            <Form onSubmit={this.handleCreateRecipe} className="">
              <div className="">
                <FormGroup style={{ color: "#92ab75", width: "100%" }}>
                  <CardTitle tag="h5" for="recipe_name">
                    Name Your Recipe
                  </CardTitle>
                  <Input
                    name="recipe_name"
                    placeholder="recipe name"
                    style={{ maxWidth: 400 }}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <CardTitle tag="h5">Add Ingredients</CardTitle>
                  <CardSubtitle className="mb-5">
                    click the ➕ to add ingredients from your ingredient list ➡️
                  </CardSubtitle>
                  <ListGroup>
                    {this.state.recipeIngredients &&
                      this.state.recipeIngredients.map((ingredient) => {
                        return (
                          <ListGroupItem>
                            {ingredient.ingredient_name}
                            <Button
                              style={{
                                width: 40,
                                height: 30,
                                background: "#FFFFFF",
                                border: "#FFFFFF",
                              }}
                              className="text-center"
                            >
                            
                            </Button>
                          </ListGroupItem>
                        );
                      })}
                   
                  </ListGroup>
                </FormGroup>
                <FormGroup style={{ color: "#92ab75" }}>
                  <CardTitle tag="h5" for="instructions">
                    How Do You Prepare It?
                  </CardTitle>
                  <Input
                    className="mb-5"
                    id="recipeText"
                    name="instructions_list"
                    style={{ maxWidth: 400, maxHeight: 600 }}
                    type="textarea"
                    placeholder="cooking instructions"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </div>
              <Button style={StyledButton}>Save My Recipe</Button>
            </Form>
          </Card>

          <IngredientList parentCallback={this.handleCallback} />
        </div>

        <div>
          <Card id="recList" className="align-items-center">
            <RecipeList parentCallback={this.handleCallback} key={this.state.counter}/>
            <Link to="/mymeals" className="mt-5 mb-5">
              <Button style={StyledButton}>Start Creating Meals</Button>
            </Link>
          </Card>
        </div>
        <footer className="text-center pt-5" style={footerStyle}>
          <Link to="/home" style={{ color: "#556b2f" }}>
            Home |{" "}
          </Link>
          <Link
            to="/login"
            onClick={this.handleLogout}
            style={{ color: "#556b2f" }}
          >
            Logout
          </Link>
        </footer>
      </div>
    );
  }
}
export default withRouter(connect()(MyRecipes));
