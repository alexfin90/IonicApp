angular.module('app.controllers', [])
  
.controller('dogLoversCtrl', function($scope) {

})
   
.controller('profileCtrl', function($scope,$http) {

    // function to retrive data profile
  $scope.retriveUser = function(){

    var link = 'http://localhost:8080/_ah/api/myApi/v1/retriveUtente/'+$scope.data.username;

         $http.post(link).then(function (res){        
            var json_data = res.data;   
            //assign
           $scope.username=json_data.data.username;
           $scope.nome=json_data.data.name;
           $scope.motto=json_data.data.short_desc;


});


  };

  //local  data profile
   $scope.data={};
   $scope.data.username=window.sessionStorage.getItem("username");
   $scope.retriveUser();

  
  


 

  

   })
   
.controller('newsCtrl', function($scope) {

})
      
.controller('loginCtrl',function($scope,$http,$state) {

	$scope.data = {};

 	$scope.sendLogin = function() {
  
   //check username and password filled
   if ($scope.data.username && $scope.data.psw) {     
      
      //local
      var link = 'http://localhost:8080/_ah/api/myApi/v1/login/'+$scope.data.username+'/'+$scope.data.psw;
      //cloud
      // var link ='https://feisty-card-94110.appspot.com/_ah/api/myApi/v1/login/'+$scope.data.username+'/'+$scope.data.psw;

        $http.post(link).then(function (res){        
            var json_data = res.data;   
            //check login
            if(json_data.mess=="login effettuato"){

             // Save data to sessionStorage
            window.sessionStorage.setItem("username", $scope.data.username);

             // login change page.
            $state.go('tabsController.profile');
 
             
              
         	}
         	else{

         		alert("username or password wrongs!")
         	}
});



   //alert if not filled
  } else {
    alert("Please fill out the fields before submitting!");
  }
  };

})
   
.controller('signupCtrl', function($scope,$http,$state) {

	$scope.data = {};



	$scope.sendSignup = function() {

	
  
   //check username and password filled
        //check username and password filled
   
      
      //local
      var link = 'http://localhost:8080/_ah/api/myApi/v1/registrazione/'+$scope.data.username+'/'+$scope.data.psw+'/'+$scope.data.nome+'/'+$scope.data.date+'/'+$scope.data.address+'/'+$scope.data.phone+'/'+$scope.data.gender+'/'+$scope.data.motto;
     
      //var link = 'http://localhost:8080/_ah/api/myApi/v1/registrazione/b/1234/b/04101990/via%20pippo/095971182/maschile/bleah';
      //cloud
      // var link ='https://feisty-card-94110.appspot.com/_ah/api/myApi/v1/login/'+$scope.data.username+'/'+$scope.data.psw;

        $http.post(link).then(function (res){        
            var json_data = res.data;   
            //check signup
            if(json_data.data=="registrazione effettuata con successo"){
            alert("New User create");

             // login change page.
             $state.go('login');       
              
         	}
         	else if (json_data.data=="Username gia' registrato"){

            alert("Username gia' registrato");

         	}
         	else{

         		alert("error");
         	}
});



   
  };


})



