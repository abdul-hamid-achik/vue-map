export default {
  center: [-97.566735, 32.740584],
  //Initial map animation loading
  animateMap: {
    bearing: 0, //Ending Camera postion North 0
    center: [-97.56653308868408, 32.73660607970235], //Controls the ending camera position
    curve: 1.42, // change the speed at which it zooms out
    // duration: 6200, //The animation's duration, measured in milliseconds.
    pitch: 45,
    speed: 0.6, // make the flying slow
    zoom: 15.78 //Ending Camera zoom
  },
  //Animation map on Thumnail hover
  animateOnHover: {
    bearing: 0, //Ending Camera postion North 0
    curve: 1.42, // change the speed at which it zooms out
    pitch: 45,
    speed: 0.6, // make the flying slow
    zoom: 18 //Ending Camera zoom
  },
  //Animatie back to inital loaded map position
  animateUnhovered: {
    bearing: 0, //Ending Camera postion North 0
    curve: 1.42, // change the speed at which it zooms out
    pitch: 45,
    speed: 0.6, // make the flying slow
    zoom: 15.78 // Set to the initial map zoom
  },
  mapLighting: {
    color: "#fff",
    intensity: 0.5,
    position: [1.15, 210, 30]
  },
  mapOptions: {
    token:
      "pk.eyJ1IjoiYWxhc3NldHRlciIsImEiOiI3andLQ1MwIn0.1q6yuZJaMCnAW0cm_6vy_A",
    style: "mapbox://styles/alassetter/cjhmhlnua0xqm2skzgg9mu1r9",
    // minZoom: 3,
    // maxZoom: 16,
    zoom: 10,
    container: "map",
    // center: [-97.566735, 32.740584],
    center: [-97.566, 32.73],
    bearing: 0,
    pitch: 0
  },

  center_lat: 32.740288,
  center_lon: -97.568164,
  //Not sure if these are being used
  description: false,
  lookup_column: "sku",
  search: false,
  shareable: false,
  tiles_loader: true,
  title: false,
  // Setting for Thumbnail Rollover - Map Indicatior
  action_tmb_hover: {
    fill_color: "#181F35",
    fill_opacity: 0.8,
    outline_color: "#181F35",
    line_color: "#181F35",
    line_width: 1
  },
  // Sold Homes & Homesites
  status_closed: {
    fill_color: "#e9e9ed",
    fill_opacity: 0.9,
    outline_color: "#999999"
  },
  // Closed Homes & Homesites
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
  // Setting for Search Indicatiors
  filtered: {
    fill_color: "#68AEB9",
    fill_opacity: 0.9,
    line_color: "#487981",
    line_width: 0.9
  },
  sources: [
    {
      id: "buildings",
      type: "geojson",
      data: "static/json/walsh-buildings.geojson"
    },
    {
      id: "amenities",
      type: "geojson",
      data: "static/json/amenities.geojson"
    }
  ],
  layers: [
    {
      id: "3d-buildings",
      type: "fill-extrusion",
      source: "buildings",
      minzoom: 10,
      paint: {
        "fill-extrusion-color": ["get", "color"],
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"]
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "base_heigh"]
        ],
        "fill-extrusion-opacity": 0.9
      }
    },
    {
      id: "amenities-fills",
      type: "fill",
      source: "amenities",
      paint: {
        "fill-color": ["get", "color"],
        "fill-opacity": 0.9,
        "fill-outline-color": ["get", "color"]
      }
    },
    {
      id: "shape",
      source: "records",
      type: "fill",
      paint: {
        "fill-color": "white",
        "fill-opacity": 0.9
      }
    },
    {
      id: "border",
      source: "records",
      type: "line",
      paint: {
        "line-color": "#999999",
        "line-width": 0.9
      }
    },
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
