import { Link, withRouter } from "react-router-dom";
import "../Home/Home.css";
import { Component } from "react";
import { connect } from "react-redux";
import scallions from "../images/7.2.png"
import meal from "../images/9.2.png"
import cal from "../images/cal.png"
import { Button } from "reactstrap";
//import Button from "reactstrap"

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
    <div className="row pb-5">
      <div className="text-center pt-5">
        <h1>Let's Eat</h1>
        <p>PLAN PREP ENJOY</p>
        <h2 className="mt-5">Start By Crafting Your Recipe</h2>
        <img
          className="scallion"
          src={scallions}
          alt="SP"
          style={{
            maxWidth: 250,
            maxHeight: 300,
            marginTop: 20,
            marginBottom: 20,
          }}
        />
      </div>
      <Button
       
        style={{
          maxWidth: 250,
          maxHeight: 300,
          marginTop: 20,
          marginBottom: 20,
          background: "#556b30",
          alignItems: "center",
          marginLeft:670
      
        }}
      >
        Start A Recipe
      </Button>
      <div className="text-center pt-5">
        <h2 className="mt-5">Create Meals To Enjoy</h2>
        <img
          className=" text-center meal"
          src={meal}
          alt="meal"
          style={{
            maxWidth: 250,
            maxHeight: 300,
            marginTop: 20,
            marginBottom: 20,
          }}
        />
      </div>
      <Button
        className="text-center"
        style={{
          maxWidth: 250,
          maxHeight: 300,
          
          marginBottom: 20,
          background: "#556b30",
          marginLeft:670
        }}
      >
        Start A Meal
      </Button>
      <div className="text-center pt-5">
        <h2 className="mt-5">Plan Your Meals With Ease</h2>
        <img
          className="scallion"
          src={cal}
          alt="calendar"
          style={{
            maxWidth: 250,
            maxHeight: 300,
            marginTop: 20,
            marginBottom: 20,
          }}
        />
      </div>
      <Button
        className="text-center"
        style={{
          maxWidth: 250,
          maxHeight: 300,
          marginTop: 20,
          marginBottom: 20,
          background: "#556b30",
          marginLeft:670
        }}
      >
        Start A Meal Plan
      </Button>

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
