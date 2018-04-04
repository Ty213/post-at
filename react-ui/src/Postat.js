import React, { Component } from 'react';
const _ = require('lodash');



class Postat extends Component {
  state = {
    postats: null,
    location: {lng: sessionStorage.lng,
      lat: sessionStorage.lat},
    smiles: [],
    byTime: []
  }

  componentDidMount() {
    this.getPostats();
  }

  getPostats(){
    fetch(`/api/${this.state.location.lng},${this.state.location.lat}`)
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

  updateEmoji(emoji,id) {
    fetch(`/api/postats/${id}/${emoji}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    }).then(() => this.getPostats());
  }

  render() {
    if(this.state.smiles) {
       return(
        this.state.byTime.map((postat) => {
          return(
            <div className="postat">
            <p key={postat._id}>{postat.text}</p>
            <div className="postat__emoji">
            <div onClick={(e) => this.updateEmoji('smile',postat._id)}>
            <i  className="far fa-smile"></i> <span className="postat__counter"> {postat.smile} </span> 
            </div>
            <div onClick={(e) => this.updateEmoji('frown',postat._id)}>
            <i  className="far fa-frown"></i> <span className="postat__counter"> {postat.frown} </span>
            </div>
            </div>
            <hr />
            </div>
          ) 
        })
       )
    }
      return(
    <div>No Post@s at here. Start the party!</div>
      )
  }
}

export default Postat;