import React from 'react';
import {Card, Input, Icon} from 'antd';
import {connect} from 'dva';

import styles from './cards.css';

export default connect(
  state => ({token: state.auth.token,})
)(
  ({dispatch, token}) => (
    <Card className={styles.panel_card} title="Login">
      <Input.Search placeholder="Token" enterButton={<Icon type="login"/>} size="large"
                    onSearch={() => dispatch({type: 'auth/login'})}
                    onChange={event => dispatch({type: 'auth/change', payload: {token: event.target.value}})}
                    value={token}/>
    </Card>
  )
);
