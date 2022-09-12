import { withRouter, Link } from "react-router-dom";
import {
  addIngredient,
  addToken,
  fetchIngredients,
} from "../../Redux/actionCreators";
import { connect } from "react-redux";
import Ingredient from "../Ingredients/Ingredient";
import { Component } from "react";
import { Form, FormGroup, Label, Input, Card, CardTitle, Button } from "reactstrap";
import "../Recipes/MyRecipes.css"

const mapDispatchToProps = (dispatch) => ({
  addIngredient: () => dispatch(addIngredient()),
  addToken: () => dispatch(addToken()),
  fetchIngredients: () => dispatch(fetchIngredients()),
});

class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_id: "",
      recipe_name: "",
      instructions_list: "",
    };
  }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  render() {
    return (
      <div className="row">
        <div className="recipe-layout">
          <Ingredient></Ingredient>
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
                    <Input name="radio1" type="radio" />{" "}
                    <Label check>Main</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{" "}
                    <Label check>Side</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{" "}
                    <Label check>Dessert</Label>
                  </FormGroup>
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Card>
          </div>
        </div>
        <footer className="text-center pt-5">
          <Link to="/home">Home | </Link>
          <Link to="/login" onClick={this.handleLogout}>
            Logout
          </Link>
        </footer>
      </div>
    );
  }
}
export default withRouter(connect(mapDispatchToProps)(MyRecipes));
