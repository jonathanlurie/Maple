
// callback to change the Save button label as long long as the
// user is typing in the save field.
// The purpose is to give a hint if this filename is already taken
function filenameOnChange(){
  filename = $("#filename").val();
  console.log(filename);

  if(filename == ""){
    $("#saveButton").prop('disabled', true);
    $("#saveButton").html("Save");
    return;
  }

  $.ajax({
    type: 'POST',
    url: 'php/mdFileExists.php',
    data: ({filename: filename}),
    success: function(data) {

      // file already exist
      if(data == "1")
        $("#saveButton").html("Overwrite");
      else if(data == "0")
        $("#saveButton").html("Save");
      else if(data == "-1")
        console.log("filename not specified")

      updateSaveButtonState();

    },
    error: function(data) {
      console.log("error");
      console.log(data);

    }
  });
}


// update the state of the Save button
// from enabled to disabled
function updateSaveButtonState(){
  if($("#filename").val() == ""){
    $("#saveButton").prop('disabled', true);
  }else{
    $("#saveButton").prop('disabled', false);
  }
}


// save the content of the md editor to the server-side files
// (having the name grom the field)
function saveFile(){
  filename = $("#filename").val();

  $.ajax({
    type: 'POST',
    url: 'php/saveMdFile.php',
    data: ({markdownContent: editor.exportFile(),
            filename: filename}),
    success: function(data) {
        $("#saveFeedback").text(data);


    },
    error: function(data) {
      console.log("error");
      console.log(data);

    }
  });
}


// remove all text from md editor and from the save field
function cleanAll(){
  editor.getElement('editor').body.innerHTML = "";
  $("#filename").val("");
}


function displayMdFile(filename, content){
  $("#filename").val(filename);
  editor.getElement('editor').body.innerHTML = content.replace(/\n/g, "<br />");
  $("#saveButton").html("Overwrite");
  updateSaveButtonState();
}

// load a markdown file from its name.
// when it's loaded, it is displayed in the markdown editor
function loadMdFile(mdFile, doSomethingSuccess, doSomethingFail){
  $(document).load(MARKDOWN_DIR + mdFile, function(response, status, xhr) {
    console.log(status);

    if(status == "success"){
      doSomethingSuccess(mdFile, response);
    }else{
      if(typeof doSomethingFail == "function"){
        doSomethingFail(mdFile, response);
      }
    }

  });
}
