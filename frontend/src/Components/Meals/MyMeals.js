import { withRouter, Link } from "react-router-dom";
import {
  fetchMeals
} from "../../Redux/actionCreators";
import {

  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardSubtitle,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { connect } from "react-redux";
import { Component } from "react";
import RecipeList from "../Recipes/RecipeList";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import "../Meals/MyMeals.css"
import MealList from "./MealList";

const mapDispatchToProps = (dispatch) => ({
  fetchMeals: () => dispatch(fetchMeals()),
});

class MyMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_id: "", // changed from "meals_id"
      user_id: this.props.user,
      meal_name: "",
      recipes: [],
      meals: [],
      newMeals: [],
      counter: 0,
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

  onCounter = () => {
    this.setState({counter: this.state.counter + 1})
  }

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
    ).then(() => {this.onCounter()});
    this.setState({
      ...this.state,
      newMeals: this.state.newMeals + data,
    })
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
            <Card body className="text-start ">
              <CardTitle tag="h5">Create Your Meal</CardTitle>
              <CardSubtitle className="">What's This Meal Called?</CardSubtitle>
              <Form onSubmit={this.handleCreateMeal}>
                <FormGroup>
                  <Label for="meal_name"></Label>
                  <Input
                    name="meal_name"
                    placeholder="Meal Name"
                    onChange={this.handleInputChange}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <CardTitle tag="h5">Add Recipes</CardTitle>
                  <CardSubtitle className="mb-5">
                    Select Recipes From Your Recipe List To Create This Meal
                  </CardSubtitle>
                  <Label for="recipes">Recipes</Label>
                  <ListGroup>
                    {this.state.mealRecipes &&
                      this.state.mealRecipes.map((recipe) => {
                        return (
                          <ListGroupItem>{recipe.recipe_name}</ListGroupItem>
                        );
                      })}
                  </ListGroup>
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Card>
          </div>
          <div style={{ width: "20rem" }}>
            <Card className="border-dark align-items-center">
              <RecipeList parentCallback={this.handleCallback} />
             
            </Card>
          </div>
          <div style={{ width: "20rem" }}>
            <Card className="border-dark align-items-center">
              <MealList
                key={this.state.counter}
                parentMeals={this.state.meals}
                user={this.props.user}
                parentCallback={this.handleCallback}
                newMeals={this.state.newMeals}
              />
              <Link to="/mymealplans">
                <Button type="submit">Start A Meal Plan</Button>
              </Link>
            </Card>
          </div>
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
export default withRouter(connect(mapDispatchToProps)(MyMeals));
