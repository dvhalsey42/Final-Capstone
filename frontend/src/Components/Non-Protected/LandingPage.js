import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addToken } from "../../Redux/actionCreators";
import {List, Button} from "reactstrap";
import "../Non-Protected/LandingPage.css"
import mealpic from "../images/8.png"
import Login from "../Login/Login";


const mapDispatchToProps = (dispatch) => ({
  addToken: () => {
    dispatch(addToken());
  }
});
class LandingPage extends Component {
  render() {
  return (
    <div>
      <h1 className="text-center ">Meal Planning Just Got Easier</h1>
      <List type="unstyled" className="text-center pt-5 ml-5">
        <li>Catalogue your favorite recipes</li>
        <li>Create quick, easy meal plans</li>
        <li>Grocery lists made for you</li>
      </List>
      <div className="text-center">
        <img src={mealpic} alt="meal"></img>
      </div>
      <div className="text-center">
        <h2 className=" text-center">GET STARTED</h2>
      </div>
      <Login />
    </div>
  );
  }
}
export default withRouter(connect(mapDispatchToProps)(LandingPage));
