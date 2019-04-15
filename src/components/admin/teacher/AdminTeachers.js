import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS } from '../../../service/api';
import { TEACHERS } from '../../../service/api';
import Modal from '../../common/Modal';
import '../../../style/components/subject/subject.css';
import '../../../style/common/table.css';



class AdminTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = {teachers: [], openDialog: false, teacher:null, subjects:[]};
    }

    componentDidMount(){

        const currentUser = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!currentUser) {
          this.props.history.push("/login");
        } else if (role === "admins") {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(TEACHERS, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>
                        this.setState({teachers: data})    
                    )
                }else {
                    response.text().then(message => alert(message))
                }
            })
            .catch(error => console.log(error))
        }    
        else {
            this.props.history.push("/not-found");
          }
    }
    
    openDetailsTeacher = (id) => {
        let teacher = this.state.teachers.find(t => t.ID === id);
        this.setState({openDialog: true, teacher: teacher});

        const path = SUBJECTS + "/findByTeacher/" + id;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            }
        };
        fetch(path, requestOptions)
        .then(response => response.json())
        .then(json =>{
            this.setState({subjects: json})
            console.log("povuceni predmeti");
        })
     
    }

    closeDetailsTeacher = () => {
        this.setState({teacher:null, openDialog:false})
    }

    updateTeacher = (id) => {
        this.props.history.push("admin/update-teacher/"+id);
    }

    getSubjects =(id) =>{
        this.props.history.push("admin/teacher-subjects/"+id);
    }

    deleteTeacher = (id) => {
        const response = window.confirm(
            "Are you sure you want to delete the teacher?"
          );
          if (response === true) {
        const path = TEACHERS + "/" + id;
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
                    this.setState({teachers: this.state.teachers.filter(teacher => teacher.ID!==id)})
                // );
                alert("Successfully removed teacher!");
                 this.props.history.push("/admin-teachers");
            }else {
                response.text().then(message => alert(message))
            }
        })
        .catch(error => console.log(error))
    }
    }

    render() {

        const subjectHeading=["Name", "Year", "Weekly hours"];
        const heading=[ "Username", "First Name", "Last Name", "Email", "JMBG", " ", " ", " "];
        const buttons=[
            {name: "Subjects", action: this.getSubjects, class: "btn-third"},
            {name: "Update", action: this.updateTeacher, class: "btn-update"}, 
            {name: "Delete", action: this.deleteTeacher, class: "btn-delete"}
            ];
        
        return (
            <div className="subjects_wrapper">
                <Modal show={this.state.openDialog} onClose={this.closeDetailsTeacher}>
                {/* <Table heading={teacherHeading} data={this.state.teachers}></Table> */}

                    <table>
                        <thead>
                            <tr>
                                {
                                    subjectHeading.map((head,index) => <th key={index}>{head}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                               this.state.teacher && this.state.subjects.map(item=>
                                    <tr key={item.ID}>
                                        {/* <td>{item.ID}</td> */}
                                        <td>{item.Name}</td>
                                        <td>{item.Year}</td>
                                        <td>{item.LessonNumber}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    
                </Modal>
                {/* {<Table heading={heading} data={this.state.teachers} buttons={buttons}></Table>} */}
                {
                    this.state.teachers &&
                    <div id="main">
                        <h1 class="caption">Teachers</h1>
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
                                this.state.teachers.map(teacher=>
                                    <tr key={teacher.ID}>
                                        {/* <td>{teacher.ID}</td> */}
                                        <td>{teacher.UserName}</td>
                                        <td>{teacher.FirstName}</td>
                                        <td>{teacher.LastName}</td>
                                        <td>{teacher.Email}</td>
                                        <td>{teacher.JMBG}</td>
                                        {
                                            buttons.map(btn => (
                                                <td key={btn.name}><button className={btn.class} onClick={()=>btn.action(teacher.ID)}>{btn.name}</button></td>
                                            ))
                                        }   
                                    </tr>  
                                     
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                } 
                
            </div>
           
        )
    }
};

export default AdminTeachers;