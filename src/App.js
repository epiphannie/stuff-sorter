import React, { Component } from 'react';
import './App.css';


class App extends Component {
  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">Bienvenue to React</h1>
  //       </header>
  //       <p className="App-intro">
  //         To get started, edit <code>src/App.js</code> and save to reload.
  //       </p>
  //     </div>
  //   );
  // }
  constructor(props) {
    super(props);
    this.state = {
      instructions: false, //TODO: remember to change this before release. should be true
      stuffType: 'text',
      stuffName: '',
      stuffGrid: this.testGrid,
    };
  }

  okButton = () => {
    this.setState({
      instructions: false
    })
  }

  addStuffButton = () => {
    this.setState((state) => {
      state.stuffGrid.headers[state.stuffName] = {type: state.stuffType, sortOrder: 'none'}
      state.stuffName = ''
      return state
    })
  }

  addRowButton = () => {
    const rowURL = prompt("Add a thing to sort")
    if(rowURL === null || rowURL === '') {
      return
    }
    this.setState((state) => {
      state.stuffGrid.rows.push({
        url: rowURL,
        values: ['', '', ''] //TODO defaults from headers
      })
      return state
    })
  }

  deleteButton = (i) => {
    this.setState((state) => {
      state.stuffGrid.rows.splice(i, 1)
      return state
    })
  }

  cellementUpdate = (value, header, i) => {
    this.setState((state) => {
      state.stuffGrid.rows[i].values[header] = value
      return state
    })
  }

  sortHeader = (headerName) => {
    this.setState((state) => {
      const currentOrder = state.stuffGrid.headers[headerName].sortOrder
      if (currentOrder === 'asc') {
        state.stuffGrid.headers[headerName].sortOrder = 'desc'
      } else if (currentOrder === 'desc') {
        state.stuffGrid.headers[headerName].sortOrder = 'none'
      } else {
          state.stuffGrid.headers[headerName].sortOrder = 'asc'
      }

      const sortedRows = state.stuffGrid.rows.slice()
      sortedRows.sort((rowA, rowB) => {
        for(let column of state.stuffGrid.columnSortOrder) {
          const sortOrder = state.stuffGrid.headers[column].sortOrder
          if(rowA.values[column] > rowB.values[column]){
            if(sortOrder === 'asc') {
              return 1
            } else if(sortOrder === 'desc') {
              return -1
            }
          } else if (rowA.values[column] < rowB.values[column]) {
            if(sortOrder === 'asc') {
              return -1
            } else if (sortOrder === 'desc') {
              return 1
            }
          }
        }
        return 0
      })

      state.stuffGrid.rows = sortedRows
      return state
    })
  }


  stuffType = (type) => {
    this.setState({
      stuffType: type
    })
  }

  stuffName = (event) => {
    this.setState({
      stuffName: event.target.value
    })
  }

  testGrid = {
    columnSortOrder: [
      'header2', 'header3', 'header1'
    ],
    headers:{
      header1: {
        type: 'checkbox',
        sortOrder: 'asc'
      },
      header2: {
        type: 'text',
        sortOrder: 'desc'
      },
      header3: {
        type: 'text',
        sortOrder: 'none',
      },
    },
    rows:[
      {
        url: 'google.com',
        values: {
          header1: true,
          header2: 'cats',
          header3: 'dogs',
        },
      },
      {
        url: 'mcwebsite.net',
        values: {
          header1: false,
          header2: 'Ann',
          header3: 'David',
        },
      },
    ]
  }

  render = () => {
    if (this.state.instructions){
      return this.renderInstructions();
    } else {
      return this.renderGrid();
    }
  }

  renderInstructions() {
    return (
      <div id="instructions">
        These would be the instructions for how to use this mama jama.
        <button type="button" onClick={this.okButton}>Got it!</button>
      </div>
    )
  }


  renderCellement(type, value, header, i) {
    if (type === 'checkbox') {
      return (<input type='checkbox'
                checked={this.state.stuffGrid.rows[i].values[header]}
                onChange={(event) => this.cellementUpdate(event.target.checked, header, i)}
                ></input>)
    } else {
      return (<input type='text'
                value={this.state.stuffGrid.rows[i].values[header]}
                onChange={(event) => this.cellementUpdate(event.target.value, header, i)}
                ></input>)
    }
  }

  renderGrid() {
    const inputs = (
      <div id="inputs" key='inputs'>
        <label htmlFor="label">What are you checking for?</label>
        <input type="text" id="label" onChange={this.stuffName} value={this.state.stuffName}></input>
        <p> Will it be a...</p>
        <input type="radio" id="text-input" name="stuffType" onChange={() => this.stuffType("text")} checked={this.state.stuffType === 'text'}></input>
        <label htmlFor="text-input">Text input</label>
        <input type="radio" id="checkbox" name="stuffType" onChange={() => this.stuffType("checkbox")} checked={this.state.stuffType === 'checkbox'}></input>
        <label htmlFor="checkbox">Checkbox</label>
        <button type="button" onClick={this.addStuffButton}>Add to stuff</button>
      </div>
      //htmlfor required by react.js
    )

    const headerElements = [<th key='url'></th>]
      for(let i in this.state.stuffGrid.headers) {
        const order = this.state.stuffGrid.headers[i].sortOrder
        const iconClass = ["fas"]
        if (order === 'asc') {
          iconClass.push("fa-sort-up")
        } else if (order === 'desc'){
          iconClass.push("fa-sort-down")
        } else {
          iconClass.push("fa-sort")
        }
        headerElements.push(<th key={i}>{i}
          <i className={iconClass.join(' ')} onClick={() => this.sortHeader(i)}>S</i>
          <i className="fas fa-trash-alt">T</i>
          </th>)
      }


    const cellements = []
      for(let [i, row] of this.state.stuffGrid.rows.entries()) {
        const cells = [<td key='url'>{row.url}</td>]
        for(let header in this.state.stuffGrid.headers) {
          cells.push(<td key={header}>
            {this.renderCellement(this.state.stuffGrid.headers[header].type, row.values[header], header, i)}
            </td>)
        }
        cells.push(<td key='delete' onClick={() => {
          this.deleteButton(i)
        }}>delete</td>)
        cellements.push(<tr key={i}>{cells}</tr>)
      }//loop to make rows, y'all
    const grid = (
      <table key='table'>
        <thead>
          <tr>
            {headerElements}
          </tr>
        </thead>
        <tbody>
          {cellements}
        </tbody>
      </table>
    )
    const addRowButton =
      <button key='button' onClick={this.addRowButton}>Add a new row!</button>

    return [
      inputs,
      grid,
      addRowButton
    ]
  }
}

export default App;
