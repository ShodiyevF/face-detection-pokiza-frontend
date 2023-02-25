import { domain } from './DOMAIN.js'
console.log(domain)

const remove_rows = document.querySelectorAll('.row')
const remove_dataTables_length = document.querySelector('.dataTables_length')
const remove_removeSort1 = document.querySelector('.sorting_asc')
const remove_removeSort = document.querySelectorAll('.sorting')
const remove_lastitem = document.querySelector('.odd')
const remove_search = document.querySelectorAll('.form-control')
const remove_faSearch = document.querySelectorAll('.fa-search')
const remove_row = document.querySelectorAll('.dataTables_wrapper .row')

// global
const userSearch = document.querySelectorAll('.form-control')[5]
const tbody = document.querySelector('tbody')
const userAddBtn = document.querySelector('#user_add_btn')

// alert
const alertModal = document.querySelector('.swal2-container')
const alertModelCloseBtn = document.querySelector('.swal2-confirm')
const alertTitle = document.querySelector('.swal2-title')
const alertDescripsion = document.querySelector('#swal2-content')

// user-inputs
const userFirstnameInput = document.querySelector('#user_firstname_input')
const userLastnameInput = document.querySelector('#user_lastname_input')
const userMainbranchSelect = document.querySelector('#user_mainbranch_select')
const userAccessbranchesSelect = document.querySelector('.select_father')
const test = document.querySelectorAll('.notShown')
const userIsadminSelect = document.querySelector('#user_isadmin_select')
const userEmailInput = document.querySelector('#user_email_input')
const userPasswordInput = document.querySelector('#user_password_input')
const userImgInput = document.querySelector('#user_img_input')
const userImgPrev = document.querySelector('#user_img_prev')
const userSaveBtn = document.querySelector('#user_save_btn')

// delete-user

const userDeleteBtn = document.querySelector('#user_delete_btn')
const userDeleteName = document.querySelector('#user_delete_name')

// OTHER FUNCTIONS

function alertClose(action) {
  alertModelCloseBtn.onclick = () => {
    if (action == 200) {
      alertModal.classList.add('display_none')
      location.reload()
    } else {
      alertModal.classList.add('display_none')
    }
  }
}

function readImage(input) {
  input.addEventListener('change', function (ev) {
    if (ev.target.files) {
      let file = ev.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function (e) {
        var image = new Image()
        image.src = e.target.result
        image.onload = function (ev) {
          var canvas = document.getElementById('user_img_prev')
          canvas.width = image.width
          canvas.height = image.height
          var ctx = canvas.getContext('2d')
          ctx.drawImage(image, 0, 0)
        }
      }
    }
  })
}
readImage(userImgInput)

function styles() {
  // REMOVE ITEM
  remove_rows[5].remove()
  remove_lastitem.remove()
  remove_dataTables_length.remove()
  userSearch.remove()
  remove_faSearch[1].remove()
  remove_row[0].remove()

  // ADD ITEMS
  userSearch.style.marginBottom = '15px'

  for (const i of remove_removeSort) {
    i.classList.add('no-after')
    i.classList.add('no-before')
  }
  remove_removeSort1.classList.add('no-after')
  remove_removeSort1.classList.add('no-before')

  remove_rows[4].style.height = '70vh'
  remove_rows[4].style.overflow = 'auto'
  remove_rows[4].style.marginTop = '0px'
}
styles()

function setDefaultValues() {
  async function appendBranchesToSelect() {
    const res = await fetch(domain + '/api/branch')
    const data = await res.json()
    for (const i of data) {
      const option = document.createElement('option')
      option.value = i.id
      option.textContent = i.branchName
      userMainbranchSelect.appendChild(option)
    }
  }
  appendBranchesToSelect()
}
setDefaultValues()

function getActiveBranches() {
  const branches = document.querySelectorAll('.child')
  const activeBranchElement = []
  for (const i of branches) {
    activeBranchElement.push(i)
  }
  const filteredActiveBranches = activeBranchElement.filter(
    (el) => el.dataset.activeBranch == 'true',
  )
  const userAccessbranchesSelectValue = []
  for (const id of filteredActiveBranches) {
    userAccessbranchesSelectValue.push(id.dataset.id)
  }

  let returns = {
    getActives() {
      return userAccessbranchesSelectValue.join(':')
    },

    removeActive() {
      return filteredActiveBranches
    },

    getAllChild() {
      return activeBranchElement
    },
  }
  return returns
}

// EVENT LISTENNERS

userAddBtn.onclick = () => {
  const branches = document.querySelectorAll('.child')
  const activeBranchElement = []
  for (const i of branches) {
    activeBranchElement.push(i)
  }
  const asd = activeBranchElement.filter(
    (el) => el.dataset.activeBranch == 'true',
  )
  for (const i of asd) {
    i.classList.remove('child_active')
    delete i.dataset.activeBranch
  }
  userFirstnameInput.value = ''
  userLastnameInput.value = ''
  userMainbranchSelect.value = ''
  userEmailInput.value = ''
  userPasswordInput.value = ''
  userImgInput.value = ''
}

// CRUD USER

async function users() {
  const res = await fetch(domain + '/api/users')
  const data = await res.json()
  return data
}

async function getUsers() {
  const data = await users()

  for (const i of data) {
    const tr = document.createElement('tr')
    const avatarBigWrapper = document.createElement('td')
    const avatarWrapper = document.createElement('h2')
    const avatarImageLink = document.createElement('a')
    const avatarImage = document.createElement('img')
    const avatarName = document.createElement('a')
    const avatarInnerName = document.createElement('p')
    const email = document.createElement('td')
    const date = document.createElement('td')
    const role = document.createElement('td')
    const role_badge = document.createElement('span')
    const editWrapper = document.createElement('td')
    const employerEdit = document.createElement('a')
    const employerDelete = document.createElement('a')

    avatarWrapper.classList.add('table-avatar')
    avatarImageLink.classList.add('avatar', 'avatar-sm', 'me-2')
    avatarImage.classList.add('avatar-img', 'rounded-circle')
    role_badge.classList.add(
      'badge',
      'badge-pill',
      i.email ? 'bg-success-light' : 'bg-danger-light',
    )
    employerEdit.classList.add(
      'btn',
      'btn-sm',
      'btn-white',
      'text-success',
      'me-2',
      'user_update_btn',
      'edit_btn',
    )
    employerDelete.classList.add(
      'btn',
      'btn-sm',
      'btn-white',
      'text-danger',
      'me-2',
      'user_delete_btn',
      'delete_btn',
    )
    editWrapper.classList.add('text-end')

    avatarImageLink.href = '/user'
    avatarImageLink.dataset.user_id = i.id
    avatarImage.src = `/api/users/img/${i.id}`
    avatarName.href = '/user'
    avatarName.dataset.user_id = i.id
    employerEdit.setAttribute('data-id', i.id)
    employerEdit.setAttribute('data-bs-toggle', 'modal')
    employerEdit.setAttribute('data-bs-target', '#add_items')
    employerDelete.setAttribute('data-id', i.id)
    employerDelete.setAttribute('data-name', i.firstName)
    employerDelete.setAttribute('data-bs-toggle', 'modal')
    employerDelete.setAttribute('data-bs-target', '#delete_paid')

    avatarName.textContent = i.firstName + ' '
    avatarName.appendChild(avatarInnerName)
    avatarInnerName.textContent = i.lastName
    email.textContent = i.email ? i.email : 'email yoq !'
    date.textContent = i.createdAt.split('T')[0]
    role_badge.textContent = i.email ? 'admin' : 'admin emas'
    employerEdit.textContent = 'Tahrirlash'
    employerDelete.textContent = `O'chirish`

    avatarBigWrapper.appendChild(avatarWrapper)
    avatarWrapper.appendChild(avatarImageLink)
    avatarWrapper.appendChild(avatarName)
    avatarImageLink.appendChild(avatarImage)
    avatarName.appendChild(avatarInnerName)
    role.appendChild(role_badge)
    editWrapper.appendChild(employerEdit)
    editWrapper.appendChild(employerDelete)
    tr.appendChild(avatarBigWrapper)
    tr.appendChild(email)
    tr.appendChild(date)
    tr.appendChild(role)
    tr.appendChild(editWrapper)

    tbody.appendChild(tr)
  }
  deleteUser()
  updateUser()
  setUser()
}
getUsers()

async function setUser() {
  userSaveBtn.onclick = async (e) => {
    console.log(e, 'ADD')
    userFirstnameInput.style.borderColor = '#dee2e6'
    userLastnameInput.style.borderColor = '#dee2e6'
    userMainbranchSelect.style.borderColor = '#dee2e6'
    userAccessbranchesSelect.style.borderColor = '#dee2e6'
    userIsadminSelect.style.borderColor = '#dee2e6'
    userEmailInput.style.borderColor = '#dee2e6'
    userPasswordInput.style.borderColor = '#dee2e6'
    userImgInput.style.borderColor = '#dee2e6'
    userImgPrev.style.borderColor = '#dee2e6'

    const resa = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(
      userEmailInput.value,
    )

    const a = getActiveBranches()
    const userAccessbranchesSelecta = a.getActives()

    if (!userFirstnameInput.value || userFirstnameInput.value > 20) {
      userFirstnameInput.style.borderColor = 'red'
    } else if (!userLastnameInput.value || userLastnameInput.value > 20) {
      userLastnameInput.style.borderColor = 'red'
    } else if (!userMainbranchSelect.value) {
      userMainbranchSelect.style.borderColor = 'red'
    } else if (!userAccessbranchesSelecta.length) {
      userAccessbranchesSelect.style.borderColor = 'red'
    } else if (userIsadminSelect.value == 2 && !resa) {
      userEmailInput.style.borderColor = 'red'
    } else if (userIsadminSelect.value == 2 && !userPasswordInput.value) {
      userPasswordInput.style.borderColor = 'red'
    } else if (!userImgInput.value) {
      userImgInput.style.borderColor = 'red'
    } else {
      const formData = new FormData()

      formData.append('file', userImgInput.files[0])
      formData.append('firstName', userFirstnameInput.value)
      formData.append('lastName', userLastnameInput.value)
      formData.append('branch', userMainbranchSelect.value)
      formData.append('allowedBranches', userAccessbranchesSelecta)
      formData.append('isAdmin', userIsadminSelect.value == 1 ? true : false)
      if (userIsadminSelect.value == 1) {
        formData.append('email', userEmailInput.value)
        formData.append('password', userPasswordInput.value)
      }

      for (const i of a.removeActive()) {
        i.classList.remove('child_active')
        delete i.dataset.activeBranch
      }
      userFirstnameInput.value = ''
      userLastnameInput.value = ''
      userMainbranchSelect.value = ''
      userIsadminSelect.value = ''
      userEmailInput.value = ''
      userPasswordInput.value = ''
      userImgInput.value = ''

      const res = await fetch(domain + '/api/users', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      console.log(data)

      if (data.status == 200) {
        alertTitle.textContent = `Mu'vaffaqiyat qo'shildi`
        alertDescripsion.textContent = `Hodim mu'vaffaqiyat qo'shildi`
        alertModal.classList.remove('display_none')
        alertClose(200)
      }
    }
  }
}

async function updateUser() {
  const user = document.querySelectorAll('.user_update_btn')
  for (const i of user) {
    i.onclick = async (e) => {
      const branchesa = document.querySelectorAll('.child')
      const activeBranchElement = []
      for (const i of branchesa) {
        activeBranchElement.push(i)
      }
      const asd = activeBranchElement.filter(
        (el) => el.dataset.activeBranch == 'true',
      )
      for (const i of asd) {
        i.classList.remove('child_active')
        delete i.dataset.activeBranch
      }

      const user = (await users()).filter(
        (el) => el.id == e.target.dataset.id,
      )[0]

      const allowedBranches = getActiveBranches()
      const branches = allowedBranches.getAllChild()

      console.log(user.allowedBranches)
      for (const i of user.allowedBranches) {
        const a = branches.find((el) => el.dataset.id == i)
        a.dataset.activeBranch = 'true'
        a.classList.add('child_active')
      }

      userFirstnameInput.value = user.firstName
      userLastnameInput.value = user.lastName
      userMainbranchSelect.value = user.branch.id
      userIsadminSelect.value = 0
      userEmailInput.value = ''
      userPasswordInput.value = ''
      userImgInput.value = ''

      userSaveBtn.onclick = async (i) => {
        console.log(i, 'EDIT')
        const allowedBranches = getActiveBranches()
        userFirstnameInput.style.borderColor = '#dee2e6'
        userLastnameInput.style.borderColor = '#dee2e6'
        userMainbranchSelect.style.borderColor = '#dee2e6'
        userAccessbranchesSelect.style.borderColor = '#dee2e6'
        userIsadminSelect.style.borderColor = '#dee2e6'
        userEmailInput.style.borderColor = '#dee2e6'
        userPasswordInput.style.borderColor = '#dee2e6'
        userImgInput.style.borderColor = '#dee2e6'
        userImgPrev.style.borderColor = '#dee2e6'

        const userAccessbranchesSelectValue = allowedBranches.getActives()
        console.log(userAccessbranchesSelectValue)

        const formData = new FormData()

        if (userImgInput.files[0]) {
          formData.append('file', userImgInput.files[0])
        }
        if (userFirstnameInput.value) {
          formData.append('firstName', userFirstnameInput.value)
        }
        if (userLastnameInput.value) {
          formData.append('lastName', userLastnameInput.value)
        }
        if (userMainbranchSelect.value) {
          formData.append('branch', userMainbranchSelect.value)
        }
        if (userAccessbranchesSelectValue.length) {
          formData.append('allowedBranches', userAccessbranchesSelectValue)
        }
        if (userIsadminSelect.value) {
          if (userIsadminSelect.value == '1') {
            formData.append('isAdmin', true)
          } else {
            formData.append('isAdmin', false)
            formData.append('email', '')
            formData.append('password', '')
          }
        }
        if (userIsadminSelect.value == 1) {
          if (userEmailInput.value) {
            const resa = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
              userEmailInput.value,
            )
            if (resa) {
              formData.append('email', userEmailInput.value)
            }
          }
          if (userPasswordInput.value) {
            formData.append('password', userPasswordInput.value)
          }
        }

        for (const i of allowedBranches.removeActive()) {
          i.classList.remove('child_active')
          delete i.dataset.activeBranch
        }
        userFirstnameInput.value = ''
        userLastnameInput.value = ''
        userMainbranchSelect.value = ''
        userIsadminSelect.value = ''
        userEmailInput.value = ''
        userPasswordInput.value = ''
        userImgInput.value = ''

        const res = await fetch(domain + `/api/users/${e.target.dataset.id}`, {
          method: 'PATCH',
          body: formData,
        })

        const data = await res.json()

        console.log(data)

        if (data.status == 200) {
          alertTitle.textContent = `Mu'vaffaqiyat tahrirlandi`
          alertDescripsion.textContent = `Hodim mu'vaffaqiyat tahrirlandi`
          alertModal.classList.remove('display_none')
          alertClose(200)
        }
      }
    }
  }
}

async function deleteUser() {
  const user = document.querySelectorAll('.user_delete_btn')
  for (const i of user) {
    i.onclick = async (e) => {
      userDeleteBtn.onclick = async (i) => {
        const res = await fetch(domain + `/api/users/${e.target.dataset.id}`, {
          method: 'DELETE',
        })
        const data = await res.json()
        if (data.status == 200) {
          alertTitle.textContent = `Mu'vaffaqiyat o'chirildi`
          alertDescripsion.textContent = `Hodim mu'vaffaqiyat o'chirildi`
          alertModal.classList.remove('display_none')
          alertClose(200)
        }
      }
    }
  }
}
