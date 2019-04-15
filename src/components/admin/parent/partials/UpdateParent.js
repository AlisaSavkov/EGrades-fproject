import React, { Component } from "react";
// import '../../../style/components/auth/login.css';
import "../../../../style/components/admin/register.css";
import { PARENTS } from "../../../../service/api";

class UpdateParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: null,
      disable: false
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!currentUser) {
      this.props.history.push("/login");
    } else if (role === "admins") {
      const path = PARENTS + "/" + this.props.match.params.id;
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
          response.json().then(data => this.setState({ parent: data }));
          
        } else {
          // response.text().then(message =>{ alert(message)
          this.props.history.push("/not-found");
        }
          // );
        
      })
    .catch(error => console.log(error));
        // .then(response => response.json())
        // .then(data => {
        //   this.setState({ parent: data }, () => {
        //     console.log(this.state.parent.UserName);
        //   });
        // });
    } else {
      this.props.history.push("/not-found");
    }
  }

  handleUserNameChange = event => {
    const target = event.target;
    const name = target.name;
    // console.log(target.value.length);
    // console.log(target.value);

    if (target.value === "") {
      this.setState({
        parent: { ...this.state.parent, [name]: target.value },
        errorMessage: "",
        disable: true
      });
    } else if (target.value.length < 3 || target.value.length > 30) {
      this.setState({
        parent: { ...this.state.parent, [name]: target.value },
        errorMessage: "Input must be beetween 3 and 30 characters long.",
        disable: true
      });
    } else {
      this.setState({
        errorMessage: "",
        parent: { ...this.state.parent, [name]: target.value },
        disable: false
      });
    }
  };

  handleJMBG = event => {
    const target = event.target;
    const name = event.target.name;
    let reg = new RegExp("^[0-9]+$");
    console.log(target.value);

    console.log(target.value.length);
    if (target.value === "") {
      this.setState({
        parent: { ...this.state.parent, [name]: target.value },
        errorMessage: "",
        disable: true
      });
    } else if (target.value.length === 13 && reg.test(target.value)) {
      this.setState({
        parent: { ...this.state.parent, [name]: target.value },
        errorMessage: "",
        disable: false
      });
    } else {
      this.setState({
        errorMessage: "JMBG is not valid.",
        parent: { ...this.state.parent, [name]: target.value },
        disable: true
      });
    }
  };

  handleEmailChange = event => {
    const target = event.target;
    const name = event.target.name;
    // let reg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");

    if (target.value === "") {
      this.setState({
        parent: { ...this.state.parent, [name]: target.value },
        errorMessage: "",
        disable: true
      });
    } else if (!target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({
        parent: { ...this.state.parent, [name]: target.value },
        errorMessage: "Email is not valid.",
        disable: true
      });
    } else {
      this.setState({
        errorMessage: "",
        disable: false,
        parent: { ...this.state.parent, [name]: target.value }
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
        ID: this.state.parent.ID,
        UserName: this.state.parent.UserName,
        FirstName: this.state.parent.FirstName,
        LastName: this.state.parent.LastName,
        Email: this.state.parent.Email,
        JMBG: this.state.parent.JMBG
      })
    };
    console.log(requestOptions);
    fetch(PARENTS + "/" + this.props.match.params.id, requestOptions)
      .then(response => {
        if (response.ok) {
          this.setState({ errorMessage: "" });
          alert("Successfull parent update!");
          this.props.history.push("/admin-parents");
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
        <h3>Update Parent</h3>
        {this.state.parent && (
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
              value={this.state.parent.UserName}
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
              value={this.state.parent.FirstName}
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
              value={this.state.parent.LastName}
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
              value={this.state.parent.Email}
            />

            <br />
            <label>JMBG</label>
            <br />
            <input
              className="register-text"
              type="text"
              name="JMBG"
              onChange={this.handleJMBG}
              value={this.state.parent.JMBG}
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
              onClick={
                () => this.props.history.push("/admin-parents")
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

export default UpdateParent;
