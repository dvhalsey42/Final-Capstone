import { Link, withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import "../Home/Home.css";
import Pantry from "../Pantry/Pantry";
import greenpantry from "../images/greenpantry.png";
import RecipeList from "../Recipes/NewRecipe";
import { Component } from "react";
import { connect } from "react-redux";
import SP from "../images/12.png"
import scallions from "../images/7.png"

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    pantry: state.pantry,
    recipe: state.recipe,
    recipes: state.recipes,
    meal: state.meal,
  };
};



class Home extends Component {
 constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
 }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  footerStyle = {
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



  render() {
  return (
    <div className="row">
      <div className="text-center pt-5">
        <h1>Let's Eat</h1>
        <p>PLAN PREP ENJOY</p>
      </div>
      <div className="home-cards mt-5">
        <h2>Start By Crafting Your Recipe</h2>
      </div>
      <footer className="text-center pt-5" style={this.footerStyle}>
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
};


export default withRouter(connect(mapStateToProps)(Home));
