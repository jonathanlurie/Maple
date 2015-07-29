var MARKDOWN_DIR = "md_files/";
var GPS_DIR = "gpx_files/";
var STORY_DIR = "story_files/";

DEFAULT_POSITION = [60.1708, 24.9375];
DEFAULT_ZOOM = 15;
SPLIT_CHAR = '*';
REPLACE_CHAR = '__';
DEFAULT_MARKER_DESCRIPTION = "This marker has nothing to say.";

DEFAULT_SKIN = "Mapbox Terrain";





var regularIcon = L.icon({
	iconUrl: 'icons/iconblue.png',
	iconSize:     [40, 40], // size of the icon
	iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -45]
});


var photoIcon = L.icon({
	iconUrl: 'icons/iconphoto.png',
	iconSize:     [40, 40], // size of the icon
	iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -45]
});


var positionCircle = L.circle(DEFAULT_POSITION, 10, {
		weight: 0,
		color: '#0000BB',
		fillColor: '#0000BB',
		fillOpacity: 0.1
});
