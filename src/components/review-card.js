import React from 'react';
import {Card, Divider, Button, List} from 'antd';
import {connect} from 'dva';

import styles from './cards.css';


export default connect(
  state => ({comments: state.review.comments})
)(
  ({dispatch, comments}) => (
    <Card className={styles.panel_card}>
      <Button.Group>
        <Button type="primary" onClick={() => dispatch({type: 'review/fetch'})}>Fetch</Button>
        <Button onClick={() => dispatch({type: 'review/approve_all'})}>Approve All</Button>
        <Button onClick={() => dispatch({type: 'review/deny_all'})}>Deny All</Button>
      </Button.Group>
      <Divider/>
      <List
        dataSource={comments}
        itemLayout="vertical"
        renderItem={comment => (
          <List.Item actions={[
            <Button onClick={() => dispatch({type: 'review/approve', payload: {comment}})}>Approve</Button>,
            <Button onClick={() => dispatch({type: 'review/deny', payload: {comment}})} type="danger">Deny</Button>
          ]}>
            <List.Item.Meta
              description={comment.content}
            />
          </List.Item>
        )}
      />

    </Card>
  )
);
