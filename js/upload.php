<?php

// A list of permitted file extensions
$allowed = array('gpx');

if(isset($_FILES['upl']) && $_FILES['upl']['error'] == 0){

	$extension = pathinfo($_FILES['upl']['name'], PATHINFO_EXTENSION);

	if(!in_array(strtolower($extension), $allowed)){
		echo '{"status":"error"}';
		exit;
	}

	$safeFilename = str_replace(" ", "_", $_FILES['upl']['name']);

	if(move_uploaded_file($_FILES['upl']['tmp_name'], 'gpx_files/'.$safeFilename)){
		echo '{"status":"success"}';
		exit;
	}
}

echo '{"status":"error"}';
exit;
