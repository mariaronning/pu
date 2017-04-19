var Addbutton = document.getElementById("Add"); //getting the add button from the html file, to be able to use it. 
var counter=1; //counter variable to get the right id on the questions being made. 
var sporsmol = document.getElementById("sporsmol");//getting the div i want the new questins and answers to lay in. 
var submitbutton = document.getElementById("submit"); 
var deletesporsmol = document.getElementById("Delete");


Addbutton.addEventListener("click", function renderquestion(){
	
	//creating a question label and input-field for writing a new question.
	var space = document.createElement("br");//to create between last questions answer and this this question. 
	var div1= document.createElement("div")
	div1.className="form group col-md-13";
	div1.id ="question" + counter; 
	var question= document.createElement("LABEL");
	question.name= "Question"; 
	question.innerText = "Question " + (counter + 1); 
	var questiontext = document.createElement("input");
	questiontext.placeholder = "Write your question"; 
	questiontext.type="text";
	questiontext.className="form-control questions";
    var stext = document.createElement("text");
    stext.id = "stext" + counter;
    stext.innerHTML = "<br>";
	
	//creating answer label and a text-area for writing an answer to the question.
	var div2= document.createElement("div")
	div2.className="form group col-md-13";
	div2.id ="answer" + counter; 
	var answer= document.createElement("LABEL");
	answer.name= "answer"; 
	answer.innerText = "Answers"; 
	var answertext = document.createElement("textarea");
	answertext.placeholder = "Write your anwers on the form:  <answer1> <answer2> etc..."; 
	answertext.type="text";
	answertext.className="form-control answers";
	answertext.rows = "12"; 
    var atext = document.createElement("text");
    atext.id = "atext" + counter;
    atext.innerHTML = "<br>";
	
	//creating label and inpur-field for filling in the correct answer(s).
	var space2=document.createElement("br");
	var div3= document.createElement("div"); 
	div3.className ="form group col-md-13";
	div3.id = "correctanswer" + counter; 
	var correctans= document.createElement("LABEL"); 
	correctans.name="correctanswer"; 
	correctans.innerText="Correct answer(s)";
	var correcttext = document.createElement("input");
	correcttext.placeholder="Write the correct answer(s). If answers answers1 and answer3 are correct, write: 1, 3 ";
	correcttext.type="text"; 
	correcttext.className="form-control correctanswers";
    var ctext = document.createElement("text");
    ctext.id = "ctext" + counter;
    ctext.innerHTML = "<br>";
	

	

	counter++; 
	
	//adding all the new created elements as children for the site to work. Appended in the order they are supposed to show in, on the website. 
	div1.appendChild(space);
	sporsmol.appendChild(div1);
	sporsmol.appendChild(div2);
	sporsmol.appendChild(div3);
	div1.appendChild(question);
	div1.appendChild(questiontext);
    div1.appendChild(stext);
	div2.appendChild(answer);
	div2.appendChild(answertext);
	div2.appendChild(atext); 
	div3.appendChild(correctans); 
	div3.appendChild(correcttext);
    div3.appendChild(ctext);
});

deletesporsmol.addEventListener("click", function deletequestion(){

    counter--;
    var div3 = document.getElementById("correctanswer" + counter);
    div3.parentNode.removeChild(div3);
    var div2 = document.getElementById("answer" + counter);
    div2.parentNode.removeChild(div2);
    var div1 = document.getElementById("question" + counter);
    div1.parentNode.removeChild(div1);

});



submitbutton.addEventListener("click",function savetest(){

    //Get user input 
    var title = document.getElementsByClassName("form-control title")[0].value;
    var course = document.getElementsByClassName("form-control course")[0].value;
    var questions = document.getElementsByClassName("form-control questions");
    var answers = document.getElementsByClassName("form-control answers");
    var correctAnswers = document.getElementsByClassName("form-control correctanswers");
    
    //Split answers
    var getAnswers = getValidAnswers(answers);

    //Removes all characters between questions (between > <)
    for(i = 0; i < answers.length; i++){
        answers[i].value = answers[i].value.replace(/>[^<>]*</g, '><');
    }

    

    //Checks if the different user inputs are valid  
    var gvTitle = checkValidTitle(title);
    var gvQuestions = checkValidQuestions(questions);
    //TODO gvSubject = checkValidSubject(subject);
    var foundErrors = checkValidAnswersandCorrectAnswers(answers, correctAnswers);
    var validAandCA = true;;
    for(i = 0; i < foundErrors.length; i++){
        if(foundErrors[i] != 0){
            validAandCA = false;
            break;
        }
    }

    



    //Removes old error messages 
    document.getElementById("titleError").innerHTML = "";
    //TODO:Remove subject error message
    for(i = 0; i < questions.length; i++){
            document.getElementById("stext" + i).innerHTML = "<br>";
            document.getElementById("atext" + i).innerHTML = "<br>";
            document.getElementById("ctext" + i).innerHTML = "<br>";
    }



    //Gives error message if the input is not valid, if it is add the test to the database 
    if(!(gvTitle && !gvQuestions && validAandCA)){ 
        
        if(!(gvTitle)){
            document.getElementById("titleError").innerHTML = "An empty test field is not valid."
        }
        if(gvQuestions.length > 0){
            for(i = 0; i < gvQuestions.length; i++){
                var errorMessage = document.getElementById("stext" + gvQuestions[i]);
                errorMessage.innerHTML = "An empty question field is not valid.";
            }
        }
        if(!validAandCA){ 
            for(i = 0; i < foundErrors.length; i++){
                var thisquestion = Math.floor(i/7);
                switch(foundErrors[i]){
                    case 1:
                    document.getElementById("atext" + thisquestion).innerHTML   = "An empty answer field is not valid. "
                    break;
                    
                    case 2:
                    document.getElementById("ctext" + thisquestion).innerHTML = "An empty correct answer field is not valid. "
                    break;
                    
                    case 3:
                    if(!(document.getElementById("ctext" + thisquestion).innerHTML == "An empty correct answer field is not valid. ")){
                        if(document.getElementById("ctext" + thisquestion).innerHTML == "<br>"){
                        document.getElementById("ctext" + thisquestion).innerHTML = "Correct answers can only contain numbers 1-4, space and comma, and no dupblicates of numbers. "
                        }
                        else{
                            document.getElementById("ctext" + thisquestion).innerHTML = "Correct answers can only contain numbers 1-4, space and comma, and no dupblicates of numbers. "
                        }
                    }
                    break;

                    case 4:
                    if(!(document.getElementById("atext" + thisquestion).innerHTML == "An empty correct answer field is not valid. ")){
                        if(document.getElementById("ctext" + thisquestion).innerHTML == "<br>"){
                         document.getElementById("ctext" + thisquestion).innerHTML = "Your correct answer(s) dosent correspond with you answers. "
                        }
                        else{
                             document.getElementById("ctext" + thisquestion).innerHTML += "Your correct answers dosent correspond with you answers. "
                        }
                   
                    }
                    break;

                    case 5:
                    if((document.getElementById("ctext" + thisquestion).innerHTML == "An empty correct answer field is not valid. ")){
                        if(document.getElementById("ctext" + thisquestion).innerHTML == "<br>"){
                            document.getElementById("ctext" + thisquestion).innerHTML = "Your correct answers can only contain 4 answers"
                        }
                        else{
                             document.getElementById("ctext" + thisquestion).innerHTML += "Your correct answers can only contain 4 answers"
                        }
                
                    }
                    break;
                    case 6: 
                    if(!(document.getElementById("atext" + thisquestion).innerHTML == "An empty answer field is not valid. ")){
                        if((document.getElementById("ctext" + thisquestion).innerHTML == "<br>")){
                            document.getElementById("atext" + thisquestion).innerHTML = "You have to enter 2, 3 or 4 answers. "
                        }
                        else{
                             document.getElementById("atext" + thisquestion).innerHTML += "You have to enter 2, 3 or 4 answers. "
                        }
                    }
                    break;

                    case 7:
                    if(!(document.getElementById("atext" + thisquestion).innerHTML ==  "An empty answer field is not valid. ")){
                        if((document.getElementById("atext" + thisquestion).innerHTML == "<br>")){
                            document.getElementById("atext" + thisquestion).innerHTML = "Remeber to use < and > to seperate your questions: <Question> "
                        }
                        else{
                            document.getElementById("atext" + thisquestion).innerHTML += "Remeber to use < and > to seperate your questions. "
                        }    
                    }

                    default:
                    break;

                }

            }
        } 
    }
    else{  
        var QuestionsSplit = getValidQuestions(questions);
        var answersSplit = getValidAnswers(answers);
        var correctAnswersSplit = getValidCorrectAnswers(correctAnswers);

        //TODO: add to database, OBS: remeber to add as int if only on correct answer 


    }
    
    
});

//Checks if the title is valid 
function checkValidTitle(title){
    if(title.length > 0 ){
        return true;
    }
    else{
        return false;
    }
}

//TODO: function checkValidCourse(course){}

//Checks if questions are valid
function checkValidQuestions(Questions){
    var unvalidQuestions = new Array();
    for (i = 0; i < Questions.length; i++){
        if(!(Questions[i].value.length > 0)){
            unvalidQuestions.push(i);
        }
    }
    if(unvalidQuestions.length > 0){
        return unvalidQuestions;
    }
    else{
    return 0;
    }
}

//Splits up the user inputs to different questions and add to array. 
function getValidQuestions(Questions){
    var QuestionsSplit = new Array();
        for(i=0; i < Questions.length;i++){
            QuestionsSplit[i] = (Questions[i].value);
    }
    return QuestionsSplit;
}

//Checks if answer and correct answers are valid, and saves which errors occurs.  
function checkValidAnswersandCorrectAnswers(answers, correctAnswers){
    var foundErrors = new Array ();
    var numanswers =  new Array();
    var highestanswer = new Array();
    for(i = 0; i < answers.length; i++){
        numanswers[i] = answers[i].value.split(/[<>]/).filter(function(e) {return e}).length;
        highestanswer[i] = Math.max.apply(Math, correctAnswers[i].value.split(/[,\s]/).filter(function(e) {return e}));
        if(!(answers[i].value.length > 0)){
            foundErrors.push(1);
        }
        else{
            foundErrors.push(0);
        }

        if(!(correctAnswers[i].value.length > 0)){
            foundErrors.push(2);
        }
        else{
            foundErrors.push(0);
        }
        if(!(/^[1-4, \s]+$/.test(correctAnswers[i].value)) || !((correctAnswers[i].value.match(/1/g)) == null || correctAnswers[i].value.match(/1/g).length == 1) || !((correctAnswers[i].value.match(/2/g)) == null || correctAnswers[i].value.match(/2/g).length == 1) ||!((correctAnswers[i].value.match(/3/g)) == null || correctAnswers[i].value.match(/3/g).length == 1) || !((correctAnswers[i].value.match(/4/g)) == null || correctAnswers[i].value.match(/4/g).length == 1)){ 
            foundErrors.push(3);
        }
        else{
            foundErrors.push(0);
        }
        if(( highestanswer[i] > numanswers[i]) > 0){
            foundErrors.push(4);
        }
        else{
            foundErrors.push(0);
        }
        if(answers[i].value.split(", ").length > 4){
            foundErrors.push(5);
        }
        else{
            foundErrors.push(0);
        }
        if(numanswers[i] > 4 || numanswers[i] < 2){
            foundErrors.push(6);
        }
        else{
            foundErrors.push(0); 
        }
        if(answers[i].value.charAt(0) != "<" || answers[i].value.slice(-1) != ">" || ((answers[i].value.match(/</g).length != (answers[i].value.match(/>/g).length)))){
            foundErrors.push(7);
        }
        else{
            foundErrors.push(0);
        }

    }
    return foundErrors;
}

//Splits up answer input into each answer, and adds them to an array. 
function getValidAnswers(answers){   
     var answersSplit  = new Array();
     var atqsplit = new Array();
     for(i=0; i < answers.length;i++){
        answersSplit[i] = [];
        var atq = (answers[i].value);
        atqsplit = atq.split(/[<>]/).filter(function(e) {return e});
            for(j = 0; j < atqsplit.length; j++){
                answersSplit[i][j] = atqsplit[j];
                }
        
        atqsplit=[];
   } 
   return answersSplit;
} 

//Splits up correct answer input into each correct answer, and adds them to an array 
function getValidCorrectAnswers(correctAnswers){
     var correctAnswersSplit = new Array();
     var ctqsplit = new Array();

     for(i=0; i < correctAnswers.length; i++){
        correctAnswersSplit[i] = [];
        ctq = correctAnswers[i].value;
        ctqsplit = ctq.split(", ");
        for(j = 0; j < ctqsplit.length; j++){
            correctAnswersSplit[i][j] = ctqsplit[j];
        }   
    }
    return correctAnswersSplit;
} 



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


