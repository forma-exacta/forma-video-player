import React, {Component} from 'react'
import * as util from './util'

describe('util', () => {
  describe('isReactComponent', () => {
    class TestClass extends Component {}
    it('should detect a react component', () => {
      expect(util.isReactComponent(TestClass)).toBe(true)
    })
  })

  describe('makeStyles', () => {

    it('should select subset', () => {
      const style1 = {one: 'bla', two: 'bla2', three: 'bla3'}

      expect(util.makeStyles({one:null,three:null}, style1)).toEqual({
        one: 'bla',
        three: 'bla3'
      })
    })

    it('should deep merge styles', () => {
      const style1 = {one: {sub: {subsubtwo: 'bla2'}}}
      const style2 = {one: {sub: {subsubone: 'bla'}}}

      expect(util.makeStyles(style1, style2)).toEqual({
        one: {
          sub: {
            subsubone: 'bla',
            subsubtwo: 'bla2'
          }
        }
      })
    })

    it('should deep merge multiple styles', () => {
      const style1 = {one: {sub: {subsubtwo: 'ddd'}}, three: {sub: {subsubtwo: 'eee'}}}
      const style2 = {one: {sub: {subsubtwo: 'aaa'}}, two: {sub: {subsubtwo: 'bbb'}}, three: {sub: {subsubtwo: 'ccc'}}}

      expect(util.makeStyles(style1, style2)).toEqual({
        one: {
          sub: {
            subsubtwo: 'aaa'
          }
        },
        three: {
          sub: {
            subsubtwo: 'ccc'
          }
        },
      })
    })
  })
})
