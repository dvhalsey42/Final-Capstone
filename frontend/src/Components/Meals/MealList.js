import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMeals } from "../../Redux/actionCreators";
import { baseUrl } from "../../Shared/baseUrl";
import { Card, ListGroup, ListGroupItem, CloseButton } from "reactstrap";
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

    removeMeal(meal_name) {
        this.setState({
            meals: this.state.meals.filter(
                (meal) => meal !== meal_name
            )
        });
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
                        {meal.meal_name}
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