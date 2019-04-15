import React, { Component } from 'react';
// import '../../../../style/components/auth/login.css';
import '../../../../style/components/admin/subjectUpdate.css';
import { SUBJECTS, UPDATE_SUBJECT, CLASSES } from "../../../../service/api";

class UpdateSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {class: null, disable: true};
    }

    componentDidMount() {
        const currentUser = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if(!currentUser){
            this.props.history.push("/login");
        }
        else if(role==="admins") {
            const path = CLASSES+"/"+this.props.match.params.id;
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  '+localStorage.getItem("token")
                }
            };
            fetch(path, requestOptions)
            .then(response => {
                if (response.ok) {
                  response.json().then(data => this.setState({ class: data }));
                  
                } else {
                  // response.text().then(message =>{ alert(message)
                  this.props.history.push("/not-found");
                }
                  // );
                
              })
            .catch(error => console.log(error));
            // .then(response => response.json())
            // .then(data => {
            //     this.setState({class: data})
            // });
        }else {
            this.props.history.push("/not-found");
          }
       

    }

    handleYearChange = event => {
        const target = event.target;
        const name = target.name;
        console.log(target.value);
        if (target.value === "" || target.value < 1 || target.value > 8) {
          this.setState({
            errorMessage: "Year must be a number between 1 and 8",
            disable: true
          });
          console.log(this.state.disable);
        } else {
          this.setState({ errorMessage: "", disable: false, class:{...this.state.class, [name]: target.value}});
        }
      };

      handleNameChange = (event) => {
        const target = event.target;
        const name = target.name;
        console.log(target.value.length);
        if (target.value === "" || target.value.length < 1 || target.value.length > 10) {
          this.setState({
            errorMessage: "Class label must be between 1 and 10 character in length.",
            disable: true,
            subject:{...this.state.class, [name]: target.value}
          });
          console.log(this.state.disable);
        } else {
          this.setState({ errorMessage: "", disable: false, class:{...this.state.class, [name]: target.value}});
        }
      };

      

   
    
    handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '+localStorage.getItem("token")
            },
            body: JSON.stringify({
                Id: this.state.class.Id,
                Label: this.state.class.Label,
                Year: this.state.class.Year
               
            })
        };

        const path = CLASSES + "/" + this.props.match.params.id;
        fetch( path, requestOptions)
        .then(response => 
            {
                if(response.ok) {
                    response.json().then(data => {
                        this.setState({errorMessage: ''})
                        alert("Class information successfully updated!");
                        this.props.history.push("/admin-classes");
                    });
                }else {
                    response.text().then(message => {
                        
                        this.setState({errorMessage: message})})
                        alert(this.state.errorMessage);

                }
            })
        .catch(error => console.log(error))
        

    };

    render() {
        
        return (
            <div className="input-box">
             <h3>Change Class</h3>
            {
               
                this.state.class && 
                
                <form onSubmit={this.handleSubmit}>
                <label>Year:</label><br/>
                <input 
                    className="input-number"
                    type="number" 
                    name="Year" 
                    placeholder="Enter year"
                    value={this.state.class.Year}
                    onChange ={this.handleYearChange}
                    min="1"
                    max ="8"
                     />
                     <br/>
                <label>Class Label:</label><br/>
                <input
                    id="input-text"
                    className="input-text"
                    type="text" 
                    name="Label"
                    placeholder="Change label"
                    value={this.state.class.Label}
                    onChange={this.handleNameChange} />
                <br/>

                
                    
                <input disabled={this.state.disable} className="input-submit" type="submit" value="Change" />
               
                <input  className="input-cancel" type="button" value="Cancel" onClick={()=>this.props.history.push("/admin-classes")} />
                <label className="error">{this.state.errorMessage}</label>
            </form>
            }
               
            </div>
           
        )
    }
};

export default UpdateSubject;