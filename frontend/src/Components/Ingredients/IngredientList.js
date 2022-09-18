import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addIngredient,
  addToken,
  fetchIngredients,
} from "../../Redux/actionCreators";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import { Card, ListGroup, ListGroupItem, CloseButton } from "reactstrap";


const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
});

// MAPPING TO THE ACTION METHODS IN THE REDUX
class IngredientList extends Component {
  constructor(props) {
    super(props);
    this.state = { ingredients: [] };
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  // SIGNNALS DATA TO RENDER WHEN COMPONENT MOUNTS
  componentDidMount() {
    this.handleFetchIngredients();
    this.removeIngredient();
  }

  // FETCH INGREDIENTS LOGIC
  handleFetchIngredients = async () => {
    const ingredientsWithToken = await axios.get(baseUrl + "/myingredients");

    await this.props.dispatch(fetchIngredients(ingredientsWithToken.data));

    this.setState({ ingredients: ingredientsWithToken.data });

    console.log(ingredientsWithToken.data);
  };

  handleAddIngredientToRecipe = (ingredient) => {
    var newIngredientList = this.state.ingredients;
    newIngredientList.push(ingredient);
    this.setState({
      ...this.state,
      ingredients: newIngredientList,
    });
    this.props.parentCallback(newIngredientList);
    console.log(this.state);
  };

  // REMOVE LOGIC- THIS STILL NEEDS AN API CALL ENDPOINT FROM BACK-END
  removeIngredient(ingredient_name) {
    this.setState({
      ingredients: this.state.ingredients.filter(
        (ingredient) => ingredient !== ingredient_name
      ),
    });
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
          <h2>Ingredients</h2>
          <ListGroup className="row-cols-lg-auto g-3 mb-5 ">
            {this.state.ingredients.map((ingredient) => {
              return (
                <ListGroupItem>
                  {/* this is where ingredient this is rendered */}
                  {ingredient.ingredient_name}
                  <button
                    onClick={() => {
                      this.removeIngredient(ingredient);
                    }}
                  >
                    x
                  </button>
                  <button
                    onClick={() => {
                      this.handleAddIngredientToRecipe(ingredient);
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
export default withRouter(connect(mapDispatchToProps)(IngredientList));
