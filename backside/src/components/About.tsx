//import React from 'react';

const About = () => {
  // Let's clear the local storage here
  //localStorage.clear();
  return (<><p></p>
    <h2 style={{ color: "	#CD5C5C", marginLeft: "25px" }}><strong>About Canine Shelter</strong></h2>
    <img style={{ width: "600px" }}
      src="/src/assets/dog_d.png"
      alt="shelter-img"
      className="profile-img-card"
    />
     <h3 style={{padding:10}}>The Canine Shelter is a charity that hopes to match shelter dogs with new owners and arrange visits to shelter locations to meet the dogs.</h3>

  </>)
}

export default About;