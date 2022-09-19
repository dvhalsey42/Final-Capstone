import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  Button,
  CardSubtitle,
 ListGroup,
 ListGroupItem

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
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // componentDidMount() {
  //   this.handleCreateRecipe();
  // }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  handleAddIngredientToList;

  handleCreateRecipe = async () => {
    const data = {
      recipe_id: "",
      user_id: this.state.user_id,
      recipe_name: this.state.recipe_name,
      instructions_list: this.state.instructions_list,
      ingredients: this.state.recipeIngredients,
    };

    await axios.post(baseUrl + "/recipes/create", data);

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
      width: "20rem",
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
      <div className="row">
        <h1 className="text-center">Craft Your Recipes</h1>
        <div className="recipe-layout">
          <div className="new-recipe">
            <Card
              body
              className="row text-start"
              id="newRec"
              style={{
                backgroundColor: "f0eae1",
                maxWidth: 800,
              }}
            >
              <CardTitle style={{ mystyle }} id="h5">
                Create Your Recipe
              </CardTitle>

              <Form onSubmit={this.handleCreateRecipe} className="">
                <FormGroup style={{ color: "#92ab75", width: "100%" }}>
                  <Label for="recipe_name">Name Your Recipe</Label>
                  <Input
                    name="recipe_name"
                    placeholder="recipe name"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <CardTitle tag="h5">Add Ingredients</CardTitle>
                  <CardSubtitle className="mb-5">
                    Select Ingredients From Your IngredientList
                  </CardSubtitle>
                  <Label for="Instructions">Cooking Instructions</Label>
                  <ListGroup>
                    {this.state.recipeIngredients &&
                      this.state.recipeIngredients.map((ingredient) => {
                        return (
                          <ListGroupItem>
                            {ingredient.ingredient_name}
                          </ListGroupItem>
                        );
                      })}
                  </ListGroup>
                </FormGroup>

                <FormGroup style={{ color: "#92ab75" }}>
                  <Label for="instructions">How Do You Prepare It?</Label>
                  <Input
                    id="recipeText"
                    name="instructions_list"
                    type="textarea"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <Button style={StyledButton}>Submit</Button>
              </Form>
            </Card>
          </div>
        </div>
        <div style={{ mystyle, right: 5, width: 850 }}>
          <IngredientList parentCallback={this.handleCallback} />
        </div>

        <div style={{ mystyle, right: 5, width: 850 }}>
          <Card id="recList" className="align-items-center">
            <RecipeList parentCallback={this.handleCallback} />
            <Form onSubmit={this.handleAddRecipe}>
              <Input
                type="text"
                id="recipe"
                name="recipe_name"
                className="form-control"
                placeholder="Recipe"
                v-model="recipe.recipe_name"
                onChange={this.handleInputChange}
                required
              />
              <Button type="submit" style={StyledButton}>
                Add to List
              </Button>
            </Form>
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
