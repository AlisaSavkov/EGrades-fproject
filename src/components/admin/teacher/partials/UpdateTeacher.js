import React, { Component } from "react";
// import '../../../style/components/auth/login.css';
import "../../../../style/components/admin/register.css";
import { TEACHERS } from "../../../../service/api";

class UpdateTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: null,
      disable: false
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!currentUser) {
      this.props.history.push("/login");
    } else if (role === "admins") {
      const path = TEACHERS + "/" + this.props.match.params.id;
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
          response.json().then(data => this.setState({ teacher: data }));
          
        } else {
          // response.text().then(message =>{ alert(message)
          this.props.history.push("/not-found");
        }
          // );
        
      })
    .catch(error => console.log(error));
        // .then(response => response.json())
        // .then(data => {
        //   this.setState({ teacher: data }, () => {
        //     console.log(this.state.teacher.UserName);
        //   });
        // });
    } else {
      this.props.history.push("/not-found");
    }
  }

  handleJMBGChange = event => {
    const target = event.target;
    const name = event.target.name;
    let reg = new RegExp("^[0-9]+$");
    console.log(target.value);

    console.log(target.value.length);
    if (target.value === "") {
      this.setState({
        teacher: { ...this.state.teacher, [name]: target.value },
        errorMessage: "",
        disable: true
      });
    } else if (target.value.length === 13 && reg.test(target.value)) {
      this.setState({
        teacher: { ...this.state.teacher, [name]: target.value },
        errorMessage: "",
        disable: false
      });
    } else {
      this.setState({
        errorMessage: "JMBG is not valid.",
        teacher: { ...this.state.teacher, [name]: target.value },
        disable: true
      });
    }
  };

  handleUserNameChange = event => {
    const target = event.target;
    const name = target.name;
    // console.log(target.value.length);
    // console.log(target.value);
    if (target.value === "") {
      this.setState({
        teacher: { ...this.state.teacher, [name]: target.value },
        errorMessage: "",
        disable: true
      });
    } else if (target.value.length < 3 || target.value.length > 30) {
      this.setState({
        teacher: { ...this.state.teacher, [name]: target.value },
        errorMessage: "Input must be beetween 3 and 30 characters long.",
        disable: true
      });
    } else {
      this.setState({
        errorMessage: "",
        teacher: { ...this.state.teacher, [name]: target.value },
        disable: false
      });
    }
  };

  handleEmailChange = event => {
    const target = event.target;
    const name = event.target.name;
    // let reg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");

    if (target.value === "") {
      this.setState({
        teacher: { ...this.state.teacher, [name]: target.value },
        errorMessage: "",
        disable: true
      });
    } else if (!target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({
        teacher: { ...this.state.teacher, [name]: target.value },
        errorMessage: "Email is not valid.",
        disable: true
      });
    } else {
      this.setState({
        errorMessage: "",
        disable: false,
        teacher: { ...this.state.teacher, [name]: target.value }
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
        ID: this.state.teacher.ID,
        UserName: this.state.teacher.UserName,
        FirstName: this.state.teacher.FirstName,
        LastName: this.state.teacher.LastName,
        Email: this.state.teacher.Email,
        JMBG: this.state.teacher.JMBG
      })
    };
    console.log(requestOptions);
    fetch(TEACHERS + "/update/" + this.props.match.params.id, requestOptions)
      .then(response => {
        if (response.ok) {
          this.setState({ errorMessage: "" });
          alert("Successfull teacher update!");
          this.props.history.push("/admin-teachers");
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
        <h3>Update Teacher</h3>
        {this.state.teacher && (
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
              value={this.state.teacher.UserName}
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
              value={this.state.teacher.FirstName}
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
              value={this.state.teacher.LastName}
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
              value={this.state.teacher.Email}
            />

            <br />
            <label>JMBG</label>
            <br />
            <input
              className="register-text"
              type="text"
              name="JMBG"
              placeholder="Enter JMBG"
              onChange={this.handleJMBGChange}
              value={this.state.teacher.JMBG}
            />
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
              onClick={() => this.props.history.push("/admin-teachers")}
            />
            <label className="error">{this.state.errorMessage}</label>
          </form>
        )}
      </div>
    );
  }
}

export default UpdateTeacher;
