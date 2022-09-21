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
import "../Recipes/RecipeList.css"





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
      backupRecipe: '',
      selectedIngredient: '',
      instructions_list: '',
      recipe_name: '',
      modal: false,
      modalSecondary: false,
    };
    this.handleCallback = this.handleCallback.bind(this);
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
  };

  handleCallback(ingredientArr) {
    if (this.state.selectedIngredient !== '') {
      var currentRecipe = this.state.selectedRecipe;
      const index = this.state.selectedRecipe.ingredients.findIndex((ing) => ing === this.state.selectedIngredient);
      currentRecipe.ingredients[index] = ingredientArr[0]; 
      this.setState({
        selectedRecipe: currentRecipe
      })
    } else {
      //user wanted to add a new ingredient
      var currentRecipe = this.state.selectedRecipe;
      currentRecipe.ingredients.push(ingredientArr[0]);
      this.setState({
        selectedRecipe: currentRecipe
      })
    }
    this.setState({
      selectedIngredient: ''
    })
    this.toggleSecondary();
  }

  async removeRecipe(recipe) {
    await axios
      .delete(baseUrl + "/myrecipes/" + recipe.recipe_id + "/delete")
      .then(() => {
        this.handleFetchRecipes();
      });
  }

  async submitEditedRecipe(recipe) {
    if (this.state.recipe_name !== '') {
      recipe.recipe_name = this.state.recipe_name;
    }
    
    if (this.state.instructions_list !== '') { 
      recipe.instructions_list = this.state.instructions_list;
    }
    await axios.post(baseUrl + "/myrecipes/" + recipe.recipe_id + "/update", recipe).then(() => {this.handleFetchRecipes()})
    this.setState({
      selectedRecipe: '',
    })
  }

  setSelectedRecipe(recipe) {
    this.setState({
      selectedRecipe: recipe,
      backupRecipe: recipe,
    });
  }
  restoreRecipe() {
    this.setState({
      selectedRecipe: this.state.backupRecipe
    })
  }

  setSelectedIngredient(ingredient) {
    this.setState({
      selectedIngredient: ingredient,
    })
  }

  removeIngredientFromRecipe() {
    var currentRecipe = this.state.selectedRecipe;
    const index = this.state.selectedRecipe.ingredients.findIndex((ing) => ing === this.state.selectedIngredient);
    currentRecipe.ingredients.splice(index, 1);
    this.setState({
      selectedRecipe: currentRecipe
    })
  }

  toggle = () => { this.setState({modal: !this.state.modal}) }

  toggleSecondary = () => { this.setState({modalSecondary: !this.state.modalSecondary})}
  
  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
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
                    <ModalHeader toggle={this.toggle}> 
                        <Input id="recipe_name" name="recipe_name" type="textarea" defaultValue={this.state.selectedRecipe.recipe_name} onChange={this.handleInputChange} style={{height: "calc(1.5em + .75rem + 2px)"}}/>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label for="instructions">Instructions</Label>
                          <Input id="instructions" name="instructions_list" type="textarea" defaultValue={this.state.selectedRecipe.instructions_list} onChange={this.handleInputChange}/>
                        </FormGroup>
                      </Form>
                      {' '}
                      <h5>Ingredients</h5>
                      <ListGroup>
                        {this.state.selectedRecipe.ingredients && (
                          this.state.selectedRecipe.ingredients.map((ingredient) => {
                            return(
                              <ListGroupItem>
                                  <Button id="modalPopover" type="button" onClick={() => {this.setSelectedIngredient(ingredient)}}>
                                    {ingredient.ingredient_name}
                                  </Button>
                                  <UncontrolledPopover flip target="modalPopover" trigger="legacy">
                                    <PopoverHeader>
                                      {this.state.selectedIngredient.ingredient_name}
                                    </PopoverHeader>
                                    <PopoverBody>
                                      <Button color="primary" onClick={() => {this.toggleSecondary(); document.body.click()}}>Replace</Button>
                                      <Button color="danger" onClick={() => {this.removeIngredientFromRecipe()}}>Remove</Button>
                                    </PopoverBody>
                                  </UncontrolledPopover>
                              </ListGroupItem>
                            )
                          })
                        )}
                        <Button color="success" onClick={this.toggleSecondary}>Add</Button>
                      </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={() => {this.toggle(); this.submitEditedRecipe(this.state.selectedRecipe);}}>Submit</Button>
                      <Button color="secondary" onClick={() => {this.toggle(); this.restoreRecipe();}}>Cancel</Button>
                    </ModalFooter>
                  </Modal>

                  <Modal isOpen={this.state.modalSecondary} toggle={this.toggleSecondary}>
                        <ModalHeader trigger={this.toggleSecondary}>Replace {this.state.selectedIngredient.ingredient_name} with ?</ModalHeader>
                        <ModalBody>
                          <IngredientList parentCallback={this.handleCallback}/>
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
