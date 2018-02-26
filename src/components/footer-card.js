import React from 'react';
import {Card, Divider} from 'antd';
import {connect} from 'dva';
import styles from './cards.css';

export default connect()(class extends React.Component {
  render() {
    return (
      <Card className={styles.panel_card}>
        <div className={styles.footer_text}>
          <p>
            Danmaku, Yi Jin all rights reserved.
          </p>
          <Divider/>
          <p>
            Need interactive live commenting system for your events? <br/>
          </p>
          Contacts
          <ul>
            <li>Email: antennt3mt@gmail.com</li>
            <li>Wechat: antenna95</li>
          </ul>


        </div>
      </Card>
    )
  }
});

