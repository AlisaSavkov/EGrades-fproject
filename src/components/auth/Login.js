import React, { Component } from 'react';
import '../../style/components/auth/login.css';
import { createFormBody } from '../../service/helper';
import {LOGIN} from "../../service/api";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password:'', errorMessage:'', disable:true};
    }

    handleInputChange = (event) => {      
        const target = event.target;
        const name = target.name;
      
        if (target.value === "") {
            this.setState({
              [name]: event.target.value,
              errorMessage: "",
              disable: true
            });
          } else if (target.value.length < 3 || target.value.length > 30) {
            this.setState({
              [name]: event.target.value,
              errorMessage: "Password must have beetween 3 and 30 characters.",
              disable: true
            });
            console.log(this.state.disable);
          } else {
            this.setState({
              errorMessage: "",
              [name]: event.target.value,
              disable: false
              // UserName: target.value
            });
          }    
    }    

    handlePasswordChange = (event) => {      
        const target = event.target;
        const name = target.name;
      
        if (target.value === "") {
            this.setState({
              [name]: event.target.value,
              errorMessage: "",
              disable: true
            });
          } else if (target.value.length < 6 || target.value.length > 20) {
            this.setState({
              [name]: event.target.value,
              errorMessage: "Password must have beetween 6 and 20 characters.",
              disable: true
            });
            console.log(this.state.disable);
          } else {
            this.setState({
              errorMessage: "",
              [name]: event.target.value,
              disable: false
              // UserName: target.value
            });
          }
    }    
    
    
    handleSubmit = (event) => {
        event.preventDefault();

        let details = {
            'username': this.state.username,
            'password': this.state.password,
            'grant_type': 'password'
        };
        
        let data = createFormBody(details);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        };
        
        fetch(LOGIN, requestOptions)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({errorMessage: ''})
                    localStorage.setItem("token", data.access_token);
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("id", data.UserId);
                    localStorage.setItem("name", data.name);
                    localStorage.setItem("lastName", data.surname);

                    
                    if(localStorage.getItem("role") ==="teachers" || localStorage.getItem("role") ==="admins"){
                        console.log("ok");
                        this.props.history.push("/home");
                       
                    }
                    else if(localStorage.getItem("role") ==="parents" || localStorage.getItem("role")=== "students"){
                        console.log("ok");
                        this.props.history.push("/home");
                    }
                    
                    // else if(localStorage.getItem("role") ==="admins"){
                    //     console.log("ok2");
                    //     this.props.history.push("/teacher-home");
                    // }
                    
                    console.log(data);   
                });
            }else {
                response.text().then(message => this.setState({errorMessage: message}))
            }
        })
        .catch(error => console.log(error))
        event.preventDefault();

    };
    render() {
    
        
        return (
            
            
            <div className="Login-container">
              {/* <img src="../../../img/background.jpeg" alt="school-background"/> */}
              <main id="Login">
            <header>
                <h2>Login</h2>
                <p></p>
            </header>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="login-input"
                        type="text" 
                        name="username"
                        placeholder="Enter username"
                        onChange={this.handleInputChange} required />

                    <input 
                        className="login-input"
                        type="password" 
                        name="password" 
                        placeholder="Enter password"
                        onChange={this.handlePasswordChange} required/>
                                        
                    <input className="Btn-submit" type="submit" value="Submit" disabled={this.state.disable}/>
                    <label className="error">{this.state.errorMessage}</label>
                    <label className="info">If you do not have account, please contact Admin</label>
                </form>
                </main>
            </div>
          
           
        )
        
       
    }
};

export default Login;