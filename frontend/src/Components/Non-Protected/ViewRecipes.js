import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import RecipeList from "../Recipes/RecipeList";
import Register from "../Register/Register";
import viewphoto from "../images/viewlanding.png"


class ViewRecipes extends Component {

  
  toggle = () => {
    this.setState({ modal: this.state.modal });
  };

  toggleSecondary = () => {
    this.setState({ modalSecondary: this.state.modalSecondary });
  };
  render() {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-center mt-5">
            Our Users Are Crafting Recipes For The Whole Family
          </h2>
          <img
            className="mt-5"
            src={viewphoto}
            style={{ maxWidth: 800 }}
            alt="cooking"
          ></img>
          <div className="recipe-view-table">
            <RecipeList />
          </div>
        </div>

        <div className="view-recipe mb-5">
          <h2 className=" text-center">Ready To Get Started?</h2>
        </div>
        <div className="mb-5">
          <Register />
        </div>
      </div>
    );
  }
}
export default withRouter(connect()(ViewRecipes));