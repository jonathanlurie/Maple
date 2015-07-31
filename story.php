<?php

require('php/StoryDataFetcher.php');

$sdf = new StoryDataFetcher("story-one");


?>


<html>
<head>
	<meta charset="UTF-8">

        <title><?php echo $sdf->buildTitle(); ?></title>


				<?php
					// display all the meta markups related to the current article
					echo $sdf->buildMetaMarkups();
				?>



        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

      	<!-- necessary for Leaflet -->
      	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.css" />
      	<script src="http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.js"></script>

      	<!-- necessary for GPX -->
      	<script src="js/GPXplugin/GPX.js"></script>

      	<!-- necessary for minimap -->
      	<link rel="stylesheet" href="js/minimap/Control.MiniMap.css" />
      	<script src="js/minimap/Control.MiniMap.js" type="text/javascript"></script>

      	<!-- Necessary for Coordinates-->
      	<script type="text/javascript" src="js/coordinates/Leaflet.Coordinates-0.1.4.src.js"></script>
      	<link rel="stylesheet" href="js/coordinates/Leaflet.Coordinates-0.1.4.css"/>

      	<!-- Necessary for ZoomHome-->
      	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"/>
      	<script src="js/zoomhome/leaflet.zoomhome.min.js"></script>
      	<link rel="stylesheet" href="js/zoomhome/leaflet.zoomhome.css"/>

      	<!-- Necessary for EasyButton-->
      	<link rel="stylesheet" href="js/EasyButton/style.css"/>
      	<script src="js/EasyButton/easy-button.js"></script>

      	<!-- necessary for Bootbox -->
      	<link rel="stylesheet" type="text/css" href="js/bootstrap/css/bootstrap.css">
      	<script src="js/bootstrap/js/bootstrap.min.js"></script>
      	<script src="js/bootbox/bootbox.js"></script>

      	<!-- necessary for ActiveLayers -->
      	<script src="js/activeLayers/ActiveLayers.js"></script>

      	<!-- necessary for ESRI skins -->
      	<script src="http://cdn-geoweb.s3.amazonaws.com/esri-leaflet/1.0.0-rc.6/esri-leaflet.js"></script>

      	<!-- necessary for spin wheel while waiting gpx loading -->
      	<script src="js/spin/spin.js"></script>
      	<script src="js/Leaflet.Spin/leaflet.spin.js"></script>

      	<!-- necessary to load image at their positions -->
      	<script src="js/imageinfo/exif.js"></script>
      	<script src="js/imageinfo/binaryajax.js"></script>
      	<script src="js/imageinfo/imageinfo.js"></script>

      	<!-- necessary for this project -->
      	<script src="js/showdown/dist/showdown.js"></script>
      	<script src="js/youtube-extension/showdown-youtube.js"></script>


				<!-- necessary for fancybox -->
				<script src="js/jqueryfancybox/jquery.fancybox.js"></script>
				<link rel="stylesheet" type="text/css" href="js/jqueryfancybox/jquery.fancybox.css">

				<!-- necessary for fontawesome -->
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

				<!-- necessary for image lazy-loading -->
				<script src="js/jquerylazyload/jquery.lazyload.js" type="text/javascript"></script>

        <!-- necessary for this project -->
        <script src="js/constants.js"></script>
      	<script src="js/functions.js"></script>
        <script src="js/mapCreation.js"></script>
        <script src="js/yamlFunctions.js"></script>
        <script src="js/tools.js"></script>

        <link href="css/style.css" rel="stylesheet" />



    </head>

    <body>

			<!-- The splash is displayed at the very begining, covers everything -->
			<div id="splash">
				<?php
					// from server because we need lazyloading
					echo $sdf->buildSplashCoverDiv();
				?>


				<div id="splashContent">

          <h1 id="splashTitle" class="glowy"></h1>
          <h2 id="splashSubtitle" class="glowy"></h2>
          <p id="splashTextInfo" class="glowy"><img id="splashMiniProfile"><span id="splashDateAuthor"></span></p>

					<div id="readDiv" onclick="openSplash();">
						<p class="noPaddingNoMargin fontsize30">read the story</p>
						<!--
						<i class="fa fa-bolt readArrow"></i>
						<i class="fa fa-globe readArrow"></i>
						<i class="fa fa-map readArrow"></i>
						<i class="fa fa-quote-right readArrow"></i>
						-->

						<i class="fa fa-map-o readArrow"></i>

					</div>

				</div>


			</div>

      <div id="map"></div>





			<div id="storyHeaderBackground">
			</div>



      <div id="storyHeader">
        <!--<img id="cover"></img>-->
        <div id="headerContent">
          <h1 id="title" class="headTitle"></h1>
          <h2 id="subtitle" class="headSubtitle"></h2>
          <p class="textInfo"><img id="miniProfile"><span id="date"></span> by <span id="author"></span>.</p>

					<div id="arrowFoldDiv" onclick="hideStoryPanel();">
						<span class="fa-stack fa-lg">
						<i class="fa fa-square fa-stack-2x"></i>
						<i class="fa fa-stack-1x fa-angle-double-right arrowFold"></i>
					</span>
					</div>

					<div id="arrowUnfoldDiv" onclick="showStoryPanel();">
						<span class="fa-stack fa-lg">
						<i class="fa fa-square fa-stack-2x"></i>
						<i class="fa fa-stack-1x fa-angle-double-left arrowFold"></i>
					</span>
					</div>


        </div>
        <div id="coverlightener"></div>
      </div>

			<div id="imageRoll" >
				<?php
					echo $sdf->buildImageRoll();
				?>
			</div>


      <p id="excertp"></p>

			<div id="fulltext"></div>





      <script>

      // create map instance
      var map = new L.Map('map',  {zoomControl: false, center: new L.LatLng(0, 0), zoom: 11});
      var zoomHome = null;
			var wideBounds = null;


			$( document ).ready(function() {

			$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").attr('rel', 'gallery').fancybox();

			$(".fancybox").fancybox({
			    beforeShow : function() {
			        var alt = this.element.find('img').attr('alt');

			        this.inner.find('img').attr('alt', alt);

			        this.title = alt;
			    }
			});



			// activating lazyload
			//$("img.lazy").lazyload();

			$("img.lazy").lazyload({
    		threshold : 200
			});

			$("#arrowUnfoldDiv").hide();

      // check if there is a file specified in URL.
      // we are looking for a yml extensioned file (story.yml)
      storyFile=gup('story');

      // load the file from url
      if(storyFile != null){
        loadYmlFile(storyFile, displayOneStory);
      }

			// Due to lazyload, image were not displayed when scrolling down
			$('#imageRoll').bind('scroll',refreshImageRoll);

		});


      </script>

    </body>
</html>
