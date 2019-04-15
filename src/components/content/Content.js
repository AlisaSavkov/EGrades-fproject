import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Content extends Component {
  state = {
    show : true
  }
  onChangeState = async (e) => {
    
    console.log("Hi");
    await this.setState({show: false})
  }
   render() {
    return (
      <div>
        { this.state.show ? (
          <div>
            <h1>Ucenici</h1>
            <ul>
              {this.props.students && this.props.students.map(item => (
                <li key={item.id}>{item.ime} <Link to={'/ucenik/' + item.id} onClick={() => this.onChangeState}>Details</Link></li>
              ))}
            </ul>
          </div>
        ) : null }
      </div>
    );
  }
}

export default Content;