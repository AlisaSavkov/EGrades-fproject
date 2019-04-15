import React, { Component } from "react";
import "../../style/components/home/parentHome.css";
import { STUDENTS } from "../../service/api";
import { GRADES } from "../../service/api";

import Table from "../common/Table";
import { Link, withRouter } from "react-router-dom";

class StudentGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      subjects: "",
      students: [],
      student: null,
      showGrades: false,
      searchedMarkValue: "",
      searchedTeacherValue: "",
      errorMessage: "",
      url: "http://localhost:51662/Images/"
      
    };
  }

  handleSearchValue = event => {
    // if (event.target.value < 1 || event.target.value > 5) {
    //   this.setState({
    //     searchedMarkValue: event.target.value,
    //     errorMessage: "Grade can be between 1 and 5!"
    //   });
    // }
    this.setState({ searchedMarkValue: event.target.value });
  };

  handleSearchTeacher = event => {
    console.log(event.target.value);
    this.setState({ searchedTeacherValue: event.target.value });
  };

  filterMetod = grade => {
    if (grade.GradeValue === this.state.searchedMarkValue) {
      return true;
    }
  };

  componentDidMount() {
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const parentId = localStorage.getItem("id");
    const selectedStudent = this.props.match.params.studentId;
    // const parent = this.props.match.params.parentId;
    if (user === null) {
      this.props.history.push("/login");
    } else if (role === "parents") {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  " + localStorage.getItem("token")
        }
      };

      fetch(STUDENTS + "/" + selectedStudent, requestOptions)
        .then(response => {
          if (response.ok) {
            response
              .json()
              .then(data => this.setState({ student: data, showGrades: true }));
            console.log("povucen student");

            console.log(this.state.showGrades);
          } else {
            this.setState({showGrades: false })
            // response.text().then(message => alert(message));
            // this.props.history.push("/parent-students");
            this.props.history.push("/not-found");
          }
        })
        .catch(error => console.log(error));

      fetch(GRADES + "/student/" + selectedStudent, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(
              data => this.setState({ grades: data }),
              () => {
                console.log(this.state.grades);
              }
            );
            console.log("povucene ocene");

            console.log(this.state.showGrades);
          } else {
            // response.text().then(message => alert(message));
            this.props.history.push("/not-found");
          }
        })
        .catch(error => console.log(error));
    }
    else {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const heading = [
      "Subject Name",
      "Year",
      "Semester",
      "Date",
      "Grade",
      "Teacher"
    ];
    const user = require("../../images/user.png");
    return (
      <div>
        {this.state.student && (
          <div className="card">
            {this.state.student.ImagePath === null ? (
              <img src={user} alt="User" className="user-img" />
            ) : (
              <img
                src={this.state.url + this.state.student.ImagePath}
                alt="User"
                className="user-img"
              />
            )}
            <h2>
              {this.state.student.FirstName} {this.state.student.LastName}
            </h2>
            <p class="title1">
              Date of birth: {this.state.student.DateOfBirth}
            </p>
            <p>{this.state.student.Email}</p>
          </div>
        )}

        {this.state.showGrades &&(
        <div className="blok-grades-st">
          <h1 id="h-center">Grades</h1>
          <div className="s-box1">
          <label>Search grades </label>
          <input
            max="5"
            min="1"
            type="number"
            placeholder="by value"
            onChange={this.handleSearchValue}
            value={this.state.searchedMarkValue}
          />
          <span>{this.state.errorMessage}</span>
          <input
            type="text"
            placeholder="by subject"
            onChange={this.handleSearchTeacher}
            value={this.state.searchedTeacherValue}
          />
          </div>
          <br />
          
          {this.state.grades && (
            <table className="timecard" show={this.state.showGrades}>
              <thead>
                <tr>
                  {heading.map((head, index) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.grades
                  .filter(
                    grade =>
                      (this.state.searchedMarkValue === "" &&
                        this.state.searchedTeacherValue === "") ||
                      (+this.state.searchedMarkValue === grade.GradeValue &&
                        this.state.searchedTeacherValue ===
                          grade.SubjectName) ||
                      (+this.state.searchedMarkValue === grade.GradeValue &&
                        this.state.searchedTeacherValue === "") ||
                      (this.state.searchedTeacherValue === grade.SubjectName &&
                        this.state.searchedMarkValue === "")
                    //    ||
                    //   +this.state.searchedMarkValue === grade.GradeValue ||
                    //   this.state.searchedTeacherValue ===
                    //     grade.TeacherName + " " + grade.TeacherLastName
                  )
                  .map(grade => (
                    <tr key={grade.ID}>
                      <td>{grade.SubjectName}</td>
                      <td>{grade.Year}</td>
                      <td>{grade.Semester}</td>
                      <td>{grade.GradeDate}</td>
                      <td>{grade.GradeValue}</td>
                      <td>
                        {grade.TeacherName} {grade.TeacherLastName}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>)}
      </div>
    );
  }
}

export default StudentGrades;
