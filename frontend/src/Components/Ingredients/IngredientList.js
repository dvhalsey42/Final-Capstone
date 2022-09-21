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
import { Card, ListGroup, ListGroupItem, Form, Button, Input } from "reactstrap";



const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
});

// MAPPING TO THE ACTION METHODS IN THE REDUX
class IngredientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      recipeIngredients: [],
      selectedIngredient: "",
    };
  }

  newIngredientList = [];

  // SIGNNALS DATA TO RENDER WHEN COMPONENT MOUNTS
  componentDidMount() {
    this.handleFetchIngredients();
  }

  // FETCH INGREDIENTS LOGIC
  handleFetchIngredients = async () => {
    const ingredientsWithToken = await axios.get(baseUrl + "/myingredients");

    await this.props.dispatch(fetchIngredients(ingredientsWithToken.data));

    this.setState({ ingredients: ingredientsWithToken.data });

  };

  handleCallback = (ingredient) => {
    var newIngredientList = [];
    newIngredientList = this.state.recipeIngredients;
    newIngredientList.push(ingredient);
    this.setState({
      ...this.state,
     recipeIngredients: newIngredientList,
    });
    this.props.parentCallback(newIngredientList);
  };

  handleAddIngredientToRecipe = (ingredient) => {
    var newIngredientList = this.state.ingredients;
    newIngredientList.push(ingredient);
    this.setState({
      ...this.state,
      ingredients: newIngredientList,
    });
    this.props.parentCallback(newIngredientList);
  };

  setSelectedIngredient(ingredient) {
    this.setState({
      selectedIngredient: ingredient,
    });
  }

  handleDeleteIngredientFromRecipe = (ingredient) => {
    var newIngredientList = this.state.ingredients;
    newIngredientList.filter(ingredient);
    this.setState({
      ...this.state,
      ingredients: newIngredientList,
    });
    this.props.parentCallback(newIngredientList);
  }

  // ADD INGREDIENT LOGIC
  handleAddIngredient = async (e) => {
    e.preventDefault();
    const data = {
      ingredient_id: "",
      ingredient_name: this.state.ingredient_name,
      category: "",
    };

    await axios.post(
      baseUrl + "/ingredients/create",
      data
    ).then(() => {this.handleFetchIngredients()});

    //await this.props.dispatch(ingredientWithToken(ingredientWithToken));
  };

  // INGREDIENT INPUT
  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // async removeIngredient(ingredient) {
  //   console.log(
  //     "Ingredient: " +  ingredient.ingredient_name + " Removed"
  //   );
  //   await axios
  //     .delete(baseUrl + "/myrecipes/" + ingredient.ingredient_id + "/delete")
  //     .then(() => {
  //       this.handleFetchRecipes();
  //     });
  //   // refetch recipes here for re-render
  //   // this.handleFetchRecipes();
  // }

  render() {

    const StyledButton = {
      backgroundColor: "#FAC668",
      width: 120,
      height: "3rem",
      border: "none",
      color: "#556b2f",
    };
    return (
      <div className="align-items-center">
        <Card
          className="pantry-card"
          style={{
            maxHeight: 400,
            maxWidth: 300,
            overflow: "auto",
          }}
        >
          <h2 className="text-center">Ingredients</h2>
          <ListGroup className="row-cols-lg-auto g-3 mb-5 ">
            {this.state.ingredients.map((ingredient) => {
              return (
                <ListGroupItem>
                  {/* this is where ingredient this is rendered */}

                  <Button style={StyledButton}>
                    {" "}
                    {ingredient.ingredient_name}
                  </Button>
                  <button
                    style={{
                      width: 40,
                      height: 30,
                      background: "#FFFFFF",
                      border: "#FFFFFF",
                    }}
                    onClick={(e) => {
                      this.handleCallback(ingredient);
                    }}
                  >
                    ➕
                  </button>

                  {/* <Button
                    style={{
                      width: 40,
                      height: 30,
                      background: "#FFFFFF",
                      border: "#FFFFFF",
                    }}
                    // onClick={() => {
                    //   this.removeIngredient(ingredient);
                    // }}
                    className="text-center"
                  >
                    ✖️
                  </Button> */}
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <Form onSubmit={this.handleAddIngredient}>
            <Input
              type="text"
              id="ingredient"
              name="ingredient_name"
              className="form-control"
              placeholder="Ingredient"
              v-model="ingredient.ingredient_name"
              onChange={this.handleInputChange}
              required
            />
            <Button type="submit" style={StyledButton} placement="center">Add To List</Button>
          </Form>
        </Card>
      </div>
    );
  }
}
export default withRouter(connect(mapDispatchToProps)(IngredientList));
