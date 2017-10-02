(function () {
    'use strict';
    angular.module('app', ['summernote'])
        .controller('CreateController', CreateController);

    CreateController.$inject = ['$rootScope', '$timeout', 'APIService'];
    function CreateController($rootScope, $timeout, APIService) {
        var create = this;

        create.userData = JSON.parse(localStorage.getItem('auth-data'));
        create.collections = JSON.parse(localStorage.getItem('user-collections'));

        create.form = {
            user_id: create.userData.id,
            title: '',
            text: '',
            collection_id: '',
            category_id: '',
            preview: ''
        };

        create.utils = {
            base64Loader: '',
            linkPreview: '',
            base64Error: '',
            base64File: '',
            randomColor: Math.floor(Math.random() * 16777215).toString(16)
        };

        // create.test = function () {
        //     cfpLoadingBar.start();
        //     cfpLoadingBar.set(0.5);
        // };

        create.forma = function () {
            console.log(create.form);
        };


        create.changeColor = function () {
            create.utils.randomColor = Math.floor(Math.random() * 16777215).toString(16);
        };
        // create.changeColor();



        // $rootScope.$on('cfpLoadingBar:started', function (event, val) {
        //     $timeout(function () {
        //         angular.element('[ui-view]#special').addClass('blur');
        //     },3000);
        // });

        //  Refresh collections if user create another one
        $rootScope.$on('refreshCollections', function () {
            create.collections = JSON.parse(localStorage.getItem('user-collections'));
        });

        APIService.loadCategories().then(function (response) {
            create.categories = response;
        });

        create.selectItems = function (item, type) {

            create.collectId = function (item) {
                var collect = [];
                if (collect.indexOf(item) === -1) {
                    collect.push(item);
                } else {
                    angular.forEach(collect, function(value, key) {
                        value === item ? delete collect[key] : false;
                    });
                }
                return collect;
            };

            switch(type) {
                case 'collection':
                    create.form.collection_id =  create.collectId(item);
                    break;
                case 'category':
                    create.form.category_id =  create.collectId(item);
                    break;
                default:

                    break
            }





        };

        create.options = {
            height: 300,
            dialogsFade: true,
            theme: 'cosmo',
            toolbar: [
                ['edit',['undo','redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link','picture','video','hr']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ]
        };
    }

})();