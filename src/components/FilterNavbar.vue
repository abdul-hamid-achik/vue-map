<template>
  <div>
    <nav id="header" class="navbar navbar-default" role="navigation">
      <ul class="nav navbar-nav navbar-left">
        <Select :options="pricesList" label="price" single="true"></Select>
        <form class="navbar-form navbar-left bedrooms">
          <p class="navbar-text navbar-left">Bedrooms</p>
        </form>

        <form class="navbar-form navbar-left border-right" role="search">
          <div class="btn-toolbar" aria-label="Toolbar with button groups" role="toolbar">
            <div id="beds" class="btn-group" role="group">
              <button data-field="beds" data-value="0" type="button" :value="0" @click="handleBedClick(0)" class="btn btn-icon btn-default btn-outline" :class="{ active: bedSelectedButton == 0 }">All</button>
              <button data-field="beds" data-value="number" type="button" :value="number" @click="handleBedClick(number)" class="btn btn-icon btn-default btn-outline" :class="{ active: bedSelectedButton == number }" v-for="number in bedsList">+{{number}}</button>
            </div>
          </div>
        </form>

        <Select :options="buildersList" label="builders"></Select>
        <Select :options="stylesList" label="architecture"></Select>
        <li class="pull-right clear-filters-btn-container" role="search">
          <a id="clear-filters-btn" class="" @click="clearAllFilters()">Clear Filters <i class="icon-w-clear-search"></i> </a>
        </li>
      </ul>

      <form class="navbar-form navbar-right" role="search">
        <button type="button" class="btn btn-icon btn-default btn-outline " data-type="fullscreen" data-toggle="tooltip" data-placement="bottom" title="" id="fullscreen-button" @click="requestFullscreen()" data-original-title="Fullscreen">
          <i class="icon-w-full-screen"></i>
        </button>
      </form>
      <ul class="nav navbar-nav app-view-container">
        <li class="app-view-button"><a :class="{ active: mapViewActive }" @click="changeView('map')"><i class="fa fa-map"></i></a></li>
        <li class="app-view-button"><a :class="{ active: gridViewActive }" @click="changeView('grid')"><i class="fa fa-th"></i></a></li>
        <li class="app-view-button"><a :class="{ active: tableViewActive }" @click="changeView('table')"><i class="fa fa-table"></i></a></li>
      </ul>
    </nav>

    <Tags :currentlyShowing="filteredRecords.length" :totalLength="totalLength"></Tags>
  </div>
</template>
<script>
import Tags from '@/components/Tags'
import Select from './Select'
import {eventBus} from '../main'
export default {
  props: ['records', 'viewType', 'filteredRecords', 'totalLength'],
  name: 'FilterNavbar',
  components: {Select, Tags},
  data () {
    return {
      pricesList: [],
      bedsList: [],
      buildersList: [],
      stylesList: [],
      selectedBuilder: null,
      showBuildersList: false,
      currentlySelectedBuilders: [],
      bedSelectedButton: 0,
      mapViewActive: true,
      gridViewActive: false,
      tableViewActive: false
    }
  },
  mounted() {
    eventBus.$on('removedBedTag', function (value) {
      this.handleBedClick(0)
    }.bind(this))
  },
  watch: {
    records: function(newValue, oldValue) {
      this.buildersList = [...new Set(newValue.map(record => record.builder))].filter(label => label)
      this.stylesList = [...new Set(newValue.map(record => record.style))].filter(label => label)
      this.pricesList = this.generateRanges([...new Set(newValue.map(record => record.price))].filter(price => price).sort())
      this.bedsList = [...new Set(newValue.map(record => { return record.beds > 2 && record.beds < 6 ? record.beds : null }))].filter(bed => bed).sort((a,b) => a - b)
    }
  },
  methods: {
    clearAllFilters() {
      eventBus.$emit('clearAllFilters')
    },

    showBuildersHandler() {
      this.showBuildersList = true
    },

    handleBedClick(number) {
      var label
      if (number == 1) {
        label = " bed"
      } else {
        label = " beds"
      }
      var data = number + label
      eventBus.$emit('unselectedOption', { type: 'beds', label: this.bedSelectedButton + label })
      if (number != 0) {
        eventBus.$emit('selectedOption', { type: 'beds', label: data })
      }
      this.bedSelectedButton = number
    },

    changeView(type) {
      var viewTypes = ["mapViewActive", "gridViewActive", "tableViewActive"]
      viewTypes.map(item => this[item] = false)
      var view = type + "ViewActive"
      this[view] = true
      eventBus.$emit("changedView", {type: view})
    },

    requestFullscreen(){
      eventBus.$emit("requestFullscreen")
    },
    generateRanges(pricesList) {
      if (pricesList.length == 0) {
        return pricesList
      }
      
      var results = []
      var lowestNumber = pricesList[0]
      var highestNumber = pricesList[pricesList.length - 1]
      var lowestNumberDigits = lowestNumber.toString().split('')
      var highestNumberDigits = highestNumber.toString().split('')
      for (var i = parseInt(lowestNumberDigits[0]); i <= highestNumberDigits[0]; i++) {
        var lowest = (i + "00000")
        var highest = parseInt(((i + 1) + "00000")) - 1
        results.push(this.prettyPrice(lowest) + " - " + this.prettyPrice(highest))
      }
      return results
    },

    prettyPrice(price) {
      return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar-nav > li > .dropdown-menu {
  display: inline-block;
}
#beds .btn.btn-icon.btn-default{
  padding-top: 14px;
  padding-bottom: 6px;
  font-size: 11px;
}
p.navbar-text.navbar-left {
  margin-top: 26px;
  font-size: 11px;
}
#clear-filters-btn {
  padding-top: 9px;
  border-right: none;
}
.icon-w-clear-search {
  margin-left: 5px;
  margin-top: 2px;
}

.navbar-default .navbar-nav > li > a {
  font-size: 11px;
}
#fullscreen-button {
  border: none;
}
.app-view-container {
  margin-left: 110px;
}
.app-view-button a {
  border: none !important;
  padding: 0 10px !important;
  font-size: 15px !important;
  margin-right: 10px !important;
  &.active {
    color: black;
  }
}
</style>
