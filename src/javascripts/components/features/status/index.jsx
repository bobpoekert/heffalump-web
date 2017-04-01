import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fetchStatus } from '../../actions/statuses';
import Immutable from 'immutable';
import EmbeddedStatus from '../../components/status';
import MissingIndicator from '../../components/missing_indicator';
import DetailedStatus from './components/detailed_status';
import ActionBar from './components/action_bar';
import Column from '../ui/components/column';
import {
  favourite,
  unfavourite,
  reblog,
  unreblog
} from '../../actions/interactions';
import {
  replyCompose,
  mentionCompose
} from '../../actions/compose';
import { deleteStatus } from '../../actions/statuses';
import { initReport } from '../../actions/reports';
import {
  makeGetStatus,
  getStatusAncestors,
  getStatusDescendants
} from '../../selectors';
import { ScrollContainer } from 'react-router-scroll';
import ColumnBackButton from '../../components/column_back_button';
import StatusContainer from '../../containers/status_container';
import { openMedia } from '../../actions/modal';
import { isMobile } from '../../is_mobile'

const makeMapStateToProps = () => {
  const getStatus = makeGetStatus();

  const mapStateToProps = (state, props) => ({
    status: getStatus(state, Number(props.params.statusId)),
    ancestorsIds: state.getIn(['timelines', 'ancestors', Number(props.params.statusId)]),
    descendantsIds: state.getIn(['timelines', 'descendants', Number(props.params.statusId)]),
    me: state.getIn(['meta', 'me'])
  });

  return mapStateToProps;
};

const Status = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  propTypes: {
    params: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    status: ImmutablePropTypes.map,
    ancestorsIds: ImmutablePropTypes.list,
    descendantsIds: ImmutablePropTypes.list,
    me: React.PropTypes.number
  },

  mixins: [PureRenderMixin],

  componentWillMount () {
    this.props.dispatch(fetchStatus(Number(this.props.params.statusId)));
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.statusId !== this.props.params.statusId && nextProps.params.statusId) {
      this.props.dispatch(fetchStatus(Number(nextProps.params.statusId)));
    }
  },

  handleFavouriteClick (status) {
    if (status.get('favourited')) {
      this.props.dispatch(unfavourite(status));
    } else {
      this.props.dispatch(favourite(status));
    }
  },

  handleReplyClick (status) {
    this.props.dispatch(replyCompose(status, this.context.router));
  },

  handleReblogClick (status) {
    if (status.get('reblogged')) {
      this.props.dispatch(unreblog(status));
    } else {
      this.props.dispatch(reblog(status));
    }
  },

  handleDeleteClick (status) {
    this.props.dispatch(deleteStatus(status.get('id')));
  },

  handleMentionClick (account, router) {
    this.props.dispatch(mentionCompose(account, router));
  },

  handleOpenMedia (media, index) {
    this.props.dispatch(openMedia(media, index));
  },

  handleReport (status) {
    this.props.dispatch(initReport(status.get('account'), status));
  },

  renderChildren (list) {
    return list.map(id => <StatusContainer key={id} id={id} />);
  },

  render () {
    let ancestors, descendants;
    const { status, ancestorsIds, descendantsIds, me } = this.props;

    if (status === null) {
      return (
        <Column>
          <ColumnBackButton />
          <MissingIndicator />
        </Column>
      );
    }

    const account = status.get('account');

    if (ancestorsIds && ancestorsIds.size > 0) {
      ancestors = <div>{this.renderChildren(ancestorsIds)}</div>;
    }

    if (descendantsIds && descendantsIds.size > 0) {
      descendants = <div>{this.renderChildren(descendantsIds)}</div>;
    }

    return (
      <Column>
        <ColumnBackButton />

        <ScrollContainer scrollKey='thread'>
          <div className='scrollable'>
            {ancestors}

            <DetailedStatus status={status} me={me} onOpenMedia={this.handleOpenMedia} />
            <ActionBar status={status} me={me} onReply={this.handleReplyClick} onFavourite={this.handleFavouriteClick} onReblog={this.handleReblogClick} onDelete={this.handleDeleteClick} onMention={this.handleMentionClick} onReport={this.handleReport} />

            {descendants}
          </div>
        </ScrollContainer>
      </Column>
    );
  }

});

export default connect(makeMapStateToProps)(Status);
