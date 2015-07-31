<?php

// include Dipper and ready it for use
require('StoryParser.php');

class StoryDataFetcher{

	private $_storyParser = 0;
	private $_allMetaString = 0;


	// fileName must be givent without path neither extension
	function __construct($storyFileName) {
		$this->_storyParser = new StoryParser($storyFileName);
	}


	// build a HTML meta markup with attributes as 'name' and 'content'
	function _buildMetaName($name, $content){

		$metaStr = '<meta name="' . $name . '" content="' . $content . '">' . "\n";
		return $metaStr;
	}

	// build a HTML meta markup with attributes as 'property' and 'content'
	function _buildMetaProperty($property, $content){
		$metaStr = '<meta property="' . $property . '" content="' . $content . '">' . "\n";

		return $metaStr;
	}

	// creates all the meta markups, nice for referencing
	function buildMetaMarkups(){

		$metaStr = '';

		// check ici:
		// https://developers.facebook.com/docs/reference/opengraph/object-type/article

		// regular
		$metaStr .= $this->_buildMetaName("title", $this->_storyParser->getFieldValue("title")) ;
		$metaStr .= $this->_buildMetaName("DC.title", $this->_storyParser->getFieldValue("title")) ;
		$metaStr .= $this->_buildMetaName("subtitle", $this->_storyParser->getFieldValue("subtitle")) ;
		$metaStr .= $this->_buildMetaName("author", $this->_storyParser->getFieldValue("author")) ;
		$metaStr .= $this->_buildMetaName("robots", "index, follow");
		$metaStr .= $this->_buildMetaName("url", "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
		$metaStr .= $this->_buildMetaName("publisher", $this->_storyParser->getFieldValue("author"));
		$metaStr .= $this->_buildMetaName("category", $this->_storyParser->getFieldValue("keywords"));
		$metaStr .= $this->_buildMetaName("keywords", $this->_storyParser->getFieldValue("keywords"));
		$metaStr .= $this->_buildMetaName("description", $this->_storyParser->getFieldValue("excertp"));
		$metaStr .= $this->_buildMetaName("abstract", $this->_storyParser->getFieldValue("excertp"));
		$metaStr .= $this->_buildMetaName("topic", $this->_storyParser->getFieldValue("excertp"));
		$metaStr .= $this->_buildMetaName("summary", $this->_storyParser->getFieldValue("excertp"));


		// Facebook meta
		$metaStr .= $this->_buildMetaProperty("og:site_name", $this->_storyParser->getFieldValue("sitename"));
		$metaStr .= $this->_buildMetaProperty("og:title", $this->_storyParser->getFieldValue("title"));
		$metaStr .= $this->_buildMetaProperty("og:type", "article");
		$metaStr .= $this->_buildMetaProperty("og:url", "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
		$metaStr .= $this->_buildMetaProperty("og:description", $this->_storyParser->getFieldValue("excertp"));
		$metaStr .= $this->_buildMetaProperty("og:updated_time", $this->_storyParser->getFieldValue("date"));
		$metaStr .= $this->_buildMetaProperty("og:image", "http://$_SERVER[HTTP_HOST]/".$this->_storyParser->getFieldValue("coverImage"));
		$metaStr .= $this->_buildMetaProperty("og:image:type", "image/jpeg");
		$metaStr .= $this->_buildMetaProperty("article:published_time", $this->_storyParser->getFieldValue("date"));
		$metaStr .= $this->_buildMetaProperty("article:modified_time", $this->_storyParser->getFieldValue("date"));
		//$metaStr .= $this->_buildMetaProperty("article:author", $this->_storyParser->getFieldValue("author"));
		//$metaStr .= $this->_buildMetaProperty("article:publisher", $this->_storyParser->getFieldValue("author"));

		$keywords = explode(',', $this->_storyParser->getFieldValue("keywords"));

		foreach ($keywords as $kw){
			$metaStr .= $this->_buildMetaProperty("article:section", trim($kw));
			$metaStr .= $this->_buildMetaProperty("article:tag", trim($kw));
		}


		return $metaStr;
	}


	// build a title composed of the article title and the author name
	function buildTitle(){
		$t = $this->_storyParser->getFieldValue("title") . " - " . $this->_storyParser->getFieldValue("author");

		return $t;
	}


	function buildImageRoll(){
		$images = $this->_storyParser->getFieldValue("images");

		$imgRollHtml = "";

		foreach ($images as $img){
			$size = getimagesize($img);
			//var_dump($size);
			//width="1001" height="1500"
			$sizeString = ' width="80" height="'. (int)($size[1]/$size[0]*80) .'" ';
			$imgRollHtml .= '<img class="lazy rolledImage" data-original="'.$img.'" onclick="localizeImageOnclick(this)" '. $sizeString .'>';
		}

		return $imgRollHtml;
	}



	function buildSplashCoverDiv(){
		$cover = $this->_storyParser->getFieldValue("coverImage");

		//$divHTML = '<div id="splashCover"> <img id="splashCoverImg" class="lazy" data-original="'.$cover.'"> </div>';
		$divHTML = '<div id="splashCover"></div>';

		return $divHTML;
	}


}

?>
