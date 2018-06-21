export default {
  // Want to Delete and move to Mapbox Config
  center: [-97.567, 32.740288],
  // Trying to see why we need this
  css: {
    shape: {
      "fill-color": "#181F35",
      "fill-opacity": 1.0
    },
    border: {
      "line-color": "black",
      "line-width": 1.0
    },
    hover: {
      "fill-color": "181F35",
      "fill-opacity": 1.0
    },
    disabled: {
      "fill-color": "pink",
      "fill-opacity": 1.0
    }
  },
  // Mapbox Config
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
      "fill-color": "181F35",
      "fill-opacity": 1.0
    },
    disabled: {
      "fill-color": "",
      "fill-opacity": 1.0
    }
  },
  // Status Configs
  status_available: {
    fill_color: "white",
    fill_opacity: 1.0,
    outline_color: "#999999"
  },
  // ARC same as Available
  status_arc: {
    fill_color: "white",
    fill_opacity: 1.0,
    outline_color: "#999999"
  },
  // Reserved = Model Homes
  status_reserved: {
    fill_color: "#ecf1d5",
    fill_opacity: 0.9,
    outline_color: "#999999"
  },
  // Spec = Available Home
  status_spec: {
    fill_color: "orange",
    fill_opacity: 0.9,
    outline_color: "#999999"
  },
  // Sold and Closed are the same
  status_sold: {
    fill_color: "#e9e9ed",
    fill_opacity: 0.9,
    outline_color: "#999999"
  },
  // Sold and Closed are the same
  status_closed: {
    fill_color: "#e9e9ed",
    fill_opacity: 0.9,
    outline_color: "#999999"
  },
  // Setting for Search Indicatiors
  filtered: {
    fill_color: "#68AEB9",
    fill_opacity: 1.0,
    outline_color: "#487981",
    line_width: 0.9
  },
  // Trying to see why we need this
  colors: {
    hover: "red",
    closed: "red",
    default: "blue",
    highlight: "blue"
  },
  // Want to Delete and move to Mapbox Config
  zoom: 15.78,
  // Want to Delete and move to Mapbox Config
  style: "mapbox://styles/alassetter/cjhmhlnua0xqm2skzgg9mu1r9",
  // Want to Delete and move to Mapbox Config
  container: "map",
  // Working ON
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
  // Still trying to see what theses go to?
  layers: [
    {
      id: "shape",
      source: "records",
      type: "fill",
      paint: {
        "fill-color": "#181F35",
        "fill-opacity": 0.9
      }
    },
    {
      id: "border",
      source: "records",
      type: "line",
      paint: {
        "line-color": "#181F35",
        "line-width": 0.9
      }
    },
    {
      id: "hover",
      source: "records",
      type: "fill",
      paint: {
        "fill-color": "#181F35",
        "fill-opacity": 0.9
      },
      filter: ["==", "sku", ""]
    }
  ]
};
