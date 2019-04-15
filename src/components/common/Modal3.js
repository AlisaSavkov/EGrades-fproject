import React from 'react';
import '../../style/common/modal.css';

class Modal3 extends React.Component {
  render() {

    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal1">
            {this.props.children}
           
        </div>
      </div>
    );
  }
}
export default Modal3;