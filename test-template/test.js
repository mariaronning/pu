var database = firebase.database().ref().child('Courses/');

function firesearch(value){
	
var view = {
	name : "Datamodellering og databasesystemer",
	code : "TDT4145"
    };

    function loadtemp(){
        var output = Mustache.render("{{name}} -  {{code}}", view);
        document.getElementById('subject').innerHTML = output;
      }
    


