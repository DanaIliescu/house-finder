import {Component} from 'react';
import ReactDOMServer from 'react-dom/server'

class InfoWindow extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
      this.renderInfoWindow();
    }

    if (this.props.children !== prevProps.children) {
      this.updateContent();
    }

    if ((this.props.visible !== prevProps.visible) ||
        (this.props.marker !== prevProps.marker)) {
      this.props.visible ? this.openWindow() : this.closeWindow();
    }
  }

  renderInfoWindow(){
    let {google} = this.props;

    const iw = this.infoWindow = new google.maps.InfoWindow({
      content: ''
    });

    google.maps.event.addListener(iw, 'closeclick', this.onClose.bind(this));
    google.maps.event.addListener(iw, 'domready', this.onOpen.bind(this));
  }

  updateContent() {
    const content = this.renderChildren();
    this.infoWindow.setContent(content);
  }

  renderChildren() {
    const {children} = this.props;
    return ReactDOMServer.renderToString(children);
  }

  openWindow() {
    this.infoWindow.open(this.props.map, this.props.marker);
  }

  closeWindow() {
    this.infoWindow.close();
  }

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return null;
  }
}

export default InfoWindow;
