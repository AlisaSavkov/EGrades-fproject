import React, { Component } from "react";
import "../../../style/components/auth/login.css";
import { GRADES } from "../../../service/api";

class TeacherAddGrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GradeValue: "",
      errorMessage: "",
      teacherId: localStorage.getItem("id")
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    console.log(currentUser);
    if (!currentUser) {
      this.props.history.push("/login");
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  };

  handleSubmit = event => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        GradeValue: this.state.Grade
      })
    };

    fetch(GRADES, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ errorMessage: "" });
            this.props.history.push(
              "/grades-student/" +
                this.state.grade.StudentId +
                "/subject/" +
                this.state.grade.SubjectID
            );
          });
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
      <form onSubmit={this.handleSubmit}>
        <label>Choose grade:</label>
        <select
          name="GradeValue"
          value={this.state.GradeValue}
          onChange={this.handleInputChange}
          placeholder="grade"
        >
          <option value="" disabled />
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {/* <label>Grade value:</label>
            <input 
                min="1"
                max="5"
                type="number" 
                name="GradeValue"
                value={this.state.GradeValue}
                // placeholder={this.state.GradeValue}
                onChange={this.handleInputChange} /> */}
        <br />
        <input
          type="submit"
          value="Change"
          className="submit"
          disabled={this.state.disable}
        />
        <label className="error">{this.state.errorMessage}</label>
        <br />
        <input
          type="button"
          value="Cancel"
          className="cancel"
          onClick={() =>
            this.props.history.push(
              "/grades-student/" +
                this.state.grade.StudentId +
                "/subject/" +
                this.state.grade.SubjectID
            )
          }
        />
      </form>
    );
  }
}

export default TeacherAddGrade;
