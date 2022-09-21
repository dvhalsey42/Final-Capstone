import { Link, withRouter } from "react-router-dom";
import "../Home/Home.css";
import { Component } from "react";
import { connect } from "react-redux";
import user2 from "../images/user2.png"
import cal from "../images/cal.png"
import food from "../images/food1.png"
import mealplan from "../images/mealplan1.png"
import mainlogo from "../images/transparentlogo.png"
import {Button} from "reactstrap"


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

  StyledButton = {
    backgroundColor: "#FAC668",
    width: 200,
    height: "3rem",
    border: "none",
    color: "#556b2f",
    textDecoration: "none",
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
    width: "100%",
  };

  render() {
    return (
      <div className="row justify-content-center pb-5">
        <div className="text-center pt-5">
          <img
            className="logo"
            src={mainlogo}
            alt="Lets Eat Logo"
            style={{
              maxWidth: 500,
              maxHeight: 300,
              marginTop: 5,
              marginBottom: -30,
              marginInlineEnd: 20,
            }}
          />
          <p>PLAN PREP ENJOY</p>
          <h2 className="mt-5">Start By Crafting Your Recipe</h2>
          <img
            className=""
            src={user2}
            alt="food"
            style={{
              maxWidth: 800,
              maxHeight: 500,
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </div>

        <Link className="row justify-content-center pb-5" to="/myrecipes">
          <Button style={this.StyledButton}>Start A Recipe</Button>
        </Link>
        <div className="text-center pt-5">
          <h2 className="mt-5"> Create Meals To Enjoy </h2>
          <img
            className=" text-center meal"
            src={food}
            alt="meal"
            style={{
              maxWidth: 800,
              maxHeight: 500,
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </div>
        <Link className="row justify-content-center pb-5" to="/mymeals">
          <Button className="text-center" style={this.StyledButton}>
             Start A Meal 
          </Button>
        </Link>
        <div className="text-center pt-5">
          <h2 className="mt-5">Plan Your Meals With Ease</h2>
          <img
            className="scallion"
            src={mealplan}
            alt="calendar"
            style={{
              maxWidth: 800,
              maxHeight: 500,
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </div>
        <Link className="row justify-content-center pb-5" to="/mymealplans">
          <Button style={this.StyledButton}>Start A Meal Plan</Button>
        </Link>

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
