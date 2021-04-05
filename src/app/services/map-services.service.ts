import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {
    mapboxgl.accessToken = environment.MAPBOX_TOKEN;
  }

  //creating map 1
  //=============================================
  mapTrigger(lat, lng) {
    mapboxgl.accessToken = environment.MAPBOX_TOKEN;
    var map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: 7.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true,
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      var layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      map.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId
      );

      //setting pin point
      var geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              message: 'You are here',
              iconSize: [50, 50],
            },
            geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
          },
        ],
      };

      geojson.features.forEach(function (marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(../../../assets/jumping.gif)';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';
        el.style.backgroundSize = '100%';

        el.addEventListener('click', function () {
          window.alert(marker.properties.message);
        });

        // add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      });
    });
  }

  // creating map2
  //=============================================
  mapTrigger1(lat, lng) {
    mapboxgl.accessToken = environment.MAPBOX_TOKEN;
    var map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 7.5,
      container: 'map1',
    });

    var geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            message: 'You are here',
            iconSize: [50, 50],
          },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        },
      ],
    };

    geojson.features.forEach(function (marker) {
      // create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(../../../assets/jumping1.gif)';
      el.style.width = marker.properties.iconSize[0] + 'px';
      el.style.height = marker.properties.iconSize[1] + 'px';
      el.style.backgroundSize = '100%';

      el.addEventListener('click', function () {
        window.alert(marker.properties.message);
      });

      // add marker to map
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    });

    var coordinatesGeocoder = function (query) {
      // Match anything which looks like
      // decimal degrees coordinate pair.
      var matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
      );
      if (!matches) {
        return null;
      }

      function coordinateFeature(lng, lat) {
        return {
          center: [lng, lat],
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          place_name: 'Lat: ' + lat + ' Lng: ' + lng,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature',
        };
      }

      var coord1 = Number(matches[1]);
      var coord2 = Number(matches[2]);
      var geocodes = [];

      if (coord1 < -90 || coord1 > 90) {
        // must be lng, lat
        geocodes.push(coordinateFeature(coord1, coord2));
      }

      if (coord2 < -90 || coord2 > 90) {
        // must be lat, lng
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      if (geocodes.length === 0) {
        // else could be either lng, lat or lat, lng
        geocodes.push(coordinateFeature(coord1, coord2));
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      return geocodes;
    };
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 4,
        placeholder: `Your are at this lat ${lat} and long ${lng}`,
        mapboxgl: mapboxgl,
      })
    );
  }
}
