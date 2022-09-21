import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMealPlans } from "../../Redux/actionCreators";
import { baseUrl } from "../../Shared/baseUrl";
import { Card, ListGroup, ListGroupItem, Button, UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import axios from "axios";

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
        };
    }

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
        console.log(this.state);
    }

    async removeMealPlan(meal_plan) {
        console.log(meal_plan);
        await axios.delete(baseUrl + "/mymealplan/" + meal_plan.plan_id + "/delete").then(() => {this.handleFetchMealPlans()});
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
                className="meal-plan-card"
                style={{
                    width: "15rem",
                }}
                >
                <h2>Meal Plans</h2>
                <ListGroup className="row-cols-lg-auto g-3 mb-5 ">
                    {this.state.meal_plans.map((meal_plan) => {
                    return (
                        <ListGroupItem>
                        {/* this is where ingredient this is rendered */}
                        <Button style={StyledButton} id="MealPlanButton" type="button" onClick={() => {this.setSelectedMealPlan(meal_plan)}}>
                            {meal_plan.meal_plan_name}
                        </Button>
                        <UncontrolledPopover placement="right" target="MealPlanButton" trigger="legacy">
                            <PopoverHeader>
                                {this.state.selectedMealPlan.meal_plan_name}
                            </PopoverHeader>
                            <PopoverBody>
                                <h5>Meals</h5>
                                {this.state.selectedMealPlan && (
                                    this.state.selectedMealPlan.meals.map((meal) => {
                                        return (
                                            <ListGroup>
                                                <ListGroupItem>
                                                    {meal.meal_name}
                                                    <h5>Recipes</h5>
                                                    {meal.recipes && (
                                                        meal.recipes.map((recipe) => {
                                                            return (
                                                                <ListGroup>
                                                                    <ListGroupItem>
                                                                        <Button id="MealPlanRecipeButton" type="button" onClick={() => {this.setSelectedRecipe(recipe)}}>
                                                                            {recipe.recipe_name}
                                                                        </Button>
                                                                        <UncontrolledPopover placement="bottom" target="MealPlanRecipeButton" trigger="legacy">
                                                                            <PopoverHeader>
                                                                                {this.state.selectedRecipe.recipe_name}
                                                                            </PopoverHeader>
                                                                            <PopoverBody>
                                                                                <h5>Instructions List</h5>
                                                                                {this.state.selectedRecipe.instructions_list}
                                                                                <h5>Ingredients</h5>
                                                                                {this.state.selectedRecipe.ingredients && (
                                                                                    this.state.selectedRecipe.ingredients.map((ingredient) => {
                                                                                        return(
                                                                                            <ListGroup>
                                                                                                <ListGroupItem>
                                                                                                    {ingredient.ingredient_name}
                                                                                                </ListGroupItem>
                                                                                            </ListGroup>
                                                                                        )
                                                                                    })
                                                                                )}
                                                                            </PopoverBody>
                                                                        </UncontrolledPopover>
                                                                    </ListGroupItem>
                                                                </ListGroup>
                                                            )
                                                        })
                                                    )}
                                                </ListGroupItem>
                                            </ListGroup>
                                        )
                                    })
                                )}
                                <Button onClick={() => {}}>Edit</Button>
                                <Button onClick={() => {this.removeMealPlan(this.state.selectedMealPlan); document.body.click()}}>Delete</Button>
                            </PopoverBody>
                        </UncontrolledPopover>
                        <button
                            onClick={() => {
                            this.removeMealPlan(meal_plan);
                            }}
                        >
                            ✖️
                        </button>
                        <button
                            onClick={() => {
                            this.handleAddMealPlanToMeal(meal_plan);
                            }}
                        >
                            ✖️
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

export default withRouter(connect(mapDispatchToProps)(MealPlanList));