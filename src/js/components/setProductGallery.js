import Swiper from 'swiper/js/swiper'
import setLazy from './setLazy'
import classNames from '../classNames'

const classes = classNames.slider

export default () => {
  const gallery = {
    top: document.querySelector(`.${classes.productGallery.slider}`),
    thumbs: document.querySelector(`.${classes.productGallery.thumbs}`),
  }
  if (!gallery.top || !gallery.thumbs) return

  const gallerySliderWrap = gallery.top.closest('.product-gallery__slider')
  const navigation = {
    nextEl: gallerySliderWrap.querySelector(`.${classes.productGallery.next}`),
    prevEl: gallerySliderWrap.querySelector(`.${classes.productGallery.prev}`),
  }

  const galleryThumbs = new Swiper(gallery.thumbs, {
    slidesPerView: 4,
    on: {
      init: setLazy,
    },
    spaceBetween: 0,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'vertical',
  })
  const gallerySlider = new Swiper(gallery.top, {
    navigation,
    on: {
      init: setLazy,
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  })
}
