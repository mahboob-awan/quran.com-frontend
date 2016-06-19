import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fontFaceStyle, fontFaceStyleLoaded } from '../../helpers/buildFontFaces';
import { load } from 'redux/modules/fontFaces';

@connect(
  state => ({
    fontFaces: state.fontFaces
  }),
  { load }
)
export default class FontStyles extends Component {
  static propTypes = {
    fontFaces: PropTypes.object.isRequired
  };

  render() {
    const { fontFaces, load } = this.props; // eslint-disable-line no-shadow

    if (__CLIENT__) {
      const FontFaceObserver = require('fontfaceobserver');

      Object.keys(fontFaces).filter(className => !fontFaces[className]).map(className => {
        const font = new FontFaceObserver(className);

        font.load().then(() => load(className), () => load(className));
      });
    }

    return (
      <Helmet
        style={Object.keys(fontFaces).map(className => ({
          cssText: fontFaces[className] ? fontFaceStyleLoaded(className) : fontFaceStyle(className)
        }))}
      />
    );
  }
}
