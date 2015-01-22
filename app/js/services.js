var servicesModule = angular.module('servicesModule', []);
//creating variable so we know what to call it. [] not injecting anything yet.

//took module, told it to make factory to this (factory and service are similar)
//find http library, injecting http inside block so we can do things with it.
servicesModule.factory('apiService', ['$http', function($http) {
  var url = 'http://localhost:3000/';

  //return functions that we can call on this service
  //when you call method getposts return this api call
  //newPost param is $scope.newPost
  return {
    get: function(page){
      return $http.get(url + page);
    },
    getPost: function(id){
      return $http.get(url + 'posts/' + id);
    },
    postPost: function(newPost){
      return $http.post(url + 'posts',
      {
        post: {
          title: newPost.title,
          content: newPost.content,
          tag_ids: newPost.tag_ids
        }
      });
    },
    postTag: function(newTag){
      return $http.post(url + 'tags',
      {
        tag: {
          name: newTag.name
        }
      });
    },
    delete: function(page, id){
      return $http.delete(url + page + '/id');
    }
  };
}]);
