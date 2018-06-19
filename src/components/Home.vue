<template>
    <div class="content">
        <FilterNavbar :records="records" :filteredRecords="filteredRecords" :totalLength="records.length"></FilterNavbar>
        <Map :viewType="viewType" :records="records" :filteredRecords="filteredRecords"></Map>
        <List :viewType="viewType" :records="filteredRecords"></List>
        <modals-container/>
    </div>
</template>

<script>
import Map from '@/components/Map'
import FilterNavbar from '@/components/FilterNavbar'
import SidePanel from '@/components/SidePanel'
import List from '@/components/List'
import {eventBus} from '../main'
export default {
  name: 'Home',
  props:['records'],
  components: {Map, FilterNavbar, List},
  data () {
    return {
      filteredRecords: [],
      filters: [],
      viewType: null
    }
  },
  mounted() {
    eventBus.$on("selectedOption", data => this.filters.push(data))
    eventBus.$on("unselectedOption", data => this.removeFilter(data))
    eventBus.$on("changedView", data => {
      this.viewType = data.type
    })

    eventBus.$on("clearAllFilters", function () {
      this.filteredRecords = this.records.filter(_ => true)
    }.bind(this))

    this.$nextTick(_ => {
      this.viewType = 'mapViewActive'
    })

    eventBus.$on("showSidePanel", data => {
      // let url = "http://localhost:8000/api/projects/1/marketing_site/lots/" + data.id

      let url = "https://staging.rpgbuilders.com/api/projects/1/marketing_site/lots/" + data.id
      this.$http.get(url).then(response => {
        this.$modal.show(SidePanel, { 
          record: response.body.lot
        }, {
          float: 'right',
          width: '720px',
          height: '100%',
        })
      })
    })
  },
  methods: {
    removeFilter(data) {
      this.filters.forEach((filter, index) => filter.label == data.label ? this.filters.splice(index, 1) : null)
    }
  },
  watch: {
    records: function (newValue, oldValue) {
      this.filteredRecords = this.records
    },

    filters: function (newValue, oldValue) {
      var buildersFilters = newValue.map(item => item.type == "builders" ? item.label : null).filter(item => item)
      var stylesFilters = newValue.map(item => item.type == "architecture" ? item.label : null).filter(item => item)
      var bedsFilters = newValue.map(item => item.type == "beds" ? item.label : null).filter(item => item)
      var priceFilter = newValue.map(item => {
        if (item.type == "price") {
          var priceRanges = item.label.split('$').splice(1).join("").split("-")
          return priceRanges.map(item => parseInt(item.trim().replace(/,/g, "")))
        }
      }).filter(item => item)

      this.filteredRecords = this.records.filter(record => {
        var buildersFilterCheck, stylesFilterCheck, bedsFilterCheck, priceFilterCheck
        buildersFilterCheck = true
        stylesFilterCheck = true
        bedsFilterCheck = true
        priceFilterCheck = true

        if (buildersFilters.length > 0) {
          buildersFilterCheck = buildersFilters.filter(builder => record.builder == builder).length > 0
        }

        if (stylesFilters.length > 0) {
          stylesFilterCheck =  stylesFilters.filter(style => record.style == style).length > 0
        }

        if (bedsFilters.length > 0 && !(record.beds && record.beds in bedsFilters)) {
          bedsFilterCheck = bedsFilters.filter(beds => {
            var numberOfBeds
            // need to cleanup
            if (beds.indexOf("1") != -1) {
              numberOfBeds = beds.split('bed')[0].trim() + "-10"
            } else {
              numberOfBeds = parseInt(beds.split('beds')[0].trim())
            }
            return numberOfBeds == record.beds
          }).length > 0
        }

        if (priceFilter.length == 1) {
          priceFilter.map(priceRange => {
            var min = priceRange[0], max = priceRange[1]
            if (!(min < record.price && max > record.price)) {
              priceFilterCheck = false
            }
          })
        } else if (priceFilter.length > 0) {
          var min = priceFilter[0][0], max = priceFilter[priceFilter.length - 1][1]
          if (!(min < record.price && max > record.price)) {
            priceFilterCheck = false
          }
        }

        return buildersFilterCheck && stylesFilterCheck && bedsFilterCheck && priceFilterCheck
      })
    }
  }
}
</script>

<style lang="scss">
.v--modal {
  top: 0 !important;
  left: 0 !important;
  float: right;
}


</style>
