import { domain } from './DOMAIN.js'

async function validation() {
    const token = localStorage.getItem('token')
    /* const res =  */
    await fetch(domain + '/api/checktoken', {
        method: 'GET',
        headers: {
            authorization: token,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.status != 200) {
            window.location = '/login.html'
        }
    })
    .catch((err) => console.log(err , 'err'))
    
    /*  const data = await res.json()
    
    if (data.status != 200) {
        window.location = '/login.html'
    } */
}
validation()
