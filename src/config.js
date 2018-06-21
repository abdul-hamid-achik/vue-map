export default {
  center: [-97.567, 32.740288],
  css: {
    shape: {
      "fill-color": "red",
      "fill-opacity": 1.0
    },
    border: {
      "line-color": "black",
      "line-width": 1.0
    },
    hover: {
      "fill-color": "teal",
      "fill-opacity": 1.0
    },
    disabled: {
      "fill-color": "pink",
      "fill-opacity": 1.0
    }
  },

  mapbox: {
    token:
      "pk.eyJ1IjoiYWxhc3NldHRlciIsImEiOiI3andLQ1MwIn0.1q6yuZJaMCnAW0cm_6vy_A",
    style: "mapbox://styles/alassetter/cjhmhlnua0xqm2skzgg9mu1r9",
    map_center: [-97.567, 32.740288],
    zoom: 15.78,
    container: "map",
    pitch: 45
  },
  tiles_loader: true,

  default_lot: {
    shape: {
      "fill-color": "red",
      "fill-opacity": 1.0
    },
    border: {
      "line-color": "black",
      "line-width": 1.0
    },
    hover: {
      "fill-color": "teal",
      "fill-opacity": 1.0
    },
    disabled: {
      "fill-color": "",
      "fill-opacity": 1.0
    }
  },
  status_available: {
    fill_color: "white",
    fill_opacity: 1.0,
    outline_color: "#"
  },
  status_reserved: {
    fill_color: "#ecf1d5",
    fill_opacity: 1.0,
    outline_color: "#999999"
  },
  status_sold: {
    fill_color: "#e9e9ed",
    fill_opacity: 1.0,
    outline_color: "#999999"
  },
  status_spec: {
    fill_color: "black",
    fill_opacity: 1.0,
    outline_color: "black"
  },

  filtered: {
    fill_color: "#68AEB9",
    fill_opacity: 1.0,
    outline_color: "#487981",
    line_width: 0.9
  },
  opacity: {
    opacity_1: 0.1,
    opacity_2: 0.2,
    opacity_3: 0.3,
    opacity_4: 0.4,
    opacity_5: 0.5,
    opacity_6: 0.6,
    opacity_7: 0.7,
    opacity_8: 0.8,
    opacity_9: 0.9,
    opacity_10: 1.0
  },
  colors: {
    filtered_fill: "#68AEB9",
    filtered_fill_opacity: 0.9,
    filtered_lot_outline: "#000000",
    filtered_lot_line_width: 1.0,
    default_lot_fill: "white",
    default_lot_fill_opacity: 1.0,
    default_lot_line_width: 0.9,
    default_lot_outline: "#999999",
    available_fill: "white",
    available_fill_opacity: "1.0",
    available_outline: "#999999",
    sold_fill: "#e9e9ed",
    sold_fill_opacity: "1.0",
    sold_outline: "#999999",
    hover: "red",
    reserved: "#ecf1d5",
    reserved_lot_outline: "#999999",
    sold: "#e9e9ed",
    sold_lot_outline: "#999999",
    closed: "red",
    spec: "red",
    spec_lot_outline: "#999999",
    default: "blue",

    highlight: "blue"
  },
  // Delete
  zoom: 15.78,
  // Delete
  style: "mapbox://styles/alassetter/cjhmhlnua0xqm2skzgg9mu1r9",
  // Delete
  container: "map",

  sources: [
    {
      id: "buildings",
      type: "geojson",
      data: ""
    },
    {
      id: "education",
      type: "geojson",
      data: ""
    },
    {
      id: "parks",
      type: "geojson",
      data: ""
    },
    {
      id: "amenities",
      type: "geojson",
      data: ""
    },
    {
      id: "landplan",
      type: "geojson",
      data: ""
    }
  ],
  layers: [
    {
      id: "shape",
      source: "records",
      type: "fill",
      paint: {
        "fill-color": "white",
        "fill-opacity": 0.1
      }
    },
    {
      id: "border",
      source: "records",
      type: "line",
      paint: {
        "line-color": "#99998f",
        "line-width": 0.9
      }
    },
    {
      id: "hover",
      source: "records",
      type: "fill",
      paint: {
        "fill-color": "green",
        "fill-opacity": 0.5
      },
      filter: ["==", "sku", ""]
    }
  ]
};
