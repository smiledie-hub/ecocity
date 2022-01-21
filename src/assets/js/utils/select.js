document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.select')

    selects.forEach(select => {
        const title = select.querySelector('.select__title')
        const labels = select.querySelectorAll('.select__label')

        title.addEventListener('click', () => {
            if ('active' === select.getAttribute('data-state')) {
                select.setAttribute('data-state', '')
            } else {
                select.setAttribute('data-state', 'active')
            }
        })

        for (let i = 0; i < labels.length; i++) {
            labels[i].addEventListener('click', (evt) => {
                title.textContent = evt.target.textContent
                select.setAttribute('data-state', '')
            })
        }
    })
})