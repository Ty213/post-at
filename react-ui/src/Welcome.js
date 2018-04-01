import React, { Component } from 'react';



class Welcome extends Component {

  render() {
      return(
        <div className="welcome">
            <div className="welcome__wrapper">
            <div className="welcome__title">@</div>
            <div className="welcome__text">
            <p>With Post@ you can leave anonymous messages wherever you're at and read messages
                other people have left.</p>
            <p>Here's some ideas to get started:</p>
            <ul>
                <li>Leave a secret in the desert</li>
                <li>Leave you mark at love park</li>
                <li>Post a review at a restuarant</li>
                <li>Talk to strangers!</li>
            </ul>
            <p> No usernames or passwords here! We just need your current location to get started.</p>
            <button>Share location</button>
            </div>
            </div>



        </div>
      )
  }
}

export default Welcome;