const app = angular.module("DeFalsifyApp", []);


// const googleTrends = require('google-trends-api');
// googleTrends.dailyTrends({ geo: 'US' }, cbFunc)

app.controller('MainController', ["$http", function($http){

    const controller = this;

    this.loggedInUser = false;
    this.includeLoggedInPath = '';
    this.includePath = '';


    this.baseURL = ''

// This handles login and signup of users
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
            } else {
                controller.loginUsername = null;
                controller.loginPassword = null;
            }
        })
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
