import React, { Component } from "react";
// import '../../../../style/components/auth/login.css';
import "../../../../style/components/admin/subjectUpdate.css";
import { SUBJECTS, UPDATE_SUBJECT } from "../../../../service/api";

class UpdateSubject extends Component {
  constructor(props) {
    super(props);
    this.state = { subject: null, disable: false };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!currentUser) {
      this.props.history.push("/login");
    } else if (role === "admins") {
      const path = SUBJECTS + "/" + this.props.match.params.id;
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
          response.json().then(data => this.setState({ subject: data }));
          
        } else {
          // response.text().then(message =>{ alert(message)
          this.props.history.push("/not-found");
        }
          // );
        
      })
    .catch(error => console.log(error));
        // .then(response => response.json())
        // .then(data => {
        //   this.setState({ subject: data });
        // });
    } else {
      this.props.history.push("/not-found");
    }
  }

  handleYearChange = event => {
    const target = event.target;
    const name = target.name;
    console.log(target.value);
    if (target.value === "" || target.value < 1 || target.value > 8) {
      this.setState({
        errorMessage: "Year must be a number between 1 and 8",
        disable: true,
        subject: { ...this.state.subject, [name]: target.value }
      });
      console.log(this.state.disable);
    } else {
      this.setState({
        errorMessage: "",
        disable: false,
        subject: { ...this.state.subject, [name]: target.value }
      });
    }
  };

  handleNameChange = event => {
    const target = event.target;
    const name = target.name;
    console.log(target.value.length);
    if (
      target.value === "" ||
      target.value.length < 2 ||
      target.value.length > 20
    ) {
      this.setState({
        errorMessage:
          "Subject name must be between 2 and 20 character in length.",
        disable: true,
        subject: { ...this.state.subject, [name]: target.value }
      });
      console.log(this.state.disable);
    } else {
      this.setState({
        errorMessage: "",
        disable: false,
        subject: { ...this.state.subject, [name]: target.value }
      });
    }
  };

  handleHoursChange = event => {
    // const target = event.target;
    const target = event.target;
    const name = target.name;
    console.log(target.value);
    console.log(this.state.subject.Name);

    if (target.value === ""){
      this.setState({
        errorMessage: "",
        disable: true,
        subject: { ...this.state.subject, [name]: target.value }
      })
    } 
    else if(target.value < 1 || target.value > 20) 
     {
      this.setState({
        errorMessage: "Year must be a number between 1 and 20",
        disable: true,
        subject: { ...this.state.subject, [name]: target.value }
      });
      console.log(this.state.disable);
    } else {
      this.setState({
        errorMessage: "",
        disable: false,
        subject: { ...this.state.subject, [name]: target.value }
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
        ID: this.state.subject.ID,
        Name: this.state.subject.Name,
        Year: this.state.subject.Year,
        LessonNumber: this.state.subject.LessonNumber,
        Teachers: this.state.subject.Teachers
      })
    };

    const path = UPDATE_SUBJECT + this.state.subject.ID;
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ errorMessage: "" });
            alert("Subject information successfully updated!");
            this.props.history.push("/admin-subjects");
          });
        } else {
          response.text().then(message => {
            
            this.setState({ errorMessage: message });
          });
          alert(this.state.errorMessage);
        }
      })
      .catch(error => console.log(error));
    event.preventDefault();
  };

  render() {
    return (
      <div className="input-box">
        <h3>Change Subject</h3>
        {this.state.subject && (
          <form onSubmit={this.handleSubmit}>
            <label>Subject Name:</label>
            <br />
            <input
              id="input-text"
              className="input-text"
              type="text"
              name="Name"
              placeholder="Change name"
              value={this.state.subject.Name}
              onChange={this.handleNameChange}
            />
            <br />

            <label>Year:</label>
            <br />
            <input
            required
              className="input-number"
              type="number"
              name="Year"
              placeholder="Enter year"
              value={this.state.subject.Year}
              onChange={this.handleYearChange}
              
            />
            <br />
            <label>Weekly hours:</label>
            <br />
            <input
            reqired
              className="input-number"
              type="number"
              name="LessonNumber"
              placeholder="Enter hours"
              value={this.state.subject.LessonNumber}
              onChange={this.handleHoursChange}
              
            />
            <br />
            <input
              disabled={this.state.disable}
              className="input-submit"
              type="submit"
              value="Change"
            />

            <input
              className="register-cancel"
              type="button"
              value="Cancel"
              onClick={() => this.props.history.push("/admin-subjects")}
            />
            <label className="error">{this.state.errorMessage}</label>
          </form>
        )}
      </div>
    );
  }
}

export default UpdateSubject;
