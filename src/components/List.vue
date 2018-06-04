<template>
  <div class="listings-wrapper padding-0" :class="{'col-xs-3': viewType == 'mapViewActive', 'col-xs-12': viewType == 'gridViewActive'}">
    <div class="col-xs-12 padding-0" v-if="viewType == 'mapViewActive' || viewType == 'gridViewActive'" :class="{'grid-view': viewType == 'gridViewActive'}">
        <div id="listingstabs" style="">
            <ul class="nav nav-pills homes-sites-toggles" :class="{ 'grid-view-tabs': viewType == 'gridViewActive' }"  >
                <li v-bind:class="{ active: isHomeSitesTabActive }" data-name="home-sites" >
                    <a id="home-sites-button" v-on:click="toggleClick">Home Sites <span class="grid-view-toggle-number">{{ available.length }}</span></a>
                </li>
                <li v-bind:class="{ active: isHomesTabActive }" data-name="homes">
                    <a id="homes-button" v-on:click="toggleClick">Homes <span class="grid-view-toggle-number">{{ spec.length }}</span></a>
                </li>
                <li v-if="viewType == 'gridViewActive'">
                </li>
            </ul>
            <div id="listings" class="tab-content clearfix">
                <div class="tab-pane active" id="homesites">
                    <div id="home-site-list" class="listings-grid-wrapper" :class="{'pull-left': viewType == 'mapViewActive'}">
                      <div v-if="isHomeSitesTabActive" :class="{'grid-column-config': viewType == 'gridViewActive'}">
                        <div v-if="available.length > 0">
                          <div v-for="record in available" :key="record.id">
                            <HomeSitesListItem :record="record"></HomeSitesListItem>
                          </div>
                        </div>
                        <div v-else>
                          <div class="homes-list-item">
                            <div class="home-list-container animation-scale-up">
                              <div class="record" lot="record.id">
                                <div class="record-info" style="height:100%;">
                                  <h4>No Listings Found.</h4>
                                  <p> Unfortunately we couldn't find any listings that match your filters. You have a few options: </p> 
                                  <ol>
                                    <li>
                                      Removing some of your applied filters.
                                    </li>
                                    <li>
                                      Clear all filters. 
                                    </li>
                                  </ol>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-else :class="{'grid-column-config': viewType == 'gridViewActive'}">
                        <div v-if="spec.length > 0">
                          <div v-for="record in spec" :key="record.id">
                            <HomesListItem :record="record"></HomesListItem>
                          </div>
                        </div>
                        <div v-else>
                          <div class="homes-list-item">
                            <div class="home-list-container animation-scale-up">
                              <div class="record" lot="record.id">
                                <div class="record-info" style="height:100%;">
                                  <h4>No Listings Found.</h4>
                                  <p> Unfortunately we couldn't find any listings that match your filters. You have a few options: </p> 
                                  <ol>
                                    <li>
                                      Removing some of your applied filters.
                                    </li>
                                    <li>
                                      Clear all filters. 
                                    </li>
                                  </ol>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="listingstabs" class="table-view" v-else-if="viewType == 'tableViewActive'">
      <ul class="nav nav-pills homes-sites-toggles">
        <li v-bind:class="{ active: isHomeSitesTabActive }" data-name="home-sites">
          <a id="home-sites-button" v-on:click="toggleClick">
            Home Sites 
            <span class="grid-view-toggle-number">{{available.length}}</span>
          </a>
        </li>
        <li v-bind:class="{ active: isHomesTabActive }" data-name="homes">
          <a id="homes-button" v-on:click="toggleClick">
            Homes
            <span class="grid-view-toggle-number">{{spec.length}}</span>
          </a>
        </li>
      </ul>
      <div class="container">
        <div v-if="isHomesTabActive && !isHomeSitesTabActive">
          <table-component :table-class="'homes-table'" :cache-key="'homes'" :key="'homes'" :show-filter="false" :show-caption="false" :data="spec">
            <table-column show="photo" label="Property">
             <template slot-scope="row">
                <div class="row">
                  <div class="col-md-4">
                    <img  class="img-responsive" v-bind:src="row.photo">
                  </div>
                  <div class="col-md-8">
                    <div class="address">
                      {{ row.label }}
                    </div>
                    <div class="builder">
                      {{ row.builder ? row.builder.label : '' }}
                    </div>
                  </div>
                </div>
             </template>
            </table-column>
            <table-column show="style" label="Arch. Style">
              <template slot-scope="row">
                <span class="style">{{ row.style ? row.style.label : '' }}</span>
              </template>
            </table-column>
            <table-column show="beds" label="Bed">
              <template slot-scope="row">
                <span class="beds">{{ row.beds }}</span>
              </template>
            </table-column>
            <table-column show="baths" label="Bath">
              <template slot-scope="row">
                <span class="baths">{{ row.baths }}</span>
              </template>
            </table-column>
            <table-column show="garage" label="Garage">
              <template slot-scope="row">
                <span class="garage">{{ row.garage }}</span>
              </template>
            </table-column>
            <table-column show="status" label="Status">
              <template slot-scope="row">
                <div v-if="row.status">
                  <span class="status">
                    {{ row.status }}
                  </span> - 
                  <span class="date-available" v-if="row.spec && row.spec.available">
                    {{ row.spec.available }}
                  </span>
                </div>
                <div v-else>
                  <span class="date-available" v-if="row.spec && row.spec.available">
                    {{ row.spec.available }}
                  </span>
                </div>
              </template>
            </table-column>
            <table-column show="price">
              <template slot-scope="row">
                <span class="pretty-price">{{ prettyPrice(row.price) }}</span>
                <span class="price-label">Starting from</span>
              </template>
            </table-column>
            <table-column>
              <template slot-scope="row">
                <button @click="clickHandler(row)" class="btn btn-default more-info">More info</button>
              </template>
            </table-column>
          </table-component>
        </div>
        <div v-else>
          <table-component :table-class="'home-sites-table'"  :cache-key="'homesites'" :key="'homesites'" :show-filter="false" :show-caption="false" :data="available">
            <table-column show="photo" label="Property">
             <template slot-scope="row">
                <div class="row">
                  <div class="col-md-4">
                    <img  class="img-responsive" v-bind:src="row.photo">
                  </div>
                  <div class="col-md-8">
                    <div class="address">
                      {{ row.label }}
                    </div>
                    <div class="builder">
                      {{ row.builder ? row.builder.label : '' }}
                    </div>
                  </div>
                </div>
             </template>
            </table-column>
            <table-column show="size" label="Lot Size">
              <template slot-scope="row">
                <span class="size">{{ row.size }}</span>
              </template>
            </table-column>
            <table-column show="Price">
              <template slot-scope="row">
                <span class="pretty-price">{{ prettyPrice(row.price) }}</span>
                <span class="price-label">Starting from</span>
              </template>
            </table-column>
            <table-column>
              <template slot-scope="row">
                <button @click="clickHandler(row)" class="btn btn-default more-info">More info</button>
              </template>
            </table-column>
          </table-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeSitesListItem from '@/components/HomeSitesListItem'
import HomesListItem from '@/components/HomesListItem'
import { TableComponent, TableColumn } from 'vue-table-component'
export default {
  props: ['records', 'viewType'],
  name: 'List',
  components: {HomeSitesListItem, HomesListItem, TableComponent, TableColumn},
  data () {
    var data = {
      isHomeSitesTabActive: true,
      isHomesTabActive: false,
      available: [],
      spec: [],
      model: [],
      selectedDataSource: []
    }
    return data
  },  
  watch: {
    records: function (newData, oldData) {
      var records = [].concat(newData)
      this.available = this.getAvailableHomes(records)
      this.spec = this.getSpecHomes(records)
      this.selectedDataSource = this.isHomeSitesTabActive ? this.available : this.spec
    },
    isHomeSitesTabActive: function (newData, oldData) {
      this.selectedDataSource = this.isHomeSitesTabActive ? this.available : this.spec
    },
  },
  methods: {    
    clickHandler(record) {
      this.$router.push('/' + record.id)
    },
    toggleClick (event) {
      switch (event.target.id) {
        case 'home-sites-button':
          this.isHomeSitesTabActive = true
          this.isHomesTabActive = false
        break;
        case 'homes-button':
          this.isHomeSitesTabActive = false
          this.isHomesTabActive = true
        break;
      }
    },
    prettyPrice(price) {
      return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    getAvailableHomes(records) {
      var available = []
      for (var i = 0; i < records.length; i++) {
        var record = records[i]
        if (record.sale || record.status == "Sold") {
            continue
        }

        var label = record.label
        label = label + " Aledo TX"
        var parts = label.split(" ")

        var queryString = parts.join("+")
        record.directions = "https://www.google.com/maps/dir/" + queryString
        if (record.sqft){
            record.prettySqft = record.sqft.toLocaleString()
        }

        if (!record.price || record.price === 1 || record.price === 250000) {
            record.price = 250000
        }

        record.prettyPrice = this.prettyPrice(record.price)
        record.model = (record.status == "Reserved") ? true : false
        record.address = record.label
        if (record.model) {
            continue
        }
        if (!record.spec || !record.arc) {
            available.push(record)
        }
      }
      return available
    },
    getSpecHomes(records) {
        var specs = []
        for (var i = 0; i < records.length; i++) {
            var record = records[i]
            if (record.sale || record.status == "Sold") {
                continue
            }

            var label = record.label
            label = label + " Aledo TX"
            var parts = label.split(" ")

            var queryString = parts.join("+")
            record.directions = "https://www.google.com/maps/dir/" + queryString

            if (record.sqft) {
                record.prettySqft = record.sqft.toLocaleString()
            }

            if (!record.price || record.price === 1 || record.price === 250000) {
                record.price = 250000
            }
            
            record.prettyPrice = this.prettyPrice(record.price)
            record.model = (record.status == "Reserved") ? true : false
            record.address = record.label

            if (record.model) {
                continue
            }

            if (record.spec || record.arc) {
                // if (record.model || record.spec) {
                //     delete record.status
                // }

                specs.push(record)
            }
        }
        return specs
    },
  }
}
</script>

<style lang="scss" scoped>
#listingstabs .nav-pills li a {
  min-width: 8.5em;
}
#listingstabs .tab-content {
  padding-left: 0;
}
.listings-container, #listingstabs .tab-content .no-lots-found, #home-site-list, #home-list, #homes-table, #home-sites-table {
  height: calc(100vh - 113px);
}

#listingstabs .nav-pills li a { 
  font-family: din-2014;
  font-size: 11px;
  text-transform: uppercase;
  padding-top: 17px;
  padding-bottom: 5px;
}

#homes-button:after {
  display: none;
}

#listingstabs .nav-pills li.active a {
  border-bottom-width: 2px;
}
#listingstabs > .nav-pills > li {
  height: 40px;
}
.grid-column-config {
  column-count: 3;
}

.grid-view {
  display: inline-block;
  width: 100%;
  .listings-grid-wrapper {
    padding: 0 160px !important;
  }
}

.grid-view-toggle-number {
  font-size: 10px;
  font-weight: bold;
  height: 16px;
  width: 30px;
  position: relative;
  top: -3px;
}

#listingstabs {
  .grid-view-tabs.homes-sites-toggles.nav.nav-pills {
    padding: 0 167px;
    li{
      height: 60px;
      a {
        font-size: 15px;
        padding-top: 25px;
      }
    }
  }
}

.more-info {
  padding-top: 15px;
}

.date-available{
  font-size: 11px;
  font-weight: bold;
  font-family: helvetica;

}


</style>
