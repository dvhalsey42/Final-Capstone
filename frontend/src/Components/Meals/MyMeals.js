import { withRouter, Link } from "react-router-dom";
import {
  addIngredient,
  addToken,
  fetchIngredients,
  createMeal
} from "../../Redux/actionCreators";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import Ingredient from "../Ingredients/Ingredient";
import { Component } from "react";
import NewRecipe from "../Recipes/NewRecipe";
import RecipeList from "../Recipes/RecipeList";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import "../Meals/MyMeals.css"

class MyMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_id: "", // changed from "meals_id"
      user_id: this.props.user,
      meal_name: "",
      recipes: [],
      mealRecipes: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleCallback = (childData) => {
    this.setState({mealRecipes: childData})
  }

  

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  handleCreateMeal = async (e) => {
    e.preventDefault();
    const data = {
      meal_id: 0,
      user_id: this.state.user_id,
      meal_name: this.state.meal_name,
      recipes: this.state.mealRecipes,
    } 
    // console.log(this.state.mealRecipes);

    await axios.post(
      baseUrl + "/mymeal/create",
      data
    );

  };

 

  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  

  render() {

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
    return (
      <div className="row">
        <div className="meal-layout">
          <div className="new-meal">
            <Card body className="text-start my-2">
              <CardTitle tag="h5">Create Your Meal</CardTitle>
              <Form onSubmit={this.handleCreateMeal}>
                <FormGroup>
                  <Label for="meal_name">Meal Name</Label>
                  <Input 
                    name="meal_name" 
                    placeholder="Meal Name" 
                    onChange={this.handleInputChange}>
                  </Input>
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Card>

            
        
          </div>
          <div style={{width: "20rem",}}>
            <Card className="border-dark align-items-center">
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
                <Button type="submit">Add to List</Button>
              </Form>
            </Card>
          </div>
        </div>
        

        <footer className="text-center pt-5" style={footerStyle}>
          <Link to="/home" style={{color:"#556b2f"}}>Home | </Link>
          <Link to="/login" onClick={this.handleLogout} style={{color:"#556b2f"}}>
            Logout
          </Link>
        </footer>
      </div>
    );
  }
}
export default withRouter(connect()(MyMeals));
