import './Pictures.css';

import React from 'react';
import Carousel from 'nuka-carousel';
import uuid from 'uuid';

class Pictures extends React.Component {
  mixins: [Carousel.ControllerMixin];
  getPictures() {

  }

  render(){
    const style = {
      height: '50vh'
    }

    let pictures = "";
    if (this.props.house.pictures[3].link) {
      pictures = this.props.house.pictures[3].link.map(picture => {
        let id = uuid.v4();
        return(
          <img src={picture.href} key={id} style={style}/>
        )
      })
    }

    return(
      <Carousel autoplay={true} wrapAround={true} style={{marginBottom: '2vh'}}>
        {pictures}
      </Carousel>
    )
  }
}

export default Pictures;
