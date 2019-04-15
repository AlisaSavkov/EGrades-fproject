import React, { Component, Fragment } from "react";
import Login from "./components/auth/Login";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Home from "./components/home/Home";
import TeacherHome from "./components/teacher/TeacherHome";
import TeacherClass from "./components/teacher/partials/TeacherClass";
import TeacherStudentGrades from "./components/teacher/partials/TeacherStudentGrades";
import TeacherStudents from "./components/teacher/partials/TeacherClass";
import TeacherUpdateGrades from "./components/teacher/partials/TeacherUpdateGrade";
import TeacherAddGrade from "./components/teacher/partials/TeacherAddGrade";
import AdminTeachers from "./components/admin/teacher/AdminTeachers";
import AdminStudents from "./components/admin/student/AdminStudents";
import AdminParents from "./components/admin/parent/AdminParents";
import AdminAdmins from "./components/admin/admins/AdminAdmins";
import RegisterAdmin from "./components/admin/registration/RegisterAdmin";
import RegisterStudent from "./components/admin/registration/RegisterStudent";
import RegisterTeacher from "./components/admin/registration/RegisterTeacher";
import Subject from "./components/admin/subject/Subject";
import AddSubject from "./components/admin/subject/partials/AddSubject";
import UpdateSubject from "./components/admin/subject/partials/UpdateSubject";
import TeacherSubjects from "./components/admin/teacher/partials/TeacherSubjects";
import UpdateTeacher from "./components/admin/teacher/partials/UpdateTeacher";
import Class from "./components/admin/class/Class";
import AddClass from "./components/admin/class/partials/AddClass";
import UpdateClass from "./components/admin/class/partials/UpdateClass";
import ClassSubjects from "./components/admin/class/partials/ClassSubjects";
import ClassStudents from "./components/admin/student/ClassStudents";
import StudentDetails from "./components/admin/student/partials/StudentDetails";
import ParentStudents from "./components/parent/ParentStudents.js";
import StudentGrades from "./components/parent/StudentGrades.js";
import StudentGrade from "./components/student/StudentGrade.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UpdateStudent from "./components/admin/student/partials/UpdateStudent";
import UpdateParent from "./components/admin/parent/partials/UpdateParent";
import UpdateAdmin from "./components/admin/admins/partials/UpdateAdmin";
import SubjectTeacher from "./components/admin/subject-teacher/SubjectTeacher";
import UpdateGrade from "./components/admin/student/partials/UpdateGrade";
import NotFound from './components/common/NotFound';
class App extends Component {
 
  render() {
   
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/home" component={TeacherHome} />

            {/* Student */}
            <Route exact path="/student-grade" component={StudentGrade} />
            {/* Student */}

            {/* Parent */}
            <Route exact path="/parent-students" component={ParentStudents} />
            <Route
              exact
              path="/parent/student-grades/:studentId"
              component={StudentGrades}
            />
            {/* Parent */}

            {/* Admin */}
            <Route exact path="/admin-admins" component={AdminAdmins} />
            <Route exact path="/admin-teachers" component={AdminTeachers} />
            <Route exact path="/admin-parents" component={AdminParents} />
            <Route exact path="/admin-students" component={AdminStudents} />
            <Route exact path="/admin-students/:id" component={StudentDetails} />
            <Route exact path="/admin/update-grade/:id" component={UpdateGrade} />
            <Route exact path="/admin/update-parent/:id" component={UpdateParent} />
            <Route exact path="/admin-classes" component={Class} />
            <Route exact path="/admin-classes/:id/students" component={ClassStudents} />
            <Route exact path="/admin-subject-teachers" component={SubjectTeacher} />
            <Route
              exact
              path="/admin-classes/subjects/:id"
              component={ClassSubjects}
            />
            <Route
              exact
              path="/admin/teacher-subjects/:id"
              component={TeacherSubjects}
            />
            <Route exact path="/admin-subjects" component={Subject} />
            <Route exact path="/add-subject" component={AddSubject} />
            <Route exact path="/add-class" component={AddClass} />
            <Route exact path="/update-class/:id" component={UpdateClass} />
            <Route exact path="/update-subject/:id" component={UpdateSubject} />
            <Route
              exact
              path="/admin/register-admin"
              component={RegisterAdmin}
            />
            <Route
              exact
              path="/admin/register-student"
              component={RegisterStudent}
            />
            <Route
              exact
              path="/admin/register-teacher"
              component={RegisterTeacher}
            />
            <Route exact path="/admin/update-admin/:id" component={UpdateAdmin} />
            <Route
              exact
              path="/admin/update-teacher/:id"
              component={UpdateTeacher}
            />
            <Route
              exact
              path="/admin/update-student/:id"
              component={UpdateStudent}
            />
            {/* Teacher */}
            <Route exact path="/teacher-home" component={TeacherHome} />
            <Route
              exact
              path="/class/:classId/subject/:subjectId"
              component={TeacherClass}
            />
            <Route
              exact
              path="/grades-student/:studentId/subject/:subjectId"
              component={TeacherStudentGrades}
            />
            <Route
              exact
              path="/update-grade/:id"
              component={TeacherUpdateGrades}
            />
            <Route
              exact
              path="/add-grade/:studentId/subject/:subjectId/teavher/:teacherId"
              component={TeacherAddGrade}
            />
            <Route
              exact
              path="/teacher-home/students"
              component={TeacherStudents}
            />
            
            {/* Teacher */}
            {/* <Route path="/ucenik/:id" component={UcenikBlock} exact /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={TeacherHome} />
            <Route  path="/not-found" component={NotFound} />
            <Route  component={NotFound} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
