var blahgApp = angular.module('blahgApp', [
  'ui.router',
  'homeControllerModule',
  'postsControllerModule',
  'filtersModule',
  'servicesModule'
]);

blahgApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/views/home.html',
  }) //no semicolon here. they are all chaining the stateprovider object
  .state('posts', {
    url: '/posts',
    templateUrl: 'app/views/posts.html',
  })
  .state('posts.new', {
    url: '/new-post',
    views: {
      'new': {
        templateUrl: 'app/views/new.html',
      }
    }
  })
  .state('show', {
    url: '/post/:id',
    templateUrl: 'app/views/show.html',
  });
  $urlRouterProvider.otherwise('/');
});
