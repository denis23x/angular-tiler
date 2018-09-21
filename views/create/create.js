(function () {
    'use strict';
    angular.module('app', ['summernote', 'ngTagsInput'])
        .controller('CreateController', CreateController);

    CreateController.$inject = ['$rootScope', 'APIService', '$http', '$q', '$state'];
    function CreateController($rootScope, APIService, $http, $q, $state) {
        var create = this;

        create.userData = JSON.parse(localStorage.getItem('user-data'));
        create.collections = JSON.parse(localStorage.getItem('user-collections'));

            create.form = {
            user_id: create.userData.id,
            title: '',
            // title: 'Default text',
            // text: '',
            // text:
            //     '<p><span class="text-success" onclick="$(\'#summernote\').summernote(\'code\', \'\');">Click here to clear</span></p>' +
            //     '<p></p>' +
            //     '<p><span style="font-size: 1rem;">Tiler editor a super cool WYSIWYG Text Editor directive for AngularJS</span></p>' +
            //     '<hr>' +
            //     '<p><span style="font-size: 1rem;">Features:</span></p>' +
            //     '<ul>' +
            //     '<li>Type <b>@</b> for link user <a class="user-call-link" href="http://tiler/users/1">@Admin</a></li>' +
            //     '<li>Type <b>:</b> for Emodji <img src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f638.png?v7" class="img-emoji"></li>' +
            //     '<li>Paste links, images and videos by<b> Ctrl+V</b></li>' +
            //     '</ul>' +
            //     '<p><i>Code at GitHub: <a href="https://github.com/DAMAGEx1/tiler" target="_blank">Here</a></i></p>',
            text: `
<ul style="font-weight: 200; list-style-type: none; padding-left: 1rem; color: rgba(200, 200, 200, 1);">
<li><br></li>
<li><span>Enter<span style="font-weight: bolder; font-size: 16px; color: rgb(156, 156, 148);"> @ </span>and start typing for mark user <a class="user-call-link" href="http://tiler/users/1">@Admin</a></span></li>
<li><span>Enter<span style="font-weight: bolder; font-size: 16px; color: rgb(156, 156, 148);"> : </span>and start typing to get Emodji <img src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f638.png?v7" class="img-emoji"></span></li>
<li><span>Enter<span style="font-weight: bolder; font-size: 16px; color: rgb(156, 156, 148);"> # </span> for the <a class="user-call-link" href="http://tiler/users/1"> #tag </a></span></li>
<li><br></li>
<li><span>Paste media content by<span style="font-weight: bolder; color: rgb(156, 156, 148);"> Ctrl+V</span></span></li>
<li><br></li>
</ul>
`,
            collections: [],
            categories: [],
            tags: [],
            published: 1,
            preview: ''
        };

        create.utils = {
            base64Loader: '',
            base64Link: '',
            base64Error: '',
            base64File: '',
            plainText: '',
            tagsLimit: 10,
            tagsError: '',
            tags: [],
            formSubmitted: false,
            randomColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
        };

        create.postPublish = function (isValid) {
            var element = angular.element('.base64-image-wrapper.d-block');
            create.utils.formSubmitted = true;

            function sendForm () {
                if (isValid) {
                    APIService.createPost(create.form).then(function () {
                        $state.go('home');
                    });
                } else {
                    angular.element('html, body').animate({scrollTop: 0}, 200);
                }
            }

            if (create.form.preview === '') {
                html2canvas(element.get(0),{
                    logging: false,
                    scale: 2,
                    // x: element.get(0).getBoundingClientRect().left + 2,
                }).then(function (response) {
                    create.form.preview = response.toDataURL("image/jpeg");
                    sendForm ();
                });
            } else {
                sendForm ();
            }
        };

        create.changeColor = function () {
            create.utils.randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        };

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
                    create.form.collections = create.collectId(item, create.form.collections);
                    break;
                case 'category':
                    create.form.categories = create.collectId(item, create.form.categories);
                    break;
                default:
                    break
            }
        };

        angular.element('[data-toggle="tooltip"]').tooltip();






















































        var resetButton = function (context) {
            var ui = $.summernote.ui;
            var button = ui.button({
                contents: '<i class="note-icon-reset"></i>',
                tooltip: 'Reset',
                click: function () {
                    angular.element("#summernote").summernote('reset');
                }
            });
            return button.render();
        };

        var fileButton = function (context) {
            var ui = $.summernote.ui;
            var button = ui.button({
                contents: '<i class="note-icon-picture"></i>',
                tooltip: 'Picture',
                click: function () {
                    document.getElementById('summernoteInputFileImg').click();
                    angular.element('#summernoteInputFileImg').one('change', function() {
                        if (angular.element(this).length !== 0) {
                            var deferred = $q.defer(),
                                reader = new FileReader(),
                                file = event.currentTarget.files[0],
                                _URL = window.URL || window.webkitURL,
                                nodeImg = document.createElement('img'),
                                image = new Image();

                            image.onload = function () {
                                if (this.width < 200 || this.height < 300) {
                                    alert('ERROR: Minimal size: 200x300, uploaded image: ' + this.width + 'x' + this.height);
                                    return false;
                                } else  {
                                    reader.onload = function(file) {deferred.resolve(file.target.result);};
                                    reader.onerror = function() {deferred.reject(file);};
                                    reader.readAsDataURL(file);

                                    deferred.promise.then(function (base64) {
                                        nodeImg.className = 'img-fluid';
                                        nodeImg.setAttribute('src', base64);
                                        angular.element("#summernote").summernote('insertNode', nodeImg);
                                        angular.element('#summernoteInputFileImg').val(null);
                                    });
                                }
                            };
                            image.src = _URL.createObjectURL(file);
                        }
                    });
                }
            });
            return button.render();
        };

        var fontStyleButton = function (context) {
            var ui = $.summernote.ui;
            var button = ui.buttonGroup([
                ui.button({
                    contents: '<i class="note-icon-style"></i>',
                    className:  'dropdown-toggle',
                    tooltip: 'Font Style',
                    data: {
                        toggle: 'dropdown'
                    }
                }),
                ui.dropdown({
                    items: [
                        '<i class=note-icon-bold></i>Bold',
                        '<i class=note-icon-italic></i>Italic',
                        '<i class=note-icon-underline></i>Underline',
                        '<i class=note-icon-strikethrough></i>Strikethrough',
                        '<hr class=my-0>',
                        'Superscript <sup>sup</sup>',
                        'Subscript <sub>sub</sub>'
                    ],
                    callback: function (items) {
                        $(items).find('a').on('click', function (e) {
                            console.log(e);
                            switch(e.currentTarget.text.toString()) {
                                case 'Bold':
                                    context.invoke('editor.bold');
                                    break;
                                case 'Italic':
                                    context.invoke('editor.italic');
                                    break;
                                case 'Underline':
                                    context.invoke('editor.underline');
                                    break;
                                case 'Strikethrough':
                                    context.invoke('editor.strikethrough');
                                    break;
                                case 'Superscript sup':
                                    context.invoke('editor.superscript');
                                    break;
                                case 'Subscript sub':
                                    context.invoke('editor.subscript');
                                    break;
                            }
                        });
                    }
                })
            ]);
            return button.render();
        };

        var paragraphButton = function (context) {
            var ui = $.summernote.ui;
            var button = ui.buttonGroup([
                ui.button({
                    contents: '<i class=note-icon-align-left></i>',
                    className:  'dropdown-toggle',
                    tooltip: 'Align + List',
                    data: {
                        toggle: 'dropdown'
                    }
                }),
                ui.dropdown({
                    items: [
                        '<i class=note-icon-minus></i>Underline',
                        '<hr class=my-0>',
                        '<i class=note-icon-align-left></i>Left',
                        '<i class=note-icon-align-center></i>Center',
                        '<i class=note-icon-align-right></i>Right',
                        '<hr class=my-0>',
                        '<i class=note-icon-orderedlist></i>Ordered list',
                        '<i class=note-icon-unorderedlist></i>Unordered list'
                    ],
                    callback: function (items) {
                        $(items).find('a').on('click', function (e) {
                            switch(e.currentTarget.text.toString()) {
                                case 'Underline':
                                    var node = document.createElement('hr');
                                    context.invoke('editor.insertNode',node);
                                    break;
                                case 'Left':
                                    context.invoke('editor.justifyLeft');
                                    break;
                                case 'Center':
                                    context.invoke('editor.justifyCenter');
                                    break;
                                case 'Right':
                                    context.invoke('editor.justifyRight');
                                    break;
                                case 'Ordered list':
                                    context.invoke('editor.insertOrderedList');
                                    break;
                                case 'Unordered list':
                                    context.invoke('editor.insertUnorderedList');
                                    break;
                            }
                        });
                    }
                })
            ]);
            return button.render();
        };

        create.options = {
            // height: 300,
            minHeight: 100,
            // airMode: true,
            disableResizeEditor: true,
            dialogsFade: true,
            placeholder: 'Write your best story',
            theme: 'cosmo',
            styleTags: ['blockquote', 'pre', 'h1', 'h6'],
            toolbar: [
                // ['fontsize', ['fontsize']],
                // ['color', ['color']],
                ['media', ['fileButton', 'link', 'fontStyleButton']],
                // ['font', ['fontStyleButton', 'clear']],
                // ['other', ['paragraphButton', 'table', 'codeview']]
                // ['other', ['codeview']]
            ],
            buttons: {
                fontStyleButton: fontStyleButton,
                paragraphButton: paragraphButton,
                fileButton: fileButton,
                resetButton: resetButton
            },
            callbacks : {
                onPaste : function (e)  {
                    var clipboardData = e.clipboardData || e.originalEvent.clipboardData || window.clipboardData,
                        pastedData = clipboardData.getData('text');

                    function youtubeParser(url) {
                        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
                            match = url.match(regExp);
                        return (match&&match[7].length == 11) ? match[7] : false;
                    }

                    function imageParser(url) {
                        var regExp = /^.*(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg)).*/,
                            match = url.match(regExp);
                        return match ? url : false;
                    }

                    var nodeVideo = document.createElement('iframe'),
                        responsive = document.createElement('p');

                    responsive.className = 'embed-responsive embed-responsive-16by9';
                    nodeVideo.className = 'note-video-clip embed-responsive-item';
                    nodeVideo.setAttribute('src', 'https://www.youtube.com/embed/' + youtubeParser(pastedData));
                    nodeVideo.setAttribute('frameborder', '0');
                    nodeVideo.setAttribute('width', '640');
                    nodeVideo.setAttribute('height', '360');
                    responsive.innerHTML = nodeVideo.outerHTML;

                    var nodeImg = document.createElement('img');
                    nodeImg.setAttribute('src', pastedData);
                    nodeImg.className = 'img-fluid';

                    if (youtubeParser(pastedData)) {
                        e.preventDefault();
                        angular.element("#summernote").summernote('insertNode', responsive);
                    }

                    if (imageParser(pastedData)) {
                        e.preventDefault();
                        angular.element("#summernote").summernote('insertNode', nodeImg);
                    }
                },
                onFocus: function(e) {
                    angular.element('.summernote-wrapper').addClass('is-active');
                    angular.element('.note-placeholder').fadeOut(200);
                    if (create.utils.plainText.length < 40 && create.utils.plainText.length !== 0 || angular.element('.summernote-wrapper').hasClass('is-invalid')) {
                        angular.element('.summernote-wrapper').addClass('is-invalid-shadow');
                    }
                },
                onBlur: function(e) {
                    angular.element('.summernote-wrapper').removeClass('is-active');
                    if (create.utils.plainText.length === 0) {
                        angular.element('.note-placeholder').fadeIn(200);
                    }
                    if (angular.element('.summernote-wrapper').hasClass('is-invalid-shadow')) {
                        angular.element('.summernote-wrapper').removeClass('is-invalid-shadow');
                    }
                },
                onChange : function (contents) {
                    create.utils.plainText = angular.element(angular.element("#summernote").summernote("code")).text();
                    if (create.utils.plainText.length < 40 && create.utils.plainText.length !== 0) {
                        angular.element('.summernote-wrapper').addClass('is-invalid-shadow');
                    } else {
                        angular.element('.summernote-wrapper').removeClass('is-invalid-shadow');
                    }
                },
                onInit : function () {
                    create.utils.plainText = angular.element(angular.element("#summernote").summernote("code")).text();
                    $http({method:'GET',url:'https://api.github.com/emojis',headers:{'Authorization':undefined}}).then(function (data) {
                        create.emojis = Object.keys(data.data);
                        create.emojiUrls = data.data;
                    });
                    $http({method:'GET',url:'http://api.tiler.com/api/v1/users'}).then(function (data) {
                        create.users = data.data;
                    });
                }
            },
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
                    return '<img src="' + content + '" class="img-emoji" /> :' + item + ':';
                },
                content: function (item) {
                    var url = create.emojiUrls[item];
                    if (url) {
                        return $('<img />').attr('src', url).addClass('img-emoji')[0];
                    }
                    return '';
                }
            },{
                match: /\B@(\w*)$/,
                search: function (keyword, callback) {
                    callback($.grep(create.users, function (val) {
                        return val.name.toLowerCase().indexOf(keyword.toLowerCase()) == 0;
                    }));
                },
                template: function (item) { return item.name; },
                content: function (item) {
                    return $('<a class="user-call-link" href="http://tiler/users/' + item.id + '">@' + item.name + '</a>')[0];
                }
            }
            ]
        };
    }

})();