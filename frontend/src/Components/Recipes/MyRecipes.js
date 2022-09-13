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

const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
  createRecipe: () => dispatch(createRecipe()),
  addIngredientToRecipe: () => dispatch(addIngredientToRecipe()),
});

class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_id: "",
      recipe_name: "",
      instructions_list: "",
      ingredients: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.handleCreateRecipe();
  }


  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  handleAddIngredientToList;

  handleCreateRecipe = async (e) => {
    e.preventDefault();
    const data = {
      recipe_id: "",
      recipe_name: this.state.recipe_name,
      instructions_list: this.state.instructions_list,
      ingredients: this.state.ingredients,
    };

    console.log(data.recipe_name);

    const recipeIngredientWithToken = await axios.post(
      baseUrl + "/recipes/create",
      data
    );

    await this.props.dispatch(
      recipeIngredientWithToken(
        this.data.recipe_name,
        this.data.instructions_list,
        this.data.ingredients
      )
    );
  };

  // INGREDIENT INPUT
  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="row">
        <div className="recipe-layout">
          <div className="new-recipe">
            <Card
              body
              className="text-start my-2"
              style={{
                width: "20rem",
              }}
            >
              <CardTitle tag="h5">Create Your Recipe</CardTitle>
              <Form onSubmit={this.handleCreateRecipe}>
                <FormGroup>
                  <Label for="recipe_name">Recipe Name</Label>
                  <Input
                    name="recipe_name"
                    placeholder="recipe name"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="instructions">Cooking Instructions</Label>
                  <Input
                    id="recipeText"
                    name="instructions_list"
                    type="textarea"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <Label>What Kind of Recipe Is This?</Label>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{" "}
                    <Label check>Main</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{" "}
                    <Label check>Side</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{" "}
                    <Label check>Dessert</Label>
                  </FormGroup>
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Card>
          </div>
          <div
            style={{
              width: "20rem",
            }}
          >
            <Card className="border-dark align-items-center">
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
                <Button type="submit">Add To List</Button>
              </Form>
            </Card>
          </div>
        </div>
        <footer className="text-center pt-5">
          <Link to="/home">Home | </Link>
          <Link to="/login" onClick={this.handleLogout}>
            Logout
          </Link>
        </footer>
      </div>
    );
  }
}
export default withRouter(connect(mapDispatchToProps)(MyRecipes));
