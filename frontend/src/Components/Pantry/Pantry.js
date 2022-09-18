import { useState, Component } from "react";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import { Form, Label, Col, Button, Input, Row } from "reactstrap";
import {
  addIngredient,
  addToken,
  fetchIngredients,
} from "../../Redux/actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import IngredientList from "../Ingredients/IngredientList";

// MAPPING TO THE ACTION METHODS IN THE REDUX
const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
});

class Pantry extends Component {
  constructor(props) {
    super(props);

    this.state = {
     pantry_id: "",
    user_id: this.props.user,
    ingredients: [],
    };
    
  }

 

  // ASK ABOUT HOW TO MODEL THE DATA OBJECT FOR JOIN TABLES
  handleAddPantryIngredient = async () => {
    const data = {
      
      user_id: this.state.user_id,
      ingredients: [],
    };

    const addIngredient = await axios.post(baseUrl + "/pantry/add", data);

    await this.props.dispatch(addIngredient(data.ingredients));
  };

  handleFetchIngredients = async () => {
    const ingredientsWithToken = await axios.get(
      baseUrl + "/pantry/addIngredient/{userId}"
    );

    await this.props.dispatch(fetchIngredients(ingredientsWithToken.data));

    this.setState({ ingredients: ingredientsWithToken.data });

    console.log(ingredientsWithToken.data);
  };

  handleCallback = (childData) => {
    this.setState({ ingredients: childData });
  };

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="mb-3 mx-auto">
          <IngredientList />
          <div className="content">
            <Form>
              <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col>
                  <Label className="visually-hidden" for="ingredient">
                    Ingredient
                  </Label>
                  <Input
                    type="text"
                    id="ingredient"
                    name="ingredient_name"
                    class="form-control"
                    placeholder="Ingredient"
                    v-model="ingredient.ingredient_name"
                    onChange={this.handleInputChange}
                    required
                  />
                </Col>
                <Col>
                  <Button
                    type="submit"
                    onClick={this.handleAddPantryIngredient}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(connect(mapDispatchToProps)(Pantry));
