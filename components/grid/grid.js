(function () {
    'use strict';
    angular
        .module('app').component('gridComponent', {
        templateUrl: 'components/grid/grid.html',
        bindings: {
            posts: '<'
        },
        controller: ('GridController', GridController),
        controllerAs: 'grid'
    });

    // Start grid component
    GridController.$inject = ['$rootScope', '$scope', 'APIService', 'angularGridInstance'];
    function GridController($rootScope, $scope, APIService, angularGridInstance) {

        var grid = this,
            page = 1, imageList;

        //  Watch while grid.posts has loaded/changed
        $scope.$watch(grid.posts, function() {

            //  TODO: review the relevance of this cycle
            grid.posts.forEach(function(obj) {
                obj.actualHeight = 150;
                obj.actualWidth = 150;

                //  TODO: review data output
                obj.created = moment(obj.created_at).startOf('hour').from();
            });

            imageList = grid.posts;
            grid.posts = imageList.concat([]);
        });

        grid.gridWidth = 300;
        grid.gutterSize = 10;

        //  Sorting grid functions
        $rootScope.$on('startSearch', function (event, val) {
            val = val.toLowerCase();
            grid.posts = imageList.filter(function (post) {
                return post.title.toLowerCase().indexOf(val) != -1;
            });
        });

        $rootScope.$on('mostPopular', function (event, reverse) {
            grid.posts = imageList.sort(function (a, b) {
                return reverse ? a.likes_count - b.likes_count : b.likes_count - a.likes_count;
            });
        });

        $rootScope.$on('mostWatches', function (event, reverse) {
            grid.posts = imageList.sort(function (a, b) {
                return reverse ? a.views_count - b.views_count : b.views_count - a.views_count;
            });
        });

        grid.refresh = function(){
            angularGridInstance.gallery.refresh();
        };

        grid.loadMore = function () {
            APIService.loadManyPosts(page).then(function(next){
                grid.posts = grid.posts.concat(next);
                page++
            });
        };

    }

    //  Filter for description post text
    angular.module('app').filter('unsafe', ['$sce', function ($sce){
        return $sce.trustAsHtml;
    }])

})();