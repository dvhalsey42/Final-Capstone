import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import { Form, Label, Col, Button, Input, Row } from "reactstrap";

export default function Pantry(props) {
  const [viewIsOpen, setViewIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  const handleAddIngredient = async () => {
    const data = {
      ingredient_id: "",
      ingredient_name: this.state.ingredient_name,
      category: "dairy",
    };

    const addIngredient = await axios.post(
      baseUrl + "/ingredients/create",
      data
    );

    await this.props.dispatch(addIngredient(data.ingredient_name));
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div className="mb-3 mx-auto">
        <button
          className="toggle"
          style={{ backgroundColor: "#F0EAE1", textDecorationColor: "#92AB75" }}
          onClick={() => setViewIsOpen(!viewIsOpen)}
        >
          My Pantry
        </button>
        {viewIsOpen && (
          <div className="content">
            <ul>
              <li>Ingredient</li>
              <li>Ingredient</li>
              <li>Ingredient</li>
              <li>Ingredient</li>
            </ul>
            <button
              className="toggle"
              style={{
                backgroundColor: "#F0EAE1",
                textDecorationColor: "#92AB75",
              }}
              onClick={() => setEditIsOpen(!editIsOpen)}
            >
              Add More Staples
            </button>
            {editIsOpen && (
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
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col>
                      <Button type="submit" onClick={handleAddIngredient}>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
