import React, { Component } from "react";
import styled from "styled-components";
import "../../../../style/components/admin/studentDetails.css";
import { STUDENTS, SUBJECTSTEACHERS } from "../../../../service/api";
import { GRADES } from "../../../../service/api";
import Modal3 from "../../../common/Modal3";

const Container = styled.div`
  background-color: #a83c4c;
  padding: 20px;
  display: flex;
  color: #fff;
`;

class StudentDetails extends Component {
  constructor(props) {
    super(props);
    //   console.log(this.props);
    this.state = {
      grade: null,

      grades: [],
      studentId: this.props.match.params.studentId,
      subjectTeachers: [],
      student: null,
      subject: null,
      GradeValue: '',
      showGrades: false,
      searchedMarkValue: "",
      searchedSubjectValue: "",
      errorMessage: "",
      subjectsTeachers: [],
      url: "http://localhost:51662/Images/",
      openDialog: false,
      disable:true,
      selectedSubject: null
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

    const currentUser = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!currentUser) {
      this.props.history.push("/login");
    } else if (role === "admins") {
      const PATH = STUDENTS + "/" + this.props.match.params.id;
      console.log(PATH);

      fetch(PATH, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => this.setState({ student: data }));
            const PATH = GRADES + "/student/" + this.props.match.params.id;
            console.log(PATH);

            fetch(PATH, requestOptions)
              .then(response => {
                if (response.ok) {
                  response.json().then(data =>
                    this.setState({ grades: data, showGrades: true }, () => {
                      console.log(this.state.grades);
                    })
                  );
                } else {
                  // response.text().then(message => alert(message));
                  this.props.history.push("/not-found");
                }
              })

              .catch(error => console.log(error));

            const path2 =
              SUBJECTSTEACHERS + "/class/" + this.state.student.ClassID;
            fetch(path2, requestOptions)
              .then(response => response.json())
              .then(json => {
                this.setState({ subjectsTeachers: json }, () => {
                  console.log(this.state.subjectsTeachers);
                });
              })
              .catch(error => console.log(error));
          } else {
            // response.text().then(message => alert(message));
            this.props.history.push("/not-found");
          }
        })
        .catch(error => console.log(error));
    } else {
      this.props.history.push("/not-found");
    }
  }

  updateGrade = id => {
    console.log(id);
    this.props.history.push("/admin/update-grade/" + id);
  };

  openDetails = id => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };
    const path2 = SUBJECTSTEACHERS + "/class/" + this.state.student.ClassID;
    fetch(path2, requestOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({ subjectsTeachers: json }, () => {
          console.log(this.state.subjectsTeachers);
        });
      })
      .catch(error => console.log(error));
    this.setState({ openDialog: true });
  };

  deleteGrade = id => {
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/login");
    } else if (localStorage.getItem("role") === "admins") {
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
    console.log(event.target.value);
    if (event.target.value >= 1 || event.target.value <= 5) {
      this.setState({
        searchedMarkValue: event.target.value,
        errorMessage: ""
      });
    } else {
      this.setState({
        searchedMarkValue: event.target.value,
        errorMessage: "Grade can be between 1 and 5!"
      });
    }
  };
  filterMetod = grade => {
    if (grade.GradeValue === this.state.searchedMarkValue) {
      return true;
    }
  };

  handleSearchSubject = event => {
    console.log(event.target.value);
    this.setState({ searchedSubjectValue: event.target.value });
  };

  handleInputChange = event => {

    // this.setState({GradeValue: event.target.value});
    const target = event.target;
    const name = target.name;
    console.log(+target.value);
    if (target.value === "") {
      this.setState({
        errorMessage: "",
        [name]: target.value,
        disable: true
      });
    } else if (target.value < 1 || target.value > 5) {
      this.setState({
        errorMessage: "Grade must be a number between 1 and 5",
        [name]: target.value,
        disable: true
      });
    } else {
      this.setState({ errorMessage: "", disable: false, [name]: target.value });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.selectedSubject === null) {
      alert("You must select a subject!");
    }
    else{
    console.log(this.state.selectedSubject);
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
      this.state.student.ID +
      "/addTeacher/" +
      this.state.selectedSubject.TeacherId +
      "/addSubject/" +
      this.state.selectedSubject.SubjectID;
    console.log(path);
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ errorMessage: "", grade: data });
          });
          alert("Grade has been successfully added!");
          // this.setState({grades: this.state.grades.push(subject => subject.SubjectId!==data.SubjectId)})
          this.setState({ openDialog: false });
          window.location.reload();

          console.log(response);
        } else {
          response
            .text()
            .then(message => this.setState({ errorMessage: message }));
        }
      })
      .catch(error => console.log(error));
    }
  };

  handleSubjectChange = event => {
    // this.setState({selectedTaxi: event.target.value});
    console.log("Promena predmeta sa id" + event.target.value);
    console.log(this.state.subjectsTeachers);
    let st = this.state.subjectsTeachers.find(
      s => s.ID === +event.target.value
    );
    console.log(st);
    this.setState({ selectedSubject: st, disable: false });
    // console.log(this.state.selectedSubject);
  };

  closeModal = () => {
    this.setState({ openDialog: false, GradeValue:'', selectedSubject:null });
  };

  back = () => {
    this.props.history.push("/admin-students");
  };
  render() {
    const heading = [
      "ID",
      "Subject",
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
    const user = require("../../../../images/user.png");
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
            {/* <p className="title1">
              Date of birth: {this.state.student.DateOfBirth}
            </p> */}
            <p className="title1">
              Class: {this.state.student.ClassYear} -{" "}
              {this.state.student.ClassLabel}
            </p>
          </div>
        )}

        {this.state.showGrades && (
          <div className="blok-grades-st">
            <h1>Grades</h1>
            
            <label>Search grades </label>
            <input
              className="search-value"
              
              type="number"
              placeholder="by value"
              onChange={this.handleSearchValue}
              value={this.state.searchedMarkValue}
            />
            <span>{this.state.errorMessage}</span>
            {/* <input
            className="search-value"
            type="text"
            placeholder="by teacher last name"
            onChange={this.handleSearchTeacher}
            value={this.state.searchedTeacherValue}
          /> */}
            <input
              className="search-value"
              type="text"
              placeholder="by subject"
              onChange={this.handleSearchSubject}
              value={this.state.searchedSubjectValue}
            />
            <button onClick={this.openDetails} className="btn-update margin">
              Add New Grade
            </button>
            <br />
            <br />
            <br />

            <Modal3 show={this.state.openDialog} onClose={this.closeDetails}>
              <h2>Add grade</h2>
              <div className="box-select1">
              <form onSubmit={this.handleSubmit}>
                <label>Choose subject:</label>
                <select
                  // name="selectedClass"
                  value={this.state.selectedSubject}
                  onChange={this.handleSubjectChange}
                  defaultValue={0}
                >
                  <option disabled value={0}>
                    Choose subject:
                  </option>
                  {this.state.subjectsTeachers &&
                    this.state.subjectsTeachers.map(s => (
                      //selektovani id na osnovu kog dalje radimo posao, moze da bude i objekat
                      //prikazuje se post.title
                      <option key={s.ID} value={s.ID}>
                        {s.SubjectName} {s.TeacherFirstName} {s.TeacherLastName}
                      </option>
                    ))}
                </select>
                {/* <label>Grade value:</label>
                <input
                  min="1"
                  max="5"
                  type="number"
                  name="GradeValue"
                  value={this.state.GradeValue}
                  // placeholder={this.state.GradeValue}
                  onChange={this.handleInputChange}
                /> */}
                <label>Choose grade:</label>
                 <select
                  name="GradeValue"
                  value={this.state.GradeValue}
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
                <input
                  type="button"
                  value="Add"
                  className="btn-cancel1"
                  disabled={this.state.disable}
                  onClick={this.handleSubmit}
                />
                
                <input
                  type="button"
                  value="Cancel"
                  className="btn-update1 "
                  onClick={this.closeModal}
                />
                <br/>
                <span className="error">{this.state.errorMessage}</span>

              </form>
              </div>
            </Modal3>

            {this.state.grades && this.state.showGrades && (
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
                          this.state.searchedSubjectValue === "") ||
                        (+this.state.searchedMarkValue === grade.GradeValue &&
                          this.state.searchedSubjectValue ===
                            grade.SubjectName) ||
                        (+this.state.searchedMarkValue === grade.GradeValue &&
                          this.state.searchedSubjectValue === "") ||
                        (this.state.searchedSubjectValue ===
                          grade.SubjectName &&
                          this.state.searchedMarkValue === "")
                    )
                    .map(grade => (
                      <tr key={grade.ID}>
                        <td>{grade.ID}</td>
                        <td>{grade.SubjectName}</td>
                        <td>{grade.Year}</td>
                        <td>{grade.Semester}</td>
                        <td>{grade.GradeValue}</td>
                        <td>{grade.GradeDate}</td>
                        <td >
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
            {/* <button onClick={this.back}>Back</button> */}
          </div>
        )}
      </div>
    );
  }
}

export default StudentDetails;
