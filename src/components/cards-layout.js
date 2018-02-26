import React from 'react';
import {Spin} from 'antd';
import {connect} from 'dva';

export default connect(function (state) {
  return {
    loading: state.loading.loading,
  };
})(class extends React.Component {
  render() {
    return (
      <div>
        <Spin spinning={this.props.loading}>
          {this.props.children}
        </Spin>
      </div>
    )
  }
});
