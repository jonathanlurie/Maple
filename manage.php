<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8"/>
		<title>maple.</title>

		<!-- Google web fonts -->
		<link href="http://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700" rel='stylesheet' />

		<!-- The main CSS file -->
		<link href="js/jqueryfileupload/css/style.css" rel="stylesheet" />



		<!-- JavaScript Includes -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script src="js/jqueryfileupload/js/jquery.knob.js"></script>

		<!-- jQuery File Upload Dependencies -->
		<script src="js/jqueryfileupload/js/jquery.ui.widget.js"></script>
		<script src="js/jqueryfileupload/js/jquery.iframe-transport.js"></script>
		<script src="js/jqueryfileupload/js/jquery.fileupload.js"></script>

		<!-- Our main JS file -->
		<script src="js/jqueryfileupload/js/script.js"></script>

		<!-- own css -->
		<link href="css/style.css" rel="stylesheet" />

		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.1.1/gh-fork-ribbon.min.css" />

	</head>

	<body>

		<a href="https://github.com/jonathanlurie/Maple"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>

		<div id='title' class="grayDiv">
			<center>
			<h1><img src="icons/maple_logo" width="300px"></h1>
			<h4>URL-based map sharing platform</h4>

		</center>
		</div>

		<form id="upload" method="post" action="upload.php" enctype="multipart/form-data">
			<div id="drop">
				Drop Here<br>

				<a>Browse</a>
				<input type="file" name="upl" multiple />
			</div>

			<ul>
				<!-- The file uploads will be shown here -->
			</ul>

		</form>


		<div id='fileList' class="grayDiv">

			<h2>Available GPX files</h2>

			<?php

				if ($handle = opendir('gpx_files')) {
				?>
					<form action="gpxformmanager.php" method="post">

						<?php

    			while (false !== ($entry = readdir($handle))) {

        		if ($entry != "." && $entry != "..") {


							$link = 'display?gpx='.$entry;
							//echo "<a href=".$link.'>'.$entry."</a><br>";

							echo "<input class='margin-10' type='checkbox' name='gpxfile[]' value='".$entry."'> ".$entry."<br>";

        		}
    			}

    			closedir($handle);
					?>
					<center>
						<input class="displayButton" type="submit" value="Delete" name="delBt">
						<input class="displayButton" type="submit" value="Display" name="dispBt">
					</center>
					</form>

					<?php




				}




			?>

		</div>




	</body>
</html>
