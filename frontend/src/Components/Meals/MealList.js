import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMeals } from "../../Redux/actionCreators";
import { baseUrl } from "../../Shared/baseUrl";
import { Card, ListGroup, ListGroupItem, Button, UncontrolledPopover, PopoverHeader, PopoverBody, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import axios from "axios";
import RecipeList from "../Recipes/RecipeList";

class MealList extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            meals: [], 
            mealList: [],
            user_id: this.props.user,
            newMeals: [],
            selectedMeal: '',
            selectedRecipe: '',
            meal_name: '',
            backupMeal: '',
            modal: false,
            modalSecondary: false,
        };
        this.handleRecipeCallback = this.handleRecipeCallback.bind(this);
        this.removeMeal = this.removeMeal.bind(this);
    }    

    toggleModal = () => {this.setState({modal: this.state.modal})}
    toggleSecondaryModal = () => {this.setState({modalSecondary: !this.state.modalSecondary})}

    componentDidMount() {
        this.handleFetchMeals();
    }

    handleFetchMeals = async () => {
        var mealsUrl = "/mymeals/get/"+this.state.user_id;
        const mealsWithToken = await axios.get(baseUrl + mealsUrl);

        await this.props.dispatch(fetchMeals(mealsWithToken.data));

        this.setState({ ...this.state, 
            meals: mealsWithToken.data });
    }

    handleCallback = (meal) => {
        var newMealList = [];
        newMealList = this.state.mealList;
        newMealList.push(meal);
        this.setState({
            ...this.state,
            mealList: newMealList,
        });
        this.props.parentCallback(newMealList);
    }

    handleRecipeCallback(recipeArr) {
      if (this.state.selectedRecipe !== '') {
        var currentMeal = this.state.selectedMeal;
        const index = this.state.selectedMeal.recipes.findIndex((recip) => recip === this.state.selectedRecipe);
        currentMeal.recipes[index] = recipeArr[0];
        this.setState({
          selectedMeal: currentMeal,
        })
      } else {
        var currentMeal = this.state.selectedMeal;
        currentMeal.recipes.push(recipeArr[0]);
        this.setState({
          selectedMeal: currentMeal,
        })
      }
      this.setState({
        selectedRecipe: ''
      })
      this.toggleSecondaryModal();
    }

    async removeMeal(meal) {
        await axios.delete(baseUrl + "/mymeal/" + meal.meal_id + "/delete").then(() => {this.handleFetchMeals()});
    }

    async submitEditedMeal(meal) {      
      if (this.state.meal_name !== '') {
        meal.meal_name = this.state.meal_name;
      }

      await axios.post(baseUrl + "/mymeal/" + meal.meal_id + "/edit", meal).then(() => {this.handleFetchMeals()})
      this.setState({
        selectedMeal: '',
      })
    }

    removeRecipeFromMeal() {
      var currentMeal = this.state.selectedMeal;
      const index = this.state.selectedMeal.recipes.findIndex((recip) => recip === this.state.selectedRecipe);
      currentMeal.recipes.splice(index, 1);
      this.setState({
        selectedMeal: currentMeal,
      })
    }

    setSelectedMeal(meal) {
        this.setState({
            selectedMeal: meal,
            backupMeal: meal,
        })
    }

    restoreMeal() {
      this.setState({
        selectedMeal: this.state.backupMeal,
      })
    }

    setSelectedRecipe(recipe) {
      this.setState({
        selectedRecipe: recipe,
      })
    }

    handleInputChange = (event) => {
      event.preventDefault();

      this.setState({
        [event.target.name]: event.target.value,
      })
    }

    render() {

        const StyledButton = {
            backgroundColor: "#FAC668",
            width: 100,
            height: "3rem",
            border: "none",
            color: "#556b2f",
          };

        return (
            <div className="align-items-center">
                <Card
                className="meal-card"
                style={{
                    width: "15rem",
                }}
                >
                <h2>Meals</h2>
                <ListGroup className="row-cols-lg-auto g-3 mb-5 ">
                    {this.state.meals.map((meal) => {
                    return (
                      <ListGroupItem>
                        {/* this is where ingredient this is rendered */}
                        <Button
                          style={StyledButton}
                          id="MealButton"
                          type="button"
                          onClick={() => {
                            this.setSelectedMeal(meal);
                          }}
                        >
                          {meal.meal_name}
                        </Button>
                        <UncontrolledPopover
                          placement="right"
                          target="MealButton"
                          trigger="legacy"
                        >
                          <PopoverHeader>
                            {this.state.selectedMeal.meal_name}
                          </PopoverHeader>
                          <PopoverBody>
                            <h5>Recipes</h5>
                            {this.state.selectedMeal &&
                              this.state.selectedMeal.recipes.map((recipe) => {
                                return (
                                  <ListGroup>
                                    <ListGroupItem>
                                      {recipe.recipe_name}
                                      <p>Instructions List</p>
                                      {recipe.instructions_list}
                                    </ListGroupItem>
                                  </ListGroup>
                                );
                              })}
                            <Button
                              onClick={() => {
                                this.toggleModal();
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => {
                                this.removeMeal(this.state.selectedMeal);
                                document.body.click();
                              }}
                            >
                              Delete
                            </Button>
                          </PopoverBody>
                        </UncontrolledPopover>
                         {this.props.plusButton === true && 
                        <button
                          style={{
                            width: 40,
                            height: 30,
                            background: "#FFFFFF",
                            border: "#FFFFFF",
                          }}
                          onClick={() => {
                            // this.handleAddMealToRecipe(meal);
                            this.handleCallback(meal);
                          }}
                        >
                          ➕
                        </button>}
                        <button
                          style={{
                            width: 40,
                            height: 30,
                            background: "#FFFFFF",
                            border: "#FFFFFF",
                          }}
                          onClick={() => {
                            this.removeMeal(meal);
                          }}
                        >
                          ✖️
                        </button>
                      </ListGroupItem>
                    );
                    })}
                </ListGroup>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>
                    <Input id="meal_name" name="meal_name" type="textarea" defaultValue={this.state.selectedMeal.meal_name} onChange={this.handleInputChange} style={{height: "calc(1.5em + .75rem + 2px)"}} />
                  </ModalHeader>
                  <ModalBody>
                    <h5>Recipes</h5>
                    <ListGroup>
                    {this.state.selectedMeal.recipes && (
                      this.state.selectedMeal.recipes.map((recipe) => {
                        return (
                          <ListGroupItem>
                            <Button id="recipePopover" type="button" onClick={() => {this.setSelectedRecipe(recipe)}}>
                              {recipe.recipe_name}
                            </Button>
                            <UncontrolledPopover flip target="recipePopover" trigger="legacy">
                              <PopoverHeader>
                                  {this.state.selectedRecipe.recipe_name}
                              </PopoverHeader>
                              <PopoverBody>
                                <Button color="primary" onClick={() => {this.toggleSecondaryModal();}}>Replace</Button>
                                <Button color="danger" onClick={() => {this.removeRecipeFromMeal();}}>Remove</Button>
                              </PopoverBody>
                            </UncontrolledPopover>
                          </ListGroupItem>
                        )
                      })
                    )}
                    <Button color="success" onClick={this.toggleSecondaryModal}>Add</Button>
                    </ListGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={() => {this.submitEditedMeal(this.state.selectedMeal); this.toggleModal();  }}>Submit</Button>
                    <Button color="secondary" onClick={() => {this.toggleModal(); this.restoreMeal();}}>Cancel</Button>
                  </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalSecondary} toggle={this.toggleSecondaryModal}>
                  <ModalHeader trigger={this.toggleSecondaryModal}>
                      Replace {this.state.selectedRecipe.recipe_name} with ?
                  </ModalHeader>
                  <ModalBody>
                      <RecipeList parentCallback={this.handleRecipeCallback} />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={() => {this.toggleSecondaryModal();}}>Cancel</Button>
                  </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default withRouter(connect()(MealList));