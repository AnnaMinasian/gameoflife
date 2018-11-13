import React, { Component } from 'react';
import Board from './Board.js'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            cells: this.getDefaultCells(),
            interval: 100,
        }
    }

    handleCellsChange = (newCells) => {
        this.setState({cells: newCells});
    }

    getDefaultCells = () => {
        let defaultCells = new Array(30);
        for (let i = 0; i <defaultCells.length; i++) {
            defaultCells[i] = new Array(40);
            for (let j = 0; j < defaultCells[i].length; j++) {
                defaultCells[i][j] = false;
            }
        }
        return defaultCells;
    }

    runGame = () => {
        this.setState({isRunning: !this.isRunning});
        this.runIteration();
    }

    stopGame = () => {
        this.setState({isRunning: false});
        if ( this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    calculateNeighbors = (i, j) => {
        var neighbors = 0;
        const mas = [[-1, -1],[-1, 0], [-1, 1], [0, 1], [0, -1], [1, -1], [1, 0], [1, 1]];
        for (let k = 0; k < mas.length; k++) {
            const neighbor = mas[k];
            let i1 = i + neighbor[0];
            let j1 = j + neighbor[1];
            let a = this.state.cells[i];
            if (i1 >= 0 && j1 >=0 && i1 < this.state.cells.length && j1 < a.length && this.state.cells[i1][j1]) {
                neighbors++;
            }
        }
        return neighbors;
    }

    runIteration() {
        let newBoard = this.getDefaultCells();
        for (let i = 0; i < this.state.cells.length; i++) {
            let a = this.state.cells[i];
            for (let j = 0; j < a.length; j++) {
                let neighbors = this.calculateNeighbors(i, j);
                if (this.state.cells[i][j]) {
                    if ( neighbors === 2 || neighbors === 3) {
                        newBoard[i][j] = true;
                    }
                    else {
                        newBoard[i][j] = false;
                    }
                }
                else {
                    if (neighbors === 3) {
                        newBoard[i][j] = true;
                    }
                }
            }
        }
        this.setState({cells: newBoard});

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        },  this.state.interval);
    }

    render() {
      return (
        <div className="game">
            <div className="board"><Board isRunning={this.state.isRunning} cells={this.state.cells} handleCellsChange={this.handleCellsChange}/></div>
            <div className="controls">
                {this.state.isRunning ?
                    <button onClick={this.stopGame}>Stop game</button> :
                    <button onClick={this.runGame}>Run game</button>}     
            </div>
        </div>
      );
    }
}

export default Game;