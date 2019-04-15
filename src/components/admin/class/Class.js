import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS } from '../../../service/api';
import { CLASSES, ADMINS } from '../../../service/api';
import Modal from '../../common/Modal';
import '../../../style/components/subject/subject.css';
import '../../../style/common/table.css';



class Class extends Component {
    constructor(props) {
        super(props);
        this.state = {classes: [], openDialog: false, class:null};
    }

    componentDidMount(){
       
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
            fetch(CLASSES, requestOptions)
            .then(response => {
                if(response.ok) {
                    response.json().then(data =>
                        this.setState({classes: data})    
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
    
    download =()=>{
     const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            }
        };
        function downloadContent(name, content) {
            var atag = document.createElement("a");
            var file = new Blob([content], {type: 'text/plain'});
            atag.href = URL.createObjectURL(file);
            atag.download = name;
            atag.click();
          }
        fetch(ADMINS + "/downloadlogs", requestOptions)
        .then(function(response){
            return response.text();
            // console.log(response);
            // response.json().then((s) => console.log(s));
        }).then(function(data){
            let text = data;
            // window.document.getElementById("logs").innerHTML = text;
            downloadContent("t1.txt",text);

            console.log(data);
        });
    }
     
      
     
        
    
    updateClass = (id) => {
        this.props.history.push("update-class/"+id);
    }

    getSubjectTeachers =(id) =>{
        this.props.history.push("admin-classes/subjects/"+id);
    }

    getStudents = (id) =>{
        this.props.history.push("/admin-classes/" + id + "/students");
    }

    
    deleteClass = (id) => {
        const response = window.confirm(
            "Are you sure you want to delete the student?"
          );
          if (response === true) {
        const path = CLASSES + "/" + id;
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
                    this.setState({classes: this.state.classes.filter(c => c.Id!==id)})
                // );
                alert("Successfully removed class!");
                 this.props.history.push("/admin-classes");
            }else {
                response.text().then(message => alert(message))
            }
        })
        .catch(error => console.log(error))
    }
    }

    render() {

        const classHeading=[ "Year", "Label", "", "", ""];
        // const heading=["ID", "Username", "First Name", "Last Name", "Email", "JMBG", " ", " ", " ", ""];
        const buttons=[
            // {name: "Details", action: this.openDetailsTeacher, class:"btn-update"},
            
            {name: "Subjects", action: this.getSubjectTeachers, class: "btn-third"},
            {name: "Update", action: this.updateClass, class: "btn-update"}, 
            {name: "Delete", action: this.deleteClass, class: "btn-delete"},
            // {name: "Students", action: this.getStudents, class: "btn-update"}
        ];
        
        return (
            <div className="subjects_wrapper">
              
                {
                    this.state.classes &&
                    <div id="main-small">
                        <h1 class="caption">Classes</h1>
                        
                    <table className="timecard">
                        <thead>
                            <tr>
                                {classHeading.map((head, index) => 
                                    <th key={index}>{head}</th>    
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.classes.map(c=>
                                    <tr key={c.Id}>
                                        {/* <td>{c.Id}</td> */}
                                        <td>{c.Year}</td>
                                        <td>{c.Label}</td>
                                        
                                        {
                                            buttons.map(btn => (
                                                <td key={btn.name}><button className={btn.class} onClick={()=>btn.action(c.Id)}>{btn.name}</button></td>
                                            ))
                                        }   
                                    </tr>  
                                     
                                )
                            }
                        </tbody>
                    </table>
                    <br/>
                    <Link to="/add-class" className="btn-update2">Add new class</Link>
                    </div>
                } 
                
                 <div id="logs"></div>
            </div>
           
        )
    }
};

export default Class;