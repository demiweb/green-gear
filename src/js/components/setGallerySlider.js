import { tns } from 'tiny-slider/src/tiny-slider'
// import { debounce } from 'throttle-debounce'
import classNames from '../classNames'
import setLazy from './setLazy'
import { BEMblock } from '../helpers'
import 'lightgallery.js'

const classes = classNames.slider
const IS_CENTER = 'center'

function setGallery() {
  const lgs = [...document.querySelectorAll(`.${classNames.gallery}`)]

  if (!lgs.length) return

  lgs.forEach(lg => {
    // eslint-disable-next-line
    lightGallery(lg);
  })
}

export default () => {
  const container = document.querySelector(`.${classes.container}[data-slider="gallery"]`)
  if (!container) return
  const wrap = container.closest(`.${classes.slider.wrap}`)
  const prevButton = wrap.querySelector(`.${classes.slider.prev}`)
  const nextButton = wrap.querySelector(`.${classes.slider.next}`)

  function addCenterClass(slides) {
    if (!window.matchMedia('(min-width: 1200px)').matches) return

    const activeSlides = [...slides].filter(slide => slide.classList.contains('tns-slide-active'))
    const activeSlide = activeSlides[1]

    if (!activeSlide) return

    BEMblock(activeSlide, 'gallery-item').addMod(IS_CENTER)
  }

  function onInit(info) {
    setLazy()
    addCenterClass(info.slideItems)
  }

  function handleTransition(info) {
    const activeSlides = [...info.slideItems].filter(slide =>
      slide.classList.contains('tns-slide-active')
    )

    const timeout = window.setTimeout(() => {
      activeSlides.forEach(slide => BEMblock(slide, 'gallery-item').removeMod(IS_CENTER))
      addCenterClass(info.slideItems)
      window.clearTimeout(timeout)
    })
  }

  const slider = tns({
    container,
    onInit,
    prevButton,
    nextButton,
    autoWidth: true,
    items: 1,
    gutter: 16,
    nav: false,
    // loop: false,
    responsive: {
      1200: {
        gutter: 30,
        // autoWidth: true,
      },
      992: {
        gutter: 24,
      },
      767: {
        gutter: 20,
      },
    },
  })

  slider.events.on('transitionEnd', handleTransition)

  // function handleResize() {
  //   const info = slider.getInfo()
  //   const activeSlides = [...info.slideItems].filter(slide =>
  //     slide.classList.contains('tns-slide-active')
  //   )
  //   activeSlides.forEach(slide => BEMblock(slide, 'gallery-item').removeMod(IS_CENTER))
  //   addCenterClass(info.slideItems)
  // }

  // const onResize = debounce(200, handleResize)
  // window.addEventListener('resize', onResize)

  setGallery()
}
