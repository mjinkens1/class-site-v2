import * as authenticationActions from './authentication/actions'
import * as databaseActions from './database/actions'
import * as fileFullscreenActions from './fileFullscreen/actions'
import * as rssActions from './rss/actions'

export const actions = {
    ...authenticationActions,
    ...databaseActions,
    ...fileFullscreenActions,
    ...rssActions,
}
