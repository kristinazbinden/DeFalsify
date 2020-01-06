const app = angular.module("DeFalsifyApp", []);

app.controller('MainController', ["$http", function($http){

    const controller = this;

    this.loggedInUser = false;
    this.includeLoggedInPath = '';
    this.includePath = '';

    this.signupVisible = false;
    this.loginVisible = false;

// This handles login and signup of users

    this.showSignUp = function(){
        this.loginVisible = false;
        console.log("show sign up");
        this.signupVisible = true;
    }

    this.signup = function(){
        console.log('signing up user');
        $http({
            url:'/users',
            method: 'POST',
            data: {
                username: this.signupUsername,
                password: this.signupPassword
            }
        }).then(function(response){
            controller.loggedInUser = response.data;
        })
    }

    this.showLogIn = function(){
        this.signupVisible = false;
        console.log("show log in");
        this.loginVisible = true;
    }

    this.login = function(){
        $http({
            url:'/session',
            method:'POST',
            data: {
                username: this.loginUsername,
                password: this.loginPassword
            }
        }).then(function(response){
            if(response.data.username){
                controller.loggedInUser = response.data;
                this.loginVisible = false;
            } else {
                controller.loginUsername = null;
                controller.loginPassword = null;
            }
        })
    }
// On button click, log out user and end session
    this.logout = function(){
        console.log('logging out');
        $http({
            url:'/session',
            method:'DELETE'
        }).then(function(){
            controller.loggedInUser = false;
            controller.loginVisible = false;
            controller.signupVisible = false;
        })
    }

// Hide login and/or signup forms
    this.cancelThis = function(){
        this.signupVisible = false;
        this.loginVisible = false;
    }


    this.factCheck = function(){
        console.log(this.factToCheck);
        $http({
            method: 'GET',
            url: "/topics/facts?search="+this.factToCheck
        }).then( response => {
            console.log(response.data.claims);
            controller.checkedFacts = response.data.claims
        })
    }

//     googleTrends.interestOverTime({keyword: 'Women\'s march'})
//         .then(function(results){
//           console.log('These results are awesome', results);
//         })
//         .catch(function(err){
//           console.error('Oh no there was an error', err);
// });

}]);
