import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  SUBJECTS,
  CLASSES,
  SUBJECTSTEACHERS,
  CST
} from "../../../../service/api";
import { TEACHERS } from "../../../../service/api";
import Modal2 from "../../../common/Modal2";
import "../../../../style/components/subject/subject.css";
import "../../../../style/common/table.css";

class ClassSubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSubjectsTeachers: [],
      subjectsTeachers: [],
      disable: false,
      class: null,
      subjectTeacher: null,
      subjects: [],
      showSubjects: false
    };
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
            // response.text().then(message => alert(message));
            this.props.history.push("/not-found");
          }
        })
        .catch(error => console.log(error));

      const path = SUBJECTSTEACHERS + "/class/" + classId;
      fetch(path, requestOptions)
        .then(response => response.json())
        .then(json => {
          this.setState({ subjectsTeachers: json }, () => {
            console.log(this.state.subjectsTeachers);
          });
        })
        .catch(error => console.log(error));

      fetch(SUBJECTSTEACHERS, requestOptions)
        .then(response => response.json())
        .then(json => {
          this.setState({ allSubjectsTeachers: json }, () => {
            console.log(this.state.allSubjectsTeachers);
          });
        })
        .catch(error => console.log(error));
    } else {
      this.props.history.push("/not-found");
    }
  }

  handleSubjectChange = event => {
    // this.setState({selectedTaxi: event.target.value});
    console.log("Promena predmeta sa id" + event.target.value);

    this.setState({ selectedSubject: +event.target.value, disable: false });
  };

  addSubject = () => {
    let y =this.state.class.Year;
    var res = this.state.allSubjectsTeachers.filter(
      item1 => !this.state.subjectsTeachers.some(item2 => item2.ID === item1.ID)
    );

    var res1 = res.filter(i => i.SubjectYear === ""+y.Year);
    console.log(res1);
    this.setState({ subjects: res, showSubjects: true });

   
  };

  add = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };
    fetch(
      CST +
        "/addSubjectTeacher/" +
        this.state.selectedSubject +
        "/addClass/" +
        this.props.match.params.id,
      requestOptions
    )
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ errorMessage: "" });
            alert("Subject-teacher successfully added!");
            window.location.reload();
          });
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
  };

  deleteSubject = id => {
    const response = window.confirm(
      "Are you sure you want to delete the subject from class?"
    );
    if (response === true) {
      const path = CLASSES + "/" + this.props.match.params.id + "/remove-subjectTeacher/" + id;
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
            alert("Subject-teacher successfully removed!");
            this.setState({
              subjectsTeachers: this.state.subjectsTeachers.filter(subject => subject.ID !== id)
            });
            // );
            this.props.history.push("/admin-classes/subjects/" + this.props.match.params.id);
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
  };

  closeDetails = () => {
    this.setState({showSubjects: false });
  };



  render() {
    const subjectHeading = [ "Name", "Year", "Teacher", ""];
    const buttons = [
      { name: "Remove", action: this.deleteSubject, class: "btn-delete" }
    ];

    return (
      <div className="subjects_wrapper">
        <table id="table-card1">
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
        {this.state.subjectsTeachers && (
          <div id="main-small1">
          
            <div className="box-right">
            <h1 className="caption">Subjects</h1>
            <table id="left" className="timecard left">
              <thead>
                <tr>
                  {subjectHeading.map((head, index) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.subjectsTeachers.map(s => (
                  <tr key={s.ID}>
                    {/* <td>{s.ID}</td> */}
                    <td>{s.SubjectName}</td>
                    <td>{s.SubjectYear}</td>
                    <td>
                      {s.TeacherFirstName} {s.TeacherLastName}
                    </td>

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
            <div><button onClick={this.addSubject} className="btn-update1 center">
              Add subject-teacher
            </button></div>
            </div>
           
            <Modal2 show={this.state.showSubjects} >
               
            <div className="box-select">
              {/* <label>Choose subject:</label> */}
              <select
                // name="selectedClass"
                value={this.state.selectedSubject}
                onChange={this.handleSubjectChange}
                defaultValue={0}
              >
              
                <option disabled value={0}>
                  Choose subject:
                </option>
                
                {this.state.showSubjects &&
                  this.state.subjects &&
                  this.state.subjects.map(s => (
                    //selektovani id na osnovu kog dalje radimo posao, moze da bude i objekat
                    //prikazuje se post.title
                    <option key={s.ID} value={s.ID}>
                      {s.SubjectName} {s.SubjectYear} {s.TeacherFirstName}{" "}
                      {s.TeacherLastName}
                    </option>
                  ))}
              </select>
              
              <button onClick={this.add} disabled={this.state.disable} className="btn-cancel1">
                Add
              </button>
              <button className="btn-update1"
                onClick={this.closeDetails}
              >
                Cancel
              </button>
              </div>
              </Modal2>
            
          </div>
        )}
      </div>
    );
  }
}

export default ClassSubjects;
