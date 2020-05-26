<template>
    <div class="home">
        <swiper ref="mySwiper" :options="swiperOptions" :auto-update="true" :auto-destroy="true">
            <swiper-slide>
                <img src="../assets/1.jpeg" height="165" style="width:100%;" />
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/2.jpeg" height="165" style="width:100%;" />
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/3.jpeg" height="165" style="width:100%;" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="nav-icons mb-3">
            <div class="d-flex flex-wrap fs-sm">
                <div class="nav-item">
                    <i class="sprite sprite-news"></i>
                    <div>爆料站</div>
                </div>
                <div class="nav-item">
                    <i class="sprite sprite-story"></i>
                    <div>故事会</div>
                </div>
                <div class="nav-item">
                    <i class="sprite sprite-periphery"></i>
                    <div>周边商城</div>
                </div>
                <div class="nav-item">
                    <i class="sprite sprite-experience"></i>
                    <div>体验服</div>
                </div>
                <div class="nav-item">
                    <i class="sprite sprite-special"></i>
                    <div>新人专区</div>
                </div>
                <div class="nav-item">
                    <i class="sprite sprite-glory"></i>
                    <div>荣耀 传承</div>
                </div>
            </div>
            <div style="padding: 0.7692rem 0; margin-top:0.7692rem; background:#f9f9f9;">
                <i class="sprite sprite-ararw"></i>
                <span style="margin-left:0.3846rem;">收起</span>
            </div>
        </div>
        <!-- end of nav icons -->

        <div class="card px-3 bg-white">
            <div class="card-header d-flex ai-center py-3">
                <i class="iconfont icon-menu fs-sm"></i>
                <div class="flex-grow-1 px-2 fs-lg">新闻资讯</div>
                <i class="iconfont icon-dian"></i>
            </div>
            <div class="card-nav d-flex jc-between pt-3 pb-1 fs-sm">
                <div
                    class="card-item"
                    :class="{active: item == active}"
                    v-for="item in 5"
                    :key="item"
                    @click="handleActive(item)"
                >热门</div>
            </div>
            <swiper>
                <swiper-slide class="pb-2" v-for="item in 5" :key="item">
                    <div class="py-2" v-for="item in 5" :key="item">
                        <span>[新闻]</span>
                        <span>|</span>
                        <span>5月26日全服不停机更新公告</span>
                        <span>06/06</span>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

        <p>1231231</p>
        <p>1231231</p>
        <p>1231231</p>
        <p>1231231</p>
        <p>1231231</p>
        <p>1231231</p>
        <p>1231231</p>
        <p>1231231</p>
        <p>1231231</p>
        <p>1231231</p>
        <p>1231231</p>
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
            },
            active: 1
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
    },
    methods: {
        handleActive (i) {
            this.active = i
            console.log(i);
            
            this.swiper.slideTo(i -1);
        }
    },
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
    background: map-get($map: $colors, $key: "white");
    opacity: 0.8;
    &.swiper-pagination-bullet-active {
        background: map-get($map: $colors, $key: "info");
        opacity: 1;
    }
}
.nav-icons {
    background-color: #fff;
    text-align: center;
    margin-top: 1.1538rem;
    // padding-bottom: 1.5385rem;
    .nav-item {
        width: 25%;
        margin-top: 1.5385rem;
        padding-top: 0.4615rem;
        border-left: 0.0769rem solid #d4d9de;
    }
    .sprite {
        background: url(../assets/index.png) no-repeat 0 0;
        display: inline-block;
        background-size: 375px;
    }
    .sprite-news {
        background-position: 63.546% 15.517%;
        width: 1.7692rem;
        height: 1.5385rem;
    }
    .sprite-story {
        background-position: 90.483% 15.614%;
        width: 1.7692rem;
        height: 1.5385rem;
    }
    .sprite-periphery {
        background-position: 36.746% 0.924%;
        width: 1.4615rem;
        height: 1.6923rem;
    }
    .sprite-experience {
        background-position: 10.408% 15.517%;
        width: 1.5385rem;
        height: 1.5385rem;
    }
    .sprite-special {
        background-position: 89.733% 1.266%;
        width: 20px;
        height: 1.6154rem;
    }
    .sprite-glory {
        background-position: 36.467% 15.287%;
        width: 1.8462rem;
        height: 1.5385rem;
    }
    .sprite-ararw {
        background-position: 38.577% 52.076%;
        width: 0.7692rem;
        height: 0.7692rem;
    }
    .nav-item:nth-child(4n + 1) {
        border-left: none;
    }
}
</style>