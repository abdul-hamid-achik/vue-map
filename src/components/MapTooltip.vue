<template>
    <span id="map-tooltip-template" container="tooltip-container">
        <div class="info-panel">
            <div class="info-panel-container">
                <div class="info-panel-media">
                    <div>
                        <img v-bind:src="photo" alt="" />
                    </div>
                </div>

                <div class="info-panel-content">
                    <div class="address">{{ label }}</div>
                    <div class="info">
                        <div class="row">
                          <span class="first-row-data" v-if="beds">{{ beds }} Bed |</span>
                          <span class="first-row-data" v-if="baths">{{ baths }} Bath |</span>
                          <span class="first-row-data" v-if="prettySqft">{{ prettySqft }} Sq Ft</span>
                        </div>
                        <div class="row">{{ builder }}</div>
                        <div class="row"><button class="btn btn-default more-info">More Info</button></div>
                    </div>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
export default {
  props: ['record'],
  name: 'MapTooltip',
  data () {
    return {
      photo: this.record.photo,
      label: this.record.label,
      size: this.record.size,
      model: this.record.model,
      beds: this.record.bed,
      baths: this.record.baths,
      prettySqft: this.record.sqft.toLocaleString(),
      builder: this.record.builder ? this.record.builder.label : '',
      prettyPrice: this.record.prettyPrice
    }
  },
}
</script>

<style lang="css" scoped>
.info-panel {
  margin: 0;
}
.info-panel .info-panel-media {
  width: 30%;
}
.address {
  font-weight: bold;
}
.row {
  margin-left: 0;
}
.first-row-data {
  display: inline-block !important;
  font-size: 11px !important;
}
.more-info {
  width: 100%;
  padding-top: 12px;

}
</style>
