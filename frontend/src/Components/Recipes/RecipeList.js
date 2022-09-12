import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addIngredient,
  addToken,
  fetchIngredients,
  fetchMyRecipes,
} from "../../Redux/actionCreators";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import { Card, ListGroup, ListGroupItem, CloseButton } from "reactstrap";
import NewRecipe from "../Recipes/NewRecipe";

const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
  fetchMyRecipes: () => dispatch(fetchMyRecipes()),
});

// MAPPING TO THE ACTION METHODS IN THE REDUX
class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  // SIGNNALS DATA TO RENDER WHEN COMPONENT MOUNTS
  componentDidMount() {
    this.handleFetchIngredients();
    this.removeIngredient();
  }

  // FETCH INGREDIENTS LOGIC
  handleFetchRecipes = async () => {
    const recipesWithToken = await axios.get(baseUrl + "/myrecipes");

    await this.props.dispatch(fetchMyRecipes(recipesWithToken.data));

    this.setState({ ingredients: recipesWithToken.data });

    console.log(recipesWithToken.data);
  };

  // REMOVE LOGIC- THIS STILL NEEDS AN API CALL ENDPOINT FROM BACK-END
  removeRecipe(recipe_name) {
    this.setState({
      recipes: this.state.recipes.filter(
        (ingredient) => ingredient !== recipe_name,
      ),
    });
  }

  render() {
    return (
      <div className="align-items-center">
        <Card
          className="pantry-card"
          style={{
            width: "15rem",
          }}
        >
          <h2>Ingredients</h2>
          <ListGroup className="row-cols-lg-auto g-3 mb-5 ">
            {this.state.recipes.map((recipe) => {
              return (
                <ListGroupItem>
                  {/* this is where recipe list is rendered */}
                  {recipe.recipe_name}
                  <button
                    onClick={() => {
                      this.removeIngredient(recipe);
                    }}
                  >
                    x
                  </button>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Card>
      </div>
    );
  }
}
export default withRouter(connect(mapDispatchToProps)(RecipeList));
