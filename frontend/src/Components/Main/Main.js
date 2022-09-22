import { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";
import { addToken, deleteUser, fetchIngredients,createRecipe, addIngredientToRecipe, addIngredientToPantry, fetchPantryIngredients } from "../../Redux/actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Navbar,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../Main/Main.css";
import MyMealPlans from "../MealPlans/MyMealPlan";
import MyMeals from "../Meals/MyMeals";
import logo from "../images/transparentlogo.png";
import Ingredient from "../Ingredients/Ingredient";
import MyRecipes from "../Recipes/MyRecipes";
import LandingPage from "../Non-Protected/LandingPage";
import Account from "../Account/Account.js"
import ViewRecipes from "../Non-Protected/ViewRecipes";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    pantry: state.pantry,
    recipe: state.recipe,
    recipes: state.recipes,
    meal: state.meal,

  };
};

const mapDispatchToProps = (dispatch) => ({
  addToken: () => {
    dispatch(addToken());
  },
  deleteUser: () => {
    dispatch(deleteUser());
  },
  fetchIngredients: () => { dispatch(fetchIngredients())},
  createRecipe: () => {dispatch(createRecipe())},
  addIngredientToRecipe: () => {dispatch(addIngredientToRecipe())},
  addIngredientToPantry: () => {dispatch(addIngredientToPantry())},
  fetchPantryIngredients: () => {dispatch(fetchPantryIngredients())},
});


class Main extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Navbar className="nav-top" xs={12} sm={3} md={2} lg={1}>
          <Link to="/home" className="logo">
            <img src={logo} alt="logo" width={"300"} height={"240"}></img>
          </Link>

          {this.props.token.token !== undefined ? (
            <div>
              <UncontrolledDropdown className="border dark">
                <DropdownToggle nav caret className="menu">
                  MENU
                </DropdownToggle>
                <DropdownMenu right className="sub-menu">
                  <DropdownItem className="sub-item">
                    <NavItem className="links">
                      <NavLink className="links" tag={Link} to="/myrecipes">
                        Recipes
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem className="sub-item">
                    <NavItem>
                      <NavLink className="links" tag={Link} to="/mymeals">
                        Meals
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem className="sub-item">
                    <NavItem>
                      <NavLink className="links" tag={Link} to="/mymealplans">
                        Meal Plans
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem className="sub-item">
                    <NavItem>
                      <NavLink className="links" tag={Link} to="/myaccount">
                        Account
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem className="sub-item">
                    <NavItem>
                      <NavLink className="links" tag={Link} to="/home">
                        Home
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <Redirect to="/home" />
            </div>
          ) : (
            <footer className="nav-footer">
              <Link to="/login" style={{ color: "#F6F2F0" }}>
                Login{" "}
              </Link>
            </footer>
          )}
        </Navbar>
        {/* below is where you can edit/add the rounting of front-end endpoints to their components */}
        <Switch>
          <Route path="/login" component={() => <Login />} />
          <Route path="/register" component={() => <Register />} />
          <Route path="/welcome" component={() => <LandingPage />} />
          <Route path="/viewrecipes" component={() => <ViewRecipes />} />
          <Route
            path="/home"
            component={
              this.props.token.token !== undefined
                ? () => <Home user={this.props.user.id} />
                : null
            }
          />
          <Route
            path="/myrecipes"
            component={
              this.props.token.token !== undefined
                ? () => <MyRecipes user={this.props.user.id} />
                : null
            }
          />
          <Route
            path="/mymealplans"
            component={
              this.props.token.token !== undefined
                ? () => <MyMealPlans user={this.props.user.id} />
                : null
            }
          />
          <Route
            path="/mymeals"
            component={
              this.props.token.token !== undefined
                ? () => <MyMeals user={this.props.user.id} />
                : null
            }
          />
          <Route
            path="/myingredients"
            component={
              this.props.token.token !== undefined ? () => <Ingredient /> : null
            }
          />
          <Route
            path="/myaccount"
            component={
              this.props.token.token !== undefined
                ? () => (
                    <Account
                      user={this.props.user.id}
                      username={this.props.user.username}
                      password={this.props.user.password}
                    />
                  )
                : null
            }
          />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
