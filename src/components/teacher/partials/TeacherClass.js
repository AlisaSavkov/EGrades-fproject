import React, { Component } from 'react';
import styled from 'styled-components';
import "../../../style/components/teacher/teacherClass.css";
import { STUDENTS } from '../../../service/api';
import { GRADES, SUBJECTS, CLASSES } from '../../../service/api';
import Modal from '../../common/Modal';

const Container = styled.div`
  background-color: #a83c4c;
  padding: 20px;
  display: flex;
  color: #fff;
`;

    class TeacherClass extends Component {
        constructor(props) {
          super(props);
        //   console.log(this.props);
          this.state = { 
            subjectId:this.props.match.params.subjectId, 
            // studentId: this.props.match.params.studentId,
            teacherId: localStorage.getItem('id'),
            subject: null,
            classId: this.props.match.params.classId,
            students: [],
            student: {},
            class: null,
            openDialog: false,
            closeDialog: false,
            grades: [],
            url: "http://localhost:51662/Images/"
            
          }

          
      }
      componentDidMount(){
        console.log(this.state.subjectId);
        const classId = this.props.match.params.classId;
        const subjectId = this.props.match.params.subjectId;
        const user = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if(!user){
          this.props.history.push("/login");
        }
        else if(role ==="teachers") {
            const PATH = STUDENTS+"/class/"+ classId + "/teacher/" + this.state.teacherId + "/subject/" + this.props.match.params.subjectId;
            {
              const requestOptions = {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer  '+ localStorage.getItem("token")
                  }
              };
             
             console.log(PATH);
    
              fetch(PATH, requestOptions)
              .then(response => {
                  if(response.ok) {
                      response.json().then(data =>
                          this.setState({students: data})    
                      )

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
                            // response.text().then(message => alert(message));
                            // this.props.history.push("/home");
                            this.props.history.push("/not-found");
                          }
                        })
                        
                        .catch(error => console.log(error));

                        const PATH2 = CLASSES + "/" + classId;
                        console.log(PATH2);
          
                        fetch(PATH2, requestOptions)
                          .then(response => {
                            if (response.ok) {
                              response.json().then(data =>
                                this.setState({ class: data }, () => {
                                  console.log(this.state.class);
                                })
                              );
                            } else {
                              // response.text().then(message => alert(message));
                              // this.props.history.push("/home");
                              this.props.history.push("/not-found");
                            }
                          })
                          
                          .catch(error => console.log(error));
                          console.log(this.state.class);
                  }else {
                      // response.text().then(message => alert(message));
                      // this.props.history.push("/home");
                      this.props.history.push("/not-found");
                  }
              })
              .catch(error => console.log(error))
          }    
        }
        else {
          this.props.history.push("/not-found");
        }  
    }

    showDetails = (id) => {

        let st = this.state.students.find(s => s.ID === id);
        console.log(st);
        this.setState({openDialog: true, student: st});
        // this.setState({openDialog: true, student: st}, () =>{
           
        // });
        
        // const studentId = id;
        // console.log(id);
        
        //     this.setState({openDialog: true});
    
        // const requestOptions = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer  '+ localStorage.getItem("token")
        //     }
        // };
        // const PATH= STUDENTS + "/" + studentId;
        // console.log(PATH);

        // fetch(PATH, requestOptions)
        // .then(response =>{
        //     this.setState({student: response});
        // })
        // // .then(response => response.json())
        // // .then(json =>{
        // //     this.setState({student: json});
        // // })  
        // .catch(error => console.log(error))
        //     console.log(this.state.student);

    }

        showGrades(event, subjectId) {

            this.props.history.push("/grades-student/"+event.target.value + "/subject/" + subjectId);
        }
        showGrades1 = (id) =>{

            this.props.history.push("/grades-student/"+ id + "/subject/" + this.state.subjectId);
        }
    

    closeDetails = () => {
        this.setState({ openDialog:false})
    }


    render() {
        const user = require('../../../images/user.png');
        const heading=[ "First Name", "Last Name","Username", "Date of birth", "Parent"];
        const buttons=[

        {name: "Details", action: this.showDetails, class: "btn-update"}, 
        {name: "Grades", action: this.showGrades1, class: "btn-delete"}];

        return (
           <div>
               <table id="table-card1">
                   <tbody>
                       {this.state.class &&<tr><td>Class: </td><td>{this.state.class.Year}-{this.state.class.Label}</td></tr>}
                       {this.state.subject &&<tr><td>Subject: </td><td>{this.state.subject.Name}</td></tr>}
                   </tbody>
               </table>
              
           <div><h1 className="title"> Students</h1></div>
        <div className="grid-images">
            
            {
             
            this.state.students &&
            
            this.state.students.map(student=>
            
        <div key={student.ID} className="grid-image">

           
             {student.ImagePath ===null ? (
       <img src={user} alt="User" className="user-img"/>
      ) : (
        <img src={this.state.url+student.ImagePath} alt="User" className="user-img"/>
      )}
            
             <div className="desc"> {student.FirstName} {student.LastName}
             {/* <br/><button key={student.ID} value={student.ID} onClick={(e)=>this.showDetails(e)}>Show details</button> */}
             {/* <br/><button key={student.ID} value={student.ID} onClick={(e)=>this.showGrades(e, this.state.subjectId)}>Show grades</button> */}
                {
                    buttons.map(btn => (
                        <div className="box-btn"><button  key={btn.name} className={btn.class}  onClick={()=>btn.action(student.ID)}>{btn.name}</button></div>
                    ))
                }   
             </div>
         </div>
        
             )
            
         }
         <Modal show={this.state.openDialog} onClose={this.closeDetails}>
                    
                        {/* <thead>
                            <tr>
                                {
                                    heading.map((head,index) => <th key={index}>{head}</th>)
                                }
                            </tr>
                        </thead> */}
                        
                            {
                               (
                                   
                                   <table>
                                       <thead><th colSpan="2">Student details</th></thead>
                                       <tbody>
                                       
                                        
                                    <tr >
                                        <td>First name: </td>
                                        <td>{this.state.student.FirstName}</td>
                                        
                                    </tr>
                                    <tr >
                                        <td>Last name: </td>
                                        <td>{this.state.student.LastName}</td>
                                    </tr>
                                    
                                    <tr >
                                        <td>Date of birth: </td>
                                        <td>{this.state.student.DateOfBirth}</td>
                                    </tr>
                                    <tr >
                                        <td>Parent: </td>
                                        <td>{this.state.student.ParentFirstName} {this.state.student.ParentLastName}</td>
                                    </tr>
                                    </tbody>
                                </table> 
                                )
                            }
                        
                   
                </Modal>
        </div>
        </div>
        // <div className="grid-box2">
        //  {
        //          this.state.showGrades === true && this.state.grades && 
        //          <table>
        //              <thead>
        //                  <tr>
        //                      {heading.map((head, index) => 
        //                          <th key={index}>{head}</th>    
        //                      )}
        //                  </tr>
        //              </thead>
        //              <tbody>
        //                  {
        //                      this.state.grades.map(grade=>
        //                          <tr key={grade.ID}>
        //                             <td>{grade.StudentFirstName} {grade.StudentLastName}</td>
        //                             <td>{grade.SubjectName}</td>
        //                              <td>{grade.Year}</td>
        //                              <td>{grade.Semester}</td>
        //                             <td>{grade.GradeValue}</td>
        //                              <td>{grade.GradeDate}</td>
        //                              <td>{grade.TeacherName} {grade.TeacherLastName}</td>
        //                             {
        //                                  buttons.map(btn => (
        //                                     <td key={btn.name}><button className={btn.class} onClick={()=>btn.action(grade.ID)}>{btn.name}</button></td>
        //                                  ))
        //                             }   
        //                         </tr>  
                                
        //                      )
        //                  }
        //              </tbody>
        //          </table>
        //      } 
        
        // </div>
                
       
        )
    }
}


export default TeacherClass;