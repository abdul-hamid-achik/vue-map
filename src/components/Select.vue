<template>
	<li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" @click="showListClickHandler" @mouseleave="mouseLeaveHandler">
      {{ label | capitalize }}
      <b class="caret"></b>
    </a>

    <ul :id="label" class="dropdown-menu" v-if="showList" @mouseenter="mouseEnterHandler" @mouseleave="mouseLeaveHandler">
      <li class="filter-checkbox" v-for="(item, index) in (label != 'price' ? sortAlph(options) : options)" :key="index">
        <input 
          type="checkbox" 
          :id="index + '_' + label + '_option'" 
          class="hidden-box" 
          :value="item" 
          @click="checkboxClickedHandler($event, index, item)"   
          :name="index + '_' + label + '_option'"
          :checked="checkedOptions[index] == true"
          ref="item"
          >
        <label :for="index + '_' + label + '_option'" class="check--label">
          <span class="check--label-box"></span>
          <span class="check--label-text">{{ item }}</span>
        </label>
      </li>
    </ul>
	</li>
</template>

<script>
import {eventBus} from '../main'
export default {

  name: 'Select',
  props: ['options', 'label'],
  data () {
    return {
    	selectedOptions: [],
    	showList: false,
    	leaveTimeout: null,
      checkedOptions: {},
      single: false

    }
  },
  mounted() {
    eventBus.$on('clearAllFilters', _ => {
      this.selectedOptions = []
      this.checkedOptions = {}
    })
    eventBus.$on('unselectedOption', function (data) {
      var index = this.selectedOptions.indexOf(data.label)
      if (index != -1) {
        var itemIndex = this.options.indexOf(data.label)
        this.selectedOptions.splice(index, 1)
        this.checkedOptions[itemIndex] = false
      }
    }.bind(this))
  },
  methods: {
  	checkboxClickedHandler(event, itemIndex, label) {
      if (this.single) {
        this.selectedOptions = []
      }
			var index = this.selectedOptions.indexOf(label)
      var type = this.label
  		if (index == -1) {
	  		this.selectedOptions.push(label)
        this.checkedOptions[itemIndex] = true
	  		eventBus.$emit("selectedOption", {label: label, type: type})
  		} else {
  			this.selectedOptions.splice(index, 1)
        this.checkedOptions[itemIndex] = false
  			eventBus.$emit("unselectedOption", {label: label, type: type})
  		}
  	},
  	clearTimeoutHandler() {
  		if (this.leaveTimeout) {
  			clearTimeout(this.leaveTimeout)
  		}
  	},
  	showListClickHandler (event) {
			event.preventDefault() 
			this.showList = true
  	},
  	mouseEnterHandler (event) {
  		this.clearTimeoutHandler()
  	},
  	mouseLeaveHandler (event) {
  		this.clearTimeoutHandler()
  		this.leaveTimeout = setTimeout(() => this.showList = false, 100)
  	},
    sortAlph: function (values) {
      var data = values.slice(0)
      return data.sort(function(a, b){
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
      })
    }
  },
  filters: {
	  capitalize: function (value) {
	    if (!value) return ''
	    value = value.toString()
	    return value.charAt(0).toUpperCase() + value.slice(1)
	  },
  },
}
</script>

<style lang="scss" scoped>
	.dropdown-menu {
		display: inline-block;
	}

	.dropdown-toggle {
	  padding-top: 9px !important;
	}
	.caret {
		height: 12px;
	}
  .check--label-text {
    padding: 0px 5px;
    padding-top: 19px;
    padding-bottom: 9px;
  }
  .check--label-box {
    height: 15px;
    width: 15px;
    margin: 5px 10px;
  }
  .check--label-box:after {
    top: 2px !important;
    left: 5px !important;
    width: 4px !important;
    height: 7px !important;
  }
</style>