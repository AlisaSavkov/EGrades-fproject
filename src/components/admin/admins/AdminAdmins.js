import React, { Component } from "react";
import { Link } from "react-router-dom";

import { ADMINS } from "../../../service/api";
import Modal from "../../common/Modal";
import "../../../style/components/subject/subject.css";
// import "../../../style/common/table.css";
import "../../../style/components/admin/adminTable.css";
class AdminAdmins extends Component {
  constructor(props) {
    super(props);
    this.state = { admins: [], openDialog: false, admin: null };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!currentUser) {
      this.props.history.push("/login");
    } else if (role === "admins") {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  " + localStorage.getItem("token")
        }
      };
      fetch(ADMINS, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => this.setState({ admins: data }));
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
    else {
      this.props.history.push("/not-found");
    }
  }

  
  updateAdmin = id => {
    this.props.history.push("admin/update-admin/" + id);
  };

  

  deleteAdmin = id => {
    const response = window.confirm(
      "Are you sure you want to delete the admin?"
    );
    if (response === true) {
      const path = ADMINS + "/" + id;
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  " + localStorage.getItem("token")
        }
      };
      fetch(path, requestOptions)
        .then(response => {
          if (response.ok) {
            // console.log("ispis");
            // response.json().then(data =>
            alert("Successfully removed admin!");
            this.setState({
              admins: this.state.admins.filter(admin => admin.ID !== id)
            });
            // );
            
            this.props.history.push("/admin-admins");
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    const adminHeading = [ "Username", "Short Name","First Name", "Last Name", "Email", "", ""];
    
    const buttons = [
      
      { name: "Update", action: this.updateAdmin, class: "btn-update" },
      { name: "Delete", action: this.deleteAdmin, class: "btn-delete" }
    ];

    return (
      <div className="subjects_wrapper">
        
        {/* {<Table heading={heading} data={this.state.teachers} buttons={buttons}></Table>} */}
        {this.state.admins && (
          <div id="main">
            <h1 class="caption">Admins</h1>
            <table className="timecard">
              <thead>
                <tr>
                  {adminHeading.map((head, index) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.admins.map(admin => (
                  <tr key={admin.ID}>
                    {/* <td>{admin.ID}</td> */}
                    <td>{admin.UserName}</td>
                    <td>{admin.ShortName}</td>
                    <td>{admin.FirstName}</td>
                    <td>{admin.LastName}</td>
                    <td>{admin.Email}</td>
                    
                    {buttons.map(btn => (
                      <td key={btn.name}>
                        <button
                          className={btn.class}
                          onClick={() => btn.action(admin.ID)}
                        >
                          {btn.name}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default AdminAdmins;
