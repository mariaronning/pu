var database = firebase.database();


var view = {
	name : "Datamodellering og databasesystemer",
	code : "TDT4145"
    };

    function loadtemp(){
        var output = Mustache.render("{{name}} -  {{code}}", 			view);
        document.getElementById('subject').innerHTML = output;
      }
    


