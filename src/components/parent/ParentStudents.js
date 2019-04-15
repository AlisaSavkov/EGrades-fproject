import React, { Component } from "react";
import { STUDENTS } from "../../service/api";
import { GRADES } from "../../service/api";
import { SUBJECTS } from "../../service/api";

import { Link, withRouter } from "react-router-dom";

class ParentStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStudent: "",
      students: [],
      name: "",
      lastName: "",
      grades: "",
      subjects: "",
      showGrades: false,
      showSubjects: false,
      url: "http://localhost:51662/Images/"
    };
  }

  getSubjects = () => {
    const selectedStudent = this.state.selectedStudent;
    this.props.history.push("parent-subjects/" + selectedStudent);
  };

  handleSubjects = event => {
    const studentId = this.state.selectedStudent;
    console.log(studentId);
    if (studentId === "undefined") {
      alert("You have to choose a student!");
    } else {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  " + localStorage.getItem("token")
        }
      };
      fetch(SUBJECTS + "/findByStudent/" + studentId, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => this.setState({ subjects: data }));
            this.setState({ showSubjects: true, showGrades: false });
            console.log(this.state.showGrades);
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
  };

  showGrades = id => {
    this.props.history.push("parent/student-grades/" + id);

    // const selectedStudent = this.state.selectedStudent;
    // if(selectedStudent != null){
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer  '+localStorage.getItem("token")
    //         }
    //     };
    //     fetch(GRADES + "/student/" + selectedStudent, requestOptions)
    //     .then(response => {
    //         if(response.ok) {
    //             response.json().then(data =>
    //                 this.setState({grades: data})
    //             )
    //             console.log("povucene ocene");
    //             this.setState({showSubjects: false, showGrades: true})
    //            console.log(this.state.showGrades);
    //         }else {
    //             response.text().then(message => alert(message))
    //         }
    //     })
    //     .catch(error => console.log(error))

    // }
  };

  componentDidMount() {
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
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
      fetch(STUDENTS + "/parent/" + localStorage.getItem("id"), requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => this.setState({ students: data }));

            this.setState({ name: localStorage.getItem("name") });
            console.log(localStorage.getItem("username"));
            this.setState({ lastName: localStorage.getItem("lastName") });
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
    else {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const user = require("../../images/user.png");
    const heading = [
      "Student",
      "Subject",
      "Year",
      "Semester",
      "Date",
      "Grade",
      "Teacher"
    ];
    const subjectHeading = ["Id", "Name", "SubjectYear", "Weekly hours"];
    const buttons = [
      
      { name: "Grades", action: this.showGrades, class: "btn-update1 margin2" }
    ];

    return (
      <div>
        <div>
          <h1 className="title"> Students</h1>
        </div>
        <div className="grid-images1">
          {this.state.students &&
            this.state.students.map(student => (
              <div key={student.ID} className="grid-image1">
                {student.ImagePath === null ? (
                  <img src={user} alt="User" className="user-img" />
                ) : (
                  <img
                    src={this.state.url + student.ImagePath}
                    alt="User"
                    className="user-img"
                  />
                )}

                <div className="desc">
                  {" "}
                  {student.FirstName} {student.LastName}
                  {/* <br/><button key={student.ID} value={student.ID} onClick={(e)=>this.showDetails(e)}>Show details</button> */}
                  {/* <br/><button key={student.ID} value={student.ID} onClick={(e)=>this.showGrades(e, this.state.subjectId)}>Show grades</button> */}
                  {buttons.map(btn => (
                    <td key={btn.name}>
                      <button
                        className={btn.class}
                        onClick={() => btn.action(student.ID)}
                      >
                        {btn.name}
                      </button>
                    </td>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default ParentStudents;
