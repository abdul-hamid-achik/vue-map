export default {
    "center": [-97.566735,
        32.740584
    ],
    "css": {
        "shape": {
            "fill-color": "#E2E7E1",
            "fill-opacity": 0.9
        },
        "border": {
            "line-color": "#99998f",
            "line-width": 0.9
        },
        "hover": {
            "fill-color": "#2C4F68",
            "fill-opacity": 0.5
        },
        "disabled": {
            "fill-color": "#cccccc",
            "fill-opacity": 0.8
        },
    },
    "center_lat": 32.740288,
    "center_lon": -97.568164,
    "colors": {
        "available": "#F0F6EF",
        "hover": "#1F78B4",
        "reserved": "#e9c676",
        "sold": "#D3C5CC",
        "approved": "#F4CE42",
        "arc": "#F4CE42",
        "closed": "#1F78B4",
        "denied": "#E31A1C",
        "spec": "#E31A1C",
        "pending": "#33A02C",
        "default": "#E2E7E1",
        "highlight": "blue"
    },

    "description": false,
    "lookup_column": "sku",
    "search": false,
    "shareable": false,
    "tiles_loader": true,
    "title": false,
    "token": "pk.eyJ1IjoiYWxhc3NldHRlciIsImEiOiI3andLQ1MwIn0.1q6yuZJaMCnAW0cm_6vy_A",
    "zoom": 15,
    "style": 'mapbox://styles/alassetter/cj518rby614rn2rrpr1bix73v',
    "container": 'map',
    "sources": [{
            "id": "buildings",
            "type": "geojson",
            "data": "static/json/buildings.json"
        }, {
            "id": "education",
            "type": "geojson",
            "data": "static/json/educationbuildings.json"
        }, {
            "id": "parks",
            "type": "geojson",
            "data": "static/json/parks.json"
        }, {
            "id": "amenities",
            "type": "geojson",
            "data": "static/json/amenity.json"
        }, {
            "id": "landplan",
            "type": "geojson",
            "data": "static/json/landplan.json"
        },

    ],
    "layers": [{
        'id': 'building-fills',
        'type': 'fill-extrusion',
        'source': 'buildings',
        'paint': {
            'fill-extrusion-color': 'hsl(72, 52%, 92%)',
            'fill-extrusion-height': {
                'property': 'height',
                'type': 'identity'
            },
            'fill-extrusion-base': {
                'property': 'base_height',
                'type': 'identity'
            },
            'fill-extrusion-opacity': 1
        }
    }, {
        'id': 'education-fills',
        'type': 'fill-extrusion',
        'source': 'education',
        'paint': {
            'fill-extrusion-color': {
                'property': 'color',
                'type': 'identity'
            },
            'fill-extrusion-height': {
                'property': 'height',
                'type': 'identity'
            },
            'fill-extrusion-base': {
                'property': 'base_height',
                'type': 'identity'
            },
            'fill-extrusion-opacity': 1
        }
    }, {
        'id': 'parks-fills',
        'type': 'fill-extrusion',
        'source': 'parks',
        'paint': {
            'fill-extrusion-color': {
                'property': 'color',
                'type': 'identity'
            },
            'fill-extrusion-height': {
                'property': 'height',
                'type': 'identity'
            },
            'fill-extrusion-base': {
                'property': 'base_height',
                'type': 'identity'
            },
            'fill-extrusion-opacity': 1
        }
    }, {
        'id': 'amenities-extrusion',
        'type': 'fill-extrusion',
        'source': 'amenities',
        'paint': {
            'fill-extrusion-color': 'hsl(72, 52%, 92%)',
            'fill-extrusion-height': {
                'property': 'height',
                'type': 'identity'
            },
            'fill-extrusion-base': {
                'property': 'base_height',
                'type': 'identity'
            },
            'fill-extrusion-opacity': 1
        }
    }, {
        'id': 'landplan-extrusion',
        'type': 'fill-extrusion',
        'source': 'landplan',
        'paint': {
            'fill-extrusion-color': '#A2AB96',
            'fill-extrusion-height': {
                'property': 'height',
                'type': 'identity'
            },
            'fill-extrusion-base': {
                'property': 'base_height',
                'type': 'identity'
            },
            'fill-extrusion-opacity': 0.08
        }
    }, {
        "id": "shape",
        "source": "records",
        "type": "fill",
        "paint": {
            "fill-color": "#E2E7E1",
            "fill-opacity": 0.9
        }
    }, {
        "id": "border",
        "source": "records",
        "type": "line",
        "paint": {
            "line-color": "#99998f",
            "line-width": 0.9
        }
    }, {
        "id": "hover",
        "source": "records",
        "type": "fill",
        "paint": {
            "fill-color": "#2C4F68",
            "fill-opacity": 0.5
        },
        "filter": ["==", "sku", ""]
    }]
}