import React, { Component } from 'react';
import Cell from './Cell.js'

class Board extends Component {
    
    handleCellChange = (i, j) => {
        let newCells = this.props.cells;
        newCells[i][j] = !newCells[i][j];
        this.props.handleCellsChange(newCells);
    }

    render() {
        let rows = [];
        for ( let i = 0; i < this.props.cells.length; i++) {
            var a = this.props.cells[i];
            for (let j = 0; j < a.length; j++) {
                rows.push(<li><Cell isActive={this.props.cells[i][j]} isRunning={this.props.isRunning} handleCellChange={this.handleCellChange} i={i} j={j}/></li>);
            }
            rows.push(<br></br>);
        }
        return (
            <ul>{rows}</ul>  
        )
    }
}

export default Board;
