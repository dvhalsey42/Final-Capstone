import { withRouter, Link } from "react-router-dom";
import {
  addIngredient,
  addToken,
  fetchIngredients,
  createRecipe,
  addIngredientToRecipe,
} from "../../Redux/actionCreators";
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
} from "reactstrap";
import "../Recipes/MyRecipes.css";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import IngredientList from "../Ingredients/IngredientList";
import RecipeList from "./RecipeList";



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

  handleCreateRecipe = async (e) => {
    e.preventDefault();
    const data = {
      recipe_id: "",
      user_id: this.state.user_id,
      recipe_name: this.state.recipe_name,
      instructions_list: this.state.instructions_list,
      ingredients: this.state.ingredients,
    };

    // const recipeIngredientWithToken = 
    await axios.post(
      baseUrl + "/recipes/create",
      data
    );

    // await this.props.dispatch(
    //   recipeIngredientWithToken(
    //     this.data.recipe_name,
    //     this.data.instructions_list,
    //     this.data.ingredients
    //   )
    // );
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
      fontFamily: "cursive"
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
      width: "100%"
    };
    const StyledButton ={
      backgroundColor: "#FAC668",
      width: 200,
      height: "3rem",
      border:"none",
      color: "#556b2f",
        };

    return (
      <div className="row">
        <div className="recipe-layout">
          <div className="new-recipe">
            <Card
              body
              className="text-start my-2"
              id="newRec"
              style={{
                backgroundColor: "f0eae1"
                //width: "20rem",
              }}
            >
              <CardTitle style={mystyle} id="h5">Create Your Recipe</CardTitle>
              <Form  onSubmit={this.handleCreateRecipe}>
                <FormGroup style={{color:"#92ab75"}}>
                  <Label for="recipe_name">Recipe Name</Label>
                  <Input
                    name="recipe_name"
                    placeholder="recipe name"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup style={{color:"#92ab75"}}>
                  <Label for="instructions">Cooking Instructions</Label>
                  <Input
                    id="recipeText"
                    name="instructions_list"
                    type="textarea"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <Label style={{color:"#92ab75"}}>What Kind of Recipe Is This?</Label>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{" "}
                    <Label check style={{color:"#92ab75"}}>Main</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{" "}
                    <Label check style={{color:"#92ab75"}}>Side</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{" "}
                    <Label check style={{color:"#92ab75"}}>Dessert</Label>
                  </FormGroup>
                </FormGroup>
                <Button style={StyledButton}>Submit</Button>
              </Form>
            </Card>
          </div>
          <div
            style={mystyle}
            
          >
            <Card id="ingList" className="border-dark align-items-center">
              <IngredientList />
              <Form onSubmit={this.handleAddIngredient}>
                <Input
                  type="text"
                  id="ingredient"
                  name="ingredient_name"
                  class="form-control"
                  placeholder="Ingredient"
                  v-model="ingredient.ingredient_name"
                  onChange={this.handleInputChange}
                  required
                />
                <Button type="submit" style={StyledButton}>Add To List</Button>
              </Form>
            </Card>
          </div>

          <div style={mystyle}>
            <Card id="recList" className="border-dark align-items-center">
              <RecipeList parentCallback={this.handleCallback} />
              <Form onSubmit={this.handleAddRecipe}>
                { /* Figure out way to allow recipe lookup or recipe addition here*/ }
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
                <Button type="submit" style={StyledButton}>Add to List</Button>
              </Form>
            </Card>
          </div>


        </div>
        <footer className="text-center pt-5" style={footerStyle}>
          <Link to="/home" style={{color:"#556b2f"}}>Home | </Link>
          <Link to="/login" onClick={this.handleLogout}  style={{color:"#556b2f"} }>
            Logout
          </Link>
        </footer>
      </div>
    );
  }
}
export default withRouter(
  connect()(MyRecipes)
);
