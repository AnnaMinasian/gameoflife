import React, { Component } from 'react';

class Cell extends Component {
    handleClick = () => {
      if (!this.props.isRunning) {
        this.props.handleCellChange(this.props.i, this.props.j);
      }
    }
  
    render() {
      return (
        <div className="cellContainer" onClick={this.handleClick} style={{background:this.props.isActive ? 'gray' : 'black'}}>
        </div>
      );
    }
  }

  export default Cell;