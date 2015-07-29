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

    }else{
      console.log("the file " + ymlFile + " failed to load.")
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
  $('#storyHeader').css("background-image", "url("+story.coverImage+")");
  $('#storyHeader').css("background-size", "cover");
  $('#storyHeader').css("background-position", "center 50%");


  loadMdFile(story.text, displayFullText, failedToLoadStory);

  gpxList = story.gps;
  positionAndZoom = [];
  markersArray = [];
  imagesInUrl = story.images;
  skin = story.mapskin;
  showControls = 0;
  mdInUrl = [];

  // call the map initialization
  initializeMap(gpxList, positionAndZoom, markersArray, imagesInUrl, skin, showControls, mdInUrl );

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
