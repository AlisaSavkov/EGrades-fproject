import React, { Component } from "react";
// import '../../../style/components/auth/login.css';
import "../../../style/components/admin/register.css";
import { ACCOUNTS, PARENTS, STUDENTS, CLASSES } from "../../../service/api";
import Modal2 from "../../common/Modal2";
import { parse } from "url";

class RegisterStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      UserName: "",
      FirstName: "",
      LastName: "",
      Email: "",
      JMBG: "",
      DateOfBirth: "",
      Password: "",
      ConfirmPassword: "",
      parent: null,
      searchJMBG: "",
      showSearch: true,
      onlyStudent: false,
      together: false,
      errorMessage: "",
      errorMessage1: "",
      parents: [],
      disable: true,
      selectedClass: 0,
      PUserName: "",
      PFirstname: "",
      PLastName: "",
      PEmail: "",
      PPassword: "",
      PConfirmPassword: "",
      searchDesable: true,
      confirmDesable: true
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!currentUser) {
      this.props.history.push("/login");
    } else if (!role === "admins") {
      this.props.history.push("/not-found");
    } else {
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
            console.log(response);
            response.json().then(data =>
              this.setState({ parents: data }, () => {
                console.log(this.state.parents);
              })
            );
          } else {
            console.log("Not found");
            alert("Not found");
          }
        })
        .catch(error => console.log(error));

      fetch(CLASSES, requestOptions)
        .then(response => {
          if (response.ok) {
            console.log(response);
            response.json().then(data =>
              this.setState({ classes: data }, () => {
                console.log(this.state.classes);
              })
            );
          } else {
            console.log("Not found");
            alert("Not found");
          }
        })
        .catch(error => console.log(error));
    }
  }

  handleClassChange = event => {
    // this.setState({selectedTaxi: event.target.value});
    console.log("Promena klase sa id" + event.target.value);

    this.setState({ selectedClass: +event.target.value, disable: false });
  };

  //zavrsitit jmbg validaciju
  handleJMBGChange = event => {
    const target = event.target;
    const name = event.target.name;
    let reg = new RegExp("^[0-9]+$");
    console.log(target.value);

    console.log(target.value.length);
    if (target.value === "") {
      this.setState({
        [name]: target.value,
        errorMessage: "",
        disable: true
      });
    }
    else if (target.value.length === 13 && reg.test(target.value)) {
      this.setState({
        [name]: target.value,
        errorMessage1: "",
        searchDesable: false
      });
    } else {
      this.setState({
        errorMessage1: "JMBG must contain 13 digits.",
        [name]: target.value,
        searchDesable: true
      });
    }
  };

  handleJMBG = event => {
    const target = event.target;
    const name = event.target.name;
    let reg = new RegExp("^[0-9]+$");
    console.log(target.value);

    if (target.value === "") {
      this.setState({
        [name]: target.value,
        errorMessage: "",
        disable: true
      });
    }
    else if (target.value.length === 13 && reg.test(target.value)) {
      this.setState({
        [name]: target.value,
        errorMessage: "",
        disable: false
      });
    } else {
      this.setState({
        errorMessage: "JMBG is not valid.",
        [name]: target.value,
        disable: true
      });
    }
  };
  handleUserNameChange = event => {
    const target = event.target;
    const name = target.name;
    console.log(target.value.length);
    console.log(target.value);
    if (target.value === "") {
      this.setState({
        [name]: event.target.value,
        errorMessage: "",
        disable: true
      });
    }
    else if (target.value.length < 3 || target.value.length > 30) {
      this.setState({
        [name]: event.target.value,
        errorMessage: "Input must be beetween 3 and 30 characters long.",
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
    console.log(this.state.UserName);
    console.log(this.state.selectedClass);
  };

  // handleNameChange = event => {
  //   const target = event.target;

  //   if (target.value.length < 3 || target.value.length > 30) {
  //     this.setState({
  //       FirstName: event.target.value,
  //       errorMessage: "First name must be beetween 3 and 30 characters long."
  //     });
  //     console.log(this.state.disable);
  //   } else {
  //     this.setState({
  //       errorMessage: "",
  //       FirstName: event.target.value
  //       // UserName: target.value
  //     });
  //   }
  // };
  // handleLastNameChange = event => {
  //   const target = event.target;

  //   if (target.value.length < 3 || target.value.length > 30) {
  //     this.setState({
  //       LastName: event.target.value,
  //       errorMessage: "Last name must be beetween 3 and 30 characters long."
  //     });
  //     console.log(this.state.disable);
  //   } else {
  //     this.setState({
  //       errorMessage: "",
  //       LastName: event.target.value
  //       // UserName: target.value
  //     });
  //   }
  // };

  handlePassword = event => {
    const target = event.target;
    const name = target.name;
    console.log(target.value);

    if (target.value.length > 5) {
      this.setState({
        errorMessage: "",
        disable: true,
        confirmDesable: false
      });
      if (
        this.state.ConfirmPassword !== "" &&
        target.value !== this.state.ConfirmPassword
      ) {
        this.setState({
          errorMessage: "Passwords do not match!",
          disable: true
        });
      } else if (
        this.state.ConfirmPassword !== "" &&
        target.value === this.state.ConfirmPassword
      ) {
        this.setState({
          errorMessage: "",
          disable: false,
          [name]: target.value
        });
      } else {
        this.setState({
          errorMessage: "",

          disable: true,
          [name]: target.value
        });
      }
    } else {
      this.setState({
        errorMessage: "Passwords must have at least 6 characters!",
        [name]: target.value,
        disable: true,
        confirmDesable: true
      });
    }
  };

  handleConfirmPassword = event => {
    const target = event.target;
    const name = target.name;

    if (this.state.Password !== target.value) {
      this.setState({ errorMessage: "Passwords do not match!", disable: true });
    } else {
      this.setState({ errorMessage: "", disable: false, [name]: target.value });
    }
  };

  handlePasswordP = event => {
    const target = event.target;
    const name = target.name;
    console.log(target.value);

    if (target.value.length > 5) {
      this.setState({
        errorMessage: "",
        disable: true
      });
      if (
        this.state.PConfirmPassword !== "" &&
        target.value !== this.state.PConfirmPassword
      ) {
        this.setState({
          errorMessage: "Passwords do not match!",
          disable: true
        });
      } else if (
        this.state.PConfirmPassword !== "" &&
        target.value === this.state.PConfirmPassword
      ) {
        this.setState({
          errorMessage: "",
          disable: false,
          [name]: target.value
        });
      } else {
        this.setState({
          errorMessage: "",
          disable: true,
          [name]: target.value
        });
      }
    } else {
      this.setState({
        errorMessage: "Passwords must have at least 6 characters!",
        [name]: target.value,
        disable: true
      });
    }
  };

  handleConfirmPasswordP = event => {
    const target = event.target;
    const name = target.name;

    if (this.state.PPassword !== target.value) {
      this.setState({ errorMessage: "Passwords do not match!", disable: true });
    } else {
      this.setState({ errorMessage: "", disable: false, [name]: target.value });
    }
  };

  handleEmailChange = event => {
    const target = event.target;
    const name = event.target.name;
    // let reg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
    if (target.value === "") {
      this.setState({
        [name]: event.target.value,
        errorMessage: "",
        disable: true
      });
    } 
    else if (!target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({
        [name]: event.target.value,
        errorMessage: "Email is not valid.",
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
  };

  handleDateChange = event => {
    const target = event.target;
    const name = target.name;
    console.log(target.value);
    // this.setState({
    //   [name]: target.value
    // });
  
    const parts = event.target.value.split("-");
    var check = new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);

    console.log(check);
    var from = new Date(2003, 0, 1);
    var to = new Date(2014, 0, 1);

    if(this.state.DateOfBirth ===""){
      this.setState({ [name]: target.value,
        errorMessage: "",
        disable: true
      });
    }
    else if(check > from && check < to){
      this.setState({ [name]: target.value,
        errorMessage: "",
        disable: false
      });
    }
    else{
      this.setState({ [name]: null,
        errorMessage: "Date of birth must be between 2003-01-01 and 2014-01-01",
        disable: true
      });
    }
    // if (check > from && check < to) {
    //   const dt =
    //     parseInt(parts[2], 10) +
    //     "." +
    //     parseInt(parts[1], 10) +
    //     "." +
    //     parseInt(parts[0], 10);
    //   this.setState({ DateOfBirth: dt });
    // }

    // this.setState({
    //     searchJMBG: target.value

    // });
  };
  handleSubmitSearch = event => {
    event.preventDefault();
    const user = localStorage.getItem("token");
    console.log(user);

    const role = localStorage.getItem("role");
    console.log(role);
    console.log(this.state.searchJMBG);

    if (user === null) {
      this.props.history.push("/login");
    } else if (role === "admins") {
      const target = event.target;
      const name = target.name;

      let parent1 = this.state.parents.find(
        p => p.JMBG === this.state.searchJMBG
      );
      console.log(parent1);
      if (parent1 !== undefined) {
        this.setState({
          parent: parent1,
          onlyStudent: true,
          together: false,
          showSearch: false
        });
      } else {
        this.setState({
          parent: null,
          onlyStudent: false,
          together: true,
          showSearch: false,
          JMBG: this.state.searchJMBG
        });
      }
    } else {
      console.log("else");
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.selectedClass === 0) {
      alert("You must insert all inputs except date of birth!");
    } else {
      if (this.state.parent !== null) {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer  " + localStorage.getItem("token")
          },
          body: JSON.stringify({
            UserName: this.state.UserName,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            DateOfBirth: this.state.DateOfBirth,
            Password: this.state.Password,
            ConfirmPassword: this.state.ConfirmPassword,
            classId: this.state.selectedClass
          })
        };
        console.log(requestOptions);
        fetch(ACCOUNTS + "/register-student", requestOptions)
          .then(response => {
            if (response.ok) {
              this.setState({ errorMessage: "" });
              alert("Successfull student registration!");
              this.props.history.push("/admin-students");
            } else {
              response
                .text()
                .then(message => this.setState({ errorMessage: message }));
            }
          })

          .catch(error => console.log(error));
      } else {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer  " + localStorage.getItem("token")
          },
          body: JSON.stringify({
            UserName: this.state.UserName,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            DateOfBirth: this.state.DateOfBirth,
            Password: this.state.Password,
            ConfirmPassword: this.state.ConfirmPassword,
            classId: this.state.selectedClass,
            PUserName: this.state.PUserName,
            PFirstName: this.state.PFirstName,
            PLastName: this.state.PLastName,
            PEmail: this.state.PEmail,
            JMBG: this.state.searchJMBG,
            PPassword: this.state.PPassword,
            PConfirmPassword: this.state.PPassword
          })
        };
        console.log(requestOptions);
        fetch(ACCOUNTS + "/register-student-parent", requestOptions)
          .then(response => {
            if (response.ok) {
              this.setState({ errorMessage: "" });
              alert("Successfull student and parent registration!");
              this.props.history.push("/admin-students");
            } else {
              response
                .text()
                .then(message => this.setState({ errorMessage: message }));
            }
          })

          .catch(error => console.log(error));
      }
    }
    this.setState({ selectedClass: 0 })
  };

  render() {
    return (
      <div>
        {this.state.showSearch && (
          <div className="register-box">
            <form onSubmit={this.handleSubmitSearch}>
              <label>Insert parent's JMBG</label>
              <br />
              <input
              
                className="register-text"
                type="text"
                name="searchJMBG"
                // value={this.state.searchJMBG}
                placeholder="JMBG"
                onChange={this.handleJMBGChange}
              />

              <input
                type="submit"
                value="Search"
                className="register-search"
                disabled={this.state.searchDesable}
              />
              <label className="error">{this.state.errorMessage1}</label>
            </form>
          </div>
        )}
        {/* </Modal2> */}
        {this.state.onlyStudent && (
          <div className="register-box">
            <h3>Register Student</h3>
            <form onSubmit={this.handleSubmit}>
              <label>Username</label>
              <br />
              <input
              required
                minLength="3"
                maxLength="30"
                className="register-text"
                type="text"
                name="UserName"
                // value={this.state.UserName}
                placeholder="Enter username"
                onChange={this.handleUserNameChange}
              />

              <br />

              <label>First name</label>
              <br />
              <input
              required
                className="register-text"
                type="text"
                name="FirstName"
                // value={this.state.FirstName}
                placeholder="Enter first name"
                onChange={this.handleUserNameChange}
              />
              <br />
              <label>Last name</label>
              <br />

              <input
              required
                className="register-text"
                type="text"
                name="LastName"
                // value={this.state.LastName}
                placeholder="Enter last name"
                onChange={this.handleUserNameChange}
              />
              <br />
              <label>Date of Birth</label>
              <br />
              <input
                className="register-text"
                type="date"
                name="DateOfBirth"
                value={this.state.DateOfBirth}
                onChange={this.handleDateChange}
              />
              <br />
              <label>Email</label>
              <br />
              <input
              required
                className="register-text"
                type="email"
                name="Email"
                value={this.state.Email}
                placeholder="Enter email"
                onChange={this.handleEmailChange}
              />
              <br />
              <label>Password</label>
              <br />
              <input
              required
                className="register-text"
                type="password"
                name="Password"
                // value={this.state.Password}
                placeholder="Enter password"
                onChange={this.handlePassword}
              />
              <br />
              <label>Confirm password</label>
              <br />
              <input
              required
                disabled={this.state.confirmDesable}
                className="register-text"
                type="password"
                name="ConfirmPassword"
                // value={this.state.ConfirmPassword}
                placeholder="Confirm password"
                onChange={this.handleConfirmPassword}
              />
              <br />
              <label>Odeljenje:</label>
              <select
              required
                // name="selectedClass"
                value={this.state.selectedClass}
                onChange={this.handleClassChange}
              >
                <option disabled value={0}>
                  Odaberite odeljenje
                </option>
                {this.state.classes &&
                  this.state.classes.map(c => (
                    //selektovani id na osnovu kog dalje radimo posao, moze da bude i objekat
                    //prikazuje se post.title
                    <option key={c.Id} value={c.Id}>
                      {c.Year}-{c.Label}
                    </option>
                  ))}
              </select>

              <input
                className="register-submit"
                type="submit"
                value="Register"
                disabled={this.state.disable}
              />
              <input
                className="register-cancel"
                type="button"
                value="Cancel"
                onClick={() => this.props.history.push("/subjects")}
              />
              <label className="error">{this.state.errorMessage}</label>
            </form>
          </div>
        )}

        {this.state.together && (
          <div className="register-box1">
            <h3>Register Student and Parent</h3>

            <form onSubmit={this.handleSubmit}>
              <div className="register-box2">
                <h4>Student</h4>
                <label>Username</label>
                <br />
                <input
                required
                  className="register-text"
                  type="text"
                  name="UserName"
                  placeholder="Enter username"
                  onChange={this.handleUserNameChange}
                />

                <br />

                <label>First name</label>
                <br />
                <input
                required
                  className="register-text"
                  type="text"
                  name="FirstName"
                  placeholder="Enter first name"
                  onChange={this.handleUserNameChange}
                />
                <br />
                <label>Last name</label>
                <br />

                <input
                required
                  className="register-text"
                  type="text"
                  name="LastName"
                  placeholder="Enter last name"
                  onChange={this.handleUserNameChange}
                />
                <br />
                <label>Date of Birth</label>
                <br />
                <input
                  className="register-text"
                  type="date"
                  name="DateOfBirth"
                  onChange={this.handleDateChange}
                />
                <br />
                <label>Email</label>
                <br />
                <input
                required
                  className="register-text"
                  type="email"
                  name="Email"
                  placeholder="Enter email"
                  onChange={this.handleEmailChange}
                />
                <br />
                <label>Password</label>
                <br />
                <input
                required
                  className="register-text"
                  type="password"
                  name="Password"
                  placeholder="Enter password"
                  onChange={this.handlePassword}
                />
                <br />
                <label>Confirm password</label>
                <br />
                <input
                required
                  disabled={this.state.confirmDesable}
                  className="register-text"
                  type="password"
                  name="ConfirmPassword"
                  placeholder="Confirm password"
                  onChange={this.handleConfirmPassword}
                />
                <br />

                <label>Odeljenje:</label>
                <select
                required
                  // name="selectedClass"
                  value={this.state.selectedClass}
                  onChange={this.handleClassChange}
                >
                  <option disabled value={0}>
                    Odaberite odeljenje
                  </option>
                  {this.state.classes &&
                    this.state.classes.map(c => (
                      <option key={c.Id} value={c.Id}>
                        {c.Year}-{c.Label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="register-box2">
                <h4>Parent</h4>
                <label>Username</label>
                <br />
                <input
                required
                  className="register-text"
                  type="text"
                  name="PUserName"
                  placeholder="Enter username"
                  onChange={this.handleUserNameChange}
                />

                <br />

                <label>First name</label>
                <br />
                <input
                required
                  className="register-text"
                  type="text"
                  name="PFirstName"
                  placeholder="Enter first name"
                  onChange={this.handleUserNameChange}
                />
                <br />
                <label>Last name</label>
                <br />

                <input
                required
                  className="register-text"
                  type="text"
                  name="PLastName"
                  placeholder="Enter last name"
                  onChange={this.handleUserNameChange}
                />
                <br />
                <label>JMBG</label>
                <br />
                <input
                  className="register-text"
                  type="text"
                  name="JMBG"
                  // onChange={this.state.handleJMBGChange}
                  value={this.state.searchJMBG}
                />
                
                <br />
                {/* <label>JMBG</label>
                <br />
                <input
                  className="register-text"
                  type="text"
                  name="JMBG"
                  onChange={this.handleJMBG}
                />
                <br /> */}
                <label>Email</label>
                <br />
                <input
                required
                  className="register-text"
                  type="email"
                  name="PEmail"
                  placeholder="Enter email"
                  onChange={this.handleEmailChange}
                />
                <br />
                <label>Password</label>
                <br />
                <input
                required
                  className="register-text"
                  type="password"
                  name="PPassword"
                  placeholder="Enter password"
                  onChange={this.handlePasswordP}
                />
                <br />
                <label>Confirm password</label>
                <br />
                <input
                required
                  className="register-text"
                  type="password"
                  name="PConfirmPassword"
                  placeholder="Confirm password"
                  onChange={this.handleConfirmPasswordP}
                />
                <br /> 
              </div>
              <div className="registration-box">
              <br /> 
              <input
                className="register-submit"
                type="submit"
                value="Register"
                disabled={this.state.disable}
              />
               {/* <br /> */}
              <input
                className="register-cancel"
                type="button"
                value="Cancel"
                onClick={() => this.props.history.push("/subjects")}
              />
              <label className="error">{this.state.errorMessage}</label>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default RegisterStudent;
