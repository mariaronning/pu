 var totalAnswered = 0;
var totalRight = 0;
describe('Student: ', function() {
    var rightMyResults = 0;
    var totalMyResults = 0;
    var rightCourseResults = 0;
    var totalCourseResults = 0;
    var pointsIncrease = 0;
    describe('Index page', function () {

        it('title should equal to prepBot  ', function () {
            //browser.url('https://feedbot-7494b.firebaseapp.com');
            if(browser.isVisible('#btnLogout')) {
                browser.click('#btnLogout');
            } else {
                browser.url('https://feedbot-7494b.firebaseapp.com');
            }

            expect(browser.getTitle()).to.equal('prepBot');
        });
        it('should return a p element that describes what went wrong if wrong email  ', function() {
            browser.setValue('#txtEmail', 'testgmail.com');
            browser.setValue('#txtPassword', 'test123');
            browser.click('#btnLogin');
            expect(browser.waitForText('#errorLogin'), 1000).to.equal(true);
            expect(browser.getText('#errorLogin')).to.equal('The email address is badly formatted.')
        });

        it('should click and log in a user  ', function() {
            browser.setValue('#txtEmail', 'test2@gmail.com');
            browser.setValue('#txtPassword', 'test123');
            browser.click('#btnLogin');

            browser.waitUntil(function() {
                //console.log(browser.getUrl());
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/student/student.html"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/student/student.html")
                }
            }, 1500);
        });

    });
    describe('Student page', function ()  {
        it('should show a list of courses starting with T with max length 6  ', function () {
            browser.setValue('#sok', 't');
            var searchResults = browser.$('#searchResults');
            browser.waitUntil(function() {
                return expect(searchResults.$$('li').length).to.equal(6);
            }, 3500);


            for(var i = 0; i < searchResults.$$('li').length; i++) {
                expect(searchResults.$$('li')[i].$('a').getText().charAt(0)).to.equal('T');
            }
        });
        it('should show only course TDT4242 ', function () {

            var searchResults = browser.$('#searchResults');
            browser.setValue('#sok', 'T');
            setTimeout(function() {
                browser.addValue('#sok', 'D');
            }, 1000);
            setTimeout(function() {
                browser.addValue('#sok', 'T');
            }, 2000);
            setTimeout(function() {
                browser.addValue('#sok', '4');
            }, 3000);
            setTimeout(function() {
                browser.addValue('#sok', '2');
            }, 4000);
            setTimeout(function() {
                browser.addValue('#sok', '4');
            }, 5000);
            setTimeout(function() {
                browser.addValue('#sok', '2');
            }, 6000);
            browser.waitUntil(function() {
                return expect(searchResults.$$('li').length).to.equal(1);
            }, 7000);

            expect(searchResults.$$('li')[0].$('a').getText().substring(0,7)).to.equal('TDT4242');
        });
        it('should click TDT4242 and add course to my courses ', function () {
            var searchResults = browser.$('#searchResults');
            var buttonList = searchResults.$$('button');

            //If the browser runs too fast, this will return at least 6 due to
            //asynchronous call to the database
            expect(buttonList.length).to.equal(1);
            var button = buttonList[0];
            button.click();
            var myList = browser.$('#myCourseOutput');
            var myCourses = myList.$$('li');
            //Checks if my courses only consists of the one element we have added
            expect(myCourses.length).to.equal(1);
            //Checks if the correct course is in my courses list
            expect(myCourses[0].$('a').getText()).to.equal('TDT4242');


        });

        it('add MFEL1010 to my courses ', function () {
            var searchResults = browser.$('#searchResults');
            browser.setValue('#sok', 'M');
            setTimeout(function() {
                browser.addValue('#sok', 'F');
            }, 1000);
            setTimeout(function() {
                browser.addValue('#sok', 'E');
            }, 2000);
            setTimeout(function() {
                browser.addValue('#sok', 'L');
            }, 3000);
            setTimeout(function() {
                browser.addValue('#sok', '1');
            }, 4000);
            setTimeout(function() {
                browser.addValue('#sok', '0');
            }, 5000);
            setTimeout(function() {
                browser.addValue('#sok', '1');
            }, 6000);
            setTimeout(function() {
                browser.addValue('#sok', '0');
            }, 7000);
            browser.waitUntil(function() {
                return expect(searchResults.$$('li').length).to.equal(1);
            }, 8000);


            var buttonList = searchResults.$$('button');
            //If the browser runs too fast, this will return at least 6 due to
            //asynchronous call to the database
            expect(buttonList.length).to.equal(1);
            var button = buttonList[0];
            button.click();
            var myList = browser.$('#myCourseOutput');
            //Checks if my courses only consists of 2 elements
            browser.waitUntil(function() {
                return expect(myList.$$('li').length).to.equal(2);
            }, 3000);

            //Checks if the correct course is in my courses list
            expect(myList.$$('li')[1].$('button').getAttribute('id')).to.equal('MFEL1010');

        });
        it('remove MFEL1010 from my courses ', function () {
            var myList = browser.$('#myCourseOutput');
            var myCourses = myList.$$('li');
            //Checks if my courses only consists of the one element we have added
            //expect(myCourses.length).to.equal(2);
            //Checks if the correct course is in my courses list
            expect(myCourses[1].$('button').getAttribute('id')).to.equal('MFEL1010');
            var button = myCourses[1].$('button');
            button.click();
            browser.waitUntil(function () {
                var getCourses = myList.$$('li');
                if(getCourses.length == 1) {
                    return expect(getCourses.length).to.equal(1);
                }
            }, 2000);

        });
        it('should redirect me to a schedule site if TDT4242 is clicked ', function () {
            var myList = browser.$('#myCourseOutput');
            var myCourses = myList.$$('li');
            var href = myCourses[0].$('a');
            href.click();
            browser.waitUntil(function() {
                console.log(browser.getUrl());
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/test-templateStudent/test.html?id=TDT4242"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/test-templateStudent/test.html?id=TDT4242")
                }
            }, 1500);
        });

    });
    describe('Test-student page', function() {
        it('should redirect to random site ', function () {
            var random = browser.$$('.testLink')[0];

            random.click();
            browser.waitUntil(function() {
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/questionary/questions.html?id=TDT4242&&level=random"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/questionary/questions.html?id=TDT4242&&level=random");
                }
            }, 1500);
            browser.url('https://feedbot-7494b.firebaseapp.com/test-templateStudent/test.html?id=TDT4242');
        });
        it('should redirect to level 1 site ', function () {
            var level1 = browser.$$('.testLink')[1];
            level1.click();
            browser.waitUntil(function() {
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/questionary/questions.html?id=TDT4242&&level=1"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/questionary/questions.html?id=TDT4242&&level=1");
                }
            }, 1500);
            browser.url('https://feedbot-7494b.firebaseapp.com/test-templateStudent/test.html?id=TDT4242');
        });
        it('should redirect to level 2 site ', function () {
            var level2 = browser.$$('.testLink')[2];
            level2.click();
            browser.waitUntil(function() {
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/questionary/questions.html?id=TDT4242&&level=2"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/questionary/questions.html?id=TDT4242&&level=2");
                }
            }, 1500);
            browser.url('https://feedbot-7494b.firebaseapp.com/test-templateStudent/test.html?id=TDT4242');
        });
        it('should redirect to level 3 site ', function () {
            var level3 = browser.$$('.testLink')[3];
            level3.click();
            browser.waitUntil(function() {
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/questionary/questions.html?id=TDT4242&&level=3"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/questionary/questions.html?id=TDT4242&&level=3");
                }
            }, 1500);
            browser.url('https://feedbot-7494b.firebaseapp.com/test-templateStudent/test.html?id=TDT4242');
        });
        it('should check if the graphs are on the test page and if it has correct values ', function () {
            expect(browser.waitForExist('#results', 4000)).to.equal(true);
            expect(browser.waitForExist('#allResults', 4000)).to.equal(true);
            var my = browser.$('#results').getAttribute('title');
            var course = browser.$('#allResults').getAttribute('title');
            var myList = my.split('/');
            var myCourse = course.split('/');
            rightMyResults = parseFloat(myList[0]);
            rightCourseResults = parseFloat(myCourse[0]);
            totalMyResults = parseFloat(myList[1]);
            totalCourseResults = parseFloat(myCourse[1]);
            expect(totalMyResults).to.be.at.least(0);
            expect(totalCourseResults).to.be.at.least(0);
            expect(totalCourseResults).to.be.at.least(totalMyResults);
            expect(totalMyResults).to.be.at.least(rightMyResults);
            expect(totalCourseResults).to.be.at.least(rightCourseResults);
        });
    });
    describe('Questionary', function () {
        it('should start a test of level 1 ', function () {
            var random = browser.$$('.testLink')[0];
            random.click();
            browser.waitUntil(function() {
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/questionary/questions.html?id=TDT4242&&level=random"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/questionary/questions.html?id=TDT4242&&level=random");
                }
            }, 1500);
            expect(browser.waitForText('#question', 5000)).to.be.true;
        });
        describe('should run the whole test', function() {
            for (var i = 0; i < 10; i++) {
                it('should click either radio or checkboxes and checks if right button is enabled/disabled ', function () {
                    expect(browser.isEnabled('#buttonNext')).to.be.false;
                    expect(browser.isEnabled('#buttonAnswer')).to.be.false;

                    var answers = browser.$('#answerList');
                    var li = answers.$$('li');
                    var random = Math.floor(Math.random()* 3);
                    if(li[0].getAttribute('input','type') == 'radio') {
                        li[random].$('input').click();
                        expect(li[random].$('input').isSelected());
                        expect(browser.isEnabled('#buttonNext')).to.be.false;
                        expect(browser.isEnabled('#buttonAnswer')).to.be.true;
                    } else {
                        li[1].$('input').click();
                        li[2].$('input').click();
                        li[3].$('input').click();
                        expect(li[1].$('input').isSelected());
                        expect(li[2].$('input').isSelected());
                        expect(li[3].$('input').isSelected());
                        expect(browser.isEnabled('#buttonNext')).to.be.false;
                        expect(browser.isEnabled('#buttonAnswer')).to.be.true;
                    }
                    browser.click('#buttonAnswer');
                });
                it('should check if user gets visual feedback ', function () {
                    expect(browser.isEnabled('#buttonNext')).to.be.true;
                    expect(browser.isEnabled('#buttonAnswer')).to.be.false;
                    var answers = browser.$('#answerList');
                    var li = answers.$$('li');
                    for(var key in li) {
                        var input = li[key].$('input');
                        if(input.isSelected()) {
                            expect(String(input.getCssProperty('color').value)).to.satisfy(function(color) {
                                if((color == 'rgba(255,0,0,1)') || (color == 'rgba(0,128,0,1)')) {
                                    return true;
                                }
                                return false;
                            });
                        } else {
                            expect(String(input.getCssProperty('color').value)).to.satisfy(function(color) {
                                if((color == 'rgba(51,51,51,1)') || (color == 'rgba(0,128,0,1)')) {
                                    return true;
                                }
                                return false;
                            });
                        }
                    }
                    browser.click('#buttonNext');

                });
            }
            it('should check the result site and that the points are right ', function () {
                var questionary = browser.$('#questionary');
                var strings = questionary.$$('p');
                console.log("YOO");
                var validDigits = '0123456789.';
                for(var i = 0; i < strings.length; i++) {
                    var digit = '';
                    var p = strings[i].getText();
                    for(var j = 0; j < p.length; j++) {
                        if(validDigits.indexOf(p[j]) > -1) {
                            digit += p[j];
                        }
                    }
                    var newDigit = parseFloat(digit);
                    var points;
                    if(i == 0) {
                        console.log("YOOO3");
                        points = newDigit;
                        expect(newDigit).to.be.below(10);
                    } else if (i == 1) {
                        expect(newDigit).to.equal(10);
                    } else if (i == 2){
                        expect(newDigit).to.equal(points*10);
                    }

                }
                expect(browser.waitForExist('#myChart', 2000)).to.equal(true);
            });
            it('should check if the pie chart has increased as it should ', function () {
                setTimeout(function() {
                    browser.url('https://feedbot-7494b.firebaseapp.com/test-templateStudent/test.html?id=TDT4242');
                }, 1000);

                expect(browser.waitForExist('#results', 4000)).to.equal(true);
                expect(browser.waitForExist('#allResults', 4000)).to.equal(true);
                var my = browser.$('#results').getAttribute('title');
                var course = browser.$('#allResults').getAttribute('title');
                var myList = my.split('/');
                var myCourse = course.split('/');
                setTimeout( function () {
                    console.log("Total " +round(totalCourseResults+10,1));
                    console.log("Right " +round(rightCourseResults+pointsIncrease,1));
                    totalAnswered = round(totalCourseResults+10,1);
                    totalRight = round(rightCourseResults+pointsIncrease,1);
                    expect(round(totalCourseResults+10,1)).to.equal(parseFloat(myCourse[1]));
                    expect(round(rightCourseResults+pointsIncrease,1)).to.equal(parseFloat(myCourse[0]));
                    expect(round(totalMyResults+10,1)).to.equal(parseFloat(myList[1]));
                    expect(round(rightMyResults+pointsIncrease,1)).to.equal(parseFloat(myList[0]));
                }, 500);
            });
        });

    });
    describe('Log out user', function ()  {
        it('try to logout user ', function () {
            browser.waitForVisible('#btnLogout', 2000);
            browser.click('#btnLogout');

        });
    });

});
//-------------------------------------------------------------------------------------------------------------
describe('Professor: ', function() {
    describe('Index page', function () {
        it('title should equal to prepBot @watch', function () {
            //browser.url('https://feedbot-7494b.firebaseapp.com');
            if(browser.isVisible('#btnLogout')) {
                browser.click('#btnLogout');
            } else {
                browser.url('https://feedbot-7494b.firebaseapp.com');
            }

            expect(browser.getTitle()).to.equal('prepBot');
        });
        it('should return a p element that describes what went wrong if wrong email @watch', function() {
            browser.setValue('#txtEmail', 'testgmail.com');
            browser.setValue('#txtPassword', 'test123');
            browser.click('#btnLogin');
            expect(browser.waitForText('#errorLogin'), 1000).to.equal(true);
            expect(browser.getText('#errorLogin')).to.equal('The email address is badly formatted.')
        });

        it('should click and log in a user @watch', function() {
            browser.setValue('#txtEmail', 'mayhelenrs@icloud.com');
            browser.setValue('#txtPassword', 'test123');
            browser.click('#btnLogin');

            browser.waitUntil(function() {
                //console.log(browser.getUrl());
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/professor/professor.html"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/professor/professor.html")
                }
            }, 1500);
        });

    });
    describe('Professor page @watch', function ()  {
        it('should show a list of courses starting with T with max length 6 @watch', function () {
            browser.setValue('#sok', 't');
            var searchResults = browser.$('#searchResults');
            browser.waitUntil(function() {
                return expect(searchResults.$$('li').length).to.equal(6);
            }, 3500);


            for(var i = 0; i < searchResults.$$('li').length; i++) {
                expect(searchResults.$$('li')[i].$('a').getText().charAt(0)).to.equal('T');
            }
        });
        it('should show only course TDT4242 @watch', function () {

            var searchResults = browser.$('#searchResults');
            browser.setValue('#sok', 'T');
            setTimeout(function() {
                browser.addValue('#sok', 'D');
            }, 500);
            setTimeout(function() {
                browser.addValue('#sok', 'T');
            }, 1000);
            setTimeout(function() {
                browser.addValue('#sok', '4');
            }, 1500);
            setTimeout(function() {
                browser.addValue('#sok', '2');
            }, 2000);
            setTimeout(function() {
                browser.addValue('#sok', '4');
            }, 2500);
            setTimeout(function() {
                browser.addValue('#sok', '2');
            }, 3000);
            browser.waitUntil(function() {
                return expect(searchResults.$$('li').length).to.equal(1);
            }, 4600);

            expect(searchResults.$$('li')[0].$('a').getText().substring(0,7)).to.equal('TDT4242');
        });
        it('should click TDT4242 and add course to my courses @watch', function () {
            var searchResults = browser.$('#searchResults');
            var buttonList = searchResults.$$('button');

            //If the browser runs too fast, this will return at least 6 due to
            //asynchronous call to the database
            expect(buttonList.length).to.equal(1);
            var button = buttonList[0];
            button.click();
            var myList = browser.$('#myCourseOutput');
            var myCourses = myList.$$('li');
            //Checks if my courses only consists of the one element we have added
            expect(myCourses.length).to.equal(1);
            //Checks if the correct course is in my courses list
            expect(myCourses[0].$('a').getText()).to.equal('TDT4242');


        });

        it('add MFEL1010 to my courses @watch', function () {
            var searchResults = browser.$('#searchResults');
            browser.setValue('#sok', 'M');
            setTimeout(function() {
                browser.addValue('#sok', 'F');
            }, 1000);
            setTimeout(function() {
                browser.addValue('#sok', 'E');
            }, 2000);
            setTimeout(function() {
                browser.addValue('#sok', 'L');
            }, 3000);
            setTimeout(function() {
                browser.addValue('#sok', '1');
            }, 4000);
            setTimeout(function() {
                browser.addValue('#sok', '0');
            }, 5000);
            setTimeout(function() {
                browser.addValue('#sok', '1');
            }, 6000);
            setTimeout(function() {
                browser.addValue('#sok', '0');
            }, 7000);
            browser.waitUntil(function() {
                return expect(searchResults.$$('li').length).to.equal(1);
            }, 8000);


            var buttonList = searchResults.$$('button');
            //If the browser runs too fast, this will return at least 6 due to
            //asynchronous call to the database
            expect(buttonList.length).to.equal(1);
            var button = buttonList[0];
            button.click();
            var myList = browser.$('#myCourseOutput');
            //Checks if my courses only consists of 2 elements
            browser.waitUntil(function() {
                return expect(myList.$$('li').length).to.equal(2);
            }, 2000);

            //Checks if the correct course is in my courses list
            expect(myList.$$('li')[1].$('button').getAttribute('id')).to.equal('MFEL1010');

        });
        it('remove MFEL1010 from my courses @watch', function () {
            var myList = browser.$('#myCourseOutput');

            //Checks if my courses only consists of the one element we have added
            //expect(myCourses.length).to.equal(2);
            //Checks if the correct course is in my courses list
            expect(myList.$$('li')[1].$('button').getAttribute('id')).to.equal('MFEL1010');
            var button = myList.$$('li')[1].$('button');
            button.click();
            browser.waitUntil(function () {
                var getCourses = myList.$$('li');
                if(getCourses.length == 1) {
                    return expect(getCourses.length).to.equal(1);
                }
            }, 2000);

        });
        it('should redirect me to a schedule site if TDT4242 is clicked @watch', function () {
            var myList = browser.$('#myCourseOutput');
            var href = myList.$$('li')[0].$('a');
            href.click();
            browser.waitUntil(function() {
                console.log(browser.getUrl());
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/test-templateProfessor/test.html?id=TDT4242"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/test-templateProfessor/test.html?id=TDT4242")
                }
            }, 1500);
        });
    });
    describe('Test-student page', function() {

        it('should check if the graphs are on the test page and if it has correct values @watch', function () {
            expect(browser.waitForExist('#level1', 4000)).to.equal(true);
            expect(browser.waitForExist('#level2', 4000)).to.equal(true);
            expect(browser.waitForExist('#level3', 4000)).to.equal(true)
            var level1 = browser.$('#level1').getAttribute('title');
            var level2 = browser.$('#level2').getAttribute('title');
            var level3 = browser.$('#level3').getAttribute('title');
            var lvl1 = level1.split('/');
            var lvl2 = level2.split('/');
            var lvl3 = level3.split('/');

            lvl1Right = parseFloat(lvl1[0]);
            lvl1Total = parseFloat(lvl1[1]);
            lvl2Right = parseFloat(lvl2[0]);
            lvl2Total = parseFloat(lvl2[1]);
            lvl3Right = parseFloat(lvl3[0]);
            lvl3Total = parseFloat(lvl3[1]);

            console.log("Total:"+ totalAnswered);
            console.log("Right:"+ totalRight);
            console.log("1" + lvl1Total);
            console.log("2" + lvl2Total);
            console.log("3" + lvl3Total);
            expect(lvl1Total).to.be.at.least(0);
            expect(lvl2Total).to.be.at.least(0);
            expect(lvl2Total).to.be.at.least(0);
            expect(lvl1Total).to.be.at.least(lvl1Right);
            expect(lvl2Total).to.be.at.least(lvl2Right);
            expect(lvl3Total).to.be.at.least(lvl3Right);
            expect(lvl1Total+lvl2Total+lvl3Total).to.equal(totalAnswered);
        });
    });

    describe('Log out user', function ()  {
        it('try to logout user @watch', function () {
            browser.waitForVisible('#btnLogout', 2000);
            browser.click('#btnLogout');

        });
    });

});

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
