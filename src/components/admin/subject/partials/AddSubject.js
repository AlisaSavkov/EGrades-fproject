import React, { Component } from 'react';
import '../../../../style/components/auth/login.css';
import '../../../../style/components/admin/subjectUpdate.css';
import { SUBJECTS } from "../../../../service/api";

class AddSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {Name: '', Year:0, LessonNumber:0, errorMessage:'', disable:true};
    }

    componentDidMount() {
        const currentUser = localStorage.getItem("token");
        if(!currentUser) {
            this.props.history.push("/login");
        }
    }

   

    handleNameChange = (event) =>{
        const target = event.target;
        const name = target.name;
        console.log(target.value.length);
        console.log(target.value);
        if (target.value.length < 2 || target.value.length > 20) {
          this.setState({
            [name]: event.target.value,
            errorMessage: "Subject name must be beetween 2 and 20 characters long.",
            disable: true
          });
          console.log(this.state.disable);
        } else {
          this.setState({
            errorMessage: "",
            [name]: event.target.value,
            disable: false
          });
        }
       
    }

    handleYearChange = (event) =>{
        const target = event.target;
        const name = target.name;
       
        console.log(target.value);
        
        if (target.value === "" || target.value< 1 || target.value > 8) {
          this.setState({
            [name]: event.target.value,
            errorMessage: "Year must be a number beetween 1 and 8 ",
            disable: true
          });
          console.log(this.state.disable);
        } else {
          this.setState({
            errorMessage: "",
            [name]: event.target.value,
            disable: false
          });
        }
       
    }

    handleHoursChange = (event) =>{
        const target = event.target;
        const name = target.name;
       
        console.log(target.value);
        
        if(target.value === "" || target.value< 0 || target.value > 20) {
          this.setState({
            [name]: event.target.value,
            errorMessage: "Weekle hours must be a number beetween 0 and 20 ",
            disable: true
          });
          console.log(this.state.disable);
        } else {
          this.setState({
            errorMessage: "",
            [name]: event.target.value,
            disable: false
          });
        }
       
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: JSON.stringify({
                Name: this.state.Name,
                Year: this.state.Year,
                LessonNumber: this.state.LessonNumber
                // Teachers: this.state.subject.Teachers

            })
        };
        
        fetch( SUBJECTS, requestOptions)
        .then(response => 
            {
                if(response.ok) {
                    response.json().then(data => {
                        this.setState({errorMessage: ''})
                        alert("Subject successfully added!");
                        this.props.history.push("/admin-subjects");
                    });
                }else {
                    response.text().then(message => this.setState({errorMessage: message}))
                }
            })
        
        .catch(error => console.log(error))
       
    };

    
    render() {
        
        return (
            <div className="input-box">
                <h3>New Subject</h3>
                <form onSubmit={this.handleSubmit}>
                <label>Subject Name:</label><br/>
                <input required
                id="input-text"
                className="input-text"
                    type="text" 
                    name="Name"
                    placeholder="Enter name"
                    onChange={this.handleNameChange} />
                
                <br/>
                <label>Year:</label><br/>
                <input 
                required
                 className="input-number"
                    type="number" 
                    name="Year" 
                    placeholder="Year"
                    onChange={this.handleYearChange} 
                    min="1"
                    max ="8"
                    />
                    <br/>
                <label>Weekly hours:</label><br/>
                <input required
                 className="input-number"
                    type="number" 
                    name="LessonNumber" 
                    placeholder="Hours"
                    onChange={this.handleHoursChange} 
                    min="0"
                    max ="20"/>
                     <br/>                     
                <input className="input-submit"  type="submit" value="Add" disabled={this.state.disable} />
                <input className="input-cancel" type="button" value="Cancel"onClick={()=>this.props.history.push("/admin-subjects")} />
                <label className="error">{this.state.errorMessage}</label>
            </form> 
            </div>
           
        )
    }
};

export default AddSubject;