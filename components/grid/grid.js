(function () {
    'use strict';
    angular
        .module('app').component('gridComponent', {
        templateUrl: 'components/grid/grid.html',
        bindings: {
            content: '<'
        },
        controller: ('GridController', GridController),
        controllerAs: 'grid'
    });

    // Start grid component
    GridController.$inject = ['$rootScope', '$scope', 'APIService', 'angularGridInstance'];
    function GridController($rootScope, $scope, APIService, angularGridInstance) {

        var grid = this,
            nextPage = 2,
            defaultContent;

        grid.gridWidth = 250;
        grid.gutterSize = 10;
        grid.lastPage = false;
        grid.sortingType = '-created_at';

        $scope.$watch(grid.content, function() {
            grid.content.data.forEach(function(post) {
                post.created = moment.utc(post.created_at).startOf('minute').from();
            });

            defaultContent = grid.content.data;
            grid.posts = grid.content.data;
        });

        $rootScope.$on('startSearch', function (e, val) {
            grid.searchText = val;
            grid.posts = defaultContent.filter(function (post) {
                return post.title.toLowerCase().indexOf(val.toLowerCase()) !== -1;
            });
        });

        $rootScope.$on('sortingPosts', function (e, type) {
            grid.sortingType = type;
            angularGridInstance.gallery.refresh();
        });

        $rootScope.$on('showAll', function () {
            return grid.posts = defaultContent;
        });

        $rootScope.$on('showCategory', function (e, category) {
            grid.posts = defaultContent.filter(function (post) {
                return post.categories.indexOf(category) !== -1;
            });
        });

        $rootScope.$on('showCollection', function (e, collection) {
            APIService.loadPostsByUser(JSON.parse(localStorage.getItem('user-data')).id).then(function (response) {
                var arr = [];
                response.data.filter(function (post) {
                    if (post.collections.length > 0) {
                        angular.forEach(post.collections, function (val, key) {
                            val.id === collection ? arr.push(post) : false;
                        });
                    }
                });
                angularGridInstance.gallery.refresh();
                grid.posts = arr;
            });
        });

        grid.loadMore = function () {
            if (!grid.lastPage) {
                APIService.loadPosts('?page=' + nextPage).then(function(response) {
                    response.data.forEach(function(post) {
                        post.created = moment.utc(post.created_at).startOf('minute').from();
                    });
                    defaultContent = defaultContent.concat(response.data);
                    angularGridInstance.gallery.refresh();
                    grid.posts = defaultContent;
                    grid.lastPage = nextPage === response.meta.last_page;
                    nextPage++;
                });
            }
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