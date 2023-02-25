import { domain } from './DOMAIN.js'
const mainSelect = document.querySelector('.select_father')
const selectChild = document.querySelector('.select_child')
const childList = document.querySelector('.dropdown_list')

async function setItem() {
    const res = await fetch(domain + '/api/branch')
    const data = await res.json()
    
    for (const i of data) {
        const li = document.createElement('li')
        li.classList.add('child')
        li.dataset.id = i.id
        li.textContent = i.branchName
        childList.appendChild(li)
    }
    
    const childElement = document.querySelectorAll('.child')
    for (const i of childElement) {
        i.onclick = (e) => {
            console.log(e.target.classList)
            const classes = []
            for (const i of e.target.classList) {
                classes.push(i)
            }
            const finded = classes.find((el) => el == 'child_active')
            if (finded) {
                e.target.classList.remove('child_active')
                e.target.dataset.activeBranch = false
            } else {
                e.target.dataset.activeBranch = true
                e.target.classList.add('child_active')
            }
        }
    }
}
setItem()

mainSelect.onclick = (e) => {
    if (e.target.dataset.role == 'father') {
        const ca = selectChild.style.display
        if (ca == 'none') {
            selectChild.style.display = 'block'
        } else {
            selectChild.style.display = 'none'
        }
    }
}

function checkItem() {}
checkItem()
