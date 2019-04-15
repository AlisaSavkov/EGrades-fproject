import React, { Component } from "react";
import styled from "styled-components";
// import '../../style/components/teacher/teacherHome.css';
import "../../style/common/header.css";
import { Link } from "react-router-dom";

import { SUBJECTS, STUDENTS } from "../../service/api";
import { CLASSES, ADMINS } from "../../service/api";

// import logo from '../../images/skola.png';
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user:
        localStorage.getItem("name") + " " + localStorage.getItem("lastName"),
      first: "Select a class",
      route: "",
      subjects: [],
      subjectName: "",
      subject: null,
      classes: [],
      students: [],
      selectedClass: "",
      selectedSubject: "",
      grades: [],
      showMsg: true,
      showGrades: false,
      showStudents: false,
      url: "http://localhost:51662/Images/"
    };
  }

  logout = () => {
    const response = window.confirm("Are you sure you want to logout?");
    if (response === true) {
      localStorage.clear();
      this.props.history.push("/login");
    }
  };

  // download = () => {
  //   const user = localStorage.getItem("token");
  //   const role = localStorage.getItem("role");
  //   if(!user){
  //     this.props.history.push("/login");
  //   } 
  //   else if(role ==="admins"){
  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //         Authorization: "Bearer  " + localStorage.getItem("token")
  //       }
  //     };
  //     function downloadContent(name, content) {
  //       var atag = document.createElement("a");
  //       var file = new Blob([content], { type: "text/plain" });
  //       atag.href = URL.createObjectURL(file);
  //       atag.download = name;
  //       atag.click();
  //     }
  //     fetch(ADMINS + "/downloadlogs", requestOptions)
  //       .then(
  //         response => response.text()
          
  //       )
  //       // .then(data => {
  //       //   let text = data;
  //       //   // window.document.getElementById("logs").innerHTML = text;
  //       // })
  //       .then(text => downloadContent(".txt", text))
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   else {
  //     this.props.history.push("/not-found");
  //   }
    
  // };
  
  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/login");
      // } else {
      //     const requestOptions = {
      //         method: 'GET',
      //         headers: {
      //             'Content-Type': 'application/json',
      //             'Authorization': 'Bearer  '+localStorage.getItem("token")
      //         }
      //     };
      //     fetch(STUDENTS + "/parent/" +localStorage.getItem("id"), requestOptions)
      //     .then(response => {
      //         if(response.ok) {
      //             response.json().then(data =>
      //                 this.setState({students: data})
      //             )

      //             this.setState({name: localStorage.getItem("name")});
      //             console.log(localStorage.getItem("username"));
      //             this.setState({lastName: localStorage.getItem("lastName")});
      //         }else {
      //             response.text().then(message => alert(message))
      //         }
      //     })
      //     .catch(error => console.log(error))
      // }
    }
    // componentDidMount(){
    //    console.log('usla');
    //   if(localStorage.getItem('token') !== null && localStorage.getItem('role') ==="teachers") {
    //     {
    //       const requestOptions = {
    //           method: 'GET',
    //           headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': 'Bearer  '+ localStorage.getItem("token")
    //           }
    //       };
    //     const PATH= SUBJECTS + "/findByTeacher/" + localStorage.getItem("id");
    //      console.log(PATH);

    //       fetch(PATH, requestOptions)
    //       .then(response => {
    //           if(response.ok) {
    //               response.json().then(data =>
    //                   this.setState({subjects: data}, ()=>{
    //                       console.log(this.state.subjects);
    //                   })
    //               )
    //               console.log(this.state.subjects);
    //           }else {
    //               response.text().then(message => alert(message))
    //           }
    //       })
    //       .catch(error => console.log(error))
    //   }
    // }
    // else {
    //   this.props.history.push("/login");
    // }
    // }
    //  onSelectChange =(event) =>{

    //   console.log(event.target.value);
    //   console.log(this.state.subjects);
    //   const predmeti = this.state.subjects;
    //   console.log(predmeti);
    //    const sub =predmeti.find(s => (s.ID===event.target.value));
    //    console.log(sub);
    //    this.setState({subject: sub}, () =>{
    //      console.log(this.state.subject);
    //    });
    //   // for(let i = 0; i <  this.state.subjects; i++) {

    //   //   if(this.state.subjects[i].ID === event.target.value){
    //   //     console.log('uslo');
    //   //     subject = this.state.subjects[i];
    //   //   }
    //   // }
    //   console.log(sub);

    //   this.setState({selectedSubject: event.target.value, showGrades:false, showStudents:false});

    //   if(localStorage.getItem('token') !== null && localStorage.getItem('role') ==="teachers") {

    //       {
    //         const requestOptions = {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer  '+ localStorage.getItem("token")
    //             }
    //         };
    //        const PATH= CLASSES + "/teacherId/" + localStorage.getItem("id") + "/subjectId/" + event.target.value;
    //        console.log(PATH);

    //         fetch(PATH, requestOptions)
    //         .then(response => {
    //           // console.log(response);
    //             if(response.ok) {
    //               //  console.log(response.json());
    //                 response.json().then(data =>
    //                     this.setState({classes:data})

    //                 )

    //             }else {
    //                 response.text().then(message => alert(message))
    //             }
    //         })
    //         .catch(error => console.log(error))
    //     }
    //     this.props.history.push("/teacher-home");
    //   }
    //   else {
    //     this.props.history.push("/login");
    //   }

    // }

    // onClassChange =(event, subject) =>{
    //   this.setState({showMsg: false});
    //   this.props.history.push("/teacher-home");

    //     console.log(event.target.value);

    //     if(localStorage.getItem('token') !== null && localStorage.getItem('role') ==="teachers") {
    //     this.setState({selectedClass: event.target.value});

    //     this.props.history.push("class/"+event.target.value + "/subject/" + this.state.selectedSubject);
    //     // this.props.history.push("class/"+selectedClass + "/subject/" + this.state.selectedSubject);

    //     }
    //     else {
    //       this.props.history.push("/login");
    //     }
    // }
  }

  render() {
    const logo = require("../../images/screen.png");
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const firstName =localStorage.getItem("name");
    const lastName =localStorage.getItem("lastName");
    return (
      <div>

        {!user &&(
          <div></div>
        )}
        {user !== null && role === "students" && (
          <div className="gridcontainer">
            <div>
              <Link to="/home" className="logo">
                <img className="logo" src={logo} alt="School-logo" />
              </Link>
            </div>
            <ul className="nav-horizontal box2">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/student-grade">Grades</Link>
              </li>
              <li className="right" onClick={this.logout}>
                <button class="btn2">Logout</button>
              </li>
              <li className="right">
                <span>
                  Student: {firstName}{" "}
                  {lastName}
                </span>
              </li>
            </ul>
          </div>
        )}

        {user !== null && role === "parents" && (
          <div className="gridcontainer">
            <div>
              <Link to="/home" className="logo">
                <img className="logo" src={logo} alt="School-logo" />
              </Link>
            </div>
            <ul className="nav-horizontal box2">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/parent-students">Students</Link>
              </li>
              <li className="right" onClick={this.logout}>
                <button class="btn2">Logout</button>
              </li>
              <li className="right">
                <span>
                  Parent: {firstName}{" "}
                  {lastName}
                </span>
              </li>
            </ul>
          </div>
        )}
        {user && role === "teachers" && (
          <div className="gridcontainer">
            <div>
              <Link to="/home" className="logo">
                <img className="logo" src={logo} alt="School-logo" />
              </Link>
            </div>
            <ul className="nav-horizontal box2">
              <li>
                <Link to="/home">Home</Link>
              </li>
              {/* <li>
                <Link to="/teacher-subjects">Subjects</Link>
                
              </li> */}
              <li className="right" onClick={this.logout}>
                <button class="btn2">Logout</button>
              </li>
              <li className="right">
                <span>
                  Teacher: {firstName}{" "}
                  {lastName}
                </span>
              </li>
            </ul>
          </div>
        )}
        {user && role === "admins" && (
          <div className="gridcontainer">
            <div>
              <Link className="logo" to="/home">
                <img className="logo" src={logo} alt="School-logo" />
              </Link>
            </div>
            <ul className="nav-horizontal box2">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li className="dropdown">
                <a href="javascript:void(0)" className="dropbtn">
                  Users 
                </a>
                <div className="dropdown-content">
                <Link to="/admin-admins">Admins</Link>
                <Link to="/admin-teachers">Teachers</Link>
                <Link to="/admin-students">Students</Link>
                <Link to="/admin-parents">Parents</Link>
               
                </div>
              </li>
              <li className="dropdown">
                <a href="javascript:void(0)" className="dropbtn">
                  User registration
                </a>
                <div className="dropdown-content">
                  <Link to="/admin/register-teacher">Register teacher</Link>
                  <Link to="/admin/register-admin">Register admin</Link>
                  <Link to="/admin/register-student">
                    Register student/parent
                  </Link>
                 
                </div>
              </li>
              <li>
                <Link to="/admin-subjects">Subjects</Link>
              </li>
              
              {/* <li>
                <Link to="/admin-teachers">Teachers</Link>
              </li> */}
              <li>
                <Link to="/admin-classes">Classes</Link>
              </li>
              <li>
                <Link to="/admin-subject-teachers">Subject-Teachers</Link>
              </li>
              {/* <li><button onClick={this.download}>Download logs</button></li> */}
              <li className="right" onClick={this.logout}>
                <button className="btn2">Logout</button>
              </li>
              <li className="right">
                <span>
                  Admin: {firstName}{" "}
                  {lastName}
                </span>
              </li>
            </ul>
          
          </div>
        )}

        {/* <div className="gridcontainer">

  <div><a className="logo"><img className="logo" src={logo} alt="School-logo" /></a></div>
  <div >
    <ul className="nav-horizontal box2">
        <li><a href="/teacher-home">Home</a></li>
        {
          user && role==='teachers' ?
        // localStorage.getItem("token") && localStorage.getItem('role')==='teachers' ? 
          <div>
        <div class="dropdown">
          <button class="dropbtn">Subject:{this.state.subject &&<span>{this.state.subjectName}</span>}</button>
          <div class="dropdown-content">
          {
                  this.state.subjects &&this.state.subjects.map((subject) => (
                            <button key={subject.ID} value={subject.ID} onClick={(e)=>this.onSelectChange(e)}>{subject.Name} {subject.Year}</button>
                              ))
                }   

          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Class: </button><span></span>
          <div class="dropdown-content">
          {
                  this.state.classes &&this.state.classes.map((c) => (
                            <button key={c.Id} value={c.Id} onClick={(e)=>this.onClassChange(e, this.state.selectedSubject)}>{c.Year} {c.Label}</button>
                              ))
                }   

          </div>
        </div>
        
        <li><button onClick={this.getStudents}>Students</button></li>
        
        <li className="right" onClick={this.logout}><button class="btn2">Logout</button></li>
        <li className="right"><span>Teacher: {localStorage.getItem("name")}  {localStorage.getItem("lastName")}</span></li>

        </div>
        :
        
        <li className="right"><a href="/">Login</a></li>
              }
        </ul>
        </div>
        </div> */}
      </div>
    );
  }
}

export default withRouter(Header);
