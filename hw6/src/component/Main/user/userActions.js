import { url, resource } from '../../../backend'
import * as Actions from "../../../actions"

export const updateFollowing = (method, username) => (dispatch) => {
    resource(method, 'following/' +  username)
        .then(r => {
            dispatch({ type: Actions.UPDATE_FOLLOW})
            r.following.map(
                (username, id) => {
                    let account = {"name" : username}
                    resource('GET', 'headlines/' + username)
                        .then(r => {
                            account['text'] = r.headlines[0].headline
                        })
                        .then(r => {
                            resource('GET', 'avatars/' +  username)
                                .then( r => {
                                    account['image'] = r.avatars[0].avatar
                                    account["id"] = id
                                    dispatch({type: Actions.ADD_FOLLOW, account})
                                })
                        })
                }    
            )
        })
        .catch( r => {
            Actions.setErrorMsg(r.message)(dispatch)
        })
}

export const unfollowFetch = (username) => (dispatch) => {
    updateFollowing("DELETE",username)(dispatch)
    dispatch({type: Actions.UNFOLLOW, username})
}
