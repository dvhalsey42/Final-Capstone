import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMealPlans } from "../../Redux/actionCreators";
import { baseUrl } from "../../Shared/baseUrl";
import { Card, ListGroup, ListGroupItem, Button, UncontrolledPopover, PopoverHeader, PopoverBody, ModalHeader, ModalBody, ModalFooter, Modal, Input } from "reactstrap";
import axios from "axios";
import MealList from "../Meals/MealList";

const mapDispatchToProps = (dispatch) => ({
    fetchMealPlans: () => dispatch(fetchMealPlans()),
});

class MealPlanList extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            meal_plans: [],
            mealPlanList: [],
            selectedMealPlan: '',
            selectedRecipe: '',
            user_id: this.props.user,
            modal: '',
            modalSecond: '',
            meal_plan_name: '',
            selectedMeal: '',
            groceryListModal: '',
        };
        this.handleMealCallback = this.handleMealCallback.bind(this);
    }

    planModalToggle = () => {this.setState({modal: !this.state.modal})}
    planModalSecondary = () => {this.setState({modalSecond: !this.state.modalSecond})}
    groceryListToggle = () => {this.setState({groceryListModal: !this.state.groceryListModal})}

    componentDidMount() {
        this.handleFetchMealPlans();
    }

    handleFetchMealPlans = async () => {
        var mealplansUrl = "/mymealplans";
        const mealPlansWithToken = await axios.get(baseUrl + mealplansUrl);

        await this.props.dispatch(fetchMealPlans(mealPlansWithToken.data));

        this.setState({ meal_plans: mealPlansWithToken.data });
    }

    handleCallback = (meal_plan) => {
        var newMealPlanList = this.state.mealPlanList;
        newMealPlanList.push(meal_plan);
        this.setState({
            ...this.state,
            mealPlanList: this.state.newMealPLanList,
        });
        this.props.parentCallback(newMealPlanList);
    }

    handleMealCallback(mealArr) {
      if (this.state.selectedMeal !== '') {        
        var currentPlan = this.state.selectedMealPlan;
        const index = this.state.selectedMealPlan.meals.findIndex((meal) => meal === this.state.selectedMeal);
        currentPlan.meals[index] = mealArr[0];
        this.setState({
          selectedMealPlan: currentPlan
        })
      } else {
        var currentPlan = this.state.selectedMealPlan;
        currentPlan.meals.push(mealArr[0]);
        this.setState({
          selectedMealPlan: currentPlan
        })
      }
      this.setState({
        selectedMeal: '', 
      })
      this.planModalSecondary();
    }

    async removeMealPlan(meal_plan) {
        await axios.delete(baseUrl + "/mymealplan/" + meal_plan.plan_id + "/delete").then(() => {this.handleFetchMealPlans()});
    }

    async submitEditedMealPlan(meal_plan) {
      if (this.state.meal_plan_name !== '') {
        meal_plan.meal_plan_name = this.state.meal_plan_name;
      }

      await axios.post(baseUrl + "/mymealplans/" + meal_plan.plan_id + "/edit", meal_plan).then(() => {this.handleFetchMealPlans()});
      this.setState({
        selectedMealPlan: '',
      })
    }

    removeMealFromMealPlan() {
      var currentPlan = this.state.selectedMealPlan;
      const index = this.state.selectedMealPlan.meals.findIndex((meal) => meal === this.state.selectedMeal);
      currentPlan.meals.splice(index,1);
      this.setState({
        selectedMealPlan: currentPlan
      })
    }

    setSelectedMealPlan(mealPlan) {
        this.setState({
            selectedMealPlan: mealPlan,
        })
    }

    setSelectedRecipe(recipe) {
        this.setState({
            selectedRecipe: recipe,
        })
    }

    setSelectedMeal(meal) {
      this.setState({
        selectedMeal: meal,
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
            width: 200,
            height: "5rem",
            border: "none",
            color: "#556b2f",
          };
        return (
          <div className="align-items-center">
            <Card
              className="meal-plan-card text-center mt-5 mb-5"
              style={{
                maxHeight: 500,
                maxWidth: 500,
                overflow: "auto",
              }}
            >
              <h2>Meal Plans</h2>
              <h4>Grocery List ????</h4>
              <p>click each meal plan to view details</p>
              <p>& grocery list</p>
              <ListGroup className="row-cols-lg-auto g-3 mb-5 ">
                {this.state.meal_plans.map((meal_plan) => {
                  return (
                    <ListGroupItem>
                      {/* this is where ingredient this is rendered */}
                      <Button
                        style={StyledButton}
                        id="MealPlanButton"
                        type="button"
                        onClick={() => {
                          this.setSelectedMealPlan(meal_plan);
                        }}
                      >
                        {meal_plan.meal_plan_name}
                      </Button>
                      <UncontrolledPopover
                        style={{
                          background: "#F6F2F0",
                        }}
                        placement="right"
                        target="MealPlanButton"
                        trigger="legacy"
                      >
                        <PopoverHeader>
                          {this.state.selectedMealPlan.meal_plan_name}
                        </PopoverHeader>
                        <PopoverBody>
                          <div className="fixedDiv">
                            <h5>Meals</h5>
                            <span></span>
                            <Button
                              style={{
                                padding: "5px",
                                backgroundColor: "#556B30",
                              }}
                              onClick={this.groceryListToggle}
                            >
                              Grocery List
                            </Button>
                          </div>
                          {this.state.selectedMealPlan &&
                            this.state.selectedMealPlan.meals.map((meal) => {
                              return (
                                <ListGroup>
                                  <ListGroupItem>
                                    {meal.meal_name}
                                    <h5>Recipes</h5>
                                    {meal.recipes &&
                                      meal.recipes.map((recipe) => {
                                        return (
                                          <ListGroup>
                                            <ListGroupItem>
                                              <Button
                                                id="MealPlanRecipeButton"
                                                type="button"
                                                onClick={() => {
                                                  this.setSelectedRecipe(
                                                    recipe
                                                  );
                                                }}
                                              >
                                                {recipe.recipe_name}
                                              </Button>
                                              <UncontrolledPopover
                                                placement="bottom"
                                                target="MealPlanRecipeButton"
                                                trigger="legacy"
                                              >
                                                <PopoverHeader>
                                                  {
                                                    this.state.selectedRecipe
                                                      .recipe_name
                                                  }
                                                </PopoverHeader>
                                                <PopoverBody>
                                                  <h5>Instructions List</h5>
                                                  {
                                                    this.state.selectedRecipe
                                                      .instructions_list
                                                  }
                                                  <h5>Ingredients</h5>
                                                  {this.state.selectedRecipe
                                                    .ingredients &&
                                                    this.state.selectedRecipe.ingredients.map(
                                                      (ingredient) => {
                                                        return (
                                                          <ListGroup>
                                                            <ListGroupItem>
                                                              {
                                                                ingredient.ingredient_name
                                                              }
                                                            </ListGroupItem>
                                                          </ListGroup>
                                                        );
                                                      }
                                                    )}
                                                </PopoverBody>
                                              </UncontrolledPopover>
                                            </ListGroupItem>
                                          </ListGroup>
                                        );
                                      })}
                                  </ListGroupItem>
                                </ListGroup>
                              );
                            })}
                          <Button
                            style={{
                              width: 40,
                              height: 30,
                              background: "#F6F2F0",
                              border: "#F6F2F0",
                            }}
                            onClick={() => {
                              this.planModalToggle();
                            }}
                          >
                            ??????
                          </Button>
                          <Button
                            style={{
                              width: 40,
                              height: 30,
                              backgroundColor: "#F6F2F0",
                              border: "#F6F2F0",
                            }}
                            onClick={() => {
                              this.removeMealPlan(this.state.selectedMealPlan);
                              document.body.click();
                            }}
                          >
                            ??????
                          </Button>
                        </PopoverBody>
                      </UncontrolledPopover>
                      {/* <button
                        style={{
                          width: 40,
                          height: 30,
                          background: "#FFFFFF",
                          border: "#FFFFFF",
                        }}
                        onClick={() => {
                          this.removeMealPlan(meal_plan);
                        }}
                      >
                        ??????
                      </button> */}
                      {/* <button
                          style={{
                            width: 40,
                            height: 30,
                            background: "#FFFFFF",
                            border: "#FFFFFF",
                          }}
                          onClick={() => {
                            this.handleAddMealPlanToMeal(meal_plan);
                          }}
                        >
                          ???
                        </button> */}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Card>
            <Modal isOpen={this.state.modal} toggle={this.planModalToggle}>
              <ModalHeader toggle={this.planModalToggle}>
                <Input
                  id="meal_plan_name"
                  name="meal_plan_name"
                  type="textarea"
                  defaultValue={this.state.selectedMealPlan.meal_plan_name}
                  onChange={this.handleInputChange}
                  style={{ height: "calc(1.5em + .75rem + 2px)" }}
                />
              </ModalHeader>
              <ModalBody>
                <h5>Meals</h5>
                <ListGroup>
                  {this.state.selectedMealPlan.meals &&
                    this.state.selectedMealPlan.meals.map((meal) => {
                      return (
                        <ListGroupItem>
                          <Button
                            id="mealPlanModalPopover"
                            type="button"
                            onClick={() => {
                              this.setSelectedMeal(meal);
                            }}
                          >
                            {meal.meal_name}
                          </Button>
                          <UncontrolledPopover
                            flip
                            target="mealPlanModalPopover"
                            trigger="legacy"
                          >
                            <PopoverHeader>
                              {this.state.selectedMeal.meal_name}
                            </PopoverHeader>
                            <PopoverBody>
                              <Button
                                style={{
                                  padding: "5px",
                                  backgroundColor: "#556B30",
                                }}
                                onClick={() => {
                                  this.planModalSecondary();
                                  document.body.click();
                                }}
                              >
                                Replace
                              </Button>
                              <Button
                                style={{
                                  padding: "5px",
                                  backgroundColor: "#556B30",
                                }}
                                onClick={() => {
                                  this.removeMealFromMealPlan();
                                }}
                              >
                                Remove
                              </Button>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </ListGroupItem>
                      );
                    })}
                  <Button color="success" onClick={this.planModalSecondary}>
                    Add
                  </Button>
                </ListGroup>
              </ModalBody>
            </Modal>
            <Modal isOpen={this.state.modal} toggle={this.planModalToggle}>
              <ModalHeader toggle={this.planModalToggle}>
                <Input
                  id="meal_plan_name"
                  name="meal_plan_name"
                  type="textarea"
                  defaultValue={this.state.selectedMealPlan.meal_plan_name}
                  onChange={this.handleInputChange}
                  style={{ height: "calc(1.5em + .75rem + 2px)" }}
                />
              </ModalHeader>
              <ModalBody>
                <h5>Meals</h5>
                <ListGroup>
                  {this.state.selectedMealPlan.meals &&
                    this.state.selectedMealPlan.meals.map((meal) => {
                      return (
                        <ListGroupItem>
                          <Button
                            style={{ background: "#556B30" }}
                            id="mealPlanModalPopover"
                            type="button"
                            onClick={() => {
                              this.setSelectedMeal(meal);
                            }}
                          >
                            {meal.meal_name}
                          </Button>
                          <UncontrolledPopover
                            flip
                            target="mealPlanModalPopover"
                            trigger="legacy"
                          >
                            <PopoverHeader>
                              {this.state.selectedMeal.meal_name}
                            </PopoverHeader>
                            <PopoverBody>
                              <Button
                                style={{ background: "#556B30" }}
                                onClick={() => {
                                  this.planModalSecondary();
                                  document.body.click();
                                }}
                              >
                                Replace
                              </Button>
                              <Button
                                style={{ background: "#556B30" }}
                                onClick={() => {
                                  this.removeMealFromMealPlan();
                                }}
                              >
                                Remove
                              </Button>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </ListGroupItem>
                      );
                    })}
                  <Button
                    style={{ background: "#556B30" }}
                    onClick={this.planModalSecondary}
                  >
                    Add
                  </Button>
                </ListGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  style={{ background: "#556B30" }}
                  onClick={() => {
                    this.submitEditedMealPlan(this.state.selectedMealPlan);
                    this.planModalToggle();
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    this.planModalToggle();
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <Modal
              isOpen={this.state.modalSecond}
              toggle={this.planModalSecondary}
            >
              <ModalHeader toggle={this.planModalSecondary}>
                {this.state.selectedMeal.meal_name}
              </ModalHeader>
              <ModalBody>
                <MealList
                  plusButton={true}
                  user={this.props.user}
                  parentCallback={this.handleMealCallback}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.planModalSecondary}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={this.state.groceryListModal}
              toggle={this.groceryListToggle}
            >
              <ModalHeader toggle={this.groceryListToggle}>
                Grocery List for {this.state.selectedMealPlan.meal_plan_name}!
              </ModalHeader>
              <ModalBody>
                {this.state.selectedMealPlan.meals &&
                  this.state.selectedMealPlan.meals.map((meal) => {
                    return (
                      <ListGroup>
                        <ListGroupItem>
                          {meal.meal_name}
                          {meal.recipes &&
                            meal.recipes.map((recipe) => {
                              return (
                                <ListGroup>
                                  <ListGroupItem>
                                    {recipe.recipe_name}
                                    {recipe.ingredients &&
                                      recipe.ingredients.map((ingredient) => {
                                        var checked = false;
                                        return (
                                          <ListGroup>
                                            <ListGroupItem>
                                              {ingredient.ingredient_name}
                                              <Input type="checkbox" />
                                            </ListGroupItem>
                                          </ListGroup>
                                        );
                                      })}
                                  </ListGroupItem>
                                </ListGroup>
                              );
                            })}
                        </ListGroupItem>
                      </ListGroup>
                    );
                  })}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </Modal>
          </div>
        );
    }
}

export default withRouter(connect(mapDispatchToProps)(MealPlanList));