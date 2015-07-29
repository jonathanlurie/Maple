<?php

  $gpxFileList = $_POST['gpxfile'];

  // display button was pressed
  if (isset($_POST['dispBt'])) {

    if(empty($gpxFileList))
    {
      //echo("You didn't select any buildings.");
      header('Location:'."manage");
      exit();
    }
    else
    {
      $N = count($gpxFileList);


   	  $link = "display?gpx=";
      //echo("You selected $N gpx file(s): ");
      for($i=0; $i < $N; $i++)
      {
        //echo($gpxFileList[$i] . " ");
        $link .= $gpxFileList[$i] . ($i<($N-1)?"*":'');
      }

      header('Location:'.$link);

      exit();
    }



  // delete button was pressed
  } else if (isset($_POST['delBt'])) {

    // delete every files
    $N = count($gpxFileList);

    for($i=0; $i < $N; $i++){
      unlink("gpx_files/".$gpxFileList[$i]);
    }

    // return to the manager
    header('Location:'."manage");
    exit();
  }



?>
