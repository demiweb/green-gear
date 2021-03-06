import 'core-js/features/symbol'
import 'core-js/features/array/from'
import 'core-js/features/promise'
import 'core-js/features/object/assign'
import 'core-js/features/object/values'
import 'intersection-observer'
import './lib/polyfill'
import smoothscroll from 'smoothscroll-polyfill'

import Popup from 'popup-simple'
import classNames from './classNames'

import sayHello from './lib/sayHello'
import setHTMLClassNames from './components/setHTMLClassNames'
import setLazy from './components/setLazy'
import setScrollbar from './components/setScrollbar'
import setGallerySlider, { setGallery } from './components/setGallerySlider'

import setTextareaHeight from './components/Textarea/Textarea'
import scrollTo from './components/scrollTo'
import setProductGallery from './components/setProductGallery'

// import { setVhProperty } from './helpers'

import Menu from './components/Menu/Menu'

import { NO_SCROLL } from './constants'

class App {
  constructor() {
    this.methods = {}
    this.classNames = classNames
    this.dom = {
      body: document.body,
      header: document.querySelector('.header'),
    }
    this.state = {
      hasMenuOpen: false,
    }

    this.menu = new Menu({
      classNames: {
        btn: 'burger',
        menu: 'header__nav',
      },
    })
    this.popup = new Popup()
  }

  updateState(state) {
    this.state = {
      ...this.state,
      ...state,
    }
  }

  initMethods() {
    this.methods = {
      sayHello,
      setHTMLClassNames,
      // setVhProperty,
      setLazy,
      setScrollbar,
      setGallery,
      setGallerySlider,
      setTextareaHeight,
      scrollTo,
      setProductGallery,
    }

    Object.values(this.methods).forEach(fn => fn(this))
  }

  init() {
    smoothscroll.polyfill()
    this.initMethods()

    this.menu.init()
    this.menu.onToggle = this.onMenuToggle.bind(this)
    this.menu.onClose = this.onMenuClose.bind(this)
    this.popup.init()
  }

  onMenuToggle() {
    let { hasMenuOpen } = { ...this.state }
    hasMenuOpen = !hasMenuOpen
    this.updateState({ hasMenuOpen })

    App.toggleScroll(this, this.state.hasMenuOpen)
  }

  onMenuClose() {
    this.updateState({ hasMenuOpen: false })
    App.toggleScroll(this, this.state.hasMenuOpen)
  }

  static preventScroll(app) {
    app.dom.body.classList.add(NO_SCROLL)
  }

  static allowScroll(app) {
    app.dom.body.classList.remove(NO_SCROLL)
  }

  static toggleScroll(app, condition) {
    if (condition) {
      App.preventScroll(app)
    } else {
      App.allowScroll(app)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.init()
  window.app = app
})
