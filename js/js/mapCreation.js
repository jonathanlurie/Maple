$.getScript("js/functions.js");




function initializeMap(gpxList, positionAndZoom, markersArray, imagesInUrl, skin, showControls, mdInUrl ){

  // creating the main map
  //var map = new L.Map('map',  {zoomControl: false, center: new L.LatLng(0, 0), zoom: 11});
  map.attributionControl.setPrefix('<a href="https://github.com/jonathanlurie/Maple" target="_blank"><img src="icons/maple_logo_micro.png" height="20px"></a>');


  // plugin that displays a little house
  zoomHome = L.Control.zoomHome();
  zoomHome.addTo(map);


  // display a stylish minimap
  var minimapTileset = new L.TileLayer('https://{s}.tiles.mapbox.com/v4/matt.f714d988/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ', {minZoom: 0, maxZoom: 13 });


  // classic tilesets
  var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  	maxZoom: 19,
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  var osmTransport = new L.TileLayer('http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
  	maxZoom: 19,
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  var osmTopo = new L.TileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  	maxZoom: 16,
  	attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  	});

  var arcgistopo = new L.TileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.jpg');
  var cycling = new L.TileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
  	maxZoom: 19,
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  var mapquest = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png');

  // mapbox tilesets
  var mapboxTerrain = new L.TileLayer('https://{s}.tiles.mapbox.com/v4/matt.f714d988/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ', {
  	attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  	subdomains: 'abcd'
  });
  var mapboxDesert = new L.TileLayer('https://{s}.tiles.mapbox.com/v4/examples.ra3sdcxr/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q', {
  	attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  	subdomains: 'abcd'
  });
  var mapboxGreen = new L.TileLayer('https://{s}.tiles.mapbox.com/v4/katydecorah.162c3bac/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1Ijoia2F0eWRlY29yYWgiLCJhIjoiNGxUd0FiRSJ9.W6JiC41LhSNbMQjuF3NGhA', {
  	attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  	subdomains: 'abcd'
  });
  var mapboxWinter = new L.TileLayer('https://{s}.tiles.mapbox.com/v4/andreasviglakis.76e0cee7/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYW5kcmVhc3ZpZ2xha2lzIiwiYSI6IlVremRqN0kifQ.CFFJsLuWWyuhgsZTb51jWg', {
  	attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  	subdomains: 'abcd'
  });





  // hillshading tileset
  var hillshading = new L.TileLayer('http://korona.geog.uni-heidelberg.de:8004/tms_hs.ashx?x={x}&y={y}&z={z}', {opacity: 0.3});
  var OpenSeaMap = L.tileLayer('http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
  	attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
  });

  // Hillshading is the inly overlay we use
  var overlays = {
  	"Relief" : hillshading,
  	"OpenSeaMap" : OpenSeaMap
  };


  // all the tilesets
  var baseMaps = {
  		"Mapbox Terrain" : mapboxTerrain,
  		"Mapbox Desert" : mapboxDesert,
  		"Mapbox Winter" : mapboxWinter,
  		"Mapbox Green" : mapboxGreen,
  		"OSM": osm,
  		"OSM Transport" : osmTransport,
  		"OSM Topo" : osmTopo,
  		"OSM Cycling" : cycling,
  		//"ARCGIS Topo" : arcgistopo,
  		//"Mapquest" : mapquest,
  		"ESRI Topographic" : L.esri.basemapLayer('Topographic', {detectRetina: true }  ),
  		"ESRI Oceans" : L.esri.basemapLayer('Oceans', {detectRetina: true }),
  		"ESRI DarkGray" : L.esri.basemapLayer('DarkGray', {detectRetina: true }),
  		"ESRI Imagery" : L.esri.basemapLayer('Imagery'), // better without retina

  };

  // adding the layers to the map
  //L.control.layers(baseMaps, overlays).addTo(map);



  // skin is specified in the url
  if(skin){
  	//alert(skin);
  	skin = skin.replace(REPLACE_CHAR, " ");



  	// the specified skin does not exist
  	if(!baseMaps[skin]){
  		skin = DEFAULT_SKIN;
  	}
  }else{
  	// default skin
  	skin = DEFAULT_SKIN;
  }



  // display GPX tracks and adds controls
  if(gpxList.length){



  	// managing several gpx files, focus on the last one
  	controlLayer = {};
  	tracks = []

  	for(i=0; i<gpxList.length; i++){
  		map.spin(true);

  			if( i == gpxList.length-1){
  				tracks[gpxList[i]] = new L.GPX(GPS_DIR + gpxList[i], {async: true})
  					.on("loaded", function(e) {

              extendWideBounds(e.target.getBounds());

  						// we do center on the last gpx, only if no specific marker is specified in url
  						if(!markersArray.length && !positionAndZoom.length){
  							map.fitBounds(e.target.getBounds());
  							updateZoomHome();
  						}

  						map.spin(false);
  					}).addTo(map);
  			}else{

  				tracks[gpxList[i]] = new L.GPX(GPS_DIR + gpxList[i], {async: true})
  					.on("loaded", function(e) {
              extendWideBounds(e.target.getBounds());
  						map.spin(false);
  				}).addTo(map);
  			}

  	}

  	if(showControls){
  		// add the layer with the gpx tracks
  		map.addControl(  new L.Control.Layers({}, tracks)  );
  	}


  }



  // loading and placing images
  for(i=0; i< imagesInUrl.length ; i++){
  	map.spin(true);
  	ImageInfo.loadInfo(imagesInUrl[i], addGeoImageAfterCheck);

  }



  // place all the markers
  for(i=0; i<markersArray.length; i++){
  	map.addLayer(markersArray[i]);

  	if(i == markersArray.length-1){
  		map.setView(markersArray[i].getLatLng(), DEFAULT_ZOOM);
      extendWideBounds(markersArray[i].getLatLng());
  		markersArray[i].openPopup();
  		updateZoomHome();
  	}
  }


  // if a position was specified in the url, we move there
  if(positionAndZoom.length){
  	map.setView(positionAndZoom[0], positionAndZoom[1]);
  	updateZoomHome();
  }



  // if nothing was specified in the url, we locate
  if(!gpxList.length && !markersArray.length && !positionAndZoom.length && !imagesInUrl.length){
  	console.log("locate!");
  	map.locate({setView: true, watch: false}) /* This will return map so you can do chaining */
  		.on('locationfound', function(e){

  			updateZoomHome();

  		})
  	.on('locationerror', function(e){
  				alert("Location access denied.");

  				// if locate fails, we go to default position
  				map.setView(DEFAULT_POSITION , DEFAULT_ZOOM);
  				updateZoomHome();

  		});
  }



  // default map design
  map.addLayer(baseMaps[skin]);




  if(showControls){

  //Right click on the map activated
  map.on('contextmenu', function(e) {
    //alert(e.latlng);

  	lat = e.latlng.lat.toFixed(5);
  	lon = e.latlng.lng.toFixed(5);
  	mapleUrl = getBaseUrl() + "?marker1=" + lat + SPLIT_CHAR + lon + SPLIT_CHAR + "this__place";
  	gglurl = 'https://www.google.com/maps?q=' + lat + ',' + lon;

  	bootbox.dialog({
    	title: "Click position",
    	message: 'Latitude longitude <h1>' + lat + " " + lon + '</h1>Quick Maple link : <br><a href="' + mapleUrl + '" target="_blank">' + mapleUrl + '</a><br><br><a href="' + gglurl + '" target="_blank">Or display this place on Google Map.</a>'
  	});
  });





  	var miniMap = new L.Control.MiniMap(minimapTileset, { toggleDisplay: true }).addTo(map);

  	// necessary to get the active layer
  	var control = L.control.activeLayers(baseMaps, overlays);
  	control.addTo(map);


  // display the mouse coordinates
  L.control.coordinates({
  	position:"bottomleft",
  	decimals:4,
  	decimalSeperator:",",
  	labelTemplateLat:"Lat: {y}",
  	labelTemplateLng:"Lon: {x}"
  }).addTo(map);


  if(gpxArgument){
  	L.easyButton('fa-paw',
  	  function (){
  			focusOnGpxPrompt();
  	  },
  		'Focus on a track',
  		map,
  	 'pluginButton'
  	);
  }


  // button that display the iframe sharing
  L.easyButton('fa-camera-retro',
  	function (){addGeoImage()},
  	'Add localized image',
  	map,
  	"pluginButton"
  )

  // button that adds of remove a marker
  L.easyButton('fa-map-marker',
  	function (){addUpdateMarker()},
  	'Add a marker',
  	map,
  	"pluginButton"
  )


  // button to localize
  L.easyButton('fa-street-view',
    function (){
  		localizeMe(true);
    },
  	'Find me!',
  	map,
   'pluginButton'
  )


  // button that display the iframe sharing
  L.easyButton('fa-share-alt',
  	function (){promptEmbedForm("link")},
  	'Get a sharable link',
  	map,
  	"pluginButton"
  )


  // button that display the iframe sharing
  L.easyButton('fa-code',
  	function (){promptEmbedForm("embed")},
  	'Get html embed code',
  	map,
  	"pluginButton"
  )





  // button that display the iframe sharing
  var debugBt = L.easyButton('fa-bug',
  	function (){debugIt()},
  	'Debug',
  	map,
  	"pluginButton"
  )



  }


  //L.control.attribution({position: 'bottomright'}).addAttribution("yeahyeahyeah").addTo(map);



  // displaying markdown files on the side panel
  if(mdInUrl.length){
  //for(i=0; i< mdInUrl.length ; i++){
  	completeUrl = "md_files/" + mdInUrl[0];

  	$.get(completeUrl, function(response) {
  	    	var markdownContent = response;

  				if(markdownContent){
  					// creation of side div
  					$("body").append('<div id="storyDiv"></div>');

  					// to convert markdown to html
  					var converter = new showdown.Converter({extensions: ['youtube']});
  					converter.setOption('tasklists', true);
  					converter.setOption('strikethrough', true);

  					//console.log(markdownContent);
  					$("#storyDiv").html(converter.makeHtml(markdownContent));
  				}

  	});
  }



}
