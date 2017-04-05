

describe('Student', function() {

    describe('Index page', function () {
        it('title should equal to prepBot @watch', function () {
            browser.url('https://feedbot-7494b.firebaseapp.com');
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
            console.log(browser.selectByAttribute('h1'));
            //expect(browser.selectByAttribute('h1')).to.equal('Student');

        });

    });
    /*describe('Student page', function ()  {
        it('title should equal to Stude nt  @watch', function () {
            //var student = require('../student/student.js');
            console.log("YOOOOO");
                console.log("HOO");
            //expect(browser.getHTML('h1')).to.equal('Student');

        });
    });*/
    describe('Log out user', function ()  {
        it('try to logout user @watch', function () {
            browser.waitForVisible('#btnLogout', 2000);
            browser.click('#btnLogout');
        });
    });

});
