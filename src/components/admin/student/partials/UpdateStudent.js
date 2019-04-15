import React, { Component } from "react";
// import '../../../style/components/auth/login.css';
import "../../../../style/components/admin/register.css";
import { STUDENTS } from "../../../../service/api";

class UpdateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: null
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!currentUser) {
      this.props.history.push("/login");
    } else if (role === "admins") {
      const path = STUDENTS + "/" + this.props.match.params.id;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  " + localStorage.getItem("token")
        }
      };
      fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => this.setState({ student: data }));
          
        } else {
          // response.text().then(message =>{ alert(message)
          this.props.history.push("/not-found");
        }
          // );
        
      })
    .catch(error => console.log(error));
        // .then(response => response.json())
        // .then(data => {
        //   this.setState({ student: data }, () => {
        //     console.log(this.state.student.UserName);
        //   });
        // });
    } else {
      this.props.history.push("/not-found");
    }
  }

  handleDateChange = event => {
    const target = event.target;
    const name = event.name;
    console.log(event.target.value);
    console.log(event.target.name);
    const parts = event.target.value.split("-");
    var check = new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);
    console.log(check);
    var from = new Date(2004, 0, 1);

    var to = new Date(2013, 0, 1);

    console.log(from);
    console.log(to);
    if (target.value === "") {
      this.setState({
        student: { ...this.state.student, [name]: target.value },
        errorMessage: "",
        disable: true
      });
    } else if (check > from && check < to) {
      console.log("bla");
      this.setState({
        student: { ...this.state.student, [name]: check },
        errorMessage: "",
        disable: false
      });
      console.log(check);
      const dt =
        parseInt(parts[2], 10) +
        "." +
        parseInt(parts[1], 10) +
        "." +
        parseInt(parts[0], 10);
        console.log(dt);
      this.setState({ DateOfBirth: dt });
    } else {
      this.setState({
        student: { ...this.state.student, [name]: target.value },
        errorMessage: "Not valid date",
        disable: true
      });
    }
  };

  handleUserNameChange = event => {
    const target = event.target;
    const name = target.name;
    // console.log(target.value.length);
     console.log(target.value);

    if (target.value === "") {
      this.setState({
        student: { ...this.state.student, [name]: target.value },
        errorMessage: "",
        disable: true
      });
    } else if (target.value.length < 3 || target.value.length > 30) {
      this.setState({
        student: { ...this.state.student, [name]: target.value },
        errorMessage: "Input must be beetween 3 and 30 characters long.",
        disable: true
      });
    } else {
      this.setState({
        errorMessage: "",
        student: { ...this.state.student, [name]: target.value },
        disable: false
      });
    }
    // console.log(this.state.student.UserName);
  };

  handleEmailChange = event => {
    const target = event.target;
    const name = event.target.name;
    // let reg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");

    if (target.value === "") {
      this.setState({
        student: { ...this.state.student, [name]: target.value },
        errorMessage: "",
        disable: true
      });
    } else if (!target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({
        student: { ...this.state.student, [name]: target.value },
        errorMessage: "Email is not valid.",
        disable: true
      });
    } else {
      this.setState({
        errorMessage: "",
        disable: false,
        student: { ...this.state.student, [name]: target.value }
        // UserName: target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        ID: this.state.student.ID,
        UserName: this.state.student.UserName,
        FirstName: this.state.student.FirstName,
        LastName: this.state.student.LastName,
        Email: this.state.student.Email,
        DateOfBirth: this.state.student.DateOfBirth
      })
    };
    console.log(requestOptions);
    fetch(STUDENTS + "/" + this.props.match.params.id, requestOptions)
      .then(response => {
        if (response.ok) {
          this.setState({ errorMessage: "" });
          alert("Successfull student update!");
          this.props.history.push(
            "/admin-students"
          );
        } else {
          response
            .text()
            .then(message => this.setState({ errorMessage: message }));
        }
      })

      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="register-box">
        <h3>Update Student</h3>
        {this.state.student && (
          <form onSubmit={this.handleSubmit}>
            <label>Username</label>
            <br />
            <input
              autoFocus
              className="register-text"
              type="text"
              name="UserName"
              placeholder="Enter username"
              onChange={this.handleUserNameChange}
              value={this.state.student.UserName}
            />
            <br />
            <label>First name</label>
            <br />
            <input
              className="register-text"
              type="text"
              name="FirstName"
              placeholder="Enter first name"
              onChange={this.handleUserNameChange}
              value={this.state.student.FirstName}
            />
            <br />
            <label>Last name</label>
            <br />
            <input
              className="register-text"
              type="text"
              name="LastName"
              placeholder="Enter last name"
              onChange={this.handleUserNameChange}
              value={this.state.student.LastName}
            />
            <br />
            <label>Email</label>
            <br />
            <input
              className="register-text"
              type="email"
              name="Email"
              placeholder="Enter email"
              onChange={this.handleEmailChange}
              value={this.state.student.Email}
            />

            <br />
            {/* <label>Date of Birth</label>
            <br />
            <input
              className="register-text"
              type="date"
              name="DateOfBirth"
              onChange={this.handleDateChange}
              value={this.state.student.DateOfBirth}
            /> */}
            <input
              className="register-submit"
              type="submit"
              value="Update"
              disabled={this.state.disable}
            />
            <input
              className="register-cancel"
              type="button"
              value="Cancel"
              onClick={
                () => this.props.history.push("/admin-students")
                // this.props.history.push(
                //   "/admin-classes/" + this.state.student.ClassID + "/students"
                // )
              }
            />
            <label className="error">{this.state.errorMessage}</label>
          </form>
        )}
      </div>
    );
  }
}

export default UpdateStudent;
