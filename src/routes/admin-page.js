import React from 'react';
import {connect} from 'dva';

import {HeaderCard, FooterCard, ActivitiesCard, CardsLayout} from '../components/cards';


export default connect()(class extends React.Component {
  render() {
    return (
      <CardsLayout>
        <HeaderCard/>
        <ActivitiesCard/>
        <FooterCard/>
      </CardsLayout>
    )
  }
});
