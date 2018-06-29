export default {
  center: [-97.566735, 32.740584],
  // css: {
  //   shape: {
  //     "fill-color": "white",
  //     "fill-opacity": 0.9
  //   },
  //   border: {
  //     "line-color": "white",
  //     "line-width": 1
  //   },
  //   hover: {
  //     "fill-color": "white",
  //     "fill-opacity": 0.9
  //   },
  //   disabled: {
  //     "fill-color": "white",
  //     "fill-opacity": 0.9
  //   }
  // },
  center_lat: 32.740288,
  center_lon: -97.568164,
  mapsettings: {
    token:
      "pk.eyJ1IjoiYWxhc3NldHRlciIsImEiOiI3andLQ1MwIn0.1q6yuZJaMCnAW0cm_6vy_A",
    style: "mapbox://styles/alassetter/cjhmhlnua0xqm2skzgg9mu1r9",
    map_center: [-97.566735, 32.740584],
    zoom: 15.78,
    container: "map",
    bearing: 0,
    pitch: 0
  },
  // colors: {
  //   available: "white",
  //   hover: "white",
  //   reserved: "white",
  //   sold: "white",
  //   approved: "white",
  //   arc: "white",
  //   closed: "white",
  //   denied: "white",
  //   spec: "white",
  //   pending: "white",
  //   default: "white",
  //   highlight: "white"
  // },

  description: false,
  lookup_column: "sku",
  search: false,
  shareable: false,
  tiles_loader: true,
  title: false,
  token:
    "pk.eyJ1IjoiYWxhc3NldHRlciIsImEiOiI3andLQ1MwIn0.1q6yuZJaMCnAW0cm_6vy_A",
  zoom: 15,
  style: "mapbox://styles/alassetter/cjhmhlnua0xqm2skzgg9mu1r9",
  container: "map",
  // Setting for Thumbnail Rollover - Map Indicatior
  action_tmb_hover: {
    fill_color: "#181F35",
    fill_opacity: 0.9,
    line_color: "#181F35",
    line_width: 1
  },
  // Setting for Search Indicatiors
  filtered: {
    fill_color: "#68AEB9",
    fill_opacity: 0.9,
    line_color: "#487981",
    line_width: 0.9
  },

  // Sold and Closed are the same
  status_sold: {
    fill_color: "#e9e9ed",
    fill_opacity: 0.9,
    outline_color: "#999999"
  },
  // Spec = Available Home
  status_spec: {
    fill_color: "#e9e9ed",
    fill_opacity: 0.9,
    outline_color: "#999999"
  },
  // Reserved = Model Homes
  status_reserved: {
    fill_color: "#ecf1d5",
    fill_opacity: 0.9,
    outline_color: "#999999"
  },

  sources: [
    // {
    //   id: "buildings",
    //   type: "geojson",
    //   data: "static/json/buildings.json"
    // },
    // {
    //   id: "education",
    //   type: "geojson",
    //   data: "static/json/educationbuildings.json"
    // },
    // {
    //   id: "parks",
    //   type: "geojson",
    //   data: "static/json/parks.json"
    // },
    // {
    //   id: "amenities",
    //   type: "geojson",
    //   data: "static/json/amenity.json"
    // },
    // {
    //   id: "landplan",
    //   type: "geojson",
    //   data: "static/json/landplan.json"
    // }
  ],
  layers: [
    // {
    //   id: "building-fills",
    //   type: "fill-extrusion",
    //   source: "buildings",
    //   paint: {
    //     "fill-extrusion-color": "hsl(72, 52%, 92%)",
    //     "fill-extrusion-height": {
    //       property: "height",
    //       type: "identity"
    //     },
    //     "fill-extrusion-base": {
    //       property: "base_height",
    //       type: "identity"
    //     },
    //     "fill-extrusion-opacity": 1
    //   }
    // },
    // {
    //   id: "education-fills",
    //   type: "fill-extrusion",
    //   source: "education",
    //   paint: {
    //     "fill-extrusion-color": {
    //       property: "color",
    //       type: "identity"
    //     },
    //     "fill-extrusion-height": {
    //       property: "height",
    //       type: "identity"
    //     },
    //     "fill-extrusion-base": {
    //       property: "base_height",
    //       type: "identity"
    //     },
    //     "fill-extrusion-opacity": 1
    //   }
    // },
    // {
    //   id: "parks-fills",
    //   type: "fill-extrusion",
    //   source: "parks",
    //   paint: {
    //     "fill-extrusion-color": {
    //       property: "color",
    //       type: "identity"
    //     },
    //     "fill-extrusion-height": {
    //       property: "height",
    //       type: "identity"
    //     },
    //     "fill-extrusion-base": {
    //       property: "base_height",
    //       type: "identity"
    //     },
    //     "fill-extrusion-opacity": 1
    //   }
    // },
    // {
    //   id: "amenities-extrusion",
    //   type: "fill-extrusion",
    //   source: "amenities",
    //   paint: {
    //     "fill-extrusion-color": "hsl(72, 52%, 92%)",
    //     "fill-extrusion-height": {
    //       property: "height",
    //       type: "identity"
    //     },
    //     "fill-extrusion-base": {
    //       property: "base_height",
    //       type: "identity"
    //     },
    //     "fill-extrusion-opacity": 1
    //   }
    // },
    // {
    //   id: "landplan-extrusion",
    //   type: "fill-extrusion",
    //   source: "landplan",
    //   paint: {
    //     "fill-extrusion-color": "#A2AB96",
    //     "fill-extrusion-height": {
    //       property: "height",
    //       type: "identity"
    //     },
    //     "fill-extrusion-base": {
    //       property: "base_height",
    //       type: "identity"
    //     },
    //     "fill-extrusion-opacity": 0.08
    //   }
    // },
    //All Available Lots/Homes Fill Color Default
    {
      id: "shape",
      source: "records",
      type: "fill",
      paint: {
        "fill-color": "white",
        "fill-opacity": 0.9
      }
    },
    //All Available Lots/Homes Outline Default
    {
      id: "border",
      source: "records",
      type: "line",
      paint: {
        "line-color": "#999999",
        "line-width": 1
      }
    },
    // Indicates Hover on map rollover.
    {
      id: "hover",
      source: "records",
      type: "fill",
      paint: {
        "fill-color": "#BEB19F",
        "fill-opacity": 0.7,
        "fill-outline-color": "#756E66"
      },
      filter: ["==", "sku", ""]
    }
  ]
};
