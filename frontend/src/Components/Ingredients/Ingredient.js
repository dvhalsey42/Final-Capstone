import { Component} from "react";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import {
  Form,
  Card,
  Button,
  Input, 
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addIngredient,
  addToken,
  fetchIngredients,
} from "../../Redux/actionCreators";
import IngredientList from "./IngredientList";

// MAPPING TO THE ACTION METHODS IN THE REDUX
const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
});



// PARENT COMPONENT THAT CARRIES OUT BASIC CRUD & RECIEVES INGREDIENTLIST AS CHILD
class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient_id: "",
      ingredient_name: "",
      category: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // FOOTER LOGOUT LOGIX
  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  

  // ADD INGREDIENT LOGIC
  handleAddIngredient = async (e) => {
    e.preventDefault();
    const data = {
      ingredient_id: "",
      ingredient_name: this.state.ingredient_name,
      category: "",
    };

    const ingredientWithToken = await axios.post(
      baseUrl + "/ingredients/create",
      data
    );

    await this.props.dispatch(ingredientWithToken(this.data.ingredient_name));
  };

  // INGREDIENT INPUT
  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };


 

  render() {
    return (
      <div
        style={{
          width: "20rem",
        }}
      >
        <Card className="border-dark align-items-center">
          <IngredientList />
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
            <Button type="submit">Add To List</Button>
          </Form>
        </Card>
      </div>
    );
  }
}
export default withRouter(connect(mapDispatchToProps)(Ingredient));
