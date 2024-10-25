const heroList = document.querySelector('.hero_list');
const options = document.querySelector('.options');
const optionBtn = document.querySelector('#option-btn')
const lvlPickers = document.querySelectorAll('.lvl-picker')
const singleStartBtn = document.querySelector('#single-start')

optionBtn.addEventListener('click',()=>{
    heroList.style.display='none'
    options.style.display='flex'
})

lvlPickers.forEach(lvlBtn=>lvlBtn.addEventListener('click',()=>{
    heroList.style.display='flex'
    options.style.display='none'
    singleStartBtn.href = `/src/views/board.html?lvl=${lvlBtn.value}`
}))