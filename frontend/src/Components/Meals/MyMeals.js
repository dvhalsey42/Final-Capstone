import { withRouter, Link } from "react-router-dom";
import {
  addIngredient,
  addToken,
  fetchIngredients,
  createMeal
} from "../../Redux/actionCreators";
import { connect } from "react-redux";
import Ingredient from "../Ingredients/Ingredient";
import { Component } from "react";
import NewRecipe from "../Recipes/NewRecipe";

const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
  createMeal: () => dispatch(createMeal())
});

class MyMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals_id: "",
      meal_name: "",
    };
  }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  render() {
    return (
      <div>
        <Ingredient></Ingredient>
       <NewRecipe/>
        <footer className="text-center pt-5">
          <Link to="/home">Home | </Link>
          <Link to="/login" onClick={this.handleLogout}>
            Logout
          </Link>
        </footer>
      </div>
    );
  }
}
export default withRouter(connect(mapDispatchToProps)(MyMeals));
