var Addbutton = document.getElementById("Add"); 
var counter=1; 
var form = document.getElementById("theform");
var siste = document.getElementById("last");
Addbutton.addEventListener("click", function renderquestion(){
	var divquestion= document.createElement("div")
	divquestion.className="form group";
	divquestion.id ="question" + counter; 
	var question= document.createElement("LABEL");
	question.name= "Question"; 
	var questiontext = document.createElement("input");
	questiontext.type="text";
	questiontext.class="form-control";
	counter++; 
	form.insertBefore(divquestion, siste);
	divquestion.appendChild(question);
	divquestion.appendChild(questiontext);});
