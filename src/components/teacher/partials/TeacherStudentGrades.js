import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { STUDENTS, SUBJECTS } from "../../../service/api";
import { GRADES } from "../../../service/api";
import Modal3 from "../../common/Modal3";
import BackButton from "../../common/BackButton";

const Container = styled.div`
  background-color: #a83c4c;
  padding: 20px;
  display: flex;
  color: #fff;
`;

class TeacherStudentGrades extends Component {
  constructor(props) {
    super(props);
    //   console.log(this.props);
    this.state = {
      grade: null,
      openDialog2: false,
      closeDialog: false,
      disable1: true,
      grades: [],
      studentId: this.props.match.params.studentId,
      classId: this.props.match.params.classId,
      student1: null,
      subject: null,
      GradeValue: "",
      searchedMarkValue: "",
      searchedMarkDate: ""
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!user) {
      this.props.history.push("/login");
    } else if (role === "teachers") {
      {
        const PATH =
          GRADES +
          "/student/" +
          this.props.match.params.studentId +
          "/subject/" +
          this.props.match.params.subjectId;
        console.log(PATH);

        fetch(PATH, requestOptions)
          .then(response => {
            if (response.ok) {
              response
                .json()
                .then(data =>
                  this.setState({ grades: data, showGrades: true })
                );
              const PATH = STUDENTS + "/" + this.props.match.params.studentId;
              console.log(PATH);

              fetch(PATH, requestOptions)
                .then(response => {
                  if (response.ok) {
                    response.json().then(data =>
                      this.setState({ student1: data }, () => {
                        console.log(this.state.student1);
                      })
                    );
                  } else {
                    response.text().then(message => alert(message));
                    // this.props.history.push("/teacher-home");
                  }
                })

                .catch(error => console.log(error));

              const PATH1 = SUBJECTS + "/" + this.props.match.params.subjectId;
              console.log(PATH1);

              fetch(PATH1, requestOptions)
                .then(response => {
                  if (response.ok) {
                    response.json().then(data =>
                      this.setState({ subject: data }, () => {
                        console.log(this.state.subject);
                      })
                    );
                  } else {
                    response.text().then(message => alert(message));
                    this.props.history.push("/home");
                  }
                })
                // .then(response => response.json())
                // .then(json =>{
                //     this.setState({student: json});
                // })
                .catch(error => console.log(error));

              console.log(this.state.grades);
              //   console.log(this.state.classes);
            } else {
              // response.text().then(message => alert(message));
              // this.props.history.push("/home");
              this.props.history.push("/not-found");
            }
          })
          .catch(error => console.log(error));
      }
    } else {
      this.props.history.push("/not-found");
    }
  }

  showDetails = id => {
    console.log(this.state.students);
    let st = this.state.students.find(s => s.ID === id);
    console.log(st);

    console.log(this.state.student);
  };

  closeDetails = () => {
    this.setState({ student: null, openDialog: false });
  };

  updateGrade = id => {
    console.log(id);
    this.props.history.push("/");
    this.props.history.push("update-grade/" + id);
  };
  openDialog = () => {
    this.setState({ openDialog2: true, GradeValue: "" });

    // this.props.history.push("/");
    // this.props.history.push("/add-grade/"+ this.state.studentId +"/subject/"+ this.props.match.params.subjectId);
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
        GradeValue: this.state.GradeValue
      })
    };

    const path =
      GRADES +
      "/addStudent/" +
      this.props.match.params.studentId +
      "/addTeacher/" +
      localStorage.getItem("id") +
      "/addSubject/" +
      this.props.match.params.subjectId;
    console.log(path);
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ errorMessage: "", grade: data });
            alert("Grade has been successfully added!");
          });

          // this.setState({grades: this.state.grades.push(subject => subject.SubjectId!==data.SubjectId)})
          this.setState({ openDialog2: false });
          // this.setState({grades: this.state.grades.push(this.state.grade)});
          // this.setState({grades:[...this.state.grades, this.state.grade]});

          window.location.reload();
          this.props.history.push(
            "/grades-student/" +
              this.props.match.params.studentId +
              "/subject/" +
              this.props.match.params.subjectId
          );

          console.log(response);
        } else {
          response
            .text()
            .then(message => this.setState({ errorMessage: message }));
        }
      })
      .catch(error => console.log(error));
  };

  deleteGrade = id => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("role") === "teachers"
    ) {
      const response = window.confirm(
        "Are you sure you want to delete the grade?"
      );
      if (response === true) {
        const path = GRADES + "/" + id;
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer  " + localStorage.getItem("token")
          }
        };
        fetch(path, requestOptions)
          .then(response => {
            if (response.status === 204) {
              this.setState({
                grades: this.state.grades.filter(grade => grade.ID !== id)
              });
            } else {
              response.text().then(message => alert(message));
            }
          })
          .catch(error => console.log(error));
      }
    } else {
      this.props.history.push("/not-found");
    }
  };

  handleSearchValue = event => {
    this.setState({ searchedMarkValue: event.target.value });
  };

  handleSearchDate = event => {
    this.setState({ searchedMarkDate: event.target.value });
  };
  filterMetod = grade => {
    if (grade.GradeValue === this.state.searchedMarkValue) {
      return true;
    }
  };
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    console.log(target.value);
    if (target.value === "") {
      this.setState({
        errorMessage: "",
        disable: true,
        [name]: target.value
      });
    } else if (target.value < 1 || target.value > 5) {
      this.setState({
        errorMessage: "Grade must be a number between 1 and 5",
        disable1: true,
        [name]: target.value
      });
    } else {
      this.setState({
        errorMessage: "",
        disable1: false,
        [name]: target.value
      });
    }
  };

  closeModal = () => {
    this.setState({ openDialog2: false });
  };

  render() {
    const heading = [
      // "ID",
      // "Student",
      // "Subject",
      "Year",
      "Semester",
      "Grade",
      "Date",
      "Teacher",
      "",
      ""
    ];
    const buttons = [
      { name: "Update", action: this.updateGrade, class: "btn-update" },
      { name: "Delete", action: this.deleteGrade, class: "btn-delete" }
    ];

    return (
      <div className="subjects_wrapper">
        <table id="table-card1">
          <tbody>
            {this.state.subject && (
              <tr>
                <td>Subject: </td>
                <td>{this.state.subject.Name}</td>
              </tr>
            )}
            {this.state.student1 && (
              <tr>
                <td>Student: </td>
                <td>
                  {this.state.student1.FirstName} {this.state.student1.LastName}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="blok-grades-st2">
          <h1>Grades</h1>
          <div className="s-box">
            <label>Search grades</label>
            <input
              className="search-value"
              type="number"
              placeholder="by value"
              onChange={this.handleSearchValue}
              // ref={this.searchedMarkValue}
              value={this.state.searchedMarkValue}
            />
            <input
              className="search-value"
              type="text"
              placeholder="yyyy-MM-dd"
              onChange={this.handleSearchDate}
              // ref={this.searchedMarkDate}
              value={this.state.searchedMarkDate}
            />
            <button className="btn-update margin1" onClick={this.openDialog}>
              Add New Grade
            </button>
          </div>

          {this.state.grades && (
            <table className="timecard">
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
                        this.state.searchedMarkDate === "") ||
                      (+this.state.searchedMarkValue === grade.GradeValue &&
                        this.state.searchedMarkDate === "") ||
                      (this.state.searchedMarkValue === "" &&
                        this.state.searchedMarkDate === grade.GradeDate) ||
                      (+this.state.searchedMarkValue === grade.GradeValue &&
                        this.state.searchedMarkDate === grade.GradeDate)
                  )
                  .map(grade => (
                    <tr key={grade.ID}>
                      {/* <td>{grade.ID}</td> */}
                      {/* <td>
                        {grade.StudentFirstName} {grade.StudentLastName}
                      </td>
                      <td>{grade.SubjectName}</td> */}
                      <td>{grade.Year}</td>
                      <td>{grade.Semester}</td>
                      <td>{grade.GradeValue}</td>
                      <td>{grade.GradeDate}</td>
                      <td>
                        {grade.TeacherName} {grade.TeacherLastName}
                      </td>
                      {buttons.map(btn => (
                        <td key={btn.name}>
                          <button
                            className={btn.class}
                            onClick={() => btn.action(grade.ID)}
                          >
                            {btn.name}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* <button onClick={this.openDialog}>Add Grade</button> */}
          {/* <button onClick={this.props.history.goBack}>Back</button> */}
          {/* <button onClick={this.props.history.push('/class/'+this.state.classId+'/subject/' + this.state.subjectId)}>Back</button> */}
        </div>
        <Modal3 show={this.state.openDialog2} onClose={this.closeModal}>
          {this.state.student1 && this.state.subject && (
            <div>
              <table>
                <thead>
                  <th colSpan="2">Add grade</th>
                </thead>
                <tbody>
                  <tr>
                    <td>Student: </td>
                    <td>
                      {this.state.student1.FirstName}{" "}
                      {this.state.student1.LastName}
                    </td>
                  </tr>
                  <tr>
                    <td>Subject: </td>
                    <td>{this.state.subject.Name} </td>
                  </tr>
                  <tr>
                    <td>Year: </td>
                    <td>{this.state.subject.Year} </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <div className="box-center-add">
                {/* <form onSubmit={this.handleSubmit}> */}
                {/* <label>Grade value:</label>
                <input
                  type="number"
                  name="GradeValue"
                  value={this.state.GradeValue}
                  placeholder="Insert a grade"
                  onChange={this.handleInputChange}
                /> */}
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
                <br />
              </div>
              <div className="box-center-add1">
                <input
                  type="button"
                  value="Add"
                  className="btn-update1"
                  disabled={this.state.disable1}
                  onClick={this.handleSubmit}
                />
                <label className="error">{this.state.errorMessage}</label>
                <input
                  type="button"
                  value="Cancel"
                  className="btn-cancel1 "
                  onClick={this.closeModal}
                />
              </div>
              {/* <input type="button" value="Cancel" className="cancel" onClick={()=>this.props.history.push("/grades-student/" + this.props.match.studentId + "/subject/" + this.props.match.subjectId)} /> */}
              {/* <input type="button" value="Cancel" className="cancel" onClick={this.close} />
               */}
              {/* </form> */}
            </div>
          )}
        </Modal3>
        {/* <button onClick={this.addGrade}>Add new grade</button> */}
      </div>
    );
  }
}

export default TeacherStudentGrades;
