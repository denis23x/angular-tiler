(function () {
    'use strict';
    angular.module('app')
        .controller('CollectionsController', CollectionsController);

    CollectionsController.$inject = ['APIService', '$rootScope'];
    function CollectionsController(APIService, $rootScope) {
        var collections = this,
            defaultContent;

        collections.gridWidth = 150;
        collections.gutterSize = 10;

        //  Get user data
        collections.userData = JSON.parse(localStorage.getItem('user-data'));
        collections.list = JSON.parse(localStorage.getItem('user-collections'));

        //  Refresh collections if user create another one
        $rootScope.$on('refreshCollections', function () {
            collections.list = JSON.parse(localStorage.getItem('user-collections'));
        });

        APIService.loadPostsByUser(collections.userData.id).then(function(content) {
            console.log(content);
            defaultContent = content.data;
            collections.posts = defaultContent;
        });

        //  Create collection
        collections.createCollection = function () {
            var data = {
                user_id: collections.userData.id,
                name: collections.name
            };

            APIService.createCollection(data);
        };

    }

})();