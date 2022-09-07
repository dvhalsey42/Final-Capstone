import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  CardText,
} from "reactstrap";
import "../Home/Home.css";
import Pantry from "../Ingredients/Pantry";
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
            <Pantry></Pantry>
            
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
              Your Favorite Recipes
            </CardTitle>
            <CardSubtitle className="pantry-card-subtitle" tag="h6">
              What's on today's menu?
            </CardSubtitle>
            <CardText>check your recipe library</CardText>
            <RecipeList>STUFF HERE</RecipeList>
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
};

export default Home;
