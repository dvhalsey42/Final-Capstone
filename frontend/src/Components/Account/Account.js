import { Component } from "react";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import "../Account/Account.css";
import pantry from "../images/greenpantry.png"

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user,
     username: this.props.username,
     password: this.props.password,
    };
  }

   StyledButton = {
      backgroundColor: "#FAC668",
      width: 200,
      height: "3rem",
      border: "none",
      color: "#556b2f",
    };


  render() {

    const footerStyle = {
      backgroundColor: "#f0eae1",
      borderTop: "1px solid #E7E7E7",
      textAlign: "center",
      padding: "20px",
      position: "fixed",
      left: "0",
      bottom: "0",
      height: "10px",
      width: "100%",
    };
    return (
      <div>
        <Card
          className="text-center align-items-center mb-5"
          style={{
            width: "25rem", left: 650, top: 100,
            border: "none", backgroundImage: `url(${pantry})`, height:"30rem" }}
        >
          <CardHeader style={{color:"black", fontSize:20}}>Welcome, {this.props.username} !</CardHeader>
          <ListGroup flush>
            <ListGroupItem>Your user ID is {this.props.user}</ListGroupItem>
            <ListGroupItem>
              <Link to="/myrecipes">
                <Button style={this.StyledButton}>Go To Your Recipes</Button>
              </Link>
            </ListGroupItem>
            <ListGroupItem>
              <Link to="/mymeals">
                <Button style={this.StyledButton}>Go To Your Meals</Button>
              </Link>
            </ListGroupItem>
            <ListGroupItem>
              <Link to="/mymealplans">
                <Button style={this.StyledButton}>Go To Your Meal Plans</Button>
              </Link>
            </ListGroupItem>
          </ListGroup>
        </Card>

        <footer className="text-center pt-5 mt-5" style={footerStyle}>
          <Link to="/home" style={{ color: "#556b2f" }}>
            Home |{" "}
          </Link>
          <Link
            to="/login"
            onClick={this.handleLogout}
            style={{ color: "#556b2f" }}
          >
            Logout
          </Link>
        </footer>
      </div>
    );
  }
}
export default withRouter(connect()(Account));
