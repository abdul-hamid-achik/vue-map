<template>
	<div id="tags-container">
    <div class="row">
      <div class="col-md-2">
        <span class="num-filtered-listings">
          <span id="currently-showing">{{currentlyShowing}}</span> of <span id="total-length">{{totalLength}}</span> Properties
        </span>
      </div>
      <div class="col-md-10">
        <input-tag @update:tags="changeHandler" :tags.sync="tagsArray"></input-tag>
      </div>
    </div>
	</div>
</template>

<script>
import InputTag from 'vue-input-tag'
import {eventBus} from '../main'
export default {
  props: ['currentlyShowing', 'totalLength'],
  name: 'Tags',
  components: {InputTag},
  mounted() {
  	eventBus.$on('selectedOption', (value) => {
      console.log(value)
      this.oldArray = this.tagsArray.slice(0)
      this.tagsArray.push(value.label)
    })
  	eventBus.$on('unselectedOption', (value) => {
      this.oldArray = this.tagsArray.slice(0)
      this.tagsArray.splice(this.tagsArray.indexOf(value.label), 1)
    })
  	eventBus.$on('clearAllFilters', () => this.clearAllFilters())
  },
  methods: {
  	clearAllFilters() {
  		this.tagsArray = []
  	},
    changeHandler(tags) {
      this.deleteHandler(tags, this.tagsArray)
      this.tagsArray = tags
    },
    deleteHandler(newTags, oldTags) {
      var deleted = oldTags.filter((obj) => newTags.indexOf(obj) == -1)
      if (deleted.length > 0) {
        deleted.forEach(function (item) {
          eventBus.$emit('unselectedOption', { type: null, label: item })
        })
      }
    }
  },
  data () {
    return {
    	tagsArray: [],
      oldArray: []
    }
  },
  watch: {
    tagsArray: function (newArray, oldArray) {
      this.deleteHandler(newArray, oldArray)
    }
  }

}
</script>

<style lang="scss" scoped>
.num-filtered-listings {
  display: inline-block;
  height: 42px;
  font-size: 10px;
  font-weight: 600;
  padding: 17px;
  font-family: din-2014;
  text-transform: uppercase;
}
.num-filtered-listings:after {
  content: '';
  position: absolute;
  margin: auto;
  right: 0;
  bottom: 2%;
  width: 1px;
  height: 100%;
  background-color: #BDC4CB;
}
#tags-container {
	background-color: #FFF;
  border: 1px #cfd8dc solid;
	border-top: none;
  color: #90a4ae;
  display: block;
  width: 100%;
  height: 42px;
  border-bottom-width: 1px;
  padding-right: 15px;
  border-right-width: 0px;

  .clear-filters-btn-container, .vue-input-tag-wrapper {
    margin-top: 6px;
  }
  #currently-showing, #total-length{
    color: #546e7a;
    font-weight: 700;
    position: relative;
    top: -1px;

  }
}
.new-tag {
  display: none;
}
</style>