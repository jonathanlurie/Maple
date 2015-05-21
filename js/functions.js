
// this function is mapped with the button with the little bug
function debugIt(){
	//alert(buildUrlNoSkin());
	//map.fitBounds(tracks[gpxList[0]].getBounds());
	//alert("What you though it would do?");
	console.log(imageFilesToLoad);

}




function printObject(o) {
  var out = '';
  for (var p in o) {

		//if(p.substring(0, 1) == '_'){
    	out += p + ': ' + o[p] + '\n';
		//}
  }
	//alert(out);
	console.log(out);
  //out += '<br><br><br>';
  //document.write(out);
}

// prompt an popup containing the ifram to share
function promptIframe(url){
	iframeString = "<iframe src=\"" + url  + "\" width=\"100%\" height=\"500px\" ></iframe>" ;
	bootbox.prompt({
   title: 'Copy-paste this code to embed the map',
   value: iframeString,
   callback: function(){
      //Example.show("Hello world callback");
   }
	});

}




// center the map on your current position
// placeIcon must be truc to draw a circle there
function localizeMe(placeIcon){
map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
	.on('locationfound', function(e){

		if(placeIcon){

			positionCircle.setLatLng([e.latitude, e.longitude]);
			positionCircle.setRadius(e.accuracy/2);
			map.addLayer(positionCircle);
		}

		updateZoomHome();

	})
.on('locationerror', function(e){
			console.log(e);
			alert("Location access denied.");

			//map.setView(DEFAULT_POSITION , DEFAULT_ZOOM);
			//updateZoomHome();

	});
}



// display the form where we chose the skin to embed the page.
// action must be "link" or "embed"
function promptEmbedForm(action){

	icon = 'fa fa-share-alt';

	if(action == "embed"){
		icon = 'fa fa-code';
	}

	if(action == "link"){
		icon = 'fa fa-share-alt';

	}


	t = '<i class="' + icon + '"> Chose a skin style</i>'

	mapSkinKeys = Object.keys(baseMaps);

	radioButtons = '';

	for(i=0; i<mapSkinKeys.length; i++){
		radioButtons += '<div class="radio"> <label for="awesomeness-1"> <input type="radio" name="awesomeness" id="awesomeness-1" ' +   (mapSkinKeys[i]==control.getActiveBaseLayer().name?'checked="checked"':'')  +'value="' + mapSkinKeys[i] + '">'+ mapSkinKeys[i]  +'</label> </div> ';
	}

	bootbox.dialog({
            title: t,

            message: 	'<div class="row">  ' +
                			'<div class="col-md-12"> ' +
		                '<form class="form-horizontal"> ' +
		                '<div class="form-group"> ' +
		                '<label class="col-md-4 control-label" for="awesomeness">Map background</label> ' +
		                '<div class="col-md-4">' +

										radioButtons +

										'</div> </div>' +


										'<div class="form-group"> ' +
										'<label class="col-md-4 control-label" for="displayControls">Control buttons</label> ' +
                    '<div class="col-md-4">'+
										'<div class="checkbox"> <label for="awesomeness-0"> ' +
                    '<input type="checkbox" name="displayControls" id="displayControls" value="Display them" checked="checked"> Display them</label> </div>' +
                    '</div> </div>' +

		                '</form> </div>  </div>',

            buttons: {
                success: {
                    label: "Continue",
                    className: "btn-success",
                    callback: function () {

                        var chosenSkin = $("input[name='awesomeness']:checked").val();
												var displayCtrl = $('#displayControls').is(":checked");

												urlWithSkin = addSkinToUrl(chosenSkin.replace(" ", REPLACE_CHAR));

												// display controls
												if(!displayCtrl){
													urlWithSkin += "&controls=0";
												}


												if(action == "embed"){
													promptIframe(urlWithSkin);
												}

												if(action == "link"){


													bootbox.prompt({
												   title: 'Here is your custom link',
												   value: urlWithSkin,
												   callback: function(){
												      //Example.show("Hello world callback");
												   }
													});


												}


                    }
                }
            }
        }
    );



}


// fetch the url arguments
function gup( name, url ) {

	// usage : mywebsite.com/page.html?gpx=myfile.gpx
  if (!url) url = location.href
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}



function getBaseUrl(){

	indexOfIntero = location.href.indexOf("?");


	if(indexOfIntero != -1){
		//return location.href + "?";
		baseUrl = location.href.substring(0, indexOfIntero);
	}else{
		baseUrl = location.href
	}

	return baseUrl;
}

// re build the url using gup, except for the skin
function buildUrlNoSkin(){

	completeUrl = getBaseUrl() + "?";

	// adding gpx info
	gpxArgument=gup('gpx');
	if(gpxArgument){
		completeUrl += "&gpx=" + gpxArgument;
	}

	// adding position info
	positionArgument = gup('position');
	if(positionArgument){
		completeUrl += "&position=" + positionArgument;
	}



	// adding markers
	for(i=0; i<markersArray.length; i++){
		lat = markersArray[i].getLatLng().lat;
		lon = markersArray[i].getLatLng().lng;
		popupTxt = markersArray[i].getPopup().getContent();
		completeUrl += "&marker" + (i+1) + "=" + lat + SPLIT_CHAR + lon + SPLIT_CHAR + popupTxt.replace(/ /g, REPLACE_CHAR)
	}



	// adding images
	if(imageFilesToLoad.length > 0){
		completeUrl += "&image="

		for(i=0; i< imageFilesToLoad.length - 1; i++){
			completeUrl += imageFilesToLoad[i] + "|";
		}

		completeUrl += imageFilesToLoad[imageFilesToLoad.length-1];
	}


	return completeUrl;

}


// add the skin to the complete url
function addSkinToUrl(s){
	customSkinUrl = buildUrlNoSkin() + "&skin=" + s;

	return customSkinUrl;

}



// updae the zoomhome button with current map position
function updateZoomHome(){
	zoomHome.options.homeCoordinates = map.getCenter();
	zoomHome.options.homeZoom = map.getZoom();
}


// just bind the double click event to the map, to add a marker
function addUpdateMarker(){

	map.on('click', addMarker2);

}


// function to remove the specific marker
function removeMarker(e){
	// cannot delete a point when in reading mode
	if(showControls){

		// remove from the map
		map.removeLayer(e.target);

		for(i=0; i<markersArray.length; i++){

			// find the match between the event object and the array object
			if(e.target === markersArray[i]){

				delete(markersArray[i]);
				markersArray[i] = 0;
				delete(e.target);
				e.target = 0;

				// alter the array
				markersArray.splice(i, 1);

			}
		}
	}
}


// add the specificMarker to the map
function addMarker(e){

		map.setView(e.latlng);

		bootbox.prompt({
  		title: "Add a description to your marker",
  		value: DEFAULT_MARKER_DESCRIPTION,
  		callback: function(result) {
    		if (result === null) {

    		}else{

					tmpMarker = L.marker(e.latlng, {icon: regularIcon});
					tmpMarker.on('dblclick', removeMarker);

					map.addLayer(tmpMarker);

					tmpMarker.bindPopup(  result );
					tmpMarker.openPopup();
					markersArray.push(tmpMarker);
    		}
  		}
		});

		map.off('click', addMarker);
}




function addMarker2(e){

		map.setView(e.latlng);

		bootbox.dialog({
                title: "Customize your marker",

								message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +


                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label" for="name">Description</label> ' +
                    '<div class="col-md-9"> ' +
                    '<input id="description" name="description" type="text" placeholder="What\'s so special here?" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="form-group"> ' +
                    '<label class="col-md-3 control-label" for="awesomeness">Add an image?</label> ' +
                    '<div class="col-md-9">'+
										 '<input id="image" name="image" type="text" placeholder="Image url" class="form-control input-md"> '  +
                    '</div> </div>' +


                    '</form> </div>  </div>',

                		buttons: {

											danger: {
			      						label: "Cancel",
			      						className: "btn-default",
			      						callback: function() {

			      						}
			    						},


                    	success: {
                      	label: "Add",
                      	className: "btn-primary",
                      	callback: function () {
                      		var description = $('#description').val();
													var img = $('#image').val();


													description = "<p>" + description?description:DEFAULT_MARKER_DESCRIPTION + "</p>";


													if(img){
														description += '<a href="' + img +  '" target="_blank"><img src="' + img  + '" width="300px"></a>';
													}

													tmpMarker = L.marker(e.latlng, {icon: regularIcon});
													tmpMarker.on('dblclick', removeMarker);

													map.addLayer(tmpMarker);

													tmpMarker.bindPopup(  description );
													tmpMarker.openPopup();
													markersArray.push(tmpMarker);

                      	}
                    	},

                		}

            });

				map.off('click', addMarker2);

}



function focusOnGpxPrompt(){

	radioButtons = '';

	for(i=0; i<gpxList.length; i++){
		//radioButtons += '<div class="radio"> <label for="awesomeness-1"> <input type="radio" name="awesomeness" id="awesomeness-1" ' +   (i==(gpxList.length-1)?'checked="checked"':'')  +'value="' + gpxList[i] + '">'+ gpxList[i]  +'</label> </div> ';
		radioButtons += '<div class="radio"> <label for="awesomeness-1"> <input type="radio" name="awesomeness" id="awesomeness-1" ' +'value="' + gpxList[i] + '">'+ gpxList[i]  +'</label> </div> ';
	}


	bootbox.dialog({
            title: '<i class="fa fa-paw"> Focus on a track</i>',

            message: 	'<div class="row">  ' +
                			'<div class="col-md-12"> ' +
		                '<form class="form-horizontal"> ' +
		                '<div class="form-group"> ' +
		                '<label class="col-md-3 control-label" for="awesomeness">Chose a track</label> ' +
		                '<div class="col-md-8">' +

										radioButtons +

										'</div> </div>' +
		                '</form> </div>  </div>',

            buttons: {
                success: {
                    label: "Go",
                    className: "btn-success",
                    callback: function () {

                        var chosenSkin = $("input[name='awesomeness']:checked").val();
												map.fitBounds(tracks[chosenSkin].getBounds());


                    }
                }
            }
        }
    );

}



function addGeoImage(){


	bootbox.prompt({
  	title: 'Add an image with GPS informations',
		placeholder: "image URL (must be on the same server)",
  	callback: function(result){
			if (result !== null) {
				map.spin(true);
				ImageInfo.loadInfo(result, addGeoImageAfterCheck);

		  }
   	}
	});

}





// callback function when an image is loaded: we add a marker
// if the image is valid, adds it to the array for url export
// example of call :
// var file = "http://jonathanlurie.fr/wp-content/uploads/2015/05/wemontreal-9.jpg";
// ImageInfo.loadInfo(file, addGeoImageAfterCheck);
function addGeoImageAfterCheck(f) {


	var exif = ImageInfo.getAllFields(f).exif;

	// strange way to do, but in case of missload, false is returnes (instead of null)
	if ( exif != false) {

		// check if we have GPS informations
		if(typeof exif["GPSLatitude"] !== "undefined") {

			imageFilesToLoad.push(f);
			console.log(exif);

			var lat = ( exif["GPSLatitude"][0] + exif["GPSLatitude"][1]/60. + exif["GPSLatitude"][2]/3600.) * (exif["GPSLatitudeRef"] == "N"?1:-1 );
			var lon = ( exif["GPSLongitude"][0] + exif["GPSLongitude"][1]/60. + exif["GPSLongitude"][2]/3600.) * (exif["GPSLongitudeRef"] == "W"?-1:1 );
			var desc = exif["ImageDescription"];

			//console.log("lat : " + lat);
			//console.log("lon : " + lon);
			//console.log(desc);

			popupDesc = desc + '<br><a href="' + f +  '" target="_blank"><img src="' + f  + '" width="300px"></a>';

			tmpMarker = L.marker([ lat , lon ], {icon: photoIcon}).bindPopup( popupDesc );

			map.addLayer(tmpMarker);

			// if there is no gpx to load, we center on the image
			if(!gpxList.length){
				map.setView(tmpMarker.getLatLng(), DEFAULT_ZOOM);
				tmpMarker.openPopup();
			}


		// the image does not contain GPS information
		}else{
			bootbox.dialog({
  			title: "Oh oh...",
  			message: 'Impossible to place this image.<br>The image does not contain GPS information in EXIF.'
			});
		}

	}else{
		bootbox.dialog({
			title: "Oh oh...",
			message: 'This image does not have EXIF information'
		});
	}

	map.spin(false);

}
