import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import InnerHeader from '../../account/components/header';
import ActionBar from '../../account/components/action_bar';
import MissingIndicator from '../../../components/missing_indicator';

const Header = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  propTypes: {
    account: ImmutablePropTypes.map,
    me: React.PropTypes.number.isRequired,
    onFollow: React.PropTypes.func.isRequired,
    onBlock: React.PropTypes.func.isRequired,
    onMention: React.PropTypes.func.isRequired,
    onReport: React.PropTypes.func.isRequired,
    onMute: React.PropTypes.func.isRequired
  },

  mixins: [PureRenderMixin],

  handleFollow () {
    this.props.onFollow(this.props.account);
  },

  handleBlock () {
    this.props.onBlock(this.props.account);
  },

  handleMention () {
    this.props.onMention(this.props.account, this.context.router);
  },

  handleReport () {
    this.props.onReport(this.props.account);
    this.context.router.push('/report');
  },

  handleMute() {
    this.props.onMute(this.props.account);
  },

  render () {
    const { account, me } = this.props;

    if (account === null) {
      return <MissingIndicator />;
    }

    return (
      <div>
        <InnerHeader
          account={account}
          me={me}
          onFollow={this.handleFollow}
        />

        <ActionBar
          account={account}
          me={me}
          onBlock={this.handleBlock}
          onMention={this.handleMention}
          onReport={this.handleReport}
          onMute={this.handleMute}
        />
      </div>
    );
  }
});

export default Header;
