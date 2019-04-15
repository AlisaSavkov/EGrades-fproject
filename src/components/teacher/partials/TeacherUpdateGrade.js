import React, { Component } from "react";
import "../../../style/components/grade/updateGrade.css";
import { GRADES } from "../../../service/api";

class TeacherUpdateGrade extends Component {
  constructor(props) {
    super(props);
    this.state = { grade: null, disable: false };
  }

  componentDidMount() {
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!user) {
      this.props.history.push("/login");
    } else if (role === "teachers") {
      const path = GRADES + "/" + this.props.match.params.id;
      console.log(path);

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  " + localStorage.getItem("token")
        }
      };
      fetch(path, requestOptions).then(response => {
        if (response.ok) {
          response.json().then(data => this.setState({ grade: data }));
        } else {
        //   response.text().then(message => alert(message));
        //   this.props.history.push("/teacher-home");
          this.props.history.push("/not-found");
        }
      });
      // .then(response => response.json())
      // .then(data => {
      //     this.setState({grade: data})
      // });
    //   console.log(this.state.grade);
    } else {
      this.props.history.push("/not-found");
    }
  }

  // handleInputChange = (event) => {
  //     const target = event.target;
  //     const name = target.name;

  //     this.setState({
  //         grade: {...this.state.grade, [name]: target.value}
  //     });
  // }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    if (target.value === "" || target.value < 1 || target.value > 5) {
      this.setState({
        errorMessage: "Grade must be a number between 1 and 5",
        grade: { ...this.state.grade, [name]: target.value },
        disable: true
      });
    } else {
      this.setState({
        errorMessage: "",
        disable: false,
        grade: { ...this.state.grade, [name]: target.value }
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();  
    console.log(this.state.grade);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        GradeValue: this.state.grade.GradeValue,
        ID: this.state.grade.ID
      })
    };

    const path = GRADES + "/" + this.state.grade.ID;
    console.log(path);
    fetch(path, requestOptions)
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
          alert("The grade has been succesfully updated!");
          console.log(response);
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
      <div className="update-form">
        <h1>Grade Update</h1>
        {this.state.grade && (
          <div className="update-box">
            <table>
              <tbody>
                <tr>
                  <td>Year:</td>
                  <td>{this.state.grade.Year}</td>
                </tr>
                <tr>
                  <td>Semester:</td>
                  <td>{this.state.grade.Semester}</td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td>{this.state.grade.GradeDate}</td>
                </tr>
                <tr>
                  <td>Student:</td>
                  <td>
                    {this.state.grade.StudentFirstName}{" "}
                    {this.state.grade.StudentLastName}
                  </td>
                </tr>
                <tr>
                  <td>Subject:</td>
                  <td>{this.state.grade.SubjectName}</td>
                </tr>

                <tr>
                  <td>Teacher:</td>
                  <td>
                    {this.state.grade.TeacherName}{" "}
                    {this.state.grade.TeacherLastName}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="box-center1">
              <form onSubmit={this.handleSubmit}>
                <div className="b-center">
                  {/* <label>Grade value:</label>
                  <input
                  required
                    min="1"
                    max="5"
                    type="number"
                    name="GradeValue"
                    value={this.state.grade.GradeValue}
                    placeholder={this.state.grade.GradeValue}
                    onChange={this.handleInputChange}
                  /> */}
                   <label>Choose grade:</label>
                 <select
                  name="GradeValue"
                  value={this.state.grade.GradeValue}
                  onChange={this.handleInputChange}
                  placeholder="grade"
                >
                  <option value="" disabled>
                    
                  </option>
                  <option value="1" >1</option>
                  <option value="2" >2</option>
                  <option value="3" >3</option>
                  <option value="4" >4</option>
                  <option value="5">5</option>

                </select>
                  <br />
                </div>
                <div className="box-center">
                  <input
                    type="submit"
                    value="Change"
                    className="btn-update1"
                    disabled={this.state.disable}
                  />

                  <input
                    type="button"
                    value="Cancel"
                    className="btn-cancel1"
                    onClick={() =>
                      this.props.history.push(
                        "/grades-student/" +
                          this.state.grade.StudentId +
                          "/subject/" +
                          this.state.grade.SubjectID
                      )
                    }
                  />
                  <br />
                  <label className="error">{this.state.errorMessage}</label>
                </div>
              </form>
            </div>
            {/* <p>{this.state.errorMessage}</p> */}
          </div>
        )}
      </div>
    );
  }
}

export default TeacherUpdateGrade;
