<template>
    <div class="home">
        <swiper ref="mySwiper" :options="swiperOptions" :auto-update="true" :auto-destroy="true">
            <swiper-slide>
                <img src="../assets/3.jpg" height="165" style="width:100%;" />
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/3.jpg" height="165" style="width:100%;" />
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/3.jpg" height="165" style="width:100%;" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: ".swiper-pagination"
                },
                autoplay: true
                // Some Swiper option/callback...
            }
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper;
        }
    },
    mounted() {
        console.log("Current Swiper instance object", this.swiper);
        // this.swiper.slideTo(3, 1000, false);
    }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.swiper-pagination-bullets {
    text-align: right;
    padding-bottom: 5.9996px;
    padding-right: 1.1538rem;
}
.swiper-pagination-bullet {
    border-radius: 2px;
    background:map-get($map: $colors, $key: 'white' );
    opacity: 0.8;
    &.swiper-pagination-bullet-active {
        background: map-get($map: $colors, $key: "info");
        opacity: 1;
    }
}
</style>