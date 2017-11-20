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
    GridController.$inject = ['$rootScope', '$scope', 'APIService'];
    function GridController($rootScope, $scope, APIService) {

        var grid = this,
            nextPage = 2,
            defaultContent;

        grid.gridWidth = 250;
        grid.gutterSize = 10;
        grid.lastPage = false;
        grid.order = {
            reverse: false,
            type: 'created_at'
        };

        $scope.$watch(grid.content, function() {
            grid.content.data.forEach(function(post) {
                post.created = moment.utc(post.created_at).startOf('minute').from();
            });

            defaultContent = grid.content.data;
            grid.posts = grid.content.data;
        });

        $rootScope.$on('startSearch', function (event, val) {
            grid.searchText = val;
            grid.posts = defaultContent.filter(function (post) {
                return post.title.toLowerCase().indexOf(val.toLowerCase()) !== -1;
            });
        });

        // $rootScope.$on('viewsToggle', function (event, reverse) {
        //     console.log('Here im return sort by views in - ' + reverse);
        //     grid.posts = postList.sort(function (a, b) {
        //         return reverse ? a.likes_count - b.likes_count : b.likes_count - a.likes_count;
        //     });
        // });
        //
        // $rootScope.$on('likesToggle', function (event, reverse) {
        //     console.log('Here im return sort by likes in - ' + reverse);
        //     grid.posts = postList.sort(function (a, b) {
        //         return reverse ? a.views_count - b.views_count : b.views_count - a.views_count;
        //     });
        // });

        $rootScope.$on('newestToggle', function (event, toggle) {
            grid.order.reverse = !grid.order.reverse;
            grid.order.type = 'created_at';
            grid.posts = defaultContent.sort();
        });

        $rootScope.$on('showAll', function () {
            return grid.posts = defaultContent;
        });

        // $rootScope.$on('showCategory', function (event, category) {
        //     // TODO: right code for filtering
        //     // grid.posts = defaultContent.filter(function (post) {
        //     //     return post.categories.indexOf(category) !== -1;
        //     // });
        //
        //     var arr = [];
        //     grid.posts.filter(function (post) {
        //         if (post.categories.length > 0) {
        //             angular.forEach(post.categories, function (val, key) {
        //                 val.id === category ? arr.push(post) : false;
        //             });
        //         }
        //     });
        //     grid.posts = arr;
        // });

        // $rootScope.$on('showCollection', function (event, collection) {
        //     var arr = [];
        //     postList.filter(function (post) {
        //         if (post.collections.length > 0) {
        //             angular.forEach(post.collections, function (val, key) {
        //                 val.id === collection ? arr.push(post) : false;
        //             });
        //         }
        //     });
        //     grid.posts = arr;
        // });

        grid.loadMore = function () {
            if (!grid.lastPage) {
                APIService.loadPosts('?page=' + nextPage).then(function(content) {
                    defaultContent = defaultContent.concat(content.data);
                    grid.posts = defaultContent;
                    grid.lastPage = nextPage === content.last_page;
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