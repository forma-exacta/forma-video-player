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

![Default Player gif](https://raw.githubusercontent.com/forma-exacta/forma-video-player/master/docs/default_player.gif)

## Components
[Player](#player)

###### Layout Components
[Header](#header)  
[Body](#body)  
[Footer](#footer)  
[ControlGroup](#controlgroup)  

###### Controls
[Back](#back-1)  
[Mute](#mute)  
[Play](#play)  
[PlayerTime](#playertime)  
[ProgressBar](#progressbar)  
[Title](#title)  

## Player
```
import {Player} from 'forma-video-player'

<Player
  videoProps=Required object
  back=function
  styles=object
  theme=object
  layout=object
/>
```

#### Props

`videoProps` (**Required** object): These are the same props accepted by react-native-video's [Video](https://github.com/react-native-community/react-native-video#usage) component, with two exceptions:  

Prop | Type | Description | Default
--- | --- | --- | ---
name | string | If a [Title](#title) control is included in the layout, the name will be displayed there. | null
style | object | This property **will not** be passed to the Video component. The Video component fills its parent container by default. | n/a

The rest of the props are passed to the Video component normally. Some defaults differ from react-native-video.

> We recommend that you only use these properties to set initial values. Updating these properties will trigger a render of the entire Player tree. Instead, you should use a [Control Component](#control-components) or make your own [Custom Control](#custom-controls) to change the player state.

Prop | Type | Description | Default
--- | --- | --- | ---
source | **Required** object {uri=string} | Can be a URL or a local file | null
rate | number | 0 is paused, 1 is normal | 1.0
volume | number | 0 is muted, 1 is normal | 1.0
muted | boolean | Mutes the audio entirely | false
paused | boolean | Pauses playback entirely | true
resizeMode | string | How the video fills the player. One of 'contain', 'cover', 'stretch' | 'contain'
repeat | boolean | Automatically repeat after ending | false
playInBackground | boolean | Audio continues to play when app entering background | false
playWhenInactive | boolean | [iOS] Video continues to play when control or notification center are shown | false
ignoreSilentSwitch | string | [iOS] 'ignore' or 'obey' - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual | 'ignore'
progressUpdateInterval | number | [iOS] Interval to fire onProgress | 250
onLoadStart | function | Callback when video starts to load | null
onLoad | function | Callback when video loads | null
onProgress | function | Callback every ~250ms with currentTime | null
onEnd | function | Callback when playback finishes | null
onError | function | Callback when video cannot be loaded | null
onBuffer | function | Callback when remote video is buffering | null
onTimedMetadata | function | Callback when the stream receives some metadata | null

`back` (function): This function will be called by the [Back](#back-1) control when it is pressed. The function can do anything, but it is intended to transition your navigation state backwards. Useful for full screen players. If this prop is not provided, the Back button will not be displayed.

`styles` (object): Define styles for the player, grouped by component name. See the [Styles](#styles-1) section for more details.

`theme` (object): A convenient way to define styles for multiple components at once. See the [Themes](#themes) section for more details.

`layout` (object): Override the default layout for the player. See the [Layout](#layout-1) section for more details.

## Layout
By default, the player is laid out on a grid consisting of a [Header](#header), [Body](#Body) and [Footer](#footer), each of which is divided into a Left, Middle, and Right [ControlGroup](#controlgroup)

![Layout1](https://raw.githubusercontent.com/forma-exacta/forma-video-player/master/docs/layout1.png)

![Layout2](https://raw.githubusercontent.com/forma-exacta/forma-video-player/master/docs/layout2.png)

#### Default Layout
```
{
  Header: <Header layout={{
    Left: <ControlGroup layout={[<Back />]} />,
    Center: <ControlGroup layout={[]} />,
    Right: <ControlGroup layout={[<Title />]} />,
  }} />,
  Body: <Header layout={{
    Left: <ControlGroup layout={[]} />,
    Center: <ControlGroup layout={[<Play />]} />,
    Right: <ControlGroup layout={[]} />,
  }} />,
  Footer: <Header layout={{
    Left: <ControlGroup layout={[<PlayerTime />]} />,
    Center: <ControlGroup layout={[]} />,
    Right: <ControlGroup layout={[<Mute />]} />,
  }} />
}
```

#### Custom Layout
A custom layout begins with replacing one or many of the top level layout components ([Header](#header) | [Body](#Body) | [Footer](#footer)) with your own component. This custom component can be a layout component with a custom layout, or any other React Component.

Even if you just want to add or remove one control from the player, you must replace one of the top level layout components.

`Example: Remove the Title control`
```
import {Player, Header, ControlGroup} from 'forma-video-player'

const customLayout = {
  Header: <Header layout={{
    Left: <ControlGroup layout={[<Back />]} />,
    Center: <ControlGroup layout={[]} />,
    Right: <ControlGroup layout={[]} />
  }} />
}

...

render() {
  return <Player layout={customLayout} ... />
}
```

In the above example, we override the Header section of the default layout and exclude the Title component. Notice we still have to define the Back component since we are replacing that section as well. Because we did not define a Body or Footer, those sections will still use the default layout.

##### makeHeader, makeBody, makeFooter
In order to make control customization a little bit easier, we expose some convenience methods for creating a new Header, Body, and Footer. Instead of defining the entire component tree like we did in the example above, you could just do the following:

`Example: Remove the Title control with makeHeader`
```
import {makeHeader} from 'forma-video-player'

const customLayout = {
  Header: makeHeader([<Back />], [], [])
}

```

The arrays passed in represent the Left, Middle, and Right sections.

#### `makeHeader(Left, Middle, Right)`  

**Arguments**
1. `Left` (array): The left section of the Header
1. `Middle` (array): The middle section of the Header
1. `Right` (array): The right section of the Header

#### `makeBody(Left, Middle, Right)`  

**Arguments**
1. `Left` (array): The left section of the Body
1. `Middle` (array): The middle section of the Body
1. `Right` (array): The right section of the Body

#### `makeFooter(Left, Middle, Right)`  

**Arguments**
1. `Left` (array): The left section of the Footer
1. `Middle` (array): The middle section of the Footer
1. `Right` (array): The right section of the Footer



## Styles
Most components accept a set of styles that can be used to customize their look. These styles should be passed to the [Player](#player) component with the `styles` prop. The styles prop accepts an object containing styles grouped by component name.

Example:
```
{
  Mute: {
    iconColor: 'red',
    size: 30
  },
  Title: {
    textColor: 'blue'
  }
}
```

See each [component](#components) for more details about the styles it accepts.

## Themes
Themes provide a convenient way to change multiple styles at once. The player comes packaged with a default theme, but you can change this by passing your own theme to the Player.

#### Default Theme  
```
{
  control: {
    size: 25,
    iconColor: '#ffffff',
    fontSize: 14,
    textColor: '#ffffff',
    underlayColor: '#ffffff',
    backgroundColor: 'transparent'
  }
}
```

#### Custom Themes
Custom themes should use the same structure as the default theme. Your custom theme will be deep merged with the default theme, overriding any common properties.

In the following example, the custom theme will make all controls smaller, but the other default theme styles will still be used.

`Example: Reduce the size of all controls`
```
const customTheme = {
  control: {
    size: 20
  }
}

...

render() {
  return <Player theme={customTheme} ... />
}
```

> **Theme styles will only be applied once when the player is created**. Updating the theme prop that is passed to the player will have no effect.

## Layout Components

### Header

### Body

### Footer

### ControlGroup

## Control Components

### Back

### Mute

### Play

### PlayerTime

### ProgressBar

### Title

## Custom Controls

### connectVideo

## Redux Integration

## Roadmap
* Add more styling options
* Support for multiple mounted players
