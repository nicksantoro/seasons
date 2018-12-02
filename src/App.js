import React, { Component } from 'react';
import './App.css';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     lat: null,
  //     long: null,
  //     errorMessage: ''
  //   };
  // }

  state = {
    lat: null,
    long: null,
    errorMessage: ''
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude, long: position.coords.longitude }),
      err => this.setState({ errorMessage: err.message })
    );
  };

  componentDidUpdate() {
    console.log('My component was just updated - it rerendered!')
  }

  renderContent() {
    if (this.state.errorMessage && (!this.state.lat || !this.state.long)) {
      return <div className="App"><div>Error: {this.state.errorMessage}</div></div>
    }
    if (!this.state.errorMessage && this.state.lat && this.state.long) {
      // return <div className="App"><div>My Location:</div><div>Latitude: {this.state.lat}</div> <div>Longitude: {this.state.long}</div></div>
      return <SeasonDisplay lat={this.state.lat} />
    }
    return <div className="App"><div><Spinner message="Please accept location request" /></div></div>
  }

  // try not to have multiple return statements in render method
  // multiple return statement, but in a render method

  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    )

    // return (
    //   <div className="App">
    //     <div>My current location:</div>
    //     {this.state.errorMessage ? <div>Error: {this.state.errorMessage}</div> : null}
    //     {!this.state.errorMessage ? <div>Latitude: {this.state.lat} Longitude: {this.state.long}</div> : null}

    //     <SeasonDisplay />
    //   </div>
    // );
  }
}

export default App;
