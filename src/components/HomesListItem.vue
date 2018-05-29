<template>
    <div class="homes-list-item" v-on:mouseover="mouseOverHandler" v-on:mouseleave="mouseLeaveHandler" @click="clickHandler()">
        <div class="home-list-container animation-scale-up">
            <div class="record" lot="record.id">
                <img v-bind:src="record.photo" alt="">
                <hr class="divider" v-if="record.status">
                <div class="listing-status move-in" v-if="record.status">{{ record.status }}</div>
                <div class="record-info">
                    <div class="col-xs-8 text-left">
                        <div class="address">{{ record.label }}</div>
                        <div class="beds-bath">{{ record.beds }} Bed / {{record.baths }} Bath</div>
                        <div class="builder" v-if="record.builder">{{ record.builder.label }}</div>
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
  name: 'HomesListItem',

  data () {
    return {

    }
  },
  methods: {
    clickHandler() {
      this.$router.push('/' + this.record.id)
    },
    mouseOverHandler() {
        eventBus.$emit('homeHovered', this.record)
    },
    mouseLeaveHandler() {
        eventBus.$emit('homeUnhovered', this.record)  
    }
  }
}
</script>

<style lang="scss" scoped>
    .record {
        // width: 336px;
    }
    .address {
        font-size: 13px !important;
        font-weight: bold !important;
    }
    .lot-size, .builder, .address, .beds-bath {
        letter-spacing: initial !important;
        font-family: din-2014;
        display: block !important;
        font-style: initial !important;
    }
    .lot-size, .builder, .beds-bath {
        font-size: 11px !important;
    }
    .price {
        font-weight: bold !important;
        font-size: 13px !important;
        letter-spacing: initial !important;
    }
    .price-label {
        font-size: 11px !important;
        font-family: din-2014;
    }
</style>
