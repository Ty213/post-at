import React, { Component } from 'react';




class Postat extends Component {
  state = {
    postats: null,
    location: {lng: sessionStorage.lng,
      lat: sessionStorage.lat},
  }


  componentDidMount() {
    this.props.getPostats();
  }

  updateEmoji(emoji,id) {
    fetch(`/api/postats/${id}/${emoji}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    }).then(() => this.props.getPostats());
  }

  render() {
    if(this.props.postats) {
       return(
        this.props.postats.map((postat) => {
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
    <div>Getting location...</div>
      )
  }
}

export default Postat;