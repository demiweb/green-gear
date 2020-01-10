import { debounce } from 'throttle-debounce'
import classNames from '../../classNames'

export default () => {
  const textareas = [...document.querySelectorAll(`.${classNames.textarea}`)]
  if (!textareas.length) return

  function adjustHeight(elem, minHeight) {
    const outerHeight = parseInt(window.getComputedStyle(elem).height, 10)
    const diff = outerHeight - elem.clientHeight

    elem.style.height = 0
    const height = Math.max(minHeight, elem.scrollHeight + diff)
    elem.style.height = `${height}px`
  }

  function setHeight(elem) {
    const minHeight = elem.scrollHeight

    elem.style.overflow = 'hidden'
    elem.addEventListener('input', adjustHeight.bind(this, elem, minHeight))

    const onResize = debounce(200, () => adjustHeight.bind(this, elem, minHeight))

    window.addEventListener('resize', onResize)
  }

  textareas.forEach(textarea => setHeight(textarea))
}
