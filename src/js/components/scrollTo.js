import classNames from '../classNames'

export default app => {
  const BODY = app.dom.body
  const { header } = app.dom
  function onClick(e) {
    const btn = e.target.closest(`.${classNames.scrollTo.btn}`)
    if (!btn) return

    const href = btn.getAttribute('href')
    const target = document.querySelector(href)
    if (!target || !header) return
    e.preventDefault()

    const offset = header.offsetHeight
    const top = target.getBoundingClientRect().top + BODY.scrollTop - offset
    window.scrollBy({
      top,
      behavior: 'smooth',
    })
  }
  document.addEventListener('click', onClick)
}
