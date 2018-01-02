import player from './player'

const actionTypes = {
  set: 'CURRENT_TIME:SET'
}

const currentTime = {
  actionTypes: actionTypes,

  actions: {
    currentTime: (time) => ({type: actionTypes.set, payload: time})
  },

  reducer: (state = null, action) => {
    switch(action.type) {
      case player.actionTypes.progress:
        return action.payload ? action.payload.currentTime : state

      case actionTypes.set:
        return action.payload

      default:
        return state
    }
  }
}

export default currentTime
