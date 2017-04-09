
describe('Student', function() {

    describe('Index page', function () {
        /*it('title should equal to prepBot @watch', function () {
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
            browser.setValue('#txtEmail', 'test@gmail.com');
            browser.setValue('#txtPassword', 'test123');
            browser.click('#btnLogin');

            browser.waitUntil(function() {
                console.log(browser.getUrl());
                if(browser.getUrl() == "https://feedbot-7494b.firebaseapp.com/student/student.html"){
                    return expect(browser.getUrl()).to.equal("https://feedbot-7494b.firebaseapp.com/student/student.html")
                }
            }, 1500);
        });*/

    });
    describe('Student page', function ()  {
        /*it('should show a list of courses starting with T with max length 6 @watch', function () {
            browser.setValue('#sok', 't');
            var searchResults = browser.$('#searchResults');
            var coursesList = searchResults.$$('li')
            expect(coursesList.length).to.equal(6);

            for(var i = 0; i < coursesList.length; i++) {
                expect(coursesList[i].$('a').getText().charAt(0)).to.equal('T');
            }
        });*/
        it('should show only course TDT4242 @watch', function () {
            browser.setValue('#sok', 'TDT4242');
            var searchResults = browser.$('#searchResults');
            var coursesList = searchResults.$$('li')
            expect(coursesList.length).to.equal(1);
            expect(coursesList[0].$('a').getText().substring(0,7)).to.equal('TDT4242');
        });
        it('should click TDT4242 and add course to my courses@watch', function () {
            //browser.setValue('#sok', 'TDT4242');
            var searchResults = browser.$('#searchResults');
            var buttonList = searchResults.$$('button')
            expect(buttonList.length).to.equal(1);
            var button = buttonList[0];
            button.click();

        });
    });
    /*describe('Log out user', function ()  {
        it('try to logout user @watch', function () {
            browser.waitForVisible('#btnLogout', 2000);
            browser.click('#btnLogout');

        });
    });*/

});
