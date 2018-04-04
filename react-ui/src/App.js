import React, { Component } from 'react';
import Postat from './Postat';
import Welcome from './Welcome';
import SubmitPostat from './SubmitPostat';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
const _ = require('lodash');

class App extends Component {
    constructor(props) {
      super(props);
      this.setLocation = this.setLocation.bind(this);
      this.state = {
        loggedIn: false,
        loc: null,
        smiles: null,
        byTime: null
      }
    }

    getLocation() {
      if(sessionStorage.lng && sessionStorage.lat) {
        let location = [];
        location.push(sessionStorage.lng);
        location.push(sessionStorage.lat);
        this.setState({loc: location});
      }
      navigator.geolocation.getCurrentPosition(this.setLocation);
    }
    setLocation(position) {
      let location = [];
      location.push(position.coords.longitude);
      location.push(position.coords.latitude);
      sessionStorage.lng = position.coords.longitude;
      sessionStorage.lat = position.coords.latitude;
      this.setState({loc: location});
      this.getPostats();   
    }

    getPostats(){
      fetch(`/api/${sessionStorage.lng},${sessionStorage.lat}`)
        .then(res => res.json())
        .then(postats => this.setState({ postats }))
        .then(() => this.sortPostats());
        
    }
    sortPostats() {
      var smiles = _.orderBy(this.state.postats.results, ['smile'], ['desc']);
      var byTime = _.orderBy(this.state.postats.results, ['_id'], ['desc']);
      this.setState({ smiles });
      this.setState( {byTime} );
    }


  render() {
    if(sessionStorage.lng && sessionStorage.lat) {
      return(
        <Router>
        <div className="App">
        <Header />
        <SubmitPostat />
        <Toggle />
        <Route 
        exact path='/'
        render={(props) => <Welcome {...props} getLocation={this.getLocation.bind(this)}/>}
        />
        <Route 
         exact path="/postat/new" 
          render={(props) => <Postat {...props} postats= {this.state.byTime} getPostats={this.getPostats.bind(this)} />} 
        />
        <Route 
         exact path="/postat/top" 
          render={(props) => <Postat {...props} postats= {this.state.smiles} getPostats={this.getPostats.bind(this)} />} 
        />
        </div>
        </Router>
      )
    }
      return (
        <Router>
        <div className="App">
        <Route 
       exact path='/'
        render={(props) => <Welcome {...props} getLocation={this.getLocation.bind(this)}/>}
        />
         <Route 
          path="/postat" 
          render={(props) => <Postat {...props} postats= {this.state.byTime} getPostats={this.getPostats.bind(this)} />} 
        />
        </div>
        </Router>
      );
    }

    
}

export default App;

function Header() {
  return(
    <div className="header color-change-4x">
    <div className="headerIcon">
    <h1>@</h1>
    </div>
    </div>
  )
}

function Toggle() {
  return(
    <div className= "Toggle">
    <div className="Toggle__input selected"><Link to="/postat/new"><p>New</p></Link></div> 
    <div className="Toggle__input"><Link to="/postat/top"><p>Top</p></Link></div>
    </div>
  )
}