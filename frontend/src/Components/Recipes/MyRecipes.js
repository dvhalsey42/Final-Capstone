import { Link } from "react-router-dom";
import Ingredient from "../Ingredients/Ingredient";

const MyRecipes = () => {
  const handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };
  return (
    <div>
      HERE ARE MY RECIPES
      <Ingredient></Ingredient>
      <footer className="text-center pt-5">
        <Link to="/home">Home | </Link>
        <Link to="/login" onClick={handleLogout}>
          Logout
        </Link>
      </footer>
    </div>
  );
};
export default MyRecipes;
