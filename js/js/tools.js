$.getScript("js/showdown/dist/showdown.js");
$.getScript("js/youtube-extension/showdown-youtube.js");



// fetch the url arguments
function gup( name, url ) {

	// usage : mywebsite.com/page.html?gpx=myfile.gpx
  if (!url) url = location.href
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}



// takes a not-formated date and formats it
function getFormatedDate(dateString){
  var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

  var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");


  var d = new Date(dateString);

  var curr_day = d.getDay();
  var curr_date = d.getDate();
  var sup = "";
  if (curr_date == 1 || curr_date == 21 || curr_date ==31)
     {
     sup = "st";
     }
  else if (curr_date == 2 || curr_date == 22)
     {
     sup = "nd";
     }
  else if (curr_date == 3 || curr_date == 23)
     {
     sup = "rd";
     }
  else
     {
     sup = "th";
     }
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();

  var formatedDate = d_names[curr_day] + " " + curr_date + "<SUP>" + sup + "</SUP> " + m_names[curr_month] + " " + curr_year;

  return formatedDate;

}

// returns the HTML equivalent of a Markdown string
function md2html(mdString){
  //var converter = new showdown.Converter({extensions: ['youtube']});
  var converter = new showdown.Converter();
  converter.setOption('tasklists', true);
  converter.setOption('strikethrough', true);

  return converter.makeHtml(mdString);
}
