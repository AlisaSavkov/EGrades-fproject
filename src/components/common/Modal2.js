import React from 'react';
import '../../style/common/modal.css';

class Modal2 extends React.Component {
  render() {

    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
            {this.props.children}
           
        </div>
      </div>
    );
  }
}


export default Modal2;