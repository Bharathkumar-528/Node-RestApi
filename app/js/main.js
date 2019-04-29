
(function () {
    //main app related stuff goes here
    var app = angular.module('QandAApp', []);  

    //Controller related stuuf goes here
    var QACntrl = function($scope,$http) {

      //After sucessfull API calling    
      var OnuserResponse = function (response) {
          $scope.responsedata = response.data;    
          //$location.hash("userdetails");
          //$anchorScroll();
      };

      //If Error Occurs while calling API
      var eRROR = function (reason) {
          $scope.error = "Coud not fetch user data";
      }

      //Sample test data
      $scope.firstName= "John";
      $scope.lastName= "Doe";
      
      //api calling
      //$http.get("http://localhost:8080/api/connections").then(OnuserResponse, eRROR);

            

      //upvoting
      $scope.upvote = function(id,upvote){
        //upvote = Number(upvote) + 1;
        //console.log("http://localhost:8080/upvote/?id="+id+"&upvote="+upvote);         
        $http.post("http://localhost:8080/upvote/?id="+id+"&upvote="+upvote, id).then(function (response) {
          $scope.socketvals.on('voteUpdated',function(updateddata){OnuserResponse = updateddata;})
          // This function handles success
          //$http.get("http://localhost:8080/api/connections").then(OnuserResponse, eRROR);          
          }, function (response) {          
          // this function handles error
          console.log("error");          
          });
      }
  };
  //Calling of Controller through app
  app.controller('QandACntrl', QACntrl);
}());