import React from 'react'; import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Card from '../components/card';

const mapStateToProps = (state, { statusId }) => ({
  card: state.getIn(['cards', statusId], null)
});

export default connect(mapStateToProps)(Card);
