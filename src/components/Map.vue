<template>
  <div v-if="viewType == 'mapViewActive'" class="map-container col-xs-9 padding-0">
      <div class="nav-row sorting-row">
      </div>
      <div id="map"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import config from '@/config'
import {eventBus} from '../main'
import MapTooltip from './MapTooltip'
import mapboxgl from 'mapbox-gl'
export default {
  props: ['records', 'filteredRecords', 'totalLength', 'viewType'],
  name: 'Map',

  data () {
    return {
      modifiedRecords: [],
      token: config.token,
      mapOptions: {
        container: 'map',
        style: config.style,
        center: config.center,
        zoom: config.zoom
      },
      lot: null,
      lot_id: null,
      currentlySelectedLayer: null,
      layersHistory: {},
      map: null,
      popup: Vue.extend(MapTooltip),
      mapboxPopup: new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: (0, 5),
      }),
      filterTimeout: null
    }
  },


  created() {
    this.mapboxPopup.setHTML('<div id="popup-content"></div>')
    eventBus.$on("requestFullscreen", _ => {
      this.map.getCanvas().webkitRequestFullScreen()
      this.map.resize()
    })
    eventBus.$on("homeHovered", (record) => {
      if (!this.viewType == 'mapViewActive') {
        return
      }
      this.clearMapSelection()
      var center = [].concat(record.centerpoint)

      this.map.flyTo({
          center: center.reverse(),
          zoom: 15.5
      })

      let border = config.css.border
      let shape = config.css.shape

      border["line-color"] = "#666666"
      border["line-width"] = 0.9
      shape["fill-color"] = "#2C4E67"
      shape["fill-opacity"] = 0.5

      this.currentlySelectedLayer = {
          shape: {
              id: record.id + "_{timestamp}_shape".replace("{timestamp}", Date.now()),
              type: "fill",
              source: {
                  type: "geojson",
                  data: this.generateFeature(record)
              },
              paint: shape
          },
          border: {
              id: record.id + "_{timestamp}_border".replace("{timestamp}", Date.now()),
              type: "line",
              source: {
                  type: "geojson",
                  data: this.generateFeature(record)
              },
              paint: border
          }
      }
      this.layersHistory["instanceBorder"] = this.map.addLayer(this.currentlySelectedLayer.border)
      this.layersHistory["instanceShape"] = this.map.addLayer(this.currentlySelectedLayer.shape)

    })
    eventBus.$on("homeUnhovered", (data) => {
      this.clearMapSelection()
    })
    eventBus.$on('unselectedOption', function () {
      this.clearFilteredLotsFromMap()
    }.bind(this))
    eventBus.$on("clearAllFilters", function () {
      this.clearFilteredLotsFromMap()
    }.bind(this))
  },
  
  watch: {
    viewType: function (newData, oldData) {
      if (newData == 'mapViewActive') {
        this.$nextTick(_ => {
          mapboxgl.accessToken = config.token
          var map = new mapboxgl.Map(config)
          this.map = map
          this.map.addControl(new mapboxgl.NavigationControl())
          this.map.doubleClickZoom.disable()
          this.map.scrollZoom.disable()
          this.map.on('load', this.mapLoad)
        })
      }
    },
    records: function (newData, oldData) {
      this.modifiedRecords = this.modifyRecords(newData)
    },
    filteredRecords: function (newData, oldData) {
      if (newData.length == this.records.length) {
        return
      }
      this.clearFilteredLotsFromMap()
      if (this.filterTimeout) {
        clearTimeout(this.filterTimeout)
      }
      this.filterTimeout = setTimeout(_ => {
        var params = this.generateMapData(this.filteredRecords)
        this.map.addSource('filtered-records', params)
        var shape = {
          id: 'filtered-records-fill',
          source: 'filtered-records',
          type: 'fill',
          paint: {
            "fill-color": "blue",
            "fill-opacity": 0.9
          }
        }
        var border = {
          id: 'filtered-records-border',
          source: 'filtered-records',
          type: 'line',
          paint: {
            "line-color": "#99998f",
            "line-width": 0.9
          }
        }
        this.map.addLayer(shape)
        this.map.addLayer(border)
      }, 300)
    }
  },

  methods: {
    clearFilteredLotsFromMap() {
      if (this.map && this.map.getSource('filtered-records')) {
        this.map.removeLayer('filtered-records-fill')
        this.map.removeLayer('filtered-records-border')
        this.map.removeSource('filtered-records')
      }
    },
    generateMapData(records) {
      var recordsList = records.slice(0)
      var features = []
      var data = {
          type: "FeatureCollection",
          features: features
      }
      for (var i = 0; i < recordsList.length; i++) {
        features.push(
          this.generateFeature(recordsList[i])
        )
      }
      return {
        type: "geojson",
        data: data
      }      
    },
    mapLoad(event) {
      var params = this.generateMapData(this.records)
      this.map.setLight({
          color: "#fff",
          intensity: 0.5,
          position: [1.15, 135, 45]
      })
      this.map.addSource('records', params)
      this.clearSourcesAndLayers()
      this.addOtherSources()
      this.addOtherLayers()
      this.map.addLayer({
        id: "sold",
        source: this.getAllSoldLots(params),
        type: 'fill',
        paint: {
          'fill-color': config.colors.sold,
          'fill-opacity': 0.9
        }
      })
      this.map.addLayer({
        id: "spec",
        source: this.getAllSpecLots(params),
        type: 'fill',
        paint: {
          'fill-color': config.colors.spec,
          'fill-opacity': 0.9
        }
      })
      this.map.addLayer({
        id: "reserved",
        source: this.getAllReservedLots(params),
        type: 'fill',
        paint: {
          'fill-color': config.colors.reserved,
          'fill-opacity': 0.9
        }
      })
      this.bindEvents()
    },

 

    bindEvents() {
      this.map.on("mousemove", "shape", (event) => {
        this.mapboxPopup.setLngLat(event.lngLat)
        if (this.lot_id != event.features[0].properties.id) {
          this.lot_id  = event.features[0].properties.id
          this.lot = this.records.find(item => item.id === this.lot_id)
          this.mapboxPopup
            .setHTML('<div id="popup-content"></div>').addTo(this.map)
          new this.popup({ propsData: { record: this.lot }}).$mount('#popup-content')
        }

        this.map.getCanvas().style.cursor = 'pointer'
      })

      this.map.on("mouseleave", "shape", (e) => {
        this.map.getCanvas().style.cursor = ''
        this.lot_id = null,
        this.lot = {}
        this.mapboxPopup.remove()
      })

      this.map.on("mousemove", "hover", (e) => {
        this.map.getCanvas().style.cursor = "pointer"

      })

      this.map.on("click", "shape", (e) => {
        var properties = e.features[0].properties
        var id = properties.id

        var data = this.records.filter(function(record) {
          if (record.id == id) {
              return record
          }
        })[0]

        if (data.status == 'Closed' || data.status == "Sold") {
          return
        }

        eventBus.$emit('showSidePanel', data)
      })
    },
    clearSourcesAndLayers() {
      var layersCopy = config.layers.slice(0)
      layersCopy.map((layer) => {
        if (this.map.getLayer(layer["id"])) {
          this.map.removeLayer(layer["id"])
        }
      })

      var sourcesCopy = config.sources.slice(0)
      config.sources.map((source) => {
        if (this.map.getSource(source["id"])) {
          this.map.removeSource(source["id"])
        }
      })
    },
    addOtherSources() {
      var configCopy = config.sources.slice(0)
      configCopy.map((source) => {
        var sourceId = source["id"]
        var params = {
          type: source.type,
          data: source.data
        }
        this.map.addSource(sourceId, params)
      })
    },
    addOtherLayers() {
      var configCopy = config.layers.slice(0)
      configCopy.map((layer) => {
        this.map.addLayer(layer)
      })
    },
    prettyPrice (price) {
      return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    modifyRecords (records) {
      var data = []
      for (var i = 0; i < records.length; i++) {
        var record = records[i]
        if (record.sqft) {
            record.prettySqft = record.sqft.toLocaleString()
        }

        if (!record.price || record.price === 1 || record.price === 250000) {
            record.price = 250000
        }
        
        record.prettyPrice = this.prettyPrice(record.price)
        record.model = (record.status == "Reserved") ? true : false

        data.push(record)
      }

      return data
    },

    clearMapSelection () {
      if (this.currentlySelectedLayer) {
        if (this.map.getLayer(this.currentlySelectedLayer.border.id) && this.map.getLayer(this.currentlySelectedLayer.shape.id)) {
            this.map.removeLayer(this.currentlySelectedLayer.border.id)
            this.map.removeLayer(this.currentlySelectedLayer.shape.id)
            delete this.layersHistory["instanceBorder"]
            delete this.layersHistory["instanceShape"]
            this.currentlySelectedLayer = null
        }
      }
    },

    generateFeature (record) {
      var coordinates = this.cleanupCoordinates(record.polygon)
      var xy = record.centerpoint.slice(0).reverse()
      return {
        type: "Feature",
        properties: {
            id: record.id,
            sku: record.sku,
            color: record.color,
            xy: xy,
            status: record.status
        },
        geometry: {
            type: "Polygon",
            coordinates: coordinates
        }
      }
    },
    cleanupCoordinates (polygon) {
      var coordinates = []
      var coordinatesList = polygon[0]
      for (var j = 0; j < coordinatesList.length; j++) {
          coordinates.push(coordinatesList[j].map(item => String(item)).reverse())
      }
      return [coordinates]
    },
    getAllSoldLots(params) {
      var result = {
        'type': 'geojson',
        'data': {
          "type": "FeatureCollection",
          "features": params.data.features.filter(record => record.properties.status == 'Sold').filter(record => record)
        }
      }
      return result
    },
    getAllSpecLots(params) {
      var result = {
        'type': 'geojson',
        'data': {
          "type": "FeatureCollection",
          "features": params.data.features.filter(record => record.properties.status == 'Spec').filter(record => record)
        }
      }
      return result
    },
    getAllReservedLots(params) {
      var result = {
        'type': 'geojson',
        'data': {
          "type": "FeatureCollection",
          "features": params.data.features.filter(record => record.properties.status == 'Reserved').filter(record => record)
        }
      }
      return result
    },
  }
}
</script>

<style lang="scss" scoped>
  #map {
    height: calc(100vh - 102px);
  }
</style>
