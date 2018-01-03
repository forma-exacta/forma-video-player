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

#### exoplayer
We recommend using exoplayer with react-native-video. It is capable of playing streaming video and has overall better performance than the default player. [Follow these instructions](https://github.com/react-native-community/react-native-video/issues/668#issuecomment-312383674) for installation.

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
![Layout1](https://github.com/forma-exacta/forma-video-player/tree/master/docs/layout1.png)

![Layout2](https://github.com/forma-exacta/forma-video-player/tree/master/docs/layout2.png)

## Styles

## Theme

## Player

## Layout Components

## Control Components

#### Back

#### Mute

#### Play

#### PlayerTime

#### ProgressBar

#### Title

## Custom Components

#### connectVideo

## Redux Integration

## Roadmap
* Add more styling options
