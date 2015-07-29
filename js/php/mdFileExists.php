<?php

  // check if the markdown file exists in the md_files folder

  define('ROOT_DIRECTORY', dirname(__FILE__).'/../');
  define('MD_FILES_DIRECTORY', ROOT_DIRECTORY.'md_files/');

  if(isset($_POST["filename"])){
    $filename = MD_FILES_DIRECTORY.$_POST["filename"];



    if(file_exists( $filename)){
      echo "1";

    }else{
      echo "0";
    }

  }else{
    echo "-1";
  }

 ?>
