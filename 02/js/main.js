const $colorChanger = document.querySelector('#color-change')
const $colorChangerAll = document.querySelector('#color-change-all')
const $myButtons = document.querySelectorAll('my-button')
const $myButton = document.querySelector('my-button')

const onClickColorChange = (e) => {
  e.preventDefault()
  $myButton.color = 'red'
}

const onClickColorChangeAll = (e) => {
  e.preventDefault()
  $myButtons.forEach(($button) => {
    $button.color = 'blue'
  })
}

$colorChanger.addEventListener('click', onClickColorChange)
$colorChangerAll.addEventListener('click', onClickColorChangeAll)
