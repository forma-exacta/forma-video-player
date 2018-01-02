import {State} from 'replate'
import {makeState} from '../util'

export const defaultTheme = {
  control: {
    size: 25,
    iconColor: '#ffffff',
    fontSize: 14,
    textColor: '#ffffff',
    underlayColor: '#ffffff',
    backgroundColor: 'transparent'
  }
}

const playerValues = [
  {name:'source', initial: null},
  {name:'buffering', initial: false},
  {name:'error', initial: null},
  {name:'ignoreSilentSwitch', initial: null},
  {name:'loaded', initial: false},
  {name:'loading', initial: false},
  {name:'metadata', initial: null},
  {name:'muted', initial: false},
  {name:'paused', initial: true},
  {name:'playInBackground', initial: false},
  {name:'playWhenInactive', initial: false},
  {name:'progress', initial: null},
  {name:'progressUpdateInterval', initial: 250},
  {name:'rate', initial: 1.0},
  {name:'repeat', initial: false},
  {name:'resizeMode', initial: 'contain'},
  {name:'volume', initial: 1.0},
  {name:'duration', initial: null},
  {name:'ref', initial: null},
  {name:'ended', initial: false},
  {name:'name', initial: null},
  {name:'back', initial: null},
  {name:'styles', initial: {}},
  {name:'theme', initial: defaultTheme}
]

export default makeState('player', playerValues)
