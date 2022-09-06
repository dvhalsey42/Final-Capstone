import { Link } from "react-router-dom";

const MyRecipes = () => {
  const handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };
  return (
    <div>
      HERE ARE MY RECIPES
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
