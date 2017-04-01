import { createSelector } from 'reselect';
import Immutable from 'immutable';

const getStatuses = state => state.get('statuses');
const getAccounts = state => state.get('accounts');

const getAccountBase         = (state, id) => state.getIn(['accounts', id], null);
const getAccountRelationship = (state, id) => state.getIn(['relationships', id]);

export const makeGetAccount = () => {
  return createSelector([getAccountBase, getAccountRelationship], (base, relationship) => {
    if (base === null) {
      return null;
    }

    return base.set('relationship', relationship);
  });
};

export const makeGetStatus = () => {
  return createSelector(
    [
      (state, id) => state.getIn(['statuses', id]),
      (state, id) => state.getIn(['statuses', state.getIn(['statuses', id, 'reblog'])]),
      (state, id) => state.getIn(['accounts', state.getIn(['statuses', id, 'account'])]),
      (state, id) => state.getIn(['accounts', state.getIn(['statuses', state.getIn(['statuses', id, 'reblog']), 'account'])]),
    ],

    (statusBase, statusReblog, accountBase, accountReblog) => {
      if (!statusBase) {
        return null;
      }

      if (statusReblog) {
        statusReblog = statusReblog.set('account', accountReblog);
      } else {
        statusReblog = null;
      }

      return statusBase.withMutations(map => {
        map.set('reblog', statusReblog);
        map.set('account', accountBase);
      });
    }
  );
};

const getAlertsBase = state => state.get('alerts');

export const getAlerts = createSelector([getAlertsBase], (base) => {
  let arr = [];

  base.forEach(item => {
    arr.push({
      message: item.get('message'),
      title: item.get('title'),
      key: item.get('key'),
      dismissAfter: 5000
    });
  });

  return arr;
});

export const makeGetNotification = () => {
  return createSelector([
    (_, base)             => base,
    (state, _, accountId) => state.getIn(['accounts', accountId])
  ], (base, account) => {
    return base.set('account', account);
  });
};
