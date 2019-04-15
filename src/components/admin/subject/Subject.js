import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SUBJECTS } from "../../../service/api";
import { TEACHERS } from "../../../service/api";
import Modal from "../../common/Modal";
import "../../../style/components/subject/subject.css";
import "../../../style/common/table.css";
import Table from "../../common/Table";

class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
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
      fetch(SUBJECTS, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => this.setState({ subjects: data }));
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
      "Are you sure you want to delete the subject?"
    );
    if (response === true) {
      const path = SUBJECTS + "/" + id;
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
              subjects: this.state.subjects.filter(subject => subject.ID !== id)
            });
            alert("Subject has been successfully deleted!");
            // );
            this.props.history.push("admin-subjects");
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
  };
  render() {
    const heading = ["Id", "Name", "Weekly hours", "SubjectYear", "", "", ""];
    const teacherHeading = ["Username", "First Name", "Last Name", "JMBG"];
    const buttons = [
      { name: "Teachers", action: this.openDetails, class: "btn-third" },
      { name: "Update", action: this.updateSubject, class: "btn-update" },
      { name: "Delete", action: this.deleteSubject, class: "btn-delete" }
    ];

    return (
      <div className="subject_wrapper">
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
        {
          <div id="main1">
          <h1 className="caption">Subjects</h1>
          <Table className="timecard"
            heading={heading}
            data={this.state.subjects}
            buttons={buttons}
          />
          </div>
        }
        {/* {
                    this.state.subjects && 
                    <table>
                        <thead>
                            <tr>
                                {heading.map((head, index) => 
                                    <th key={index}>{head}</th>    
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.subjects.map(subject=>
                                    <tr key={subject.ID}>
                                        <td>{subject.ID}</td>
                                        <td>{subject.Name}</td>
                                        <td>{subject.LessonNumber}</td>
                                        <td>{subject.Year}</td>
                                        
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
                }  */}
        <Link to="/add-subject" className="btn-update1">Add new subject</Link>
      </div>
    );
  }
}

export default Subject;
