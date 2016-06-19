import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { fontFaceStyle, fontFaceStyleLoaded } from '../../helpers/buildFontFaces';
import { load } from 'redux/modules/fontFaces';

import debug from 'helpers/debug';

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

  shouldComponentUpdate(nextProps) {
    return this.props.fontFaces !== nextProps.fontFaces;
  }

  render() {
    const { fontFaces, load } = this.props; // eslint-disable-line no-shadow
    console.log(fontFaces);
    debug('component:FontStyles', 'render');

    if (__CLIENT__) {
      const FontFaceObserver = require('fontfaceobserver');

      Object.keys(fontFaces).filter(className => !fontFaces[className]).map(className => {
        const font = new FontFaceObserver(className);

        font.load().then(() => load(className), () => load(className));
      });
    }

    return (
      <div>
        {
          Object.keys(fontFaces).map(className => (
            <style
              key={className}
              dangerouslySetInnerHTML={{
                __html: fontFaces[className] ? `${fontFaceStyle(className)} ${fontFaceStyleLoaded(className)}` : fontFaceStyle(className)
              }}
            />
          ))
        }
      </div>
    );
  }
}
