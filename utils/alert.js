// READ ME, text, interval, color

export function alert (text, interval, change){
    const div = document.createElement('div')
    const button = document.createElement('button')
    
    div.classList.add('alert', `alert-${change ? change : 'danger'}`, 'alert-dismissible', 'fade', 'show')
    div.style = 'width: auto; margin-left: auto; margin-right: auto;'
    div.role = 'alert'
    
    
    button.classList.add('btn-close')
    button.type = 'button';
    button.dataset.bs_dismiss = 'alert';
    button.setAttribute('data-bs-dismiss', 'alert')
    button.ariaLabel = 'Close';

    div.innerHTML = `${text.includes('~') ? `<strong>${text.split('~')[0]}</strong> ${text.split('~')[0]}` : text}`
    setTimeout(() => {
        div.classList.add('aler')
    }, interval)
    div.appendChild(button)
    return div
}