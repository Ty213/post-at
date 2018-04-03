import React, { Component } from 'react';
import {
    Route,
    HashRouter,
    Redirect
  } from "react-router-dom";
  import Postat from './Postat';



class Welcome extends Component {
    constructor(props) {
        super(props);
        this.setLocation = this.setLocation.bind(this);
      }
    state = {
        redirect: false
    }

    checkLocation() {
        console.log("checklocation ran");
        console.log(sessionStorage.getItem('lng'));
        if(sessionStorage.lng && sessionStorage.lat){
            this.setState({ redirect: true });
        }
        navigator.geolocation.getCurrentPosition(this.setLocation);
      }
      setLocation(position) {
        sessionStorage.setItem("lng", position.coords.longitude);
        sessionStorage.setItem("lat", position.coords.latitude);
        this.setState({ redirect: true });
        console.log(this.state.redirect)
      }

      

  render() {
    var { redirect } = this.state;

    if (redirect) {
        return <Redirect from="/" to={{ pathname: `/postat/${sessionStorage.getItem('lng')},${sessionStorage.getItem('lat')}` }} />;
      }
      return(
        <div className="welcome">
            <div className="welcome__wrapper">
            <div className="welcome__title">@</div>
            <div className="welcome__text">
            <p>With Post@ you can leave anonymous messages wherever you're at and read messages
                other people have left.</p>
            <ul>
                <i>
                <li>Post a review at a resturaunt</li>
                <li>Leave your mark at the park</li>
                <li>Leave a secret in desert</li>
                </i>
            </ul>
            <p> No usernames or passwords here! We just need your current location to get started.</p>
            <button onClick={(e) => this.checkLocation(e)}>Share location</button>
            </div>
            </div>
        </div>
      )
  }
}

export default Welcome;