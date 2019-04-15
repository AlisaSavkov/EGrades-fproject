import React, { Component } from "react";
// import '../../../style/components/auth/login.css';
import "../../../style/components/admin/register.css";
import { ACCOUNTS } from "../../../service/api";

class RegisterAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      errorMessage: "",
      errorMessage1: "",
      disable: true,
      confirmDesable: true,
      JMBG: ""
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!currentUser) {
      this.props.history.push("/login");
    }
    if(!role === "admins"){
        this.props.history.push("/not-found");
    }
  }

  handleJMBGChange = event => {
    const target = event.target;
    const name = event.target.name;
    let reg = new RegExp("^[0-9]+$");
    console.log(reg.test(target.value));
   
    console.log(target.value.length);
    if (target.value === "") {
      this.setState({
        [name]: target.value,
        errorMessage: "",
        disable: true
      });
    }
    else if (target.value.length === 13 && reg.test(target.value)) {
      this.setState({
        [name]: target.value,
        errorMessage: "",
        searchDesable: false
      });
    } else {
      this.setState({
        errorMessage: "JMBG must contain 13 digits.",
        [name]: target.value,
        searchDesable: true
      });
    }
  };

  handleUserNameChange = event => {
    const target = event.target;
    const name = target.name;
    console.log(target.value.length);
    console.log(target.value);
    if (target.value === "") {
      this.setState({
        [name]: event.target.value,
        errorMessage: "",
        disable: true
      });
    }
    else if (target.value.length < 3 || target.value.length > 30) {
      this.setState({
        [name]: event.target.value,
        errorMessage: "Input must be beetween 3 and 30 characters long.",
        disable: true
      });
      console.log(this.state.disable);
    } else {
      this.setState({
        errorMessage: "",
        [name]: event.target.value,
        disable: false
        // UserName: target.value
      });
    }
    console.log(this.state.Username);
  };

  handlePassword = event => {
    const target = event.target;
    const name = target.name;
    console.log(target.value);

    if (target.value.length > 5) {
      this.setState({
        errorMessage: "",
        disable: true,
        confirmDesable: false
      });
      if (
        this.state.ConfirmPassword !== "" &&
        target.value !== this.state.ConfirmPassword
      ) {
        this.setState({
          errorMessage: "Passwords do not match!",
          disable: true
        });
      } else if (
        this.state.ConfirmPassword !== "" &&
        target.value === this.state.ConfirmPassword
      ) {
        this.setState({
          errorMessage: "",
          disable: false,
          [name]: target.value
        });
      } else {
        this.setState({
          errorMessage: "",
          disable: true,
          [name]: target.value
        });
      }
    } else {
      this.setState({
        errorMessage: "Passwords must have at least 6 characters!",
        [name]: target.value,
        disable: true,
        confirmDesable: true
      });
    }
  };

  handleConfirmPassword = event => {
    const target = event.target;
    const name = target.name;

    if (this.state.Password !== target.value) {
      this.setState({ errorMessage: "Passwords do not match!", disable: true });
    } else {
      this.setState({ errorMessage: "", disable: false, [name]: target.value });
    }
  };

  handleEmailChange = event => {
    const target = event.target;
    const name = event.target.name;
    // let reg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
    if (target.value === "") {
      this.setState({
        [name]: event.target.value,
        errorMessage: "",
        disable: true
      });
    } 
    else if (!target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({
        [name]: event.target.value,
        errorMessage: "Email is not valid.",
        disable: true
      });
      console.log(this.state.disable);
    } else {
      this.setState({
        errorMessage: "",
        [name]: event.target.value,
        disable: false
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        UserName: this.state.Username,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Email: this.state.Email,
        JMBG: this.state.JMBG,
        Password: this.state.Password,
        ConfirmPassword: this.state.ConfirmPassword
      })
    };
    console.log(requestOptions);
    fetch(ACCOUNTS + "/register-teacher", requestOptions)
      .then(response => {
        if (response.ok) {
            this.setState({ errorMessage: "" });
            alert("Successfull teacher registration!");
            this.props.history.push("/admin-teachers");
          } else {
            response
              .text()
              .then(message => this.setState({ errorMessage: message }));
          }
      })

      .catch(error => console.log(error));
    event.preventDefault();
  };

  render() {
    return (
      <div className="register-box">
        <h3>Register Teacher</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <br />
          <input
          required
            autoFocus
            className="register-text"
            type="text"
            name="Username"
            placeholder="Enter username"
            onChange={this.handleUserNameChange}
          />
          <br />
          <label>First name</label>
          <br />
          <input
          required
            className="register-text"
            type="text"
            name="FirstName"
            placeholder="Enter first name"
            onChange={this.handleUserNameChange}
          />
          <br />
          <label>Last name</label>
          <br />
          <input
          required
            className="register-text"
            type="text"
            name="LastName"
            placeholder="Enter last name"
            onChange={this.handleUserNameChange}
          />
          <br />
          <label>Email</label>
          <br />
          <input
          required
            className="register-text"
            type="email"
            name="Email"
            placeholder="Enter email"
            onChange={this.handleEmailChange}
          />
          <br />
          <label>Password</label>
          <br />
          <input
          required
            className="register-text"
            type="password"
            name="Password"
            placeholder="Enter password"
            onChange={this.handlePassword}
          />
          <br />
          <label>Confirm password</label>
          <br />
          <input
          required
            className="register-text"
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm password"
            onChange={this.handleConfirmPassword}
            disabled={this.state.confirmDesable}
          />
          <br />
          <br />
          <label>JMBG</label>
          <br />
          <input
          
            className="register-text"
            type="text"
            name="JMBG"
            placeholder="Enter JMBG"
            onChange={this.handleJMBGChange}
          />
          <input
            className="register-submit"
            type="submit"
            value="Register"
            disabled={this.state.disable}
          />
          <input
            className="register-cancel"
            type="button"
            value="Cancel"
            onClick={() => this.props.history.push("/home")}
          />
          <label className="error">{this.state.errorMessage}</label>
        </form>
      </div>
    );
  }
}

export default RegisterAdmin;
