import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS, SUBJECTSTEACHERS } from '../../../../service/api';
import { TEACHERS } from '../../../../service/api';
import Modal from '../../../common/Modal';
import '../../../../style/components/subject/subject.css';
import '../../../../style/common/table.css';



class TeacherSubjects extends Component {
    constructor(props) {
        super(props);
        this.state = {subjectsTeacher: [], allSubjects: [], subjects1:[], disable: false, teacher:null, subject: null, difference:[]};
    }

    componentDidMount(){
        const teacherId = this.props.match.params.id;
        const user = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if(user === null) {
            this.props.history.push('/login');
        } else if (role ==='admins'){
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(TEACHERS + "/" + teacherId, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>
                        this.setState({teacher: data})    
                    )
                }else {
                    // response.text().then(message => alert(message))
                    this.props.history.push('/not-found');
                }
            })
            .catch(error => console.log(error))

            const path = SUBJECTS + "/findByTeacher/" + teacherId; 
            fetch(path, requestOptions)
            .then(response => response.json())
            .then(json =>{
                this.setState({subjectsTeacher: json}, () =>{
                    console.log(this.state.subjectsTeacher);
                    var res = this.state.allSubjects.filter(item1 => 
                        !this.state.subjectsTeacher.some(item2 => (item2.ID === item1.ID)))
                        console.log(res);
                        this.setState({subjects1:res});
                })
                
            })
            .catch(error => console.log(error))

            fetch(SUBJECTS, requestOptions)
            .then(response => response.json())
            .then(json =>{
                this.setState({allSubjects: json}, () =>{
                    console.log(this.state.allSubjects);
                    
                })
            })
            .catch(error => console.log(error))

            // fetch(SUBJECTS + "/findByNoTeacher/" + teacherId, requestOptions)
            // .then(response => response.json())
            // .then(json =>{
            //     this.setState({subjects1: json}, () =>{
            //         console.log(this.state.subjects1);
            //         console.log(this.state.subjects1);
            //     })
            // })
            // .catch(error => console.log(error))

           
        }
        else {
            this.props.history.push("/not-found");
          } 
        
       
    }
    
    handleSubjectChange = event => {
        // this.setState({selectedTaxi: event.target.value});
        console.log("Promena predmeta sa id" + event.target.value);
    
        this.setState({ selectedSubject: +event.target.value, disable:false });
      };


    addSubject =()=>{

       
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            }
        };
        fetch(TEACHERS + "/" + this.props.match.params.id +"/add-subject/" + this.state.selectedSubject, requestOptions)
        .then(response => {
            if(response.ok) {
                response.json().then(data => {
                    this.setState({errorMessage: ''})
                    alert("Subject successfully added!");
                    window.location.reload();
                });
            }else {
                response.text().then(message => this.setState({errorMessage: message}))
            }
        })
        .catch(error => console.log(error))

    }

    deleteSubject = (id) => {

        const response = window.confirm("Are you sure you want to delete the subject from teacher?");
         if(response === true){
        const path = TEACHERS + "/" + this.props.match.params.id + "/remove-subject/" + id;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            }
        };
        fetch(path, requestOptions)
        .then(response => {
            if (response.ok) {
                // console.log("ispis");
                // response.json().then(data => 
                    alert("Subject successfully removed from teacher!");
                    this.setState({subjectsTeacher: this.state.subjectsTeacher.filter(subject => subject.ID!==id)})
                // );
                window.location.reload();
            }else {
                response.text().then(message => alert(message))
                
            }
        })
        .catch(error => console.log(error))
    }
    
    }

    render() {

        const subjectHeading=["ID", "Name", "Year", "Weekly hours", ""];
         const buttons=[
            {name: "Remove", action: this.deleteSubject, class: "btn-delete"}
            ];
        
        return (
            <div className="subjects_wrapper">
                <table id="table-card1">
                {this.state.teacher &&
                   <tbody>
                       <tr><td>Teacher: </td><td>{this.state.teacher.FirstName} {this.state.teacher.LastName}</td></tr>
                       <tr><td>Email: </td><td>{this.state.teacher.Email}</td></tr>
                   </tbody>}
               </table>
              
                {/* {<Table heading={heading} data={this.state.teachers} buttons={buttons}></Table>} */}
                {
                    this.state.subjectsTeacher &&
                    <div id="main-small1">
                     <div className="box-left">
                    <label>Choose subject to add:</label>
              <select
                // name="selectedClass"
                value={this.state.selectedSubject}
                onChange={this.handleSubjectChange}
              >
                <option disabled value={0}>
                  
                </option>
                {this.state.subjects1 &&
                  this.state.subjects1.map((s) => (
                    //selektovani id na osnovu kog dalje radimo posao, moze da bude i objekat
                    //prikazuje se post.title
                    <option key={s.ID} value={s.ID}>
                      {s.Name} {s.Year}
                    </option>
                  ))}
              </select>
              <button className="btn-update1" onClick={this.addSubject} disabled={this.state.disable}>Add</button>
              {/* <button onClick={()=>this.props.history.push("/admin-teachers")} >Back</button> */}
              </div>
              <div className="box-right">
                        <h1 className="caption">Taught Subjects</h1>
                    <table className="timecard">
                        <thead>
                            <tr>
                                {subjectHeading.map((head, index) => 
                                    <th key={index}>{head}</th>    
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.subjectsTeacher.map(subject=>
                                    <tr key={subject.ID}>
                                        <td>{subject.ID}</td>
                                        <td>{subject.Name}</td>
                                        <td>{subject.Year}</td>
                                        <td>{subject.LessonNumber}</td>
                                        
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
                    <br/>
                    
                    
                    {/* <div>
                    <label>Choose subject:</label>
              <select
                // name="selectedClass"
                value={this.state.selectedSubject}
                onChange={this.handleSubjectChange}
              >
                <option disabled value={0}>
                  Choose subject:
                </option>
                {this.state.subjects1 &&
                  this.state.subjects1.map((s) => (
                    //selektovani id na osnovu kog dalje radimo posao, moze da bude i objekat
                    //prikazuje se post.title
                    <option key={s.ID} value={s.ID}>
                      {s.Name} {s.Year}
                    </option>
                  ))}
              </select>
              <button onClick={this.addSubject} disabled={this.state.disable}>Add</button>
              <button onClick={()=>this.props.history.push("/admin-teachers")} >Back</button>
              </div> */}

                    </div>
                } 
                
            </div>
           
        )
    }
};

export default TeacherSubjects;