import { Component } from "react";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import "../Account/Account.css";

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
    return (
      <div>
        <Card
          className="text-center"
          style={{
            width: "25rem",
          }}
        >
          <CardHeader>Welcome, {this.props.username} !</CardHeader>
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
      </div>
    );
  }
}
export default withRouter(connect()(Account));
