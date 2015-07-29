<?php

// include Dipper and ready it for use
require('dipper/Dipper.php');
use secondparty\Dipper\Dipper as Dipper;


class StoryParser{

	private $_extension = ".yml";
	private $_basePath = "story_files/";
	private $_data = 0;

	// fileName must be givent without path neither extension
	function __construct($fileName) {
		// making the file paht
		$url = $this->_basePath . $fileName . $this->_extension;
		
		// reading yaml file
		$yaml = file_get_contents($url);
		
		$this->_data = Dipper::parse($yaml);
		
	}
	
	// DEBUG METHOD : dump all
	function dumpData(){
		var_dump($this->_data);
	}
	
	// get the value of the field. 
	// return type can be String, Int, Float or array
	function getFieldValue($fieldName){
		$value = $this->_data[$fieldName];
		return $value;
	}


}

?>