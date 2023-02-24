async function validation() {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3001/api/tokencheck', {
        method: 'GET',
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    console.log(data);
    if(data.status != 200){
        window.location = '/login.html'
    }
}

validation()