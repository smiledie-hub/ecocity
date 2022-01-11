import Swiper, { Navigation, Pagination } from 'swiper';

export default {
    init() {

    },
    finalize() {
        const swiper = new Swiper('.banner-slider', {
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
