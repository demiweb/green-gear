import { tns } from 'tiny-slider/src/tiny-slider'
import classNames from '../classNames'
import setLazy from './setLazy'
import { BEMblock } from '../helpers'

export default () => {
  const container = document.querySelector(`.${classNames.slider.container}`)
  if (!container) return

  function addCenterClass(slides) {
    const activeSlides = [...slides].filter(slide => slide.classList.contains('tns-slide-active'))
    const activeSlide = activeSlides[1]
    if (!activeSlide) return

    BEMblock(activeSlide, 'gallery-item').addMod('center')
  }

  function onInit(info) {
    setLazy()
    addCenterClass(info.slideItems)
  }

  function handleTransition(info, eventName) {
    const activeSlides = [...info.slideItems].filter(slide =>
      slide.classList.contains('tns-slide-active')
    )

    activeSlides.forEach(slide => BEMblock(slide, 'gallery-item').removeMod('center'))
    addCenterClass(info.slideItems)
  }

  const slider = tns({
    container,
    onInit,
    autoWidth: true,
    // loop: false,
  })

  slider.events.on('transitionEnd', handleTransition)
}
