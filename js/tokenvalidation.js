import { domain } from "./DOMAIN"

async function validation() {
    const token = localStorage.getItem('token')
    const res = await fetch(domain+'/api/tokencheck', {
        method: 'GET',
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    if(data.status != 200){
        window.location = '/login.html'
    }
}

validation()