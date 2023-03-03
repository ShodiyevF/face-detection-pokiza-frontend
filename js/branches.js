import { domain } from './DOMAIN.js'

const search = document.querySelectorAll('.row')
const wrapper = document.querySelector('tbody')
const dataTables_empty = document.querySelector('.dataTables_empty')
const addBranchBtn = document.querySelector('.bank-save-btn')
const addBranchBtnGlobal = document.querySelector('.add_branch_btn')
const addBranchInput = document.querySelector('.form-control-addbranch')
const alertModal = document.querySelector('.swal2-container')
const alertModelCloseBtn = document.querySelector('.swal2-confirm')
const alertTitle = document.querySelector('.swal2-title')
const alertDescripsion = document.querySelector('#swal2-content')
const removeSort1 = document.querySelector('.sorting_asc')
const removeSort = document.querySelectorAll('.sorting')
const deleteBranchName = document.querySelector('.delete-branch-name')
const paidContinueBtn = document.querySelector('.paid-continue-btn')
const paidCancelBtn = document.querySelector('.paid-cancel-btn')
const allEditBtn = document.querySelectorAll('.edit-branch-btn')

const token = localStorage.getItem('token')

// OTHER-FUNCTION

function remove() {
  for (const i of removeSort) {
    i.classList.add('no-after')
    i.classList.add('no-before')
  }
  removeSort1.classList.add('no-after')
  removeSort1.classList.add('no-before')
  if (dataTables_empty) {
    dataTables_empty.remove()
  }
  search[2].remove()
  search[4].remove()
}
remove()

function alertClose(action) {
  alertModelCloseBtn.addEventListener('click', () => {
    if (action == 200) {
      alertModal.classList.add('display_none')
      location.reload()
    } else {
      alertModal.classList.add('display_none')
    }
  })
}

// EVENTS
addBranchBtnGlobal.addEventListener('click', async (e) => {
  addBranchInput.value = 'Nasiya Savdo'
  addBranchBtn.addEventListener('click', async (e) => {
    addBranchInput.style.borderColor = '#dee2e6'
    if (!addBranchInput.value) {
      addBranchInput.style.borderColor = 'red'
    } else if (
      addBranchInput.value.length == 64 ||
      addBranchInput.value.length > 64
    ) {
      alertTitle.textContent = `Xatolik`
      alertDescripsion.textContent = `Filial nomi 64tadan kam harf bo'lishi kerak!`
      alertModal.classList.remove('display_none')
      alertClose()
      addBranchInput.value = 'Nasiya Savdo'
    } else {
      console.log('ADD')
      await fetch(domain + '/api/branch', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          branchName: addBranchInput.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.status == 201) {
            alertTitle.textContent = `Mu'vaffaqiyat qo'shildi`
            alertDescripsion.textContent = `Yangi filial mu'vaffaqiyat qo'shildi`
            alertModal.classList.remove('display_none')
            addBranchInput.value = 'Nasiya Savdo'
            alertClose(200)
          } else if (data.status == 403) {
            alertTitle.textContent = `Xatolik`
            alertDescripsion.textContent = `Bu filial qo'shilgan !`
            alertModal.classList.remove('display_none')
            alertClose(403)
          }
        })
        .catch((err) => console.log(err))
    }
  })
})

// BRANCHES

function editBranches() {
  allEditBtn.forEach((item) => {
    item.addEventListener('click', (a) => {
      addBranchBtn.addEventListener('click', async (e) => {
        addBranchInput.style.borderColor = '#dee2e6'
        if (!addBranchInput.value) {
          addBranchInput.style.borderColor = 'red'
        } else if (
          addBranchInput.value.length == 64 ||
          addBranchInput.value.length > 64
        ) {
          alertTitle.textContent = `Xatolik`
          alertDescripsion.textContent = `Filial nomi 64tadan kam harf bo'lishi kerak!`
          alertModal.classList.remove('display_none')
          addBranchInput.value = 'Nasiya Savdo'
          alertClose()
        } else {
          console.log('EDIT')
          await fetch(domain + `/api/branch/${a.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
              authorization: token,
            },
            body: JSON.stringify({
              branchName: addBranchInput.value,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              if (data.status == 201) {
                alertTitle.textContent = `Mu'vaffaqiyatli tahrirlandi`
                alertDescripsion.textContent = `filial nomi mu'vaffaqiyatli tahrirlandi`
                alertModal.classList.remove('display_none')
                addBranchInput.value = 'Nasiya Savdo'
                alertClose(200)
              } else if (data.status == 403) {
                alertTitle.textContent = `Xatolik`
                alertDescripsion.textContent = `Bu filial qo'shilgan !`
                alertModal.classList.remove('display_none')
                addBranchInput.value = a.target.dataset.name
                alertClose(403)
              } else if (data.status == 404) {
                alertTitle.textContent = `Xatolik`
                alertDescripsion.textContent = `Bunday filial topilmadi !`
                alertModal.classList.remove('display_none')
                addBranchInput.value = a.target.dataset.name
                alertClose(404)
              }
            })
            .catch((err) => console.log(err))
        }
      })
    })
  })
}

function deleteBranch() {
  const allDeleteBtn = document.querySelectorAll('.delete-branch-btn')
  for (const i of allDeleteBtn) {
    i.onclick = (a) => {
      deleteBranchName.textContent = a.target.dataset.name
      deleteBranchName.style.color = 'red'
      paidContinueBtn.onclick = async (e) => {
        await fetch(domain + `/api/branch/${a.target.dataset.id}`, {
          method: 'DELETE',
          headers: {
            authorization: token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            if (data.status == 201) {
              alertTitle.textContent = `Mu'vaffaqiyat o'chirildi`
              alertDescripsion.textContent =
                a.target.dataset.name + ` filiali mu'vaffaqiyat o'chirildi`
              alertModal.classList.remove('display_none')
              alertClose(200)
            } else if (data.status == 403) {
              alertTitle.textContent = `Xatolik !!!`
              alertDescripsion.textContent = `bu filialga qaysidir hodim ulangan`
              alertModal.classList.remove('display_none')
              alertClose(200)
            }
          })
          .catch((err) => console.log(err))
      }
    }
  }
}

async function getBranches(){
    const res = await fetch(domain + '/api/branch', {
        headers: {
            authorization : token
        }
    })
    const data = res.json()
    
    let counterId = 0
    for (const i of data) {
        counterId += 1
        const tr = document.createElement('tr')
        const id = document.createElement('td')
        const name = document.createElement('td')
        const date = document.createElement('td')
        const endWrapper = document.createElement('td')
        const editLink = document.createElement('a')
        const deleteLink = document.createElement('a')
        
        tr.role = 'row'
        tr.classList.add('odd')
        
        id.classList.add('sorting_1')
        endWrapper.classList.add('text-end')
        editLink.classList.add('edit-branch-btn','btn', 'btn-sm', 'btn-white', 'text-success', 'me-2', 'edit_btn')
        deleteLink.classList.add('delete-branch-btn','btn', 'btn-sm', 'btn-white', 'text-danger', 'delete_btn')
        
        editLink.setAttribute('data-bs-toggle', 'modal')
        editLink.setAttribute('data-bs-target', '#add_items')
        editLink.dataset.id = i.id
        editLink.dataset.name = i.branchName
        
        deleteLink.setAttribute('data-bs-toggle', 'modal')
        deleteLink.setAttribute('data-bs-target', '#delete_paid')
        deleteLink.dataset.id = i.id
        deleteLink.dataset.name = i.branchName
        
        
        id.textContent = '#'+counterId
        name.textContent = i.branchName
        date.textContent = i.createdAt.split('T')[0]
        editLink.textContent = ' Tahrirlash'
        deleteLink.textContent = `O'chirish`
        
        endWrapper.appendChild(editLink)
        endWrapper.appendChild(deleteLink)
        tr.appendChild(id)
        tr.appendChild(name)
        tr.appendChild(date)
        tr.appendChild(endWrapper)
        wrapper.appendChild(tr)
    }
    
    editBranches()
    deleteBranch()
}
getBranches()
