var filtersModule = angular.module('filtersModule', []);
//filter by tag - shows all tags if none have been added to array
//remember that .indexOf returns -1 if the item is not in the array.
//this filter returns true if the tag IS in the array.
//.filter ~= filter by false have it not show up in filtered list/true if it does
filtersModule.filter('selectedTags', function() {
  return function(posts,tagArray) {
    return posts.filter(function(post) {

      for (var i=0; i < tagArray.length; i++) {
        if (post.tag_ids.indexOf(tagArray[i]) === -1){
          return false;
        }
      }

      return true;
    });
  };
});
