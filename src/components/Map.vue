<template>
  <div v-if="viewType == 'mapViewActive'" class="map-container col-xs-9 padding-0">
      <div class="nav-row sorting-row">
      </div>
      <div id="map"></div>
  </div>
</template>

<script>
import Vue from "vue";
import config from "@/config";
import { eventBus } from "../main";
import MapTooltip from "./MapTooltip";
import mapboxgl from "mapbox-gl";
export default {
  props: ["records", "filteredRecords", "totalLength", "viewType"],
  name: "Map",

  data() {
    return {
      modifiedRecords: [],
      token: config.mapbox.token,
      mapOptions: {
        container: config.mapbox.container,
        style: config.mapbox.style,
        center: config.mapbox.map_center,
        zoom: config.mapbox.zoom,
        pitch: config.mapbox.pitch
      },
      currentlySelectedLayer: null,
      layersHistory: {},
      map: null,
      popup: Vue.extend(MapTooltip),
      mapboxPopup: new mapboxgl.Popup(),
      filterTimeout: null
    };
  },

  created() {
    eventBus.$on("requestFullscreen", _ => {
      this.map.getCanvas().webkitRequestFullScreen();
      this.map.resize();
    });
    eventBus.$on("homeHovered", record => {
      if (!this.viewType == "mapViewActive") {
        return;
      }
      this.clearMapSelection();
      var center = [].concat(record.centerpoint);

      this.map.flyTo({
        center: center.reverse(),
        zoom: 18
      });

      let border = config.css.border;
      let shape = config.css.shape;

      this.currentlySelectedLayer = {
        shape: {
          id:
            record.id + "_{timestamp}_shape".replace("{timestamp}", Date.now()),
          type: "fill",
          source: {
            type: "geojson",
            data: this.generateFeature(record)
          },
          paint: shape
        },
        border: {
          id:
            record.id +
            "_{timestamp}_border".replace("{timestamp}", Date.now()),
          type: "line",
          source: {
            type: "geojson",
            data: this.generateFeature(record)
          },
          paint: border
        }
      };
      this.layersHistory["instanceBorder"] = this.map.addLayer(
        this.currentlySelectedLayer.border
      );
      this.layersHistory["instanceShape"] = this.map.addLayer(
        this.currentlySelectedLayer.shape
      );
    });
    eventBus.$on("homeUnhovered", data => {
      this.clearMapSelection();
    });
    eventBus.$on(
      "unselectedOption",
      function() {
        this.clearFilteredLotsFromMap();
      }.bind(this)
    );
    eventBus.$on(
      "clearAllFilters",
      function() {
        this.clearFilteredLotsFromMap();
      }.bind(this)
    );
  },

  watch: {
    viewType: function(newData, oldData) {
      if (newData == "mapViewActive") {
        this.$nextTick(_ => {
          mapboxgl.accessToken = config.mapbox.token;
          var map = new mapboxgl.Map(config);
          this.map = map;
          this.map.addControl(new mapboxgl.NavigationControl());
          this.map.addControl(new mapboxgl.FullscreenControl());
          this.map.doubleClickZoom.disable();
          this.map.scrollZoom.disable();
          this.map.on("load", this.mapLoad);
        });
      }
    },
    records: function(newData, oldData) {
      this.modifiedRecords = this.modifyRecords(newData);
    },
    filteredRecords: function(newData, oldData) {
      if (newData.length == this.records.length) {
        return;
      }
      this.clearFilteredLotsFromMap();
      if (this.filterTimeout) {
        clearTimeout(this.filterTimeout);
      }
      this.filterTimeout = setTimeout(_ => {
        var params = this.generateMapData(this.filteredRecords);
        this.map.addSource("filtered-records", params);
        var shape = {
          id: "filtered-records-fill",
          source: "filtered-records",
          type: "fill",
          paint: {
            "fill-color": config.filtered.fill_color,
            "fill-opacity": config.filtered.fill_opacity
          }
        };
        var border = {
          id: "filtered-records-border",
          source: "filtered-records",
          type: "line",
          paint: {
            "line-color": config.filtered.outline_color,
            "line-width": config.filtered.line_width
          }
        };
        this.map.addLayer(shape);
        this.map.addLayer(border);
      }, 300);
    }
  },

  methods: {
    clearFilteredLotsFromMap() {
      if (this.map && this.map.getSource("filtered-records")) {
        this.map.removeLayer("filtered-records-fill");
        this.map.removeLayer("filtered-records-border");
        this.map.removeSource("filtered-records");
      }
    },
    generateMapData(records) {
      var recordsList = records.slice(0);
      var features = [];
      var data = {
        type: "FeatureCollection",
        features: features
      };
      for (var i = 0; i < recordsList.length; i++) {
        features.push(this.generateFeature(recordsList[i]));
      }
      return {
        type: "geojson",
        data: data
      };
    },
    mapLoad(event) {
      var params = this.generateMapData(this.records);

      this.map.addSource("records", params);
      this.clearSourcesAndLayers();
      this.addOtherSources();
      this.addOtherLayers();

      // Add in all available Homes and Homesites
      this.map.addLayer({
        id: "available",
        source: this.getAllAvailableLots(params),
        type: "fill",
        paint: {
          "fill-color": config.status_available.fill_color,
          "fill-opacity": config.status_available.fill_opacity,
          "fill-outline-color": config.status_available.outline_color
        }
      });
      this.map.addLayer({
        id: "arc",
        source: this.getAllArcLots(params),
        type: "fill",
        paint: {
          "fill-color": config.status_arc.fill_color,
          "fill-opacity": config.status_arc.fill_opacity,
          "fill-outline-color": config.status_arc.outline_color
        }
      });
      this.map.addLayer({
        id: "closed",
        source: this.getAllClosedLots(params),
        type: "fill",
        paint: {
          "fill-color": config.status_closed.fill_color,
          "fill-opacity": config.status_closed.fill_opacity,
          "fill-outline-color": config.status_closed.outline_color
        }
      });

      this.map.addLayer({
        id: "sold",
        source: this.getAllSoldLots(params),
        type: "fill",
        paint: {
          "fill-color": config.status_sold.fill_color,
          "fill-opacity": config.status_sold.fill_opacity,
          "fill-outline-color": config.status_sold.outline_color
        }
      });
      this.map.addLayer({
        id: "spec",
        source: this.getAllSpecLots(params),
        type: "fill",
        paint: {
          "fill-color": config.status_spec.fill_color,
          "fill-opacity": config.status_spec.fill_opacity,
          "fill-outline-color": config.status_spec.outline_color
        }
      });
      this.map.addLayer({
        id: "reserved",
        source: this.getAllReservedLots(params),
        type: "fill",
        paint: {
          "fill-color": config.status_reserved.fill_color,
          "fill-opacity": config.status_reserved.fill_opacity,
          "fill-outline-color": config.status_reserved.outline_color
        }
      });
      this.bindEvents();
    },
    bindEvents() {
      this.map.on("mousemove", "shape", e => {
        var feature = e.features[0];
        var id = feature.properties.id;
        this.map.setFilter("hover", ["==", "id", id]);
        this.mapboxPopup
          .setLngLat(eval(feature.properties.xy))
          .setHTML('<div id="popup-content"></div>')
          .addTo(this.map);
        var record = this.modifiedRecords.filter(record => record.id == id)[0];
        new this.popup({ propsData: { record: record } }).$mount(
          "#popup-content"
        );
      });

      this.map.on("mouseleave", "shape", e => {
        setTimeout(_ => {
          this.map.setFilter("hover", ["==", "id", ""]);
          this.mapboxPopup.remove();
        }, 500);
      });

      this.map.on("mousemove", "hover", e => {
        this.map.getCanvas().style.cursor = "pointer";
      });

      this.map.on("mouseleave", "hover", e => {
        this.map.getCanvas().style.cursor = "";
      });

      this.map.on("click", "shape", e => {
        var properties = e.features[0].properties;
        var id = properties.id;

        var data = this.records.filter(function(record) {
          if (record.id == id) {
            return record;
          }
        })[0];

        eventBus.$emit("showSidePanel", data);
      });
    },
    clearSourcesAndLayers() {
      var layersCopy = config.layers.slice(0);
      layersCopy.map(layer => {
        if (this.map.getLayer(layer["id"])) {
          this.map.removeLayer(layer["id"]);
        }
      });

      var sourcesCopy = config.sources.slice(0);
      config.sources.map(source => {
        if (this.map.getSource(source["id"])) {
          this.map.removeSource(source["id"]);
        }
      });
    },
    addOtherSources() {
      var configCopy = config.sources.slice(0);
      configCopy.map(source => {
        var sourceId = source["id"];
        var params = {
          type: source.type,
          data: source.data
        };
        this.map.addSource(sourceId, params);
      });
    },
    addOtherLayers() {
      var configCopy = config.layers.slice(0);
      configCopy.map(layer => {
        this.map.addLayer(layer);
      });
    },
    prettyPrice(price) {
      return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    modifyRecords(records) {
      var data = [];
      for (var i = 0; i < records.length; i++) {
        var record = records[i];

        if (record.sqft) {
          record.prettySqft = record.sqft.toLocaleString();
        }

        record.prettyPrice = this.prettyPrice(record.price);
        record.model = record.status == "Reserved" ? true : false;

        data.push(record);
      }

      return data;
    },

    clearMapSelection() {
      if (this.currentlySelectedLayer) {
        if (
          this.map.getLayer(this.currentlySelectedLayer.border.id) &&
          this.map.getLayer(this.currentlySelectedLayer.shape.id)
        ) {
          this.map.removeLayer(this.currentlySelectedLayer.border.id);
          this.map.removeLayer(this.currentlySelectedLayer.shape.id);
          delete this.layersHistory["instanceBorder"];
          delete this.layersHistory["instanceShape"];
          this.currentlySelectedLayer = null;
        }
      }
    },

    generateFeature(record) {
      var coordinates = this.cleanupCoordinates(record.polygon);
      var xy = record.centerpoint.slice(0).reverse();
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
      };
    },
    cleanupCoordinates(polygon) {
      var coordinates = [];
      let coordinatesList = polygon[0];
      for (var j = 0; j < coordinatesList.length; j++) {
        coordinates.push(
          coordinatesList[j].map(item => String(item)).reverse()
        );
      }
      return [coordinates];
    },
    getAllAvailableLots(params) {
      var result = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: params.data.features
            .filter(record => record.properties.status == "Available")
            .filter(record => record)
        }
      };
      return result;
    },
    getAllArcLots(params) {
      var result = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: params.data.features
            .filter(record => record.properties.status == "ARC")
            .filter(record => record)
        }
      };
      return result;
    },
    getAllSoldLots(params) {
      var result = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: params.data.features
            .filter(record => record.properties.status == "Sold")
            .filter(record => record)
        }
      };
      return result;
    },
    getAllClosedLots(params) {
      var result = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: params.data.features
            .filter(record => record.properties.status == "Closed")
            .filter(record => record)
        }
      };
      return result;
    },
    getAllSpecLots(params) {
      var result = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: params.data.features
            .filter(record => record.properties.status == "Spec")
            .filter(record => record)
        }
      };
      return result;
    },
    getAllReservedLots(params) {
      var result = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: params.data.features
            .filter(record => record.properties.status == "Reserved")
            .filter(record => record)
        }
      };
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: calc(100vh - 102px);
}
</style>
