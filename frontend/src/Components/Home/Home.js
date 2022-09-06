import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  CardText,
  Button,
  Col,
  Label,
  FormGroup,
  Input,
  Form,
  Row,
} from "reactstrap";
import "../Home/Home.css";
import Ingredientlist from "../Ingredients/IngredientList";
import greenpantry from "../images/greenpantry.png";
import EditIngredient from "../Ingredients/EditIngredient";
import RecipeList from "../Recipes/RecipeList";
import axios from "axios";
import { Component, useState } from "react";
import { baseUrl } from "../../Shared/baseUrl";
 
const Home = () => {

  
     
    

    const handleLogout = () => {
      this.props.addToken("");
      this.props.deleteUser();
    };

    const handleAddIngredient = async () => {
      const data = {
        ingredient_id: "",
        ingredient_name: this.state.ingredient_name,
        category: "dairy",
      };

      const addIngredient = await axios.post(
        baseUrl + "/ingredients/create",
        data
      );

      await this.props.dispatch(addIngredient(data.ingredient_name));
    };

    const handleInputChange = (event) => {
      event.preventDefault();
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    return (
      <div className="row">
        <div className="text-center pt-5">
          <h1>Let's Eat</h1>
          <p>PLAN PREP ENJOY</p>
        </div>

        <div className="row justify-content-center align-items-center">
          <Card
            className="pantry-card"
            style={{
              backgroundImage: `url(${greenpantry})`,
            }}
          >
            <CardBody className="text-center pt-5 mb-5">
              <CardTitle tag="h5" className="pantry-card-title">
                Start With Staples
              </CardTitle>
              <CardSubtitle className="pantry-card-subtitle" tag="h6">
                What's In Your Pantry?
              </CardSubtitle>
              <CardText>
                staple ingredients you always have in your kitchen
              </CardText>
              <Ingredientlist>
                <ul>
                  <li>Ingredient</li>
                  <li>Ingredient</li>
                  <li>Ingredient</li>
                  <li>Ingredient</li>
                </ul>
              </Ingredientlist>
              <EditIngredient>
                <Form>
                  <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                      <Label className="visually-hidden" for="ingredient">
                        Ingredient
                      </Label>
                      <Input
                        type="text"
                        id="ingredient"
                        name="ingredient_name"
                        class="form-control"
                        placeholder="Ingredient"
                        v-model="ingredient.ingredient_name"
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col>
                      <Button type="submit" onClick={handleAddIngredient}>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </EditIngredient>
            </CardBody>
          </Card>
        </div>
        <div className="row justify-content-center align-items-center">
          <Card
            className="recipe-card"
            style={{
              backgroundImage: `url(${greenpantry})`,
            }}
          >
            <CardBody className="text-center pt-5 mb-5">
              <CardTitle tag="h5" className="pantry-card-title">
                Start With Staples
              </CardTitle>
              <CardSubtitle className="pantry-card-subtitle" tag="h6">
                What's In Your Pantry?
              </CardSubtitle>
              <CardText>
                staple ingredients you always have in your kitchen
              </CardText>
              <Ingredientlist>STUFF HERE</Ingredientlist>
              <EditIngredient>GO HERE</EditIngredient>
            </CardBody>
          </Card>
        </div>

        <footer className="text-center pt-5">
          <Link to="/home">Home | </Link>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </footer>
      </div>
    );
  }


export default Home;
