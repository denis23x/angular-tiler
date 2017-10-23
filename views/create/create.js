(function () {
    'use strict';
    angular.module('app', ['summernote'])
        .controller('CreateController', CreateController);

    CreateController.$inject = ['$rootScope', '$timeout', 'APIService', '$http'];
    function CreateController($rootScope, $timeout, APIService, $http) {
        var create = this;

        create.userData = JSON.parse(localStorage.getItem('user-data'));
        create.collections = JSON.parse(localStorage.getItem('user-collections'));

        create.form = {
            user_id: create.userData.id,
            title: '',
            text: '',
            collection_id: [],
            category_id: [],
            preview: ''
        };

        create.utils = {
            base64Loader: '',
            linkPreview: '',
            base64Error: '',
            base64File: '',
            randomColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
        };

        // create.test = function () {
        //     cfpLoadingBar.start();
        //     cfpLoadingBar.set(0.5);
        // };

        create.forma = function () {
            console.log(create.form);
        };

        create.changeColor = function () {
            create.utils.randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        };

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
            create.collectId = function (item, collect) {
                if (collect.indexOf(item) === -1) {
                    collect.push(item);
                } else {
                    angular.forEach(collect, function(value, key) {
                        value === item ? collect.splice(key, 1) : false;
                    });
                }
                return collect;
            };

            switch(type) {
                case 'collection':
                    create.form.collection_id = create.collectId(item, create.form.collection_id);
                    break;
                case 'category':
                    create.form.category_id = create.collectId(item, create.form.category_id);
                    break;
                default:
                    break
            }
        };


        $http({
            method: 'GET',
            url: 'https://api.github.com/emojis',
            headers: {
                'Authorization': undefined
            }
        }).then(function successCallback(data) {
            create.emojis = Object.keys(data.data);
            create.emojiUrls = data.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });




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
            ],
            hint: [{
                match: /:([\-+\w]+)$/,
                search: function (keyword, callback) {
                    callback($.grep(create.emojis, function (item) {
                        return item.indexOf(keyword)  === 0;
                    }));
                },
                template: function (item) {
                    var content = create.emojiUrls[item];
                    console.log(content);
                    return '<img src="' + content + '" width="20" /> :' + item + ':';
                },
                content: function (item) {
                    var url = create.emojiUrls[item];
                    if (url) {
                        return $('<img />').attr('src', url).css('width', 20)[0];
                    }
                    return '';
                }
            },{
                mentions: ['jayden', 'sam', 'alvin', 'david'],
                match: /\B@(\w*)$/,
                search: function (keyword, callback) {
                    callback($.grep(this.mentions, function (item) {
                        return item.indexOf(keyword) == 0;
                    }));
                },
                content: function (item) {
                    return '@' + item;
                }
            },{
                words: ['apple', 'orange', 'watermelon', 'lemon'],
                match: /\b(\w{1,})$/,
                search: function (keyword, callback) {
                    callback($.grep(this.words, function (item) {
                        return item.indexOf(keyword) === 0;
                    }));
                }}
            ]
        };
    }

})();