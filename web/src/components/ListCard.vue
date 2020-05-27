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
                :class="{active: i == active}"
                v-for="(item, i) in categories"
                :key="i"
                @click="$refs.list.$swiper.slideTo(i)"
            >{{item.name}}</div>
        </div>
        <swiper ref="list" @slide-change="() => active = $refs.list.$swiper.realIndex">
            <swiper-slide class="pb-2" v-for="(item, i) in categories" :key="i">
                <slot name="items" :category="item"></slot>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        categories: {
            required: true
        }
    },
    data() {
        return {
            active: 0
        }
    },
};
</script>