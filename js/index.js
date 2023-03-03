import { alert } from '../utils/alert.js'
import { domain } from '../js/DOMAIN.js'

const form = document.querySelector('.form')
const input_login = document.querySelector('#inputLogin')
const input_password = document.querySelector('#inputPassword')
const alert_wrapper = document.querySelector('.alert_wrapper')

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        input_login.style.borderColor = '#dee2e6'
        
        if (!input_login.value) {
            input_login.style.borderColor = 'red'
        } else if (!input_password.value) {
            input_password.style.borderColor = 'red'
        } else {
            const response = await fetch(domain + '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: input_login.value.toString(),
                    password: input_password.value.toString(),
                }),
            })
            const data = await response.json()
            console.log(data)
            if (data.status == 200) {
                localStorage.setItem('token', data.access_token)
                window.location = '/'
            } else {
                if (alert_wrapper.childElementCount <= 2) {
                    alert_wrapper.appendChild(alert(data.message, 10, 'danger'))
                }
            }
        }
    })
}
