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
  }

  addRowButton = () => {
    console.log('it worked')
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
      header1: 'checkbox',
      header2: 'text',
      header3: 'text',
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


  renderCellement(type, value) {
    if (type === 'checkbox') {
      return <input type='checkbox' checked={value}></input>
    } else {
      return <input type='text' value={value}></input>
    }
  }

  renderGrid() {
    const inputs = (
      <div id="inputs">
        <label htmlFor="label">What are you checking for?</label>
        <input type="text" id="label" onChange={this.stuffName}></input>
        <p> Will it be a...</p>
        <input type="radio" id="text-input" name="stuffType" onChange={() => this.stuffType("text")}></input>
        <label htmlFor="text-input">Text input</label>
        <input type="radio" id="checkbox" name="stuffType" onChange={() => this.stuffType("checkbox")}></input>
        <label htmlFor="checkbox">Checkbox</label>
        <button type="button" onClick={this.addStuffButton}>Add to stuff</button>
      </div>
      //htmlfor required by react.js
    )

    const headerElements = [<th>url</th>]
      for(let i in this.state.stuffGrid.headers) {
        headerElements.push(<th>{i}</th>)
      }
    const cellements = []
      for(let row of this.state.stuffGrid.rows) {
        const cells = [<td>{row.url}</td>]
        for(let header in this.state.stuffGrid.headers) {
          cells.push(<td>{this.renderCellement(this.state.stuffGrid.headers[header], row.values[header])}</td>)
        }
        cellements.push(<tr>{cells}</tr>)
      }//loop to make rows, y'all
    const grid = (
      <table>
        <thead>
          {headerElements}
        </thead>
        <tbody>
          {cellements}
        </tbody>
      </table>
    )
    const addRowButton =
      <button onClick={this.addRowButton}>Add a new row!</button>

    return [
      inputs,
      grid,
      addRowButton
    ]
  }
}

export default App;
