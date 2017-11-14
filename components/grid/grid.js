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
            page = 1, postList;

        grid.order = {
            reverse: false,
            type: 'created_at'
        };

        //  Watch while grid.posts has loaded/changed
        $scope.$watch(grid.posts, function() {
            //  TODO: review the relevance of this cycle
            grid.posts.forEach(function(obj) {
                obj.actualHeight = 150;
                obj.actualWidth = 150;
                obj.created = moment.utc(obj.created_at).startOf('minute').from();
            });

            postList = grid.posts;
            grid.posts = postList.concat([]);
        });

        grid.gridWidth = 250;
        grid.gutterSize = 10;

        //  Sorting grid functions
        $rootScope.$on('startSearch', function (event, val) {
            grid.searchText = val;
            val = val.toLowerCase();
            grid.posts = postList.filter(function (post) {
                return post.title.toLowerCase().indexOf(val) !== -1;
            });
        });

        $rootScope.$on('viewsToggle', function (event, reverse) {
            console.log('Here im return sort by views in - ' + reverse);
            // grid.posts = postList.sort(function (a, b) {
            //     return reverse ? a.likes_count - b.likes_count : b.likes_count - a.likes_count;
            // });
        });

        $rootScope.$on('likesToggle', function (event, reverse) {
            console.log('Here im return sort by likes in - ' + reverse);
            // grid.posts = postList.sort(function (a, b) {
            //     return reverse ? a.views_count - b.views_count : b.views_count - a.views_count;
            // });
        });

        $rootScope.$on('newestToggle', function (event, toggle) {
            grid.order.reverse = !grid.order.reverse;
            grid.order.type = 'created_at';
            grid.posts = postList.sort();
        });

        $rootScope.$on('showAll', function (event) {
                return grid.posts = postList;
        });

        $rootScope.$on('showCategory', function (event, category) {
            var arr = [];
            postList.filter(function (post) {
                if (post.categories.length > 0) {
                    angular.forEach(post.categories, function (val, key) {
                        val.id === category ? arr.push(post) : false;
                    });
                }
            });
            grid.posts = arr;
        });

        $rootScope.$on('showCollection', function (event, collection) {
            var arr = [];
            postList.filter(function (post) {
                if (post.collections.length > 0) {
                    angular.forEach(post.collections, function (val, key) {
                        console.log(val);
                        val.id === collection ? arr.push(post) : false;
                    });
                }
            });
            grid.posts = arr;
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

        grid.setText = function (text) {
            var parser = new DOMParser(),
                doc = parser.parseFromString(text, 'text/html'),
                nodes = doc.firstChild.lastChild.childNodes,
                tmp = '';

            for (var i = 0; i < 6; i++) {
                if (nodes[i] !== undefined && nodes[i].innerHTML !== undefined) {
                    if (nodes[i].textContent !== '' && nodes[i].outerHTML.indexOf('img-fluid') === -1 || nodes[i].outerHTML.indexOf('img-emoji') !== -1) {
                        tmp = tmp + (nodes[i].outerHTML);
                    }
                }
            }
            return tmp;
        }

    }
})();