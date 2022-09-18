import { Link, withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  CardText,
} from "reactstrap";
import "../Home/Home.css";
import Pantry from "../Pantry/Pantry";
import greenpantry from "../images/greenpantry.png";
import RecipeList from "../Recipes/NewRecipe";
import { Component } from "react";
import { connect } from "react-redux";

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

  render() {
  return (
    <div className="row">
      <div className="text-center pt-5">
        <h1>Let's Eat</h1>
        <p>PLAN PREP ENJOY</p>
      </div>
      <div className="home-cards">
        <div className="pantry">
          <Card
            className="pantry-card"
            style={{
              
              width: "30rem",
            }}
          >
            <CardBody className="text-center pt-5 ">
              <CardTitle tag="h5" className="pantry-card-title">
                Start With Staples
              </CardTitle>
              <CardSubtitle className="pantry-card-subtitle" tag="h6">
                What's In Your Pantry?
              </CardSubtitle>
              <CardText>
                staple ingredients you always have in your kitchen
              </CardText>
              <Pantry ></Pantry>
            </CardBody>
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
};


export default withRouter(connect(mapStateToProps)(Home));
