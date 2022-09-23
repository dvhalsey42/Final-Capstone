import { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToken } from "../../Redux/actionCreators";
import { List } from "reactstrap";
import "../Non-Protected/LandingPage.css";
import meal3 from "../images/_meallanding.png"
import user from "../images/user1.png"
import mainlogo from "../images/transparentlogo.png"
import Register from "../Register/Register";
import {Button } from "reactstrap"

const mapDispatchToProps = (dispatch) => ({
  addToken: () => {
    dispatch(addToken());
  },
});

const StyledButton = {
  backgroundColor: "#FAC668",
  width: 200,
  height: "3rem",
  border: "none",
  color: "#556b2f",
  textDecoration: "none",
};
class LandingPage extends Component {
  render() {
    return (
      <div>
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
        <h1 className="text-center mt-5 ">Meal Planning Just Got Easier</h1>
        <List type="unstyled" className="text-center pt-5 ml-5 mb-5">
          <h2>Catalogue your favorite recipes</h2>
          <h2>Create quick, easy meal plans</h2>
          <h2>Grocery lists made for you</h2>
        </List>
        <div className="text-center">
          <img
            className="mb-5"
            src={user}
            style={{ maxWidth: 800 }}
            alt="meal"
          ></img>
          <h2 className="mt-5 mb-5">See The Recipes Our Users Are Crafting</h2>
          <img
            className="mb-5"
            src={meal3}
            style={{ maxWidth: 800 }}
            alt="meal"
          ></img>
          <div className="mb-5">
            <Link className="row justify-content-center" to="/viewrecipes">
              <Button className="text-center" style={StyledButton}>
                Take Me To Recipes
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <h2 className=" text-center">Ready To Get Started?</h2>
        </div>
        <Register />
      </div>
    );
  }
}
export default withRouter(connect(mapDispatchToProps)(LandingPage));
