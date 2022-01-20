import Swiper, {Pagination} from 'swiper';
import noUiSlider from 'nouislider';
import IMask from 'imask';

export default {
    init() {

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
        new Swiper('.slider-default', {
            spaceBetween: 40,
            slidesPerView: 3,
            modules: [Pagination],
            pagination: {
                clickable: true,
                el: '.slider-default__pagination',
            },
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
            spaceBetween: 18,
            slidesPerView: 5,
        })
    }
}
