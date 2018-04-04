import React, { Component } from 'react';


class SubmitPostat extends Component {
  state = {
    text: null,
    location: {lng: sessionStorage.lng,
      lat: sessionStorage.lat}
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  createPostat() {
    fetch('/api/postats', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
	"text": this.state.text,
	 "loc": { 
         "type": "Point",
         "coordinates": [parseFloat(sessionStorage.lng), parseFloat(sessionStorage.lat)]
            }
        })
    }).then(() => window.location.reload());
}
 

  postPostat(e) {
      this.createPostat();
  }

  componentDidMount() {
    // fetch(`/api/${this.state.location.lng},${this.state.location.lat}`)
    //   .then(res => res.json())
    //   .then(postats => this.setState({ postats }));
  }


  

  render() {
      return(
        <div className="SubmitPostat__wrapper">
            <input className="SubmitPostat__input" value={this.state.value} onChange={(e) => {this.handleChange(e)}}/>
            <button onClick={(e) => this.postPostat(e)}>Post@</button>
        </div>
      )
   
  }
}

export default SubmitPostat;
