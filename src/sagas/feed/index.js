import { call, takeEvery, takeLatest } from 'redux-saga/effects'

import loadFeedSaga from './loadFeed'
import fetchFeedsSaga from './fetchFeedsSaga'
import periodicallyFetchFeedsSaga from './periodicallyFetchFeedsSaga'
import periodicallyPruneFeedItemsSaga from './periodicallyPruneFeedItemsSaga'
import refreshFeedSaga from './refreshFeed'
import { actionTypes as feedActionTypes } from '../../store/actions/feed'

export default [
  takeEvery(feedActionTypes.ADD_FEED, fetchFeedsSaga),
  takeEvery(feedActionTypes.LOAD_FEED, loadFeedSaga),
  takeLatest(feedActionTypes.REFRESH_FEED, refreshFeedSaga),
  call(periodicallyFetchFeedsSaga),
  call(periodicallyPruneFeedItemsSaga),
]
