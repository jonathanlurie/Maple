<?php

  // saves the markdown content into a server side file

  define('ROOT_DIRECTORY', dirname(__FILE__).'/../');
  define('MD_FILES_DIRECTORY', ROOT_DIRECTORY.'md_files/');

  $markdownContent = $_POST["markdownContent"];

  file_put_contents(MD_FILES_DIRECTORY . $_POST["filename"], $markdownContent);
  //echo $markdownContent;
  echo "File saved";

 ?>
