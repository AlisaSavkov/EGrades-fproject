import React from 'react';
import '../../style/common/modal.css';

class Modal extends React.Component {
  render() {

    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
            {this.props.children}
          <div >
            <button className="btn-update" onClick={this.props.onClose}>Close </button>
          </div>
        </div>
      </div>
    );
  }
}


export default Modal;