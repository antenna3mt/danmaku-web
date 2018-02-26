import React from 'react';
import {connect} from 'dva';

import {HeaderCard, FooterCard, CommentCard, ReviewCard, CardsLayout} from '../components/cards';


export default connect()(class extends React.Component {
  render() {
    return (
      <CardsLayout>
        <HeaderCard/>
        <ReviewCard/>
        <CommentCard/>
        <FooterCard/>
      </CardsLayout>
    )
  }
});
