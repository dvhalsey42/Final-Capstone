import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addToken } from "../../Redux/actionCreators";
import { List } from "reactstrap";
import "../Non-Protected/LandingPage.css";
import mealpic from "../images/8.png";
import Login from "../Login/Login";
import user from "../images/user1.png"
import Register from "../Register/Register";

const mapDispatchToProps = (dispatch) => ({
  addToken: () => {
    dispatch(addToken());
  },
});
class LandingPage extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center mt-5 ">Meal Planning Just Got Easier</h1>
        <List type="unstyled" className="text-center pt-5 ml-5 mb-5">
          <h2>Catalogue your favorite recipes</h2>
          <h2>Create quick, easy meal plans</h2>
          <h2>Grocery lists made for you</h2>
        </List>
        <div className="text-center">
          <img className="mb-5" src={user} style={{maxWidth: 800,}}alt="meal"></img>
        </div>
        <div className="text-center">
          <h2 className=" text-center">GET STARTED</h2>
        </div>
        <Register />
      </div>
    );
  }
}
export default withRouter(connect(mapDispatchToProps)(LandingPage));
