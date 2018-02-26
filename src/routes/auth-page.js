import React from 'react';
import {connect} from 'dva';

import {HeaderCard, FooterCard, LoginCard, CardsLayout} from '../components/cards';

export default connect()(class extends React.Component {
  render() {
    return (
      <CardsLayout>
        <HeaderCard/>
        <LoginCard/>
        <FooterCard/>
      </CardsLayout>
    )
  }
});
