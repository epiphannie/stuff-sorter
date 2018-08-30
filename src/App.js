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
      state.stuffGrid.headers[state.stuffName] = state.stuffType
      state.stuffName = ''
      return state
    })
  }

  addRowButton = () => {
    const rowURL = prompt("What website are you sorting?")
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
    headers:{
      // header1: 'checkbox',
      // header2: 'text',
      // header3: 'text',
    },
    rows:[
      // {
      //   url: 'google.com',
      //   values: {
      //     header1: true,
      //     header2: 'cats',
      //     header3: 'dogs',
      //   },
      // },
      // {
      //   url: 'mcwebsite.net',
      //   values: {
      //     header1: false,
      //     header2: 'Ann',
      //     header3: 'David',
      //   },
      // },
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


  renderCellement(type, value) {
    if (type === 'checkbox') {
      return <input type='checkbox' checked={value} onChange={() => {console.log('checkbox was checked')}}></input>
    } else {
      return <input type='text' value={value} onChange={() => {console.log('text was changed')}}></input>
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
        headerElements.push(<th key={i}>{i}</th>)
      }
    const cellements = []
      for(let [i, row] of this.state.stuffGrid.rows.entries()) {
        const cells = [<td key='url'>{row.url}</td>]
        for(let header in this.state.stuffGrid.headers) {
          cells.push(<td key={header}>{this.renderCellement(this.state.stuffGrid.headers[header], row.values[header])}</td>)
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
