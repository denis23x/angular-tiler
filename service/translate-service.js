(function () {
    'use strict';
    angular.module('app').service('TranslateService', [ function () {

        // var version = 'v1';

        return {
            russianLanguage: function () {
                var dictionary = {
                    header: {
                        logoDesc    : 'tiler',
                        newest      : 'новые',
                        oldest      : 'старые',
                        popular     : 'популярные',
                        unpopular   : 'не популярные',
                        searchBy    : 'Поиск по заголовкам',
                        sort        : 'Сортировка',
                        inCategory  : 'Категории',
                        add         : 'Добавить',
                        signIn      : 'Войти',
                        home        : 'Главная',
                        myProfile   : 'Мой профиль',
                        collections : 'Коллекции',
                        users       : 'Пользователи',
                        settings    : 'Настройки',
                        logOut      : 'Выйти',
                        about       : 'О сайте'
                    },
                    grid: {
                        notFoundTitle   : 'не найдено',
                        notFoundDesc    : 'По вашему запросу ничего не найдено, попробуйте изменить категорию поиска, или',
                        notFoundLink    : 'создайте интересный вам пост',
                        notFoundEnd     : 'самостоятельно'
                    },
                    modal: {
                        auth: {
                            header          : 'Авторизация',
                            title           : 'Добро пожаловать',
                            desc            : 'Войдите в свой аккаунт здесь:',
                            signIn          : 'Войти',
                            forgotPass      : 'Забыли пароль?',
                            orContinue      : 'Или авторизируйтесь',
                            dontHaveAcc     : 'Нет аккаунта?',
                            signUp          : 'Регистрация',
                            inputEmail      : 'Электронный адрес',
                            inputPass       : 'Пароль',
                            inputEmailErr   : 'Неверный адрес почты',
                            inputPassErr    : 'Длина пароля не менее 4 символов',
                            inputPassErrServer  : 'Эти данные не соответствуют нашим записям'
                        },
                        reg: {
                            header          : 'Регистрация',
                            title           : 'Присоединяйтесь к нам',
                            isFree          : 'Регистрация бесплатна',
                            canChange       : 'Вы сможете изменить аватар после регистрации',
                            desc            : 'Введите информацию об учетной записи:',
                            signUp          : 'Зарегистрироваться',
                            getBack         : 'Вернуться к',
                            getBackLink     : 'авторизации',
                            requiredFields  : 'все поля обязательны',
                            inputName       : 'Имя',
                            inputEmail      : 'Электронный адрес',
                            inputPass       : 'Пароль',
                            inputConfPass   : 'Подтверждение пароля',
                            inputTerms      : 'Я согласен с',
                            inputTermsLink  : 'правилами пользования',
                            inputNameErr    : 'Поле имя должно быть от 2 до 10 символов',
                            inputNameErrServer    : 'Поле имя обязательно',
                            inputEmailErr   : 'Не корректный электронный адрес',
                            inputEmailErrServer   : 'уже зарегистрирован',
                            inputPassErr    : 'Длина пароля не менее 4 символов',
                            inputPassErrServer    : 'Поле пароль обязательно',
                            inputConfPassErr: 'Подтверждение пароля не совпадает',
                            inputTermsErr   : 'Вы должны согласиться с условиями пользования'
                        }
                    },
                    settings: {
                        header          : 'Настройки аккаунта',
                        tabGeneral      : 'Общее',
                        tabPrivacy      : 'Конфиденциальность',
                        titleAvatar     : 'Аватар пользователя',
                        titleRegion     : 'Регион',
                        titleLanguage   : 'Язык интерфейса',
                        titleName       : 'Имя',
                        titleSurname    : 'Фамилия',
                        titleEmail      : 'Почта',
                        titlePassword   : 'Пароль',
                        titleConfirmPass: 'Подтверждение пароля',
                        titleApply      : 'Применить настройки',
                        descAvatar      : 'Изменить изображение пользователя',
                        descRegion      : 'Изменяет результаты поиска по регионам',
                        descLanguage    : 'Можно определить язык сайта',
                        descName        : 'Изменить имя пользователя учетной записи',
                        descSurname     : 'Можно указать собственную фамилию или псевдоним',
                        descEmail       : 'Изменить адрес электронной почты',
                        descPassword    : 'Измените свой пароль',
                        descConfirmPass : 'Введите свой пароль еще раз',
                        descApply       : 'для обновления настроек необходимо ввести текущий пароль',
                        linkAvatar      : 'Вставить ссылку',
                        fileAvatar      : 'Выбрать файл',
                        inputName       : 'Имя',
                        inputSurname    : 'Фамилия или псевдоним',
                        inputEmail      : 'Адрес электронной почты',
                        inputPass       : 'Пароль',
                        inputConfPass   : 'Подтверждение пароля',
                        inputCurrPass   : 'Текущий пароль',
                        inputNameErr    : 'Поле имя должно быть от 2 до 10 символов',
                        inputSurnameErr : 'Поле фамилия должно быть от 3 до 20 символов',
                        inputEmailErr   : 'Не корректный электронный адрес',
                        inputPassErr    : 'Длина пароля не менее 4 символов',
                        inputConfPassErr: 'Пароли не совпадают',
                        inputCurrPassErr: 'Длина пароля не менее 4 символов',
                        updateError     : 'Ошибка обновления',
                        updateSuccess   : 'Настройки успешно обновлены',
                        updateSettings  : 'Обновить'
                    },
                    FOO: 'Как дела'
                };

                return dictionary;
            },
            englishLanguage: function () {
                var dictionary = {
                    header: {
                        logoDesc    : 'tiler',
                        newest      : 'the newest',
                        oldest      : 'the oldest',
                        popular     : 'most popular',
                        unpopular   : 'most unpopular',
                        searchBy    : 'Search by title',
                        sort        : 'Sorting',
                        inCategory  : 'Category',
                        add         : 'Add',
                        signIn      : 'Sign In',
                        home        : 'Home',
                        myProfile   : 'My profile',
                        collections : 'Collections',
                        users       : 'Users',
                        settings    : 'Settings',
                        logOut      : 'Log Out',
                        about       : 'About'
                    },
                    grid: {
                        notFoundTitle   : 'not found',
                        notFoundDesc    : 'Nothing found on your request, try to change the search category, or',
                        notFoundLink    : 'create an interesting post',
                        notFoundEnd     : 'yourself'
                    },
                    modal: {
                        auth: {
                            header          : 'Authorization',
                            title           : 'Welcome back',
                            desc            : 'Sign into your account here:',
                            signIn          : 'Sign in',
                            forgotPass      : 'Forgotten password?',
                            orContinue      : 'Or continue with',
                            dontHaveAcc     : 'Don\'t have an account?',
                            signUp          : 'Registration',
                            inputEmail      : 'Email address',
                            inputPass       : 'Password',
                            inputEmailErr   : 'Is not a valid email',
                            inputPassErr    : 'Password length at least 4 characters',
                            inputPassErrServer  : 'These credentials do not match our records'
                        },
                        reg: {
                            header          : 'Registration',
                            title           : 'Join us!',
                            isFree          : 'Registration is free',
                            canChange       : 'you can change default avatar after registration',
                            desc            : 'Enter your account information here:',
                            signUp          : 'Sign Up',
                            getBack         : 'Get back to',
                            getBackLink     : 'authorization.',
                            requiredFields  : 'all fields are required',
                            inputName       : 'Name',
                            inputEmail      : 'Email address',
                            inputPass       : 'Password',
                            inputConfPass   : 'Confirm password',
                            inputTerms      : 'I agree with',
                            inputTermsLink  : 'terms of use',
                            inputNameErr    : 'The name field can contain from 2 to 10 characters',
                            inputNameErrServer    : 'The name field is required',
                            inputEmailErr   : 'The email field must have a valid email',
                            inputEmailErrServer   : 'has already been taken.',
                            inputPassErr    : 'Password length at least 4 characters',
                            inputPassErrServer    : 'The password field is required',
                            inputConfPassErr: 'Password confirmation does not match',
                            inputTermsErr   : 'You must agree with the terms of use'
                        }
                    },
                    settings: {
                        header          : 'Account settings',
                        tabGeneral      : 'General',
                        tabPrivacy      : 'Privacy',
                        titleAvatar     : 'User avatar',
                        titleRegion     : 'Region',
                        titleLanguage   : 'Interface language',
                        titleName       : 'Name',
                        titleSurname    : 'Surname',
                        titleEmail      : 'Email',
                        titlePassword   : 'Password',
                        titleConfirmPass: 'Confirm password',
                        titleApply      : 'Apply settings',
                        descAvatar      : 'Edit user image',
                        descRegion      : 'Changes search results to be region specific',
                        descLanguage    : 'You can define the site language',
                        descName        : 'Change username of account',
                        descSurname     : 'You can specify self surname or nickname',
                        descEmail       : 'Change authorization email',
                        descPassword    : 'Change your password',
                        descConfirmPass : 'Please enter your password again',
                        descApply       : 'for update settings you must enter current password',
                        linkAvatar      : 'Insert link',
                        fileAvatar      : 'Select file',
                        inputName       : 'Name',
                        inputSurname    : 'Surname or nickname',
                        inputEmail      : 'Email address',
                        inputPass       : 'Password',
                        inputConfPass   : 'Confirm password',
                        inputCurrPass   : 'Current password',
                        inputNameErr    : 'The name field can contain from 2 to 10 characters',
                        inputSurnameErr : 'The surname field can contain from 3 to 20 characters',
                        inputEmailErr   : 'The email field must have a valid email',
                        inputPassErr    : 'Password length at least 4 characters',
                        inputConfPassErr: 'Password confirmation does not match',
                        inputCurrPassErr: 'Password length at least 4 characters',
                        updateError     : 'Update error',
                        updateSuccess   : 'Settings successfully updated',
                        updateSettings  : 'Update'
                    },
                    FOO: 'How are you'
                };

                return dictionary;
            }
        };
    }])
})();