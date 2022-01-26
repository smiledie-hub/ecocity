import Swiper, {Pagination, Navigation} from 'swiper';
import noUiSlider from 'nouislider';
import IMask from 'imask';

export default {
    init() {

        const blockQquestions = document.querySelectorAll('.block-questions')
        for (let i = 0; i < blockQquestions.length; i++) {
            const item = blockQquestions[i]

            if(item) {
                const next = item.querySelector('.block-questions__next')
                const prev = item.querySelector('.block-questions__prev')

                if(prev) {
                    prev.addEventListener('click', (e) => {
                        e.preventDefault()

                        if(i !== 0) {
                            blockQquestions.forEach(block => {
                                block.classList.remove('block-questions--target')
                            })

                            blockQquestions[i - 1].classList.add('block-questions--target')
                        }
                    })
                }

                if(next) {
                    next.addEventListener('click', (e) => {
                        e.preventDefault()

                        if((i + 1) < blockQquestions.length) {
                            blockQquestions.forEach(block => {
                                block.classList.remove('block-questions--target')
                            })

                            blockQquestions[i + 1].classList.add('block-questions--target')
                        }
                    })
                }
            }
        }


        const catalogAsideClose = document.querySelector('.catalog-aside__close')
        if(catalogAsideClose) {
            catalogAsideClose.addEventListener('click', (e) => {
                e.preventDefault()

                document.querySelector('#catalog-aside').classList.remove('open')
            })
        }

        const catalogSortingClose = document.querySelector('.sorting__close')
        if(catalogSortingClose) {
            catalogSortingClose.addEventListener('click', (e) => {
                e.preventDefault()

                document.querySelector('#catalog-header').classList.remove('open')
            })
        }

        const catalogButtonsFilter = document.querySelectorAll('.catalog-buttons__btn')
        catalogButtonsFilter.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                const id = item.getAttribute('data-id')

                if(id) {
                    document.querySelector(id).classList.add('open')
                }
            })
        })

        const tableMobile = document.querySelectorAll('.block-table-mobile__item')
        tableMobile.forEach(item => {
            const btn = item.querySelector('.block-table-mobile__button')
            if(btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault()

                    if(item.classList.contains('block-table-mobile__item--open')) {
                        item.classList.remove('block-table-mobile__item--open')
                        btn.querySelector('span').innerText = "раскрыть"
                    } else {
                        item.classList.add('block-table-mobile__item--open')
                        btn.querySelector('span').innerText = "Скрыть"
                    }
                })
            }
        })

        const header = document.querySelector('.header')
        if (header) {
            const menuBtn = document.querySelector('.component-menu-btn')
            if (menuBtn) {
                menuBtn.addEventListener('click', function (e) {
                    e.preventDefault()
                    header.classList.toggle('header--open')
                })
            }
            window.addEventListener('scroll', function () {
                if (window.scrollY > 0) {
                    header.classList.add('header--fixed')
                } else {
                    header.classList.remove('header--fixed')
                }
            })
        }

        const phone_mask = document.querySelectorAll('.phone-mask')
        phone_mask.forEach(item => {
            IMask(item, {
                mask: '+{7} (000) 000-00-00'
            })
        })

        const minMaxSlider = document.querySelectorAll('.min-max-slider__slider');
        minMaxSlider.forEach(slider => {
            const min = parseInt(slider.getAttribute('data-min')) || 0
            const max = parseInt(slider.getAttribute('data-max')) || 100
            const step = parseInt(slider.getAttribute('data-step')) || 1
            const start = parseInt(slider.getAttribute('data-start')) || min
            const end = parseInt(slider.getAttribute('data-end')) || max

            noUiSlider.create(slider, {
                start: [start, end],
                connect: true,
                step: step,
                range: {
                    'min': min,
                    'max': max
                }
            })

            const inpMinVal = slider.getAttribute('data-input-min')
            const inpMaxVal = slider.getAttribute('data-input-max')

            if (inpMinVal && inpMaxVal) {
                const elMin = slider.parentElement.querySelector(inpMinVal)
                const elMax = slider.parentElement.querySelector(inpMaxVal)

                if (elMin && elMax) {
                    const maskOption = {
                        mask: Number,
                        min: min,
                        max: max,
                        thousandsSeparator: ' ',
                        overwrite: true
                    }

                    const elMinMask = IMask(elMin, maskOption)
                    const elMaxMask = IMask(elMax, maskOption)

                    elMinMask.value = start.toString()
                    elMaxMask.value = end.toString()

                    elMin.addEventListener('change', (e) => {
                        const target = e.currentTarget
                        const valCurr = Math.round(slider.noUiSlider.get()[1])

                        if (parseInt(target.value.replaceAll(" ", "")) > max) {
                            target.value = max
                        } else if (parseInt(target.value.replaceAll(" ", "")) < min) {
                            target.value = min
                        }

                        if (parseInt(target.value.replaceAll(" ", "")) > valCurr) {
                            target.value = valCurr
                        }

                        slider.noUiSlider.set([parseInt(target.value.replaceAll(" ", "")), null])
                    })

                    elMax.addEventListener('change', (e) => {
                        const target = e.currentTarget
                        const valCurr = slider.noUiSlider.get()[0]

                        if (parseInt(target.value.replaceAll(" ", "")) > max) {
                            target.value = max
                        } else if (parseInt(target.value.replaceAll(" ", "")) < min) {
                            target.value = min
                        }

                        if (parseInt(target.value.replaceAll(" ", "")) < Math.round(valCurr)) {
                            target.value = Math.round(valCurr)
                        }

                        slider.noUiSlider.set([null, parseInt(target.value.replaceAll(" ", ""))])
                    })

                    slider.noUiSlider.on('change.one', function () {
                        const val = slider.noUiSlider.get()
                        elMinMask.value = Math.round(val[0]).toString()
                        elMaxMask.value = Math.round(val[1]).toString()
                    })
                }
            }
        })
    },
    finalize() {
        new Swiper('.single-slider', {
            spaceBetween: 40,
            slidesPerView: 1,
            modules: [Pagination, Navigation],
            pagination: {
                clickable: true,
                el: '.single-slider__pagination',
            },
            navigation: {
                nextEl: '.single-slider .single-slider__button--next',
                prevEl: '.single-slider .single-slider__button--prev',
            },
        });

        new Swiper('.slider-default', {
            spaceBetween: 30,
            slidesPerView: 1,
            modules: [Pagination],
            pagination: {
                clickable: true,
                el: '.slider-default__pagination',
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40
                },
            }
        })

        new Swiper('.banner-slider', {
            spaceBetween: 40,
            slidesPerView: 1,
            modules: [Pagination],
            pagination: {
                clickable: true,
                el: '.banner-slider__pagination',
            },
        })

        new Swiper('.block-product-detail-gallary__items', {
            spaceBetween: 8,
            slidesPerView: 5,
            breakpoints: {
                768: {
                    spaceBetween: 18,
                },
            }
        })
    }
}