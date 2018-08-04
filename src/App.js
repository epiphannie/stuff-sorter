import React, { Component } from 'react';
import logo from './logo.svg';
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
      instructions: true,
    };
  }

  okButton = () => {
    this.setState({
      instructions: false
    })
  }

  render = () => {
    if (this.state.instructions){
      return this.renderInstructions();
    } else {
      return 'no instructions'
    }
  }

  renderInstructions() {
    return (
      <div id="instructions">
        These would be the instructions for how to use this mama jama.
        <button type="button" onClick={this.okButton}>Got it!{this.state.foo}</button>
      </div>
    )
  }
}

export default App;
