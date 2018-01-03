Forma Video Player
===================

Complete video player solution for [react-native-video](https://github.com/react-native-community/react-native-video)  
Customizable  
Extensible

## Installation
Requires [react-native-video](https://github.com/react-native-community/react-native-video) ^2.0.0 to be installed
```
yarn add forma-video-player
```

## Default Player
```
import {Player} from 'forma-video-player'

const videoProps = {
  name: 'Big Buck Bunny',
  source: {
    uri: 'https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4'
  }
}

...

render() {
  return (
    <View style={{flex: 1}}>
      <Player videoProps={videoProps} />
    </View>
  )
}

```

![Default Player gif](https://github.com/forma-exacta/forma-video-player/tree/master/docs/default_player.gif)

## Layout

## Styles

## Theme

## Player

## Layout Components

## Control Components

## Custom Components

#### connectVideo

## Redux Integration

## Roadmap
* Add more styling options
