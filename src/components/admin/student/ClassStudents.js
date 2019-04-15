import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SUBJECTS, STUDENTS, CLASSES } from "../../../service/api";
import { TEACHERS } from "../../../service/api";

import "../../../style/components/subject/subject.css";
import "../../../style/common/table.css";

class ClassStudents extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [], url: "http://localhost:51662/Images/" };
  }

  componentDidMount() {
    const classId = this.props.match.params.id;
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (user === null) {
      this.props.history.push("/login");
    } else if (role === "admins") {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  " + localStorage.getItem("token")
        }
      };
      fetch(CLASSES + "/" + classId, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => this.setState({ class: data }));
          } else {
            response.text().then(message => alert(message));
            this.props.history.push("/admin-classes");
          }
        })
        .catch(error => console.log(error));
      fetch(STUDENTS + "/class/" + classId, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => this.setState({ students: data }));
          } else {
            response.text().then(message => alert(message));
            this.props.history.push("/admin-classes");
          }
        })
        .catch(error => console.log(error));
    }
    else {
      this.props.history.push("/not-found");
    }
    
  }

  handleSubjectChange = event => {
    // this.setState({selectedTaxi: event.target.value});
    console.log("Promena predmeta sa id" + event.target.value);

    this.setState({ selectedSubject: +event.target.value, disable: false });
  };

  updateStudent = (id) => {
    this.props.history.push("/admin/update-student/"+id);
  }
  

  deleteStudent = id => {
    const response = window.confirm(
      "Are you sure you want to delete the student?"
    );
    if (response === true) {
      const path = STUDENTS + "/" + id;
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  " + localStorage.getItem("token")
        }
      };
      fetch(path, requestOptions)
        .then(response => {
          if (response.ok) {
            // console.log("ispis");
            // response.json().then(data =>
            this.setState({
              students: this.state.students.filter(
                students => students.ID !== id
              )
            });
            alert("Student successfully removed!");
            // );
            
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    const subjectHeading = [
      "Image",
      "Username",
      "FirstName",
      "LastName",
      "Email",
      "Date of birth",
      "", "", ""
      
    ];
    const buttons = [
      { name: "Remove", action: this.deleteStudent, class: "btn-update" },
      { name: "Update", action: this.updateStudent, class: "btn-update" },
      { name: "Grades", action: this.getGrades, class: "btn-update" }
    ];

    return (
      <div className="subjects_wrapper">
        <table id="table-card">
          {this.state.class && (
            <tbody>
              <tr>
                <td>Class: </td>
                <td>
                  {this.state.class.Year} {this.state.class.Label}
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {/* {<Table heading={heading} data={this.state.teachers} buttons={buttons}></Table>} */}
        {this.state.students && (
          <div>
            <h2 className="table-title">Students</h2>
            <table className="table_wrapper">
              <thead>
                <tr>
                  {subjectHeading.map((head, index) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.students.map(s => (
                  <tr key={s.ID}>
                    <td>
                      <img className="small-img"
                        src={this.state.url + s.ImagePath}
                        alt="User"
                        
                      />
                    </td>
                    <td>{s.UserName}</td>
                    <td>{s.FirstName}</td>
                    <td>{s.LastName}</td>
                    <td>{s.Email}</td>
                    <td>{s.DateOfBirth}</td>
                    {buttons.map(btn => (
                      <td key={btn.name}>
                        <button
                          className={btn.class}
                          onClick={() => btn.action(s.ID)}
                        >
                          {btn.name}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <br />

            
          </div>
        )}
      </div>
    );
  }
}

export default ClassStudents;
