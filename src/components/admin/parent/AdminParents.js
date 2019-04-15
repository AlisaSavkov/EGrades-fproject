import React, { Component } from "react";
import { Link } from "react-router-dom";
import { STUDENTS, PARENTS } from "../../../service/api";
import { TEACHERS } from "../../../service/api";
import Modal from "../../common/Modal";
import "../../../style/components/subject/subject.css";
import "../../../style/common/table.css";

class AdminParents extends Component {
  constructor(props) {
    super(props);
    this.state = { parents: [], openDialog3: false, parent: null, students: [] };
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
      fetch(PARENTS, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => this.setState({ parents: data }));
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
    else{
      this.props.history.push("/not-found");
    }
    
  }

  openChildren = id => {
    let parent = this.state.parents.find(p => p.ID === id);
    console.log(parent);
    

    const path = STUDENTS + "/parent/" + id;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };
    console.log(path);
    fetch(path, requestOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({ students: json });
        this.setState({ openDialog3: true, parent: parent });
        console.log("povuceni studenti");
      });

    
   
  };

  closeDetailsParent = () => {
    this.setState({ parent: null, openDialog3: false });
  };

  updateParent = id => {
    this.props.history.push("admin/update-parent/" + id);
  };

  

  deleteParent = id => {
    const response = window.confirm(
      "Are you sure you want to delete the parent?"
    );
    if (response === true) {
      const path = PARENTS + "/" + id;
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
            this.setState({
              parents: this.state.parents.filter(parent => parent.ID !== id)
            });
            // );
            alert("Successfully removed parent!");
            this.props.history.push("/admin-parents");
          } else {
            response.text().then(message => alert(message));
          }
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    const subjectHeading = [ "Username", "First Name", "Last Name", "Date of Birth"];
    const heading = [
      
      "Username",
      "First Name",
      "Last Name",
      "Email",
      "JMBG",
      " ",
      " "
    ];
    const buttons = [
      { name: "Children", action: this.openChildren, class: "btn-third" },
      { name: "Update", action: this.updateParent, class: "btn-update" },
      // { name: "Delete", action: this.deleteParent, class: "btn-update" }
    ];

    return (
      <div className="subjects_wrapper">
        <Modal show={this.state.openDialog3} onClose={this.closeDetailsParent}>
          {/* <Table heading={teacherHeading} data={this.state.teachers}></Table> */}

          <table className="timecard-modal">
            <thead>
              <tr>
                {subjectHeading.map((head, index) => (
                  <th key={index}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.parent &&
                this.state.students.map(item => (
                  <tr key={item.ID}>
                    {/* <td>{item.ID}</td> */}
                    <td>{item.UserName}</td>
                    <td>{item.FirstName}</td>
                    <td>{item.LastName}</td>
                    <td>{item.DateOfBirth}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Modal>
        {/* {<Table heading={heading} data={this.state.teachers} buttons={buttons}></Table>} */}
        {this.state.parents && (
          <div id="main">
            <h1 class="caption">Parents</h1>
            <table className="timecard">
              <thead>
                <tr>
                  {heading.map((head, index) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.parents.map(parent => (
                  <tr key={parent.ID}>
                    {/* <td>{parent.ID}</td> */}
                    <td>{parent.UserName}</td>
                    <td>{parent.FirstName}</td>
                    <td>{parent.LastName}</td>
                    <td>{parent.Email}</td>
                    <td>{parent.JMBG}</td>
                    {buttons.map(btn => (
                      <td key={btn.name}>
                        <button
                          className={btn.class}
                          onClick={() => btn.action(parent.ID)}
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

export default AdminParents;
