import { withRouter, Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { connect } from "react-redux"; 

import { Component } from "react";

import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import "../Meals/MyMeals.css";
import MealList from "../Meals/MealList";
import MealPlanList from "./MealPlanList";
import "../MealPlans/MealPlans.css"


class MyMealPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_plan_id: "",
      meal_plan_name: "",
      user_id: this.props.user,
      meals: [],
      mealplan_meals: [],
      counter: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleCallback = (childData) => {
    this.setState({ mealplan_meals: childData });
  };

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  onCounter = () => {
    this.setState({counter: this.state.counter + 1})
  }

  handleCreateMealPlan = async (e) => {
    e.preventDefault();
    const data = {
      meal_plan_id: 0,
      user_id: this.state.user_id,
      meal_plan_name: this.state.meal_plan_name,
      meals: this.state.mealplan_meals,
    };
    console.log(data);
    await axios.post(baseUrl + "/mealplan/create", data).then(() => {this.onCounter()});
  };

  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const StyledButton = {
      backgroundColor: "#FAC668",
      width: 200,
      height: "3rem",
      border: "none",
      color: "#556b2f",
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
    return (
      <div className="row">
        <h1 className="text-center mb-5 mt-5" >Plan The Perfect Meals</h1>
        <h2 className="text-center mb-5">
          🗓 Plan your meals and prep for the week 🍽
        </h2>
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
                    onChange={this.handleInputChange}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="meals">Meals</Label>
                  <ListGroup>
                    {this.state.mealplan_meals &&
                      this.state.mealplan_meals.map((meal) => {
                        return <ListGroupItem>{meal.meal_name}</ListGroupItem>;
                      })}
                  </ListGroup>
                </FormGroup>
                <Button style={StyledButton}>Submit</Button>
              </Form>
            </Card>
          </div>

          <div style={{ width: "20rem" }}>
            <Card className="align-items-center">
              <MealList
                parentMeals={this.state.meals}
                user={this.props.user}
                parentCallback={this.handleCallback}
              />
              <Form>
                <Input
                  type="text"
                  id="meals"
                  name="meal_name"
                  className="form-control"
                  placeholder="Meal"
                  v-model="meal.meal_name"
                  onChange={this.handleInputChange}
                  required
                />
                <Button type="submit" style={StyledButton}>
                  Add to List
                </Button>
              </Form>
            </Card>
          </div>

          <div style={{ width: "20rem" }}>
            <MealPlanList user={this.props.user} key={this.state.counter} />
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
      </div>
    );
  }
}

export default withRouter(connect()(MyMealPlans));
