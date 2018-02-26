import React from 'react';
import {Card, Input, Divider, Row, Col, Icon, Button} from 'antd';
import {connect} from 'dva';

import styles from './cards.css';


const ColorTag = connect()(
  ({color, label, style, dispatch}) => (
    <Col span={8}>
      <Button type="primary" className={styles.color_btn}
              style={{backgroundColor: color, ...style,}}
              onClick={() => dispatch({type: 'comment/save', payload: {color}})}
      />
    </Col>
  )
);

export default connect(
  state => ({
    color: state.comment.color,
    text: state.comment.text,
  })
)(
  ({dispatch, color, text}) => (
    <Card className={styles.panel_card} title="Push Comment">
      <Input.Search
        prefix={<Icon type="caret-right" style={{color}}/>}
        onSearch={() => dispatch({type: 'comment/push'})}
        onChange={e => dispatch({type: 'comment/save', payload: {text: e.target.value}})}
        value={text}
        enterButton="Push"
      />
      <Divider/>
      <Row>
        <ColorTag color="#ffffff" label="White" style={{color: "#999"}}/>
        <ColorTag color="#db2828" label="Red"/>
        <ColorTag color="#f2711c" label="Orange"/>
        <ColorTag color="#fbbd08" label="Yellow"/>
        <ColorTag color="#b5cc18" label="Olive"/>
        <ColorTag color="#21ba45" label="Green"/>
        <ColorTag color="#00b5ad" label="Teal"/>
        <ColorTag color="#2185d0" label="Blue"/>
        <ColorTag color="#6435c9" label="Violet"/>
        <ColorTag color="#a333c8" label="Purple"/>
        <ColorTag color="#e03997" label="Pink"/>
        <ColorTag color="#a5673f" label="Brown"/>
      </Row>
    </Card>
  )
);
