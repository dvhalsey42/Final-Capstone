import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMeals } from "../../Redux/actionCreators";
import { baseUrl } from "../../Shared/baseUrl";
import { Card, ListGroup, ListGroupItem, CloseButton } from "reactstrap";
import axios from "axios";

const mapDispatchToProps = (dispatch) => ({
    fetchMealPlans: () => dispatch(fetchMealPlans()),
});

class MealPlanList extends Component {
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
        this.handleFetchMealPlans();
    }

    handleFetchMealPlanss = async () => {
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
            mealPlanList: newMealPLanList,
        });
        this.props.parentCallback(newMealPlanList);
        console.log(this.state);
    }

    removeMealPlan(meal_plan_name) {
        this.setState({
            meal_plans: this.state.meal_plans.filter(
                (meal_plan) => meal_plan !== meal_plan_name
            )
        });
    }

    render() {
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
                        {meal_plan.meal_plan_name}
                        <button
                            onClick={() => {
                            this.removeMealPlan(meal_plan);
                            }}
                        >
                            x
                        </button>
                        <button
                            onClick={() => {
                            this.handleAddMealPlanToMeal(meal_plan);
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

export default withRouter(connect(mapDispatchToProps)(MealPlanList));