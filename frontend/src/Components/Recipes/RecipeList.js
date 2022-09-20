import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
 
  addToken,
  
  fetchRecipes,
  createRecipe,
} from "../../Redux/actionCreators";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";

import { Card, ListGroup, ListGroupItem, Button, UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";




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
      selectedRecipe: '',
    };
    this.removeRecipe = this.removeRecipe.bind(this);
  }

  // SIGNNALS DATA TO RENDER WHEN COMPONENT MOUNTS
  componentDidMount() {
    this.handleFetchRecipes();
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

  
  async removeRecipe(recipe) {
    await axios.delete(baseUrl + "/myrecipes/" + recipe.recipe_id + "/delete").then(() => {this.handleFetchRecipes()});
  }

  setSelectedRecipe(recipe) {
    this.setState({
      selectedRecipe: recipe,
    })
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
          <h2>My Recipes</h2>
          <p>Add Recipes To A Meal By Clicking the 🍽 </p>
          <ListGroup className="row-cols-lg-auto g-3 mb-5 ">
            {this.state.recipes.map((recipe) => {
              return (
                <ListGroupItem>
                  {/* this is where recipe list is rendered */}

                  <Button id="ScheduleUpdateButton" type="button" onClick={() => {this.setSelectedRecipe(recipe)}}>
                    {recipe.recipe_name}  
                  </Button>
                  <UncontrolledPopover placement="right" target="ScheduleUpdateButton" trigger="legacy" >
                    <PopoverHeader>
                      {this.state.selectedRecipe.recipe_name}
                    </PopoverHeader>
                    <PopoverBody>
                      <h5>Instructions</h5>
                      {this.state.selectedRecipe.instructions_list}
                      <h5>Ingredients</h5> 
                      {this.state.selectedRecipe && (
                        this.state.selectedRecipe.ingredients.map((ingredient) => {
                          return (
                            <ListGroup>
                              <ListGroupItem>
                                {ingredient.ingredient_name}
                              </ListGroupItem>
                            </ListGroup>
                          )
                        })
                      )}
                      <Button onClick={() => {}}>Edit</Button>
                      <Button onClick={() => {this.removeRecipe(this.state.selectedRecipe); document.body.click()}}>Delete</Button>
                    </PopoverBody>
                  </UncontrolledPopover>

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
                    🍽
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
