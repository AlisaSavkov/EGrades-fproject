import React, { Component } from 'react';
import '../../../../style/components/auth/login.css';
import '../../../../style/components/admin/subjectUpdate.css';
import { SUBJECTS, CLASSES } from "../../../../service/api";

class AddClass extends Component {
    constructor(props) {
        super(props);
        this.state = {Year: 0, Label:'', errorMessage:'', disable:true};
    }

    componentDidMount() {
        const currentUser = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        console.log(role);
        if(!currentUser) {
            this.props.history.push("/login");
        }
        else if(role!=="admins"){
            this.props.history.push("/not-found");
        }
        

    }

   

    handleNameChange = (event) =>{
        const target = event.target;
        const name = target.name;
        console.log(target.value.length);
        console.log(target.value);
        if (target.value.length < 1 || target.value.length > 10) {
          this.setState({
            [name]: event.target.value,
            errorMessage: "Class name must be beetween 1 and 10 characters long.",
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
            [name]: +event.target.value,
            errorMessage: "Year must be a number beetween 1 and 8 ",
            disable: true
          });
          console.log(this.state.disable);
        } else {
          this.setState({
            errorMessage: "",
            [name]: +event.target.value,
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
                Label: this.state.Label,
                Year: this.state.Year
               
                // Teachers: this.state.subject.Teachers

            })
        };
        console.log(requestOptions);
        fetch( CLASSES, requestOptions)
        .then(response => 
            {
                if(response.ok) {
                    response.json().then(data => {
                        this.setState({errorMessage: ''})
                        alert("Class successfully added!");
                        this.props.history.push("/admin-classes");
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
                <h3>New Class</h3>
                <form onSubmit={this.handleSubmit}>
               
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
                    <label>Class Label:</label><br/>
                <input 
                required
                id="input-text"
                className="input-text"
                    type="text" 
                    name="Label"
                    placeholder="Enter name"
                    onChange={this.handleNameChange} />
                
                <br/>
                                  
                <input className="input-submit"  type="submit" value="Add" disabled={this.state.disable} />
                <input className="input-cancel" type="button" value="Cancel"onClick={()=>this.props.history.push("/admin-classes")} />
                <label className="error">{this.state.errorMessage}</label>
            </form> 
            </div>
           
        )
    }
};

export default AddClass;