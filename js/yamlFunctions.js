// import js source with jquery
$.getScript("js/yamljs/yaml.js");
$.getScript("js/tools.js");
$.getScript("js/constants.js");
$.getScript("js/editorFunctions.js");
$.getScript("js/functions.js");
$.getScript("js/mapCreation.js");




// main entry point of the story loading part.
// since this method is asynchronous, the rest will be triggered from it.
// doSomething is a function to call when the json object of the yaml is ready.
// so doSomething(jsonObj) is called.
function loadYmlFile(ymlFile, doSomething){
  $(document).load(STORY_DIR + ymlFile, function(response, status, xhr) {


    if(status == "success"){
      ymlString = response;

      storyJson = YAML.parse(ymlString);

      if(typeof doSomething == "function"){
        doSomething(storyJson);
      }

    }

  });
}


// display a story by its name
function displayOneStory(story){
  console.log(story);


  // displaying the fields
  $("#title").html(story.title);
  $("#subtitle").html(story.subtitle);
  $("#date").html(getFormatedDate(story.date));
  $("#author").html(story.author);
  $("#excertp").html(story.excertp);
  //$("#cover").attr("src", story.coverImage);
  //$("#miniProfile").attr("src", story.coverImage);
  $("#miniProfile").attr("src", "img/profile/" + story.author.replace(' ', '_') + ".jpg");

  $('#storyHeaderBackground').css("background-image", "url("+story.coverImage+")");
  $('#storyHeaderBackground').css("background-size", "cover");
  $('#storyHeaderBackground').css("background-position", "center 50%");


  loadMdFile(story.text, displayFullText, failedToLoadStory);

  gpxList = story.gps;
  positionAndZoom = [];
  markersArray = [];
  imagesInUrl = story.images;
  skin = story.mapskin;
  showControls = 0;
  mdInUrl = [];

  displayImage(story.images);

  // call the map initialization
  initializeMap(gpxList, positionAndZoom, markersArray, imagesInUrl, skin, showControls, mdInUrl );



}


function displayImage(imgs){

  // hide the side panel if there is no image
  if(! imgs.length){
    $("#imageRoll").hide();
  }

  for(i=0; i<imgs.length; i++){


    $("#imageRoll").append('<img class="rolledImage" src="' + imgs[i] + '" onclick="localizeImageOnclick(this)" />');

  }

}


function localizeImageOnclick(idImg){
  //console.log($(idImg).attr("lat")   );

  if($(idImg).is("[lat]")){
    zoomTo($(idImg).attr("lat"), $(idImg).attr("lon"), 16);
  }else{
    console.log("no location");
  }

}



// display the full text, after converting from MD to HTML
function displayFullText(filename, content){
  html = md2html(content);
  $("#fulltext").html(html);
}

// a default 404 story to load, when the text loading failed for a real story
function failedToLoadStory(){
  loadYmlFile("story404.yml", displayOneStory);
}


function hideStoryPanel(){

  $( "#fulltext" ).fadeTo( "fast" , 0, function() {
    // Animation complete.
    $( "#fulltext" ).hide();
  });

  $( "#storyHeaderBackground" ).fadeTo( "fast" , 0, function() {
    // Animation complete.
    $( "#storyHeaderBackground" ).hide();
  });

  $( "#arrowFoldDiv" ).fadeTo( "fast" , 0, function() {
    // Animation complete.
    $( "#arrowFoldDiv" ).hide();
  });

  $( "#coverlightener" ).fadeTo( "fast" , 0, function() {
    // Animation complete.
    $( "#coverlightener" ).hide();
    $("#arrowUnfoldDiv").show();

  });




}


function showStoryPanel(){

  $( "#fulltext" ).fadeTo( "fast" , 1, function() {
    // Animation complete.
    $( "#fulltext" ).show();
  });

  $( "#storyHeaderBackground" ).fadeTo( "fast" , 1, function() {
    // Animation complete.
    $( "#storyHeaderBackground" ).show();
  });

  $( "#arrowFoldDiv" ).fadeTo( "fast" , 1, function() {
    // Animation complete.
    $( "#arrowFoldDiv" ).show();
  });

  $( "#coverlightener" ).fadeTo( "fast" , 1, function() {
    // Animation complete.
    $( "#coverlightener" ).show();
    $("#arrowUnfoldDiv").hide();

  });

}
