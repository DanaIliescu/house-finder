import './InfoDialog.css';

import {getMatrixData} from '../../helpers.js';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Pictures from '../pictures/Pictures.js';

export default class InfoDialog extends React.Component {
  constructor(props) {
      super(props);
      this.state = {open: this.props.open};
  }

  handleClose(){
    this.setState ({
      open: false
    });
    this.props.onCloseDialog();
  };

  render() {
    let {house}=this.props;

    const actions = [
      <a href={house["ad-url"].href} target="_blank">
        <FlatButton
          label="DBA"
          primary={true}
          onClick={this.handleClose.bind(this)}
        />
      </a>,
      <a href={house["external-url"].href} target="_blank">
        <FlatButton
          label="BoligPortal"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleClose.bind(this)}
        />
      </a>
    ];

    return (
       <Dialog
         title={
           <div>
            <i className="fa fa-times" aria-hidden="true" onClick={this.handleClose.bind(this)}></i>
           </div>
         }
         actions={actions}
         modal={false}
         open={this.state.open}
         onRequestClose={this.handleClose.bind(this)}
         autoScrollBodyContent={true}
       >
        <Pictures house={this.props.house}/>
        <div className="detailsContainer" style={{marginBottom: '2vh'}}>
          <div className="info" style={{width: '58%'}}>
            <h3>Bolig</h3>
            <div className="boligInfo">
              <span>Boligtype</span>
              <span>{getMatrixData("Boligtype", this.props.house.matrixdata)}</span>
            </div>
            <div className="boligInfo">
              <span>Antal værelser</span>
              <span>{getMatrixData("Antal værelser", this.props.house.matrixdata)}</span>
            </div>
            <div className="boligInfo">
              <span>Boligkvm.</span>
              <span>{getMatrixData("Boligkvm.", this.props.house.matrixdata)}</span>
            </div>
            <div className="boligInfo">
              <span>Adresse</span>
              <span>{this.props.house["ad-address"].street} {this.props.house["ad-address"]["zip-code"]} {this.props.house["ad-address"].city} </span>
            </div>
          </div>
          <div className="info" style={{width: '38%'}}>
            <h3>Udlejning</h3>
            <div className="boligInfo">
              <span>Lejeperiode</span>
              <span>{getMatrixData("Lejeperiode", this.props.house.matrixdata)}</span>
            </div>
            <div className="boligInfo">
              <span>Månedlig leje</span>
              <span>{this.props.house.price}</span>
            </div>
            <div className="boligInfo">
              <span>Depositum</span>
              <span>{getMatrixData("Depositum", this.props.house.matrixdata)}</span>
            </div>
          </div>
        </div>
        <div style={{height: '20%'}}>
          <h3>Beskrivelse</h3>
          {this.props.house["additional-text"]}
        </div>
       </Dialog>
   );
 }
}
