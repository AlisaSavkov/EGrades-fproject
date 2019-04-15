import React, { Component } from "react";
import styled from "styled-components";
import "../../style/components/teacher/teacherHome.css";
// import '../../style/components/home/home.css';
import "../../style/common/table.css";
import Header from "../header/Header";
import { SUBJECTS } from "../../service/api";
import { CLASSES } from "../../service/api";
import { STUDENTS, ADMINS } from "../../service/api";
import { GRADES } from "../../service/api";

// import logo from '../../images/skola.png';
import { Link, withRouter } from "react-router-dom";

const Container = styled.div`
  background-color: #D8BFD8
  padding: 20px;
  display: flex;
  color: #fff;
`;

class TeacherHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user:
        localStorage.getItem("name") + " " + localStorage.getItem("lastName"),
      first: "Select a class",
      subject: null,
      subjects: [],
      classes: [],
      students: [],
      selectedClass: "",
      selectedSubject: "",
      grades: [],

      url: "http://localhost:51662/Images/",
      showClasses: false
    };
  }

  logout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  download = () => {
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if(!user){
      this.props.history.push("/login");
    } 
    else if(role ==="admins"){
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer  " + localStorage.getItem("token")
        }
      };
      function downloadContent(name, content) {
        var atag = document.createElement("a");
        var file = new Blob([content], { type: "text/plain" });
        atag.href = URL.createObjectURL(file);
        atag.download = name;
        atag.click();
      }
      fetch(ADMINS + "/downloadlogs", requestOptions)
        .then(
          response => response.text()
          
        )
        // .then(data => {
        //   let text = data;
        //   // window.document.getElementById("logs").innerHTML = text;
        // })
        .then(text => downloadContent(".txt", text))
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      this.props.history.push("/not-found");
    }
    
  };

  componentDidMount() {
    console.log("usla");
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log(role);
    if (user === null) {
      this.props.history.push("/login");
    } else if (user !== null && role === "teachers") {
      {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer  " + localStorage.getItem("token")
          }
        };
        const PATH = SUBJECTS + "/findByTeacher/" + localStorage.getItem("id");
        console.log(PATH);

        fetch(PATH, requestOptions)
          .then(response => {
            if (response.ok) {
              response.json().then(data => this.setState({ subjects: data }));
              console.log(this.state.subjects);
            } else {
              response.text().then(message => alert(message));
            }
          })
          .catch(error => console.log(error));
      }
    } else if (user !== null && role === "parents") {
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
  }

  getClasses = event => {
    console.log(event.target.value);
    console.log(this.state.subjects);
    const predmeti = this.state.subjects;
    console.log(predmeti);
    const sub = predmeti.find(s => s.ID === event.target.value);
    console.log(sub);
    this.setState({ subject: sub }, () => {
      console.log(this.state.subject);
    });

    console.log(sub);

    this.setState({
      selectedSubject: event.target.value,
      showGrades: false,
      showStudents: false
    });

    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("role") === "teachers"
    ) {
      {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer  " + localStorage.getItem("token")
          }
        };
        const PATH =
          CLASSES +
          "/teacherId/" +
          localStorage.getItem("id") +
          "/subjectId/" +
          event.target.value;
        console.log(PATH);

        fetch(PATH, requestOptions)
          .then(response => {
            // console.log(response);
            if (response.ok) {
              //  console.log(response.json());
              response.json().then(data => this.setState({ classes: data }));
            } else {
              response.text().then(message => alert(message));
            }
          })
          .catch(error => console.log(error));
        const PATH1 = SUBJECTS + "/" + event.target.value;

        fetch(PATH1, requestOptions)
          .then(response => {
            // console.log(response);
            if (response.ok) {
              //  console.log(response.json());
              response.json().then(data => this.setState({ subject: data }));
            } else {
              response.text().then(message => alert(message));
            }
          })
          .catch(error => console.log(error));
      }
      console.log(this.state.subject);
      this.setState({ showClasses: true });
    }
  };

  onClassChange(event) {
    console.log(event.target.value);
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("role") === "teachers"
    ) {
      this.setState({
        selectedClass: "event.target.value"
      });

      {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer  " + localStorage.getItem("token")
          }
        };
        const PATH = STUDENTS + "/class/" + event.target.value;
        console.log(PATH);

        fetch(PATH, requestOptions)
          .then(response => {
            if (response.ok) {
              response.json().then(data =>
                this.setState(
                  { students: data }
                  // this.setState({students: data, selectedClass: event.target.value}
                )
              );
              console.log(this.state.classes);
            } else {
              response.text().then(message => alert(message));
            }
          })
          .catch(error => console.log(error));
      }
    }  else {
      this.props.history.push("/not-found");
    }

    // const uceniciFilter = data.ucenici.filter(item => (
    //   item.idOdeljenja === +e.target.value
    // ));
    // this.setState({ucenici: uceniciFilter},() => {
    //   console.log(this.state.ucenici);
    // });
  }

  getStudents = e => {
    console.log(e.target.value);
    this.setState({
      selectedClass: e.target.value
    });

    this.props.history.push(
      "/class/" + e.target.value + "/subject/" + this.state.selectedSubject
    );
  };

  render() {
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const heading = [ "Subject", "Weekly hours", "Subject Year", ""];
    const headingClasses = [ "Label", "Year", ""];
    const buttons = [
      { name: "Show students", action: this.getStudents, class: "btn-update" }
    ];

    return (
      <div>
        {user && role === "parents" &&
         <div className="app">
         <div className="app_title">Welcome to E -Grades</div>
         
       </div>
        }

        {user && role === "students" &&  <div className="app">
        <div className="app_title">Welcome to E -Grades</div>
        
      </div>}


        

        {user && role === "admins" && (
          <div className="cont">
            <div className="vertical-menu">
              <button onClick={this.download}>Download logs</button>
            </div>
            {/*  */}
        
      </div>
         
        )} 

        {user && role === "teachers" && (
          <div className="grid-container">
            <div className="left">
            <div className="main-small-right">
              <h2 className="h-left">Subjects</h2>
              {
                <table className="timecard">
                  <thead>
                    <tr>
                      {heading.map((head, index) => (
                        <th key={index}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.subjects &&
                      this.state.subjects.map(subject => (
                        <tr className="row-hover" key={subject.ID}>
                          {/* <td>{subject.ID}</td> */}
                          <td>{subject.Name}</td>
                          <td>{subject.LessonNumber}</td>
                          <td>{subject.Year}</td>
                          <td>
                            <button
                              className="btn-update"
                              value={subject.ID}
                              onClick={e => this.getClasses(e)}
                            >
                              Show classes
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              }
              </div>
            </div>
            
            <div className="right" show={this.state.showClasses}>
            <div className="main-small-right">
              {this.state.subject && (
                <h2>
                  Subject: {this.state.subject.Name} {this.state.subject.Year}
                </h2>
              )}

              {this.state.showClasses === true && (
                <table id="small" className="timecard">
                  <thead>
                    <tr>
                      {headingClasses.map((head, index) => (
                        <th key={index}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.classes &&
                      this.state.classes.map(cl => (
                        <tr key={cl.Id}>
                          {/* <td>{cl.Id}</td> */}
                          <td>{cl.Label}</td>
                          <td>{cl.Year}</td>

                          <td>
                            <button
                            className="btn-update"
                              key={cl.Id}
                              value={cl.Id}
                              onClick={e => this.getStudents(e)}
                            >
                              Students
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TeacherHome;
