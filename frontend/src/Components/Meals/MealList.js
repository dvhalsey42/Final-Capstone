import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMeals } from "../../Redux/actionCreators";
import { baseUrl } from "../../Shared/baseUrl";
import { Card, ListGroup, ListGroupItem, CloseButton, Button, UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import axios from "axios";

const mapDispatchToProps = (dispatch) => ({
    fetchMeals: () => dispatch(fetchMeals()),
});

class MealList extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            meals: [], 
            mealList: [],
            user_id: this.props.user,
            selectedMeal: '',
        };
        this.removeMeal = this.removeMeal.bind(this);
    }

    componentDidMount() {
        this.handleFetchMeals();
    }

    handleFetchMeals = async () => {
        var mealsUrl = "/mymeals/get/"+this.state.user_id;
        const mealsWithToken = await axios.get(baseUrl + mealsUrl);

        await this.props.dispatch(fetchMeals(mealsWithToken.data));

        this.setState({ meals: mealsWithToken.data });
    }

    handleCallback = (meal) => {
        var newMealList = this.state.mealList;
        newMealList.push(meal);
        this.setState({
            ...this.state,
            mealList: newMealList,
        });
        this.props.parentCallback(newMealList);
        console.log(this.state);
    }

    async removeMeal(meal) {
        await axios.delete(baseUrl + "/mymeal/" + meal.meal_id + "/delete").then(() => {this.handleFetchMeals()});
    }

    setSelectedMeal(meal) {
        this.setState({
            selectedMeal: meal,
        })
    }

    render() {
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
                            <Button id="MealButton" type="button" onClick={() => {this.setSelectedMeal(meal)}}>
                                {meal.meal_name}
                            </Button>
                            <UncontrolledPopover placement="right" target="MealButton" trigger="legacy">
                                <PopoverHeader>
                                    {this.state.selectedMeal.meal_name}
                                </PopoverHeader>
                                <PopoverBody>
                                    {console.log(this.state.selectedMeal)}
                                    <Button onClick={() => {}}>Edit</Button>
                                    <Button onClick={() => {this.removeMeal(this.state.selectedMeal); document.body.click()}}>Delete</Button>
                                </PopoverBody>
                            </UncontrolledPopover>
                        <button
                            onClick={() => {
                            this.removeMeal(meal);
                            }}
                        >
                            x
                        </button>
                        <button
                            onClick={() => {
                            this.handleAddMealToRecipe(meal);
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

export default withRouter(connect(mapDispatchToProps)(MealList));