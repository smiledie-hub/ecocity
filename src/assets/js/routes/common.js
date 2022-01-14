import Swiper, { Pagination } from 'swiper';

export default {
    init() {

    },
    finalize() {
        new Swiper('.slider-default', {
            spaceBetween: 40,
            slidesPerView: 3,
            modules: [ Pagination ],
            pagination: {
                clickable: true,
                el: '.slider-default__pagination',
            },
        })

        new Swiper('.banner-slider', {
            spaceBetween: 40,
            slidesPerView: 1,
            modules: [ Pagination ],
            pagination: {
                clickable: true,
                el: '.banner-slider__pagination',
            },
        })
    }
}
