import React from 'react'
import {ControlGroup} from './ControlGroup'
import {
  Text
} from 'react-native';

describe('ControlGroup', () => {

  it('should render array of components', () => {

    const layout = [
      (<Text>component1</Text>),
      (<Text>component2</Text>),
    ]

    const controlContainer = shallow(<ControlGroup layout={layout} />)

    expect(controlContainer.find(Text)).toHaveProperty('length', 2)

  })

  it('should render array in order', () => {

    const layout = [
      (<Text test={1}>component1</Text>),
      (<Text test={2}>component2</Text>),
    ]

    const controlContainer = shallow(<ControlGroup layout={layout} />)

    expect(controlContainer.childAt(0).prop('test')).toEqual(1)
    expect(controlContainer.childAt(1).prop('test')).toEqual(2)

  })

})
