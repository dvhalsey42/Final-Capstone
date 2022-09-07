import { Component, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import { Form, Label, Col, Button, Input, Row } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addIngredient, addToken } from "../../Redux/actionCreators";

const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
});

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

  handleAddIngredient = async () => {
    const data = {
      ingredient_id: "",
      ingredient_name: this.state.ingredient_name,
      category: "",
    };

    console.log(this.data);

    const ingredientWithToken = await axios.post(
      baseUrl + "/ingredients/create",
      data
    );

    await this.props.dispatch(ingredientWithToken(this.data.ingredient_name));
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
        <div className="row justify-content-center align-items-center">
          <div className="content mt-5 justify-content-center align-items-center">
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
                  <Button type="submit" onClick={this.handleAddIngredient}>
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
export default withRouter(connect(mapDispatchToProps)(Ingredient));
