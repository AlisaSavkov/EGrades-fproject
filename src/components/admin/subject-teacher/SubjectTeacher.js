import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SUBJECTS, SUBJECTSTEACHERS } from "../../../service/api";
import { TEACHERS } from "../../../service/api";
import Modal from "../../common/Modal";
import "../../../style/components/subject/subject.css";
import "../../../style/common/table.css";
import Table from "../../common/Table";

class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectTeachers: [],
      openDialog: false,
      subject: null,
      teachers: []
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!currentUser) {
      this.props.history.push("/login");
    } else if (role === "admins") {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  " + localStorage.getItem("token")
        }
      };
      fetch(SUBJECTSTEACHERS, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => this.setState({ subjectTeachers: data }));
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    } else {
      this.props.history.push("/not-found");
    }
  }

  openDetails = id => {
    let subject = this.state.subjects.find(s => s.ID === id);
    this.setState({ openDialog: true, subject: subject });

    const path = TEACHERS + "/findBySubject/" + id;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };
    fetch(path, requestOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({ teachers: json });
        console.log("povuceni teacheri");
      });
  };

  closeDetails = () => {
    this.setState({ subject: null, openDialog: false });
  };

  updateSubject = id => {
    this.props.history.push("update-subject/" + id);
  };

  deleteSubject = id => {
    const response = window.confirm(
      "Are you sure you want to delete the subject-teacher?"
    );
    if (response === true) {
      const path = SUBJECTSTEACHERS + "/" + id;
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
              subjectTeachers: this.state.subjectTeachers.filter(subject => subject.ID !== id)
            });
            alert("Subject-teacher has been successfully deleted!");
            // );
            this.props.history.push("admin-subject-teachers");
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
  };
  render() {
    const heading = ["Subject Name", "Subject Year", "Teacher", ""];
    const teacherHeading = ["Username", "First Name", "Last Name", "JMBG"];
    const buttons = [
    //   { name: "Teachers", action: this.openDetails, class: "btn-third" },
    //   { name: "Update", action: this.updateSubject, class: "btn-update" },
      { name: "Delete", action: this.deleteSubject, class: "btn-delete" }
    ];

    return (
      <div className="subjects_wrapper">
        <Modal show={this.state.openDialog} onClose={this.closeDetails}>
          {/* <Table heading={teacherHeading} data={this.state.teachers}></Table> */}
          <table>
            <thead>
              <tr>
                {teacherHeading.map((head, index) => (
                  <th key={index}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.subject &&
                this.state.teachers.map(item => (
                  <tr key={item.ID}>
                    {/* <td>{item.ID}</td> */}
                    <td>{item.UserName}</td>
                    <td>{item.FirstName}</td>
                    <td>{item.LastName}</td>
                    <td>{item.JMBG}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Modal>
        {/* {
          <div id="main1">
          <h1 className="caption">Subjects</h1>
          <Table className="timecard"
            heading={heading}
            data={this.state.subjectTeachers}
            buttons={buttons}
          />
          </div>
        } */}
        {this.state.subjectTeachers &&
            <div id="main-small">
                     <h1>Taught subjects</h1>
                    <table className="timecard">
                        <thead>
                            <tr>
                                {heading.map((head, index) => 
                                    <th key={index}>{head}</th>    
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.subjectTeachers.map(subject=>
                                    <tr key={subject.ID}>
                                        {/* <td>{subject.ID}</td> */}
                                        <td>{subject.SubjectName}</td>
                                        <td>{subject.SubjectYear}</td>
                                        <td>{subject.TeacherFirstName} {subject.TeacherLastName}</td>
                                        
                                        {
                                            buttons.map(btn => (
                                                <td key={btn.name}><button className={btn.class} onClick={()=>btn.action(subject.ID)}>{btn.name}</button></td>
                                            ))
                                        }   
                                    </tr>  
                                     
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                } 
        {/* <Link to="/add-subject-teacher" className="btn-update1">Add subject</Link> */}
      </div>
    );
  }
}

export default Subject;
