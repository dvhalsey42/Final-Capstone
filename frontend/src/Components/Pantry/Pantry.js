import { useState, Component } from "react";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import { Form, Label, Col, Button, Input, Row } from "reactstrap";
import { addIngredient, addToken, fetchIngredients } from "../../Redux/actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// MAPPING TO THE ACTION METHODS IN THE REDUX
const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
});


class Pantry extends Component {

// ASK ABOUT HOW TO MODEL THE DATA OBJECT FOR JOIN TABLES
  handleAddPantryIngredient = async () => {
    const data = {
      ingredient_id: "",
      ingredient_name: this.state.ingredient_name,
      category: "",
    };

    const addIngredient = await axios.post(
      baseUrl + "/pantry/add",
      data
    );

    await this.props.dispatch(addIngredient(data.ingredient_name));
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
        <button
          className="toggle"
          style={{ backgroundColor: "#F0EAE1", textDecorationColor: "#92AB75" }}
        >
          My Pantry
        </button>
            <button
              className="toggle"
              style={{
                backgroundColor: "#F0EAE1",
                textDecorationColor: "#92AB75",
              }}
            >
              Add More Staples
            </button>
           
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
                      <Button type="submit" onClick={this.handleAddPantryIngredient}>
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
