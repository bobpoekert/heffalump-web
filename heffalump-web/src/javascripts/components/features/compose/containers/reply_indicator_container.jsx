import React from 'react'; import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { cancelReplyCompose } from '../../../actions/compose';
import { makeGetStatus } from '../../../selectors';
import ReplyIndicator from '../components/reply_indicator';

const makeMapStateToProps = () => {
  const getStatus = makeGetStatus();

  const mapStateToProps = (state, props) => ({
    status: getStatus(state, state.getIn(['compose', 'in_reply_to'])),
  });

  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({

  onCancel () {
    dispatch(cancelReplyCompose());
  }

});

export default connect(makeMapStateToProps, mapDispatchToProps)(ReplyIndicator);
