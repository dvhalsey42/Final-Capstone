import { Component, useState } from "react";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import {
  addIngredient,
  addToken,
  createRecipe,
  fetchIngredients,
} from "../../Redux/actionCreators";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
  createRecipe: () => dispatch(createRecipe()),
});
class NewRecipe extends Component {
 
render() {
  return (
    <div className="collapsible">
      <div className="content">
        <div>
          <Form>
            <FormGroup>
              <Label for="recipe-name">Recipe Name</Label>
              <Input placeholder="recipe name" />
            </FormGroup>
            <FormGroup>
              <Label for="instructions">Cooking Instructions</Label>
              <Input id="recipeText" name="text" type="textarea" />
            </FormGroup>
            <FormGroup tag="fieldset">
              <legend>What Kind of Recipe Is This?</legend>
              <FormGroup check>
                <Input name="radio1" type="radio" />{" "}
                <Label check>
                  Main
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input name="radio1" type="radio" />{" "}
                <Label check>
                  Side
                </Label>
              </FormGroup>
              <FormGroup check >
                <Input name="radio1" type="radio" />{" "}
                <Label check>Dessert</Label>
              </FormGroup>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
 }
}
export default withRouter(connect(mapDispatchToProps)(NewRecipe));
