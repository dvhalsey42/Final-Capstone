import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addIngredient,
  addToken,
  fetchIngredients,
  fetchRecipes,
  createRecipe,
} from "../../Redux/actionCreators";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import { Card, ListGroup, ListGroupItem, Button, UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import NewRecipe from "../Recipes/NewRecipe";

const mapDispatchToProps = (dispatch) => ({
  createRecipe: () => dispatch(createRecipe()),
  addToken: () => dispatch(addToken()),
  fetchRecipes: () => dispatch(fetchRecipes()),
});

// MAPPING TO THE ACTION METHODS IN THE REDUX
class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      recipes: [],
      mealRecipes: [],
    };
    this.removeRecipe = this.removeRecipe.bind(this);
  }

  // SIGNNALS DATA TO RENDER WHEN COMPONENT MOUNTS
  componentDidMount() {
    this.handleFetchRecipes();
    this.removeRecipe(); 
  }

  // FETCH INGREDIENTS LOGIC
  handleFetchRecipes = async () => { 
    const recipesWithToken = await axios.get(baseUrl + "/myrecipes");

    await this.props.dispatch(fetchRecipes(recipesWithToken.data));

    this.setState({ recipes: recipesWithToken.data });

    // console.log(recipesWithToken.data);
  };

  handleAddRecipeToMeal = (recipe) => {
    var newRecipeList = this.state.mealRecipes;
    newRecipeList.push(recipe);
    this.setState({
      ...this.state,
      mealRecipes: newRecipeList,
    });
    this.props.parentCallback(newRecipeList);
    console.log(this.state);
  }

  // REMOVE LOGIC- THIS STILL NEEDS AN API CALL ENDPOINT FROM BACK-END
  removeRecipe(recipe_name) {
    this.setState({
      recipes: this.state.recipes.filter(
        (recipe) => recipe !== recipe_name,
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
          <h2>Recipes</h2>
          <ListGroup className="row-cols-lg-auto g-3 mb-5 ">
            {this.state.recipes.map((recipe) => {
              return (
                <ListGroupItem>
                  {/* this is where recipe list is rendered */}
                  
                    {recipe.recipe_name}
                    <button
                      onClick={() => {
                        this.removeRecipe(recipe);
                      }}
                    >
                      x
                    </button>
                    <button
                      onClick={() => {
                        this.handleAddRecipeToMeal(recipe);
                      }}
                    >
                      +
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
