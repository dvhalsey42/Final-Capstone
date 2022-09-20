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

  componentDidUpdate() {
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

   StyledButton = {
      backgroundColor: "#FAC668",
      width: 200,
      height: "3rem",
      border: "none",
      color: "#556b2f",
    };


  render() {
    return (
      <div className="align-items-center mt-5">
        <Card
          style={{
            maxWidth: "100%"
          }}
        >
          <h2>My Recipes</h2>
          <p>click each recipe to view, edit, or delete</p>
          <ListGroup className=" ">
            {this.state.recipes.map((recipe) => {
              return (
                <ListGroupItem>
                  {/* this is where recipe list is rendered */}

                  <Button
                    style={this.StyledButton}
                    id="ScheduleUpdateButton"
                    type="button"
                    onClick={() => {
                      this.setSelectedRecipe(recipe);
                    }}
                  >
                    {recipe.recipe_name}
                  </Button>
                  <UncontrolledPopover
                    placement="right"
                    target="ScheduleUpdateButton"
                    trigger="legacy"
                    style={{ width: 200, background: "#F6F2F0" }}
                  >
                    <PopoverHeader>
                      {this.state.selectedRecipe.recipe_name}
                    </PopoverHeader>
                    <PopoverBody>
                      <h5>Instructions</h5>
                      {this.state.selectedRecipe.instructions_list}
                      <h5>Ingredients</h5>
                      {this.state.selectedRecipe &&
                        this.state.selectedRecipe.ingredients.map(
                          (ingredient) => {
                            return (
                              <ListGroup>
                                <ListGroupItem>
                                  {ingredient.ingredient_name}
                                </ListGroupItem>
                              </ListGroup>
                            );
                          }
                        )}
                      <Button
                        style={{
                          width: 40,
                          height: 30,
                          background: "#F6F2F0",
                          border: "#F6F2F0",
                        }}
                        onClick={() => {}}
                      >
                        ✍️
                      </Button>
                      <Button
                        style={{
                          width: 40,
                          height: 30,
                          background: "#F6F2F0",
                          border: "#F6F2F0",
                        }}
                        onClick={() => {
                          this.removeRecipe(this.state.selectedRecipe);
                          document.body.click();
                        }}
                      >
                        ✖️
                      </Button>
                    </PopoverBody>
                  </UncontrolledPopover>

                  <button
                    onClick={() => {
                      this.removeRecipe(recipe);
                    }}
                    style={{
                      width: 40,
                      height: 30,
                      background: "#FFFFFF",
                      border: "#FFFFFF",
                    }}
                  >
                    ✖️
                  </button>
                  <button
                    onClick={() => {
                      this.handleAddRecipeToMeal(recipe);
                    }}
                    style={{
                      width: 40,
                      height: 30,
                      background: "#FFFFFF",
                      border: "#FFFFFF",
                    }}
                  >
                    ➕
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
