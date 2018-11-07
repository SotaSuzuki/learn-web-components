const importButtons = document.querySelectorAll('.import-button')

importButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    const src = (e.target.dataset || {}).src
    import(src)
  })
})
