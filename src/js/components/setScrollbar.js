import SimpleBar from 'simplebar'
import { isWebkit } from '../helpers'
import classNames from '../classNames'

export default function setScrollbar() {
  if (isWebkit) return
  const containers = [...document.querySelectorAll(`.${classNames.scrollbar}`)]
  if (!containers.length) return

  containers.forEach(container => {
    const scrollbar = new SimpleBar(container)
  })
}
