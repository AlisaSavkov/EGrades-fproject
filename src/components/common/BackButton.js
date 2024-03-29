import React, { Component } from 'react';

class BackButton extends Component {
    static contextTypes = {
      router: () => true, // replace with PropTypes.object if you use them
    }
  
    render() {
      return (
        <button
          className="button icon-left"
          onClick={this.props.history.goBack()}>
            Back
        </button>
      )
    }
  }

  export default BackButton;