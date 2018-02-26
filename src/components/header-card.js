import React from 'react';
import {Card} from 'antd';
import {connect} from 'dva';
import styles from './cards.css';


export default connect()(class extends React.Component {
  render() {
    let {title} = this.props;
    return (
      <Card className={styles.panel_card}>
        <div className={styles.header_text}>
          {title}
          <div>
            <small>Danmaku</small>
          </div>
        </div>
      </Card>
    )
  }
});
