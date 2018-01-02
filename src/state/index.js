import {combineReducers} from 'redux'

import player from './player'
import currentTime from './currentTime'

export const actionTypes = {
  ...player.actionTypes,
  ...currentTime.actionTypes,
}

export const actions = {
  ...player.actions,
  ...currentTime.actions,
}

export const reducer = combineReducers({
  ...player.reducer,
  currentTime: currentTime.reducer,
})
