import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import {
  refreshTimelineSuccess,
  updateTimeline,
  deleteFromTimelines,
  refreshTimeline
} from '../actions/timelines';
import { updateNotifications, refreshNotifications } from '../actions/notifications';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {
  applyRouterMiddleware,
  useRouterHistory,
  Router,
  Route,
  IndexRedirect,
  IndexRoute
} from 'react-router';
import { useScroll } from 'react-router-scroll';
import UI from '../features/ui';
import Status from '../features/status';
import GettingStarted from '../features/getting_started';
import PublicTimeline from '../features/public_timeline';
import CommunityTimeline from '../features/community_timeline';
import AccountTimeline from '../features/account_timeline';
import HomeTimeline from '../features/home_timeline';
import Compose from '../features/compose';
import Followers from '../features/followers';
import Following from '../features/following';
import Reblogs from '../features/reblogs';
import Favourites from '../features/favourites';
import HashtagTimeline from '../features/hashtag_timeline';
import Notifications from '../features/notifications';
import FollowRequests from '../features/follow_requests';
import GenericNotFound from '../features/generic_not_found';
import FavouritedStatuses from '../features/favourited_statuses';
import Blocks from '../features/blocks';
import Report from '../features/report';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import pt from 'react-intl/locale-data/pt';
import hu from 'react-intl/locale-data/hu';
import uk from 'react-intl/locale-data/uk';
import getMessagesForLocale from '../locales';
import { hydrateStore } from '../actions/store';
import createStream from '../stream';

const store = configureStore();

store.dispatch(hydrateStore(window.INITIAL_STATE));

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: '/web'
});

addLocaleData([...en, ...de, ...es, ...fr, ...pt, ...hu, ...uk]);

const Mastodon = React.createClass({

  propTypes: {
    locale: React.PropTypes.string.isRequired
  },

  componentDidMount() {
    const { locale }  = this.props;
    const accessToken = store.getState().getIn(['meta', 'access_token']);

    this.subscription = createStream(accessToken, 'user', {

      received (data) {
        switch(data.event) {
        case 'update':
          store.dispatch(updateTimeline('home', JSON.parse(data.payload)));
          break;
        case 'delete':
          store.dispatch(deleteFromTimelines(data.payload));
          break;
        case 'notification':
          store.dispatch(updateNotifications(JSON.parse(data.payload), getMessagesForLocale(locale), locale));
          break;
        }
      },

      reconnected () {
        store.dispatch(refreshTimeline('home'));
        store.dispatch(refreshNotifications());
      }

    });

    // Desktop notifications
    if (typeof window.Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  },

  componentWillUnmount () {
    if (typeof this.subscription !== 'undefined') {
      this.subscription.close();
      this.subscription = null;
    }
  },

  render () {
    const { locale } = this.props;

    return (
      <IntlProvider locale={locale} messages={getMessagesForLocale(locale)}>
        <Provider store={store}>
          <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
            <Route path='/' component={UI}>
              <IndexRedirect to="/getting-started" />

              <Route path='getting-started' component={GettingStarted} />
              <Route path='timelines/home' component={HomeTimeline} />
              <Route path='timelines/public' component={PublicTimeline} />
              <Route path='timelines/public/local' component={CommunityTimeline} />
              <Route path='timelines/tag/:id' component={HashtagTimeline} />

              <Route path='notifications' component={Notifications} />
              <Route path='favourites' component={FavouritedStatuses} />

              <Route path='statuses/new' component={Compose} />
              <Route path='statuses/:statusId' component={Status} />
              <Route path='statuses/:statusId/reblogs' component={Reblogs} />
              <Route path='statuses/:statusId/favourites' component={Favourites} />

              <Route path='accounts/:accountId' component={AccountTimeline} />
              <Route path='accounts/:accountId/followers' component={Followers} />
              <Route path='accounts/:accountId/following' component={Following} />

              <Route path='follow_requests' component={FollowRequests} />
              <Route path='blocks' component={Blocks} />
              <Route path='report' component={Report} />

              <Route path='*' component={GenericNotFound} />
            </Route>
          </Router>
        </Provider>
      </IntlProvider>
    );
  }

});

export default Mastodon;
