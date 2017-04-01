import { STORE_HYDRATE } from '../actions/store';
import Immutable from 'immutable';

const initialState = Immutable.Map({
  access_token: null,
  me: null
});

export default function meta(state = initialState, action) {
  switch(action.type) {
  case STORE_HYDRATE:
    return state.merge(action.state.get('meta'));
  default:
    return state;
  }
};
