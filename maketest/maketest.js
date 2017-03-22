var Addbutton = document.getElementById("Add"); //getting the add button from the html file, to be able to use it. 
var counter=1; //counter variable to get the right id on the questions being made. 
var sporsmol = document.getElementById("sporsmol");//getting the div i want the new questins and answers to lay in. 
var submitbutton = document.getElementById("submit"); 
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
	questiontext.className="form-control questions";
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
	answertext.className="form-control answers";
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
	correcttext.className="form-control correctanswers";
	

	

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


submitbutton.addEventListener("click",function savetest(){
	var Questions = (document.getElementsByClassName("form-control questions"));
    var title = (document.getElementsByClassName("form-control title"))[0].value;
    var course = document.getElementsByClassName("form-control course")[0].value;
    var answers = (document.getElementsByClassName("form-control answers"));
    var correctAnswers =  (document.getElementsByClassName("form-control correctanswers"));
    var Questiontext= new Array();
    var answertext = new Array();
    var correctAnswersText = new Array();
    var atq = [];
    var atqsplit = new Array();
    var cta = [];
    var ctasplit = new Array();
    for(i=0; i < Questions.length;i++){
        Questiontext.push(Questions[i].value);
    }; 
    for(i=0; i < answers.length;i++){
        answertext[i]=[];
        atq = (answers[i].value);
        atqsplit = atq.split(", ");
        for(j = 0; j < atqsplit.length; j++){
        answertext[i][j] = atqsplit[j];
        }
        
        atqsplit=[];
   }; 
    for(i=0; i < correctAnswers.length; i++){
        correctAnswersText[i] = [];
        ctq = correctAnswers[i].value;
        ctqsplit = ctq.split(", ");
        for(j = 0; j < ctqsplit.length; j++){
            correctAnswersText[i][j] = ctqsplit[j];
        }
        
    }
    
});

const searchResults = document.getElementById('searchResults1'); 
const searchValue = document.getElementById('Coursename'); 
const dbRefCourses = firebase.database().ref().child('Courses');    

//Listen for change in search value
if(searchValue){
searchValue.addEventListener('input', e => {
    if(searchValue.value == "") {
        clearList();
    } else {
        clearList();
        fireSearch(searchValue.value.toUpperCase(), 6);
    }

})
};

//Searches the database and returns matching courses, maximum of 6 elements
function fireSearch(startValue, limit) {
    dbRefCourses.orderByKey().startAt(startValue)
    .endAt(startValue + "\uf8ff").limitToFirst(limit).on("child_added", snap => {
        createList(snap);
    });
};

//Creates a list with matching elements from fireSearch
function createList(snap) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const a = document.createElement('a');

    li.id = snap.key;
    a.innerText = snap.key + " " + snap.val().name;
    li.className = "courseItems";
    a.style.color = "black";
    a.style.textDecoration = "none";
    div.style.height = "50px";
    div.style.paddingTop = "12px";
    div.style.borderBottom = "1px solid #C9C9C9";
    div.className = "col-md-12";
    a.href = "/test-template/test.html"+ "?id=" + snap.key;

    searchResults.appendChild(div);
    div.appendChild(li);
    li.appendChild(a);
}

//Clears the list when search value is empty
function clearList() {
    if (searchResults) {
        while (searchResults.firstChild) {
            searchResults.removeChild(searchResults.firstChild);
        }
    }
}


