<template>
    <div class="card px-3 bg-white">
        <div class="card-header d-flex ai-center py-3">
            <i class="iconfont fs-sm" :class="`icon-${icon}`"></i>
            <div class="flex-grow-1 px-2 fs-lg">{{title}}</div>
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
</template>

<script>
export default {
    props: {
        title: {
            type: String,
        },
        icon: {
            type: String,
        }
    },
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: ".swiper-pagination"
                },
                autoplay: true
                
            },
            active: 1
        };
    },
    methods: {
        handleActive(i) {
            this.active = i;
            this.swiper.slideTo(i - 1);
        }
    }
};
</script>