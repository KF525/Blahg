var postsControllerModule = angular.module('postsControllerModule', []);

//creating post controller/inject what you are going to use in this block
postsControllerModule.controller('postsController', ['$scope', '$http', 'apiService',
  function($scope, $http, apiService) {

  //ALL POSTS
  $scope.posts = []; //defining them in a promise object, then have filter looking at them first, before promise object has returned
  $scope.tags = [];
  $scope.tagArray = [];

  apiService.get('posts') //need parantheses to tell function to fire - returns a promise object
  .success(function(data) {
    $scope.posts = data; //promise object
  });

  apiService.get('tags')
  .success(function(data) {
    $scope.tags = data;
  });

  //create a method to get tag name from tag_id:
  //pass in the tag id, create an empty string variable, go through the array
  //tags is an array of all the tags
  //check to see if current id matches the id of the tag in the array
  //then set ret to the name of that id in the array
  $scope.getTagName = function(id) {
    var ret = "";
    for (i = 0; i < $scope.tags.length; i++){
      if (id == $scope.tags[i].id) {
        ret = $scope.tags[i].name;
      }
    }
    return ret;
  };

  //adds or removes tag ids to the tagArray based on checkbox status
  $scope.addTag = function(id) {
    i = $scope.tagArray.indexOf(id);
    if(i == -1) {
      $scope.tagArray.push(id);
    } else {
      $scope.tagArray.splice(i, 1);
    }
  };

}]);

//creating new post controller - NEW POST
postsControllerModule.controller('newPostController', ['$scope', '$http', 'apiService',
  function($scope, $http, apiService) {

  $scope.newPost = {"title": "", "content": "", "tag_ids": []};

  //sending post to API
  $scope.submitNewPost = function() {
    apiService.postPost($scope.newPost);

    $scope.newPost = {"title": "", "content": ""};

    //trying to figure out how to clear tag checkboxes once post is submitted!!
    $scope.clearTags = function(id) {
      var i = $scope.newPost.tag_ids.indexOf(id);
      if (i != -1) {
        $scope.newPost.tag_ids.splice(i, 1);
      }
    };
  };

  //function passes in tag id
  //variable - looks at array.looks for indexOf id that is passed in
  //check to see if value is already in the array
  //if it's not i = -1, and that means we should push it in
  //if it is, then remove it from the array - splice(index, number of elements),
  $scope.toggleId = function(id) {
    var i = $scope.newPost.tag_ids.indexOf(id);
    if (i == -1) {
      $scope.newPost.tag_ids.push(id);
    } else {
      $scope.newPost.tag_ids.splice(i, 1);
    }
  };
}]);

//creating single post controller - SHOW POST
postsControllerModule.controller('postController', ['$scope', '$http', '$stateParams', 'apiService',
  function($scope, $http, $stateParams, apiService) {
  $scope.post = {};
  $scope.id = $stateParams.id;

  apiService.getPost($scope.id)
    .success(function(data) {
    $scope.post = data; //promise object
  });

  console.log('hello');
  console.log($scope.post.title);
  console.log('id is ' + $scope.id);

}]);
