(function () {
    'use strict';
    angular.module('app')
        .controller('CollectionsController', CollectionsController);

    CollectionsController.$inject = ['APIService', '$rootScope', 'angularGridInstance', '$scope', '$timeout'];
    function CollectionsController(APIService, $rootScope, angularGridInstance, $scope, $timeout) {
        var collections = this,
            defaultContent;

        collections.gridWidth = 150;
        collections.gutterSize = 10;
        collections.collectionName = '';
        collections.collectionRename = '';
        collections.selectedId = null;
        collections.selectedActive = false;
        collections.renameActive = false;
        collections.createExist = false;
        collections.renameExist = false;

        //  Get user data
        collections.userData = JSON.parse(localStorage.getItem('user-data'));
        collections.list = JSON.parse(localStorage.getItem('user-collections'));

        //  Refresh collections if user create another one
        $rootScope.$on('refreshCollections', function () {
            collections.list = JSON.parse(localStorage.getItem('user-collections'));
        });

        APIService.loadPostsByUser(collections.userData.id).then(function(content) {
            defaultContent = content.data;
            collections.posts = defaultContent;
        });

        collections.showCollection = function (collection) {
            var arr = [];
            collections.selectedId = collection;
            collections.selectedActive = true;

            defaultContent.filter(function (post) {
                if (post.collections.length > 0) {
                    angular.forEach(post.collections, function (val, key) {
                        val.id === collection ? arr.push(post) : false;
                    });
                }
            });
            angularGridInstance.gallery.refresh();
            collections.posts = arr;
        };

        collections.showAllPosts = function () {
            collections.posts = defaultContent;
            collections.selectedActive = false;
        };

        collections.createCollection = function (isValid) {
            var data;
            collections.createFormSubmitted = true;

            angular.forEach(collections.list, function (val, key) {
                if (val.name === collections.collectionName) {
                    collections.createExist = true;
                }
            });

            if (isValid && !collections.createExist && collections.collectionName.length <= 18) {
                data = {
                    user_id: collections.userData.id,
                    name: collections.collectionName
                };

                APIService.createCollection(data).then(function () {
                    collections.collectionName = '';
                    collections.createFormSubmitted = false;
                    $scope.createFormSubmitted.$setPristine();
                });
            }
        };

        collections.renameCollectionClick = function () {
            collections.renameFormSubmitted = true;
            collections.renameActive = true;
            collections.collectionRename = collections.selectedCollection;
            $timeout(function() {angular.element('.collections-rename-input').focus();},100);
        };

        collections.renameCollection = function (isValid) {
            collections.renameFormSubmitted = true;

            angular.forEach(collections.list, function (val, key) {
                if (val.name === collections.collectionRename) {
                    collections.renameExist = true;
                }
            });

            if (isValid && !collections.renameExist && collections.collectionRename.length <= 18) {
                APIService.renameCollection(collections.selectedId, {name: collections.collectionRename}).then(function () {
                    collections.renameActive = false;
                    collections.selectedCollection = collections.collectionRename;
                    collections.collectionRename = '';
                })
            }
        };

        collections.deleteCollection = function () {
            APIService.deleteCollection(collections.selectedId).then(function () {
                collections.selectedActive = false;
                collections.posts = defaultContent;
            })
        };
    }

})();