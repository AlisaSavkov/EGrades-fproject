import React, { Component } from "react";
// import '../../../style/components/auth/login.css';
import "../../../../style/components/admin/register.css";
import { ADMINS } from "../../../../service/api";

class UpdateAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: null,
      disable: false,
      errorMessage:''
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!currentUser) {
      this.props.history.push("/login");
    } else if (role === "admins") {
      const path = ADMINS + "/" + this.props.match.params.id;
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
            response.json().then(data => this.setState({ admin: data }));
            
          } else {
            // response.text().then(message =>{ alert(message)
            this.props.history.push("/not-found");
          }
            // );
          
        })
      .catch(error => console.log(error));
        //   response.json())
        // .then(data => {
        //   this.setState({ admin: data }, () => {
        //     console.log(this.state.admin.UserName);
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
        admin: { ...this.state.admin, [name]: target.value },
        errorMessage: "Input must be beetween 3 and 30 characters long.",
        disable: true
      });
    } else if (target.value.length < 3 || target.value.length > 30) {
      this.setState({
        admin: { ...this.state.admin, [name]: target.value },
        errorMessage: "Input must be beetween 3 and 30 characters long.",
        disable: true
      });
    } else {
      this.setState({
        errorMessage: "",
        admin: { ...this.state.admin, [name]: target.value },
        disable: false
      });
    }
  };

  handleShortNameChange = event => {
    const target = event.target;
    const name = target.name;
    // console.log(target.value.length);
    // console.log(target.value);

    if (target.value === "") {
      this.setState({
        admin: { ...this.state.admin, [name]: target.value },
        errorMessage: "Input must be beetween 2 and 10 characters long.",
        disable: true
      });
    } else if (target.value.length < 2 || target.value.length > 10) {
      this.setState({
        admin: { ...this.state.admin, [name]: target.value },
        errorMessage: "Input must be beetween 2 and 10 characters long.",
        disable: true
      });
    } else {
      this.setState({
        errorMessage: "",
        admin: { ...this.state.admin, [name]: target.value },
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
        admin: { ...this.state.admin, [name]: target.value },
        errorMessage: "",
        disable: true
      });
    } else if (!target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({
        admin: { ...this.state.admin, [name]: target.value },
        errorMessage: "Email is not valid.",
        disable: true
      });
    } else {
      this.setState({
        errorMessage: "",
        disable: false,
        admin: { ...this.state.admin, [name]: target.value }
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
        ID: this.state.admin.ID,
        UserName: this.state.admin.UserName,
        ShortName: this.state.admin.ShortName,
        FirstName: this.state.admin.FirstName,
        LastName: this.state.admin.LastName,
        Email: this.state.admin.Email
        
      })
    };
    console.log(requestOptions);
    fetch(ADMINS + "/" + this.props.match.params.id, requestOptions)
      .then(response => {
        if (response.ok) {
          this.setState({ errorMessage: "" });
          alert("Successfull admin update!");
          this.props.history.push("/admin-admins");
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
        <h3>Update Admin</h3>
        {this.state.admin && (
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
              value={this.state.admin.UserName}
            />
            <br />
            <label>Short name</label>
            <br />
            <input
              autoFocus
              className="register-text"
              type="text"
              name="ShortName"
              placeholder="Enter short name"
              onChange={this.handleShortNameChange}
              value={this.state.admin.ShortName}
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
              value={this.state.admin.FirstName}
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
              value={this.state.admin.LastName}
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
              value={this.state.admin.Email}
            />

           <br/>
           <br/>
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
                () => this.props.history.push("/admin-admins")
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

export default UpdateAdmin;
