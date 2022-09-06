import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  CardText,
  Button,
} from "reactstrap";
import "../Home/Home.css";
import Ingredientlist from "../Ingredients/IngredientList";

function Home(props) {
  return (
    <div className="row">
      <h1>Welcome Back, User!</h1>

      <div className="row justify-content-center align-items-center">
        <Card
          style={{
            width: "18rem",
          }}
        >
          <CardBody className="my-creations ">
            <CardTitle tag="h5">My Creations</CardTitle>
          </CardBody>
          <img
            alt="Card cap"
            src="https://picsum.photos/318/180"
            width="100%"
          />
          <CardBody>
            <CardText>Plan Prep Enjoy</CardText>
            <CardLink href="#">Recipes</CardLink>
            <CardLink href="#">Meal Plans</CardLink>
          </CardBody>
        </Card>
        <Card
          style={{
            width: "18rem",
          }}
        >
          <img alt="Sample" src="https://picsum.photos/300/200" />
          <CardBody>
            <CardTitle tag="h5">My Pantry</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              What's In Your Pantry?
            </CardSubtitle>
            <CardText>Staple Ingredients In Every Recipe</CardText>
            <Ingredientlist>
              <ul>
                <li>Ingredient</li>
                <li>Ingredient</li>
                <li>Ingredient</li>
                <li>Ingredient</li>
              </ul>
            </Ingredientlist>
          </CardBody>
        </Card>
      </div>
      <div className="container"></div>
    </div>
  );
}

export default Home;
