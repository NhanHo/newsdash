import { Model, attr, fk } from 'redux-orm'

import { actionTypes as appActionTypes } from 'newsdash/store/actions/app'
import { actionTypes as feedItemActionTypes } from 'newsdash/store/actions/feedItem'

export default class FeedItem extends Model {
  static get modelName() {
    return 'FeedItem'
  }

  static get fields() {
    return {
      id: attr(),
      link: attr(),
      date: attr(),
      title: attr(),
      content: attr(),
      imageUrl: attr(),
      new: attr({ getDefault: () => true }),
      feed: fk('Feed', 'items'),
    }
  }

  static reducer(action, feedItemModel, session) {
    switch (action.type) {
      case feedItemActionTypes.EDIT_FEED_ITEM:
        feedItemModel.withId(action.id).update(action.attrs)
        break
      case feedItemActionTypes.PRUNE: {
        // keep only n items per feed
        const { feedItemsToKeep } = session.App.first().ref
        session
          .Feed
          .all()
          .toModelArray()
          .forEach(
            (feed) => feed
              .items
              .toModelArray()
              .sort((a, b) => b.date - a.date) // sort by date
              .forEach((feedItem, i) => {
                if (i >= feedItemsToKeep) {
                  feedItem.delete()
                }
              })
          )
        // remove orphan feedItems (that don't have a feed)
        feedItemModel
          .all()
          .toModelArray()
          .filter((feedItem) => !feedItem.feed)
          .forEach((feedItem) => feedItem.delete())
        break
      }
      case appActionTypes.LOAD_STATE:
        if (action.data.feedItems) {
          action.data.feedItems.forEach(
            (feeditem) => feedItemModel.upsert(feeditem)
          )
        }
        break
      default:
        break
    }
  }
}
