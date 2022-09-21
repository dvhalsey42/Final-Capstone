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

import { Card, ListGroup, ListGroupItem, Button, UncontrolledPopover, PopoverHeader, PopoverBody, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import IngredientList from "../Ingredients/IngredientList";




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
      selectedRecipe: "",
      selectedIngredient: '',
      modal: false,
      modalSecondary: false,
    };
    this.handleFetchRecipes = this.handleFetchRecipes.bind(this);
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
  };

  async removeRecipe(recipe) {
    await axios
      .delete(baseUrl + "/myrecipes/" + recipe.recipe_id + "/delete")
      .then(() => {
        this.handleFetchRecipes();
      });
  }

  setSelectedRecipe(recipe) {
    this.setState({
      selectedRecipe: recipe,
    });
  }

  setSelectedIngredient(ingredient) {
    console.log(ingredient);
    this.setState({
      selectedIngredient: ingredient,
    })
  }

  removeIngredientFromRecipe(ingredient) {
    console.log(ingredient);
  }

  toggle = () => { this.setState({modal: !this.state.modal}) }

  toggleSecondary = () => { this.setState({modalSecondary: !this.state.modalSecondary})}

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
            maxWidth: "100%",
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
                        onClick={() => {document.body.click(); this.toggle()}}
                      >
                        ✍️
                      </Button>
                      {' '}
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

                  <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}> {this.state.selectedRecipe.recipe_name} </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label for="instructions">Instructions</Label>
                          <Input id="instructions" name="text" type="textarea" defaultValue={this.state.selectedRecipe.instructions_list} />
                        </FormGroup>
                      </Form>
                      {' '}
                      <h5>Ingredients</h5>
                      {this.state.selectedRecipe.ingredients && (
                        this.state.selectedRecipe.ingredients.map((ingredient) => {
                          return(
                            <ListGroup>
                              <ListGroupItem>
                                  <Button id="modalPopover" type="button" onClick={() => {this.setSelectedIngredient(ingredient)}}>
                                    {ingredient.ingredient_name}
                                  </Button>
                                  <UncontrolledPopover flip target="modalPopover" trigger="legacy">
                                    <PopoverHeader>
                                      {this.state.selectedIngredient.ingredient_name}
                                    </PopoverHeader>
                                    <PopoverBody>
                                      <Button color="primary" onClick={this.toggleSecondary}>Replace</Button>
                                      <Button color="danger">Remove</Button>
                                      <Button color="secondary">Cancel</Button>
                                    </PopoverBody>
                                  </UncontrolledPopover>
                              </ListGroupItem>
                            </ListGroup>
                          )
                        })
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>Submit</Button>
                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>

                  <Modal isOpen={this.state.modalSecondary} toggle={this.toggleSecondary}>
                        <ModalHeader trigger={this.toggleSecondary}>Replace {this.state.selectedIngredient.ingredient_name} with ?</ModalHeader>
                        <ModalBody>
                          <IngredientList />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="secondary" onClick={this.toggleSecondary}>Cancel</Button>
                        </ModalFooter>
                  </Modal>

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
