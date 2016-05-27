import React, { Component, PropTypes } from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import debug from 'helpers/debug';

import html from './htmls';

const style = require('./style.scss');
export default class SurahInfo extends Component {

  state = {
    html: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShowingSurahInfo && nextProps.surah && nextProps.surah.id) {
      debug('component:SurahInfo', 'Set HTML');
      html[`html${nextProps.surah.id}`]((module) => this.setState({html: module}));
    }
  }

  render() {
    const { surah, isShowingSurahInfo, onClose } = this.props;

    return (
      <Col xs={12} className={`${style.container} ${isShowingSurahInfo ? style.show : ''}`}>
        <div className={`${style.close} ss-delete`} onClick={onClose.bind(null, {isShowingSurahInfo: !isShowingSurahInfo})} />
        <Row className={style.row}>
          <Col
            md={3}
            xs={6}
            className={style.bg}
            style={{background: `url(/images/${surah.revelation.place}.jpg) center center no-repeat`}}
          />
          <Col md={1} xs={6} className={style.list}>
            <dl>
              <dt>VERSES</dt>
              <dd className="text-uppercase">{surah.ayat}</dd>
              <dt>PAGES</dt>
              <dd className="text-uppercase">{surah.page.join('-')}</dd>
            </dl>
          </Col>
          <Col md={8} className={`${style.info} times-new`}>
            <div dangerouslySetInnerHTML={{__html: this.state.html}} />
            <div>
              <p>
                <em>Source: Sayyid Abul Ala Maududi - Tafhim al-Qur'an - The Meaning of the Quran</em>
              </p>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}
