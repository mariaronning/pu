
describe('Student: ', function() {

    describe('Index page', function () {

        ('title should equal to prepBot ', function () {
            browser.url('https://feedbot-7494b.firebaseapp.com');
            if(browser.isVisible('#btnLogout')) {
                browser.click('#btnLogout');
            } else {
                browser.url('https://feedbot-7494b.firebaseapp.com');
            }

            expect(browser.getTitle()).to.equal('prepBot');


        });
        it('should return a p element that describes what went wrong if wrong email ', function() {
            browser.setValue('#txtEmail', 'testgmail.com');
            browser.setValue('#txtPassword', 'test123');
            browser.click('#btnLogin');
            expect(browser.waitForText('#errorLogin'), 1000).to.equal(true);
            expect(browser.getText('#errorLogin')).to.equal('The email address is badly formatted.')
        });

        it('should click and log in a user ', function() {
            browser.setValue('#txtEmail', 'test@gmail.com');
            browser.setValue('#txtPassword', 'test123');
            browser.click('#btnLogin');

            browser.waitUntil(function() {
                console.log(browser.getUrl());
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/student/student.html"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/student/student.html")
                }
            }, 1500);
        });

    });
    describe('Student page', function ()  {
        it('should show a list of courses starting with T with max length 6', function () {
            browser.setValue('#sok', 't');
            var searchResults = browser.$('#searchResults');
            var coursesList = searchResults.$$('li')
            expect(coursesList.length).to.equal(6);

            for(var i = 0; i < coursesList.length; i++) {
                expect(coursesList[i].$('a').getText().charAt(0)).to.equal('T');
            }
        });
        it('should show only course TDT4242 ', function () {
            browser.setValue('#sok', 'TDT4242');
            var searchResults = browser.$('#searchResults');
            var coursesList = searchResults.$$('li');
            expect(coursesList.length).to.equal(1);
            expect(coursesList[0].$('a').getText().substring(0,7)).to.equal('TDT4242');
        });
        it('should click TDT4242 and add course to my courses ', function () {
            browser.setValue('#sok', 'TDT4242');
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
            browser.setValue('#sok', 'MFEL1010');
            var searchResults = browser.$('#searchResults');
            var buttonList = searchResults.$$('button');
            //If the browser runs too fast, this will return at least 6 due to
            //asynchronous call to the database
            expect(buttonList.length).to.equal(1);
            var button = buttonList[0];
            button.click();
            var myList = browser.$('#myCourseOutput');
            var myCourses = myList.$$('li');
            //Checks if my courses only consists of 2 elements
            expect(myCourses.length).to.equal(2);
            //Checks if the correct course is in my courses list
            expect(myCourses[1].$('button').getAttribute('id')).to.equal('MFEL1010');

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
        it('should check if the graphs are on the test page @watch', function () {
            expect(browser.waitForExist('#results', 2000)).to.equal(true);
            expect(browser.waitForExist('#allResults', 2000)).to.equal(true);
        });

    });
    describe('Log out user', function ()  {
        it('try to logout user ', function () {
            browser.waitForVisible('#btnLogout', 2000);
            browser.click('#btnLogout');

        });
    });

});
