[![Coverage Status](https://coveralls.io/repos/github/mariaronning/pu/badge.svg?branch=master)](https://coveralls.io/github/mariaronning/pu?branch=master)

# prepBot
How to structure learning and effective lectures are on a daily basis creating trouble for both students and lecturers. We were given this information interviewing professors at NTNU. Looking at this problem, we saw the possibility to revolutionize each student’s learning experience, and the lecturer’s ability to follow his/her students progress. prepBot makes it possible to take automatically generated tests from earlier exams, and the questions given will be based on the student’s level of knowledge.

The results from these, and other available test, will be shown to the professors so that they can adjust the lectures based on the student’s knowledge level. prepBot will be a website, easy and safe to use. Creating a profile and adding subjects will be effective, and therefore we will motivate students to use the program. Information about the level of knowledge is valuable, and we believe this will be a key to a solution that can revolutionize learning experiences for students and lecturers across the world.

**Our test file is located under the folder features and the test file is named test.js.**

To see our website visit https://feedbot-7494b.firebaseapp.com/ in a Chrome browser. Some features are not available in other browsers.

### For further development:
In order to further develop our project you need to clone our git repository found at: https://github.com/mariaronning/pu and have node js installed on your computer. Then you need to run:
```
    $ npm install
    $ npm install -g bower
    $ bower install jquery
```

It is not possible to run our database as a localhost, due to firebase database restrictions. Still, it is possible to ask us for permission if you want to develop this project further. After you have followed the instructions above, create a firebase user and then send a mail to theprepbot@gmail.com and ask for permission to use our database. You need to run these commands in the terminal in order to run firebase as localhost:
```
    $ npm install -g firebase-tools
    $ firebase init    # Generate a firebase.json (REQUIRED)
    $ firebase serve   # Start development server
```
