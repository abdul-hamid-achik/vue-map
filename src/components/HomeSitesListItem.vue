<template>
    <div class="home-site-list-item" v-on:mouseover="mouseOverHandler" v-on:mouseleave="mouseLeaveHandler" @click="clickHandler()">
        <div class="home-site-list-container animation-scale-up">
            <div class="record" lot="record.id" :ref="record.id">
                <img v-bind:src="record.photo" alt="" >
                <!-- Turn on to find the sold lots showing up -->
                <!-- <div class="listing-status move-in">{status}</div> -->
                <hr class="divider">
                <div class="record-info">
                    <div class="col-xs-8 text-left">
                        <div class="address">{{ record.label }}</div>
                        <div class="lot-size">Lot Size {{ record.size }}</div>
                        <div class="builder" v-if="record.builder">{{ record.builder }}</div>
                    </div>
                    <div class="col-xs-4 text-right">
                        <div class="price">{{ record.prettyPrice }}</div>
                        <div class="price-label">Starting From</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {eventBus} from '../main'
export default {
  props: ['record'],
  name: 'HomeSitesListItem',

  data () {
    return {

    }
  },
  methods: {
    clickHandler() {
      eventBus.$emit('showSidePanel', this.record)
    },
    mouseOverHandler() {
        eventBus.$emit('homeHovered', this.record)
        this.$refs[this.record.id].classList.add('hover-record')
    },
    mouseLeaveHandler() {
        eventBus.$emit('homeUnhovered', this.record)  
        this.$refs[this.record.id].classList.remove('hover-record')
    }
  }
}
</script>

<style lang="scss" scoped>
    .hover-record {
        cursor: pointer !important;
        -webkit-transform: translateY(-4px) translate3d(0px, 0px, 0px) !important;
        transform: translateY(-4px) translate3d(0px, 0px, 0px) !important;
        -webkit-box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15) !important;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15) !important;
        will-change: opacity !important;
        border: 1px solid #90a4ae !important;
        background-blend-mode: multiply !important;
    }
    .address {
        font-size: 13px !important;
        font-weight: bold !important;
    }
    .lot-size, .builder, .address {
        letter-spacing: initial !important;
        font-family: din-2014;
        display: block !important;
        font-style: initial !important;
    }
    .lot-size, .builder {
        font-size: 11px !important;
    }
    .price {
        font-weight: bold !important;
        font-size: 13px !important;
        letter-spacing: initial !important;
    }
    .price-label {
        font-size: 11px !important;
        padding-top: 2px;
        font-family: din-2014;
    }
</style>

