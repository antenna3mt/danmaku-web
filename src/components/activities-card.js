import React from 'react';
import {Card, Input, Divider, Row, Col, Button, List, Switch, Modal, Popconfirm} from 'antd';
import {connect} from 'dva';

import styles from './cards.css';


class NameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: props.name || ''
    };
  }

  render() {
    const showModal = (e) => {
      e.stopPropagation();
      this.setState({visible: true})
    };
    const hideModal = () => this.setState({visible: false});
    const change = (e) => this.setState({name: e.target.value});
    return <span>
      <span onClick={showModal}>
        {this.props.children}
      </span>
      <Modal title="Enter the name"
             visible={this.state.visible}
             onOk={() => {
               this.props.okHandler({name: this.state.name});
               this.setState({name: ''});
               hideModal();
             }} onCancel={hideModal}>
        <Input value={this.state.name} onChange={change}/>
      </Modal>
    </span>
  }
}


export default connect(function (state) {
  return {
    activities: state.admin.activities,
  }
})(
  ({activities, dispatch}) => {
    const fetchHandler = () => dispatch({type: 'admin/fetch'});
    const newHandler = ({name}) => dispatch({type: 'admin/new', payload: {name}});
    const renameHandler = ({id, name}) => dispatch({type: 'admin/rename', payload: {id, name}});
    const offReviewHandler = ({id}) => dispatch({type: 'admin/off_review', payload: {id}});
    const onReviewHandler = ({id}) => dispatch({type: 'admin/on_review', payload: {id}});
    const switchReviewHandler = (activity) => activity.review_on ? onReviewHandler(activity) : offReviewHandler(activity);
    const deleteHandler = ({id}) => dispatch({type: 'admin/delete', payload: {id}});
    const resetHandler = ({id}) => dispatch({type: 'admin/reset', payload: {id}});

    return <Card className={styles.panel_card}>
      < Button className={styles.btn_with_margin} type="primary" onClick={fetchHandler}>Refresh</Button>
      <NameModal okHandler={newHandler}><Button className={styles.btn_with_margin}
                                                type="primary">New</Button></NameModal>
      <Divider>Activities</Divider>

      <List
        dataSource={activities}
        itemLayout="vertical"
        renderItem={activity => (
          <List.Item
            actions={[
              <NameModal name={activity.name} okHandler={({name}) => renameHandler({...activity, name})}>
                <Button className={styles.btn_with_margin} type="primary">Rename</Button>
              </NameModal>
              ,
              <Button onClick={() => resetHandler(activity)}>Reset</Button>,
              <Popconfirm title="Are you sure delete this task?" onConfirm={() => deleteHandler(activity)}>
                <Button type="danger">Delete</Button>
              </Popconfirm>,
            ]}
          >
            <h3>{activity.name}</h3>
            <Row>
              <Col span={12}>ID</Col><Col span={12}>{activity.id}</Col>
              <Col span={12}>Comment Token</Col><Col span={12}>{activity.comment_token}</Col>
              <Col span={12}>Review Token</Col><Col span={12}>{activity.review_token}</Col>
              <Col span={12}>Display Token</Col><Col span={12}>{activity.display_token}</Col>
              <Col span={12}>Review On</Col><Col span={12}>
              <Switch size="small" checked={activity.review_on} onChange={
                (checked) => {
                  switchReviewHandler({...activity, review_on: checked})
                }
              }/>
            </Col>
              <Col span={12}>Total Count</Col><Col span={12}>{activity.total_count}</Col>
              <Col span={12}>Approved Count</Col><Col span={12}>{activity.approved_count}</Col>
              <Col span={12}>Denied Count</Col><Col span={12}>{activity.denied_count}</Col>
              <Col span={12}>Displayed Count</Col><Col span={12}>{activity.displayed_count}</Col>
            </Row>
          </List.Item>
        )}
      />

    </Card>
  }
);
