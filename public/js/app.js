const app = angular.module("DeFalsifyApp", []);

app.controller('MainController', ["$http", function($http){

    const controller = this;

    this.loggedInUser = false;

    this.signupVisible = false;
    this.loginVisible = false;
    this.savedVisible = false;
    this.savedPath = './savedSearches.html';

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
            controller.savedVisible = false;
        })
    }

// Hide login and/or signup forms
    this.cancelThis = function(){
        this.signupVisible = false;
        this.loginVisible = false;
    }


    this.factCheck = function(){
        $http({
            method: 'GET',
            url: "/topics/facts?search="+this.factToCheck
        }).then( response => {
            console.log(response.data.claims);
            controller.checkedFacts = response.data.claims
        })
    }

// Allow users to save a search result to their profile
    this.saveSearch = function(claim){
        console.log(claim);
        $http({
            method:'POST',
            url:'/topics',
            data: {
                text: claim.text,
                claimant: claim.claimant,
                source: claim.claimReview[0].url,
                title: claim.claimReview[0].title,
                rating: claim.claimReview[0].textualRating,
                userId: this.loggedInUser._id
            }
        }).then(function(response){
            controller.getTopics();
        }, function(error){
            console.log(error);
        })

// Add presonal notes to saved searches

    this.editSaved = function(claim){
        $http({
            method:'PUT',
            url:'/topics/' + claim._id,
            data: {
                notes: this.updatedNotes,
            }
        }).then(function(response){
            console.log(response);
            controller.getTopics();
            controller.indexOfUpdateTopic = null;
        })
    }

    }
// This section handles the show saved searches page
    this.showSaved = function(){
        console.log('click');
        this.savedVisible = true;
    }

    this.getTopics = function(){
        $http({
            method: 'GET',
            url: '/topics'
        }).then(function(response){
            console.log(response.data);
            controller.topics = response.data;
        })
    }
    this.deleteTopic = function(topic){
        $http({
            method: 'DELETE',
            url:'/topics/' + topic._id
        }).then(function(response){
            controller.getTopics();
        })
    }

// Call getTopics() on load
    this.getTopics();

//     googleTrends.interestOverTime({keyword: 'Women\'s march'})
//         .then(function(results){
//           console.log('These results are awesome', results);
//         })
//         .catch(function(err){
//           console.error('Oh no there was an error', err);
// });

}]);
