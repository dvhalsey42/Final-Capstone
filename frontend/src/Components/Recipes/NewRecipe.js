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
import {Card, CardTitle, CardText } from "reactstrap"

const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
  createRecipe: () => dispatch(createRecipe()),
});

// NOT IN USE... I ADDED THIS TO MYRECIPES BUT IT MAY STILL NEED TO BE ITS OWN COMPONENT SO HAVENT YET DELETED
class NewRecipe extends Component {
 
render() {
  return (
    <div className="new-recipe">
      <Card
        body
        className="text-start my-2"
        style={{
          width: "20rem",
        }}
      >
        <CardTitle tag="h5">Create Your Recipe</CardTitle>
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
            <Label>What Kind of Recipe Is This?</Label>
            <FormGroup check>
              <Input name="radio1" type="radio" /> <Label check>Main</Label>
            </FormGroup>
            <FormGroup check>
              <Input name="radio1" type="radio" /> <Label check>Side</Label>
            </FormGroup>
            <FormGroup check>
              <Input name="radio1" type="radio" /> <Label check>Dessert</Label>
            </FormGroup>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Card>
    </div>
  );
 }
}
export default withRouter(connect(mapDispatchToProps)(NewRecipe));
