import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import AccountContainer from '../../../containers/account_container';
import StatusContainer from '../../../containers/status_container';
import { Link } from 'react-router';

const SearchResults = React.createClass({

  propTypes: {
    results: ImmutablePropTypes.map.isRequired
  },

  mixins: [PureRenderMixin],

  render () {
    const { results } = this.props;

    let accounts, statuses, hashtags;
    let count = 0;

    if (results.get('accounts') && results.get('accounts').size > 0) {
      count   += results.get('accounts').size;
      accounts = (
        <div className='search-results__section'>
          {results.get('accounts').map(accountId => <AccountContainer key={accountId} id={accountId} />)}
        </div>
      );
    }

    if (results.get('statuses') && results.get('statuses').size > 0) {
      count   += results.get('statuses').size;
      statuses = (
        <div className='search-results__section'>
          {results.get('statuses').map(statusId => <StatusContainer key={statusId} id={statusId} />)}
        </div>
      );
    }

    if (results.get('hashtags') && results.get('hashtags').size > 0) {
      count += results.get('hashtags').size;
      hashtags = (
        <div className='search-results__section'>
          {results.get('hashtags').map(hashtag =>
            <Link className='search-results__hashtag' to={`/timelines/tag/${hashtag}`}>
              #{hashtag}
            </Link>
          )}
        </div>
      );
    }

    return (
      <div className='search-results'>
        <div className='search-results__header'>
          <FormattedMessage id='search_results.total' defaultMessage='{count} {count, plural, one {result} other {results}}' values={{ count }} />
        </div>

        {accounts}
        {statuses}
        {hashtags}
      </div>
    );
  }

});

export default SearchResults;
