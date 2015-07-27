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

function updateSaveButtonState(){
  if($("#filename").val() == ""){
    $("#saveButton").prop('disabled', true);
  }else{
    $("#saveButton").prop('disabled', false);
  }
}


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

function cleanAll(){
  editor.getElement('editor').body.innerHTML = "";
  $("#filename").val("");
}


function loadFile(mdFile){
  $(document).load("md_files/" + mdFile, function(response, status, xhr) {
    console.log(status);

    if(status == "success"){
      $("#filename").val(mdFile);
      editor.getElement('editor').body.innerHTML = response.replace(/\n/g, "<br />");
      $("#saveButton").html("Overwrite");
      updateSaveButtonState();
    }else{
      cleanAll();
    }

  });
}
