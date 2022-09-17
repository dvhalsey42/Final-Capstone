import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  CardText,
} from "reactstrap";
import "../Home/Home.css";
import Pantry from "../Pantry/Pantry";
import greenpantry from "../images/greenpantry.png";
import RecipeList from "../Recipes/NewRecipe";


const Home = () => {
  const handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  const footerStyle = {
    backgroundColor: "#f0eae1",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%"
  };

  return (
    <div className="row">
      <div className="text-center pt-5">
        <h1>Let's Eat</h1>
        <p>PLAN PREP ENJOY</p>
      </div>
      <div className="home-cards">
        <div className="pantry">
          <Card
            className="pantry-card"
            style={{
              
              width: "30rem",
            }}
          >
            <CardBody className="text-center pt-5 ">
              <CardTitle tag="h5" className="pantry-card-title">
                Start With Staples
              </CardTitle>
              <CardSubtitle className="pantry-card-subtitle" tag="h6">
                What's In Your Pantry?
              </CardSubtitle>
              <CardText>
                staple ingredients you always have in your kitchen
              </CardText>
              <Pantry></Pantry>
            </CardBody>
          </Card>
        </div>
      </div>

      <footer className="text-center pt-5" style={footerStyle}>
        <Link to="/home" style={{color:"#556b2f"}}>Home | </Link>
        <Link to="/login" onClick={handleLogout} style={{color:"#556b2f"}}>
          Logout
        </Link>
      </footer>
    </div>
  
  );
};

export default Home;
