import React from 'react';
import {connect} from 'dva';

import {HeaderCard, FooterCard, CommentCard, CardsLayout} from '../components/cards';

export default connect()(class extends React.Component {
  render() {
    return (
      <CardsLayout>
        <HeaderCard/>
        <CommentCard/>
        <FooterCard/>
      </CardsLayout>
    )
  }
});
