var Addbutton = document.getElementById("Add"); //getting the add button from the html file, to be able to use it. 
var counter=1; //counter variable to get the right id on the questions being made. 
var sporsmol = document.getElementById("sporsmol");//getting the div i want the new questins and answers to lay in. 
Addbutton.addEventListener("click", function renderquestion(){
	
	//creating a question label and input-field for writing a new question.
	var space = document.createElement("br");//to create between last questions answer and this this question. 
	var div1= document.createElement("div")
	div1.className="form group col-md-13";
	div1.id ="question" + counter; 
	var question= document.createElement("LABEL");
	question.name= "Question"; 
	question.innerText = "Question"; 
	var questiontext = document.createElement("input");
	questiontext.placeholder = "Write your question"; 
	questiontext.type="text";
	questiontext.className="form-control";
	var space1= document.createElement("br");
	
	//creating answer label and a text-area for writing an answer to the question.
	var div2= document.createElement("div")
	div2.className="form group col-md-13";
	div2.id ="answer" + counter; 
	var answer= document.createElement("LABEL");
	answer.name= "answer"; 
	answer.innerText = "Answer"; 
	var answertext = document.createElement("textarea");
	answertext.placeholder = "Write your answer"; 
	answertext.type="text";
	answertext.className="form-control";
	answertext.rows = "12"; 
	
	//creating label and inpur-field for filling in the correct answer(s).
	var space2=document.createElement("br");
	var div3= document.createElement("div"); 
	div3.className ="form group col-md-13";
	div3.id = "answer" + counter; 
	var correctans= document.createElement("LABEL"); 
	correctans.name="correctanswer"; 
	correctans.innerText="Correct Answer";
	var correcttext = document.createElement("input");
	correcttext.placeholder="Write the correct answer, a number between 1-4, divided be comma if several is correct";
	correcttext.type="text"; 
	correcttext.className="form-control";
	

	

	counter++; 
	
	//adding all the new created elements as children for the site to work. Appended in the order they are supposed to show in, on the website. 
	div1.appendChild(space);
	sporsmol.appendChild(div1);
	sporsmol.appendChild(div2);
	sporsmol.appendChild(div3);
	div1.appendChild(question);
	div1.appendChild(questiontext);
	div1.appendChild(space1);
	div2.appendChild(answer);
	div2.appendChild(answertext);
	div3.append(space2); 
	div3.appendChild(correctans); 
	div3.appendChild(correcttext);
});
