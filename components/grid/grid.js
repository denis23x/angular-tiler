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

                obj.fromNow = moment(obj.created_at).calendar();
                // obj.fromNow = moment(obj.created_at).from();
            });

            imageList = grid.posts;
            grid.posts = imageList.concat([]);
        });

        grid.gridWidth = 300;
        grid.gutterSize = 10;

        $rootScope.$on('startSearch', function (event, val) {
            val = val.toLowerCase();
            grid.posts = imageList.filter(function (post) {
                return post.title.toLowerCase().indexOf(val) != -1;
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