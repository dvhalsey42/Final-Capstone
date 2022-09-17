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
import MealList from "../Meals/MealList";


class MyMealPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_plan_id: "",
      meal_plan_name: "",
      user_id: this.props.user,
      meals: [],
      mealplan_meals: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleCallback = (childData) => {
    this.setState({meals : childData})
  }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  }

  handleCreateMealPlan = async (e) => {
    e.preventDefault();
    const data = {
      meal_plan_id: 0,
      user_id: this.state.user_id,
      meal_plan_name: this.state.meal_plan_name,
      meals: this.state.meals,
    }

    await axios.post(
      baseUrl + "/mealplan/create",
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
    return (
      <div className="row">
        <div className="mealplan-layout">
          <div className="new-mealplan">
            <Card body className="text-start my-2">
              <CardTitle tag="h5">Create Your Meal Plan</CardTitle>
              <Form onSubmit={this.handleCreateMealPlan}>
                <FormGroup>
                  <Label for="meal_plan_name">Meal Plan Name</Label>
                  <Input 
                    name="meal_plan_name" 
                    placeholder="Meal Plan Name" 
                    onChange={this.handleInputChange}>
                  </Input>
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Card>

            
        
          </div>
          <div style={{width: "20rem",}}>
            <Card className="border-dark align-items-center">
              <MealList user_id = {this.props.user} parentCallback={this.handleCallback} />
              { /*<Form onSubmit={this.handleAddRecipe}>
                Figure out way to allow recipe lookup or recipe addition here
                <Input 
                  type="text"
                  id="meal"
                  name="meal_name"
                  className="form-control"
                  placeholder="Meal"
                  v-model="meal.meal_name"
                  onChange={this.handleInputChange}
                  required
                />
                <Button type="submit">Add to List</Button>
              </Form> </div> */}
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


export default withRouter(connect()(MyMealPlans));

