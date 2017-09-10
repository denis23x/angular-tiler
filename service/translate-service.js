(function () {
    'use strict';
    angular.module('app').service('TranslateService', [ function () {

        // var version = 'v1';

        return {
            russianLanguage: function () {
                var dictionary = {
                    header: {
                        logoDesc    : 'проект tiler',
                        newest      : 'новые',
                        oldest      : 'старые',
                        popular     : 'популярные',
                        unpopular   : 'не популярные',
                        or          : 'или',
                        searchBy    : 'поиск по заголовкам',
                        inCategory  : 'в категории',
                        all         : 'все',
                        signIn      : 'Войти',
                        myProfile   : 'Мой профиль',
                        collections : 'Коллекции',
                        users       : 'Пользователи',
                        settings    : 'Настройки',
                        logOut      : 'Выйти',
                        about       : 'О сайте'
                    },
                    modal: {
                        auth: {
                            header          : 'Авторизация',
                            title           : 'Добрый вечер! Добро пожаловать',
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
                            inputPassErrServer  : 'Эти учетные данные не соответствуют нашим записям'
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
                            requiredField   : 'обязательное поле',
                            optionalField   : 'не обязательное поле',
                            inputName       : 'Имя',
                            inputSurname    : 'Фамилия или псевдоним',
                            inputEmail      : 'Электронный адрес',
                            inputPass       : 'Пароль',
                            inputConfPass   : 'Подтверждение пароля',
                            inputTerms      : 'Я согласен с',
                            inputTermsLink  : 'правилами пользования',
                            inputNameErr    : 'Поле имя должно быть от 2 до 10 символов',
                            inputNameErrServer    : 'Поле имя обязательно',
                            inputSurnameErr : 'Поле фамилия должно быть от 3 до 20 символов',
                            inputEmailErr   : 'Не корректный электронный адрес',
                            inputEmailErrServer   : 'уже зарегистрирован',
                            inputPassErr    : 'Длина пароля не менее 4 символов',
                            inputPassErrServer    : 'Поле пароль обязательно',
                            inputConfPassErr: 'Подтверждение пароля не совпадает',
                            inputTermsErr   : 'Вы должны согласиться с условиями пользования'
                        }
                    },
                    FOO: 'Как дела'
                };

                return dictionary;
            },
            englishLanguage: function () {
                var dictionary = {
                    header: {
                        logoDesc    : 'dev project: tiler',
                        newest      : 'the newest',
                        oldest      : 'the oldest',
                        popular     : 'most popular',
                        unpopular   : 'most unpopular',
                        or          : 'or',
                        searchBy    : 'search by title',
                        inCategory  : 'in category',
                        all         : 'all',
                        signIn      : 'Sign In',
                        myProfile   : 'My profile',
                        collections : 'Collections',
                        users       : 'Users',
                        settings    : 'Settings',
                        logOut      : 'Log Out',
                        about       : 'About'
                    },
                    modal: {
                        auth: {
                            header          : 'Authorization',
                            title           : 'Good evening! Welcome back',
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
                            requiredField   : 'required field',
                            optionalField   : 'optional field',
                            inputName       : 'Name',
                            inputSurname    : 'Surname on Nickname',
                            inputEmail      : 'Email address',
                            inputPass       : 'Password',
                            inputConfPass   : 'Confirm password',
                            inputTerms      : 'I agree with',
                            inputTermsLink  : 'terms of use',
                            inputNameErr    : 'The name field can contain from 2 to 10 characters',
                            inputNameErrServer    : 'The name field is required',
                            inputSurnameErr : 'The surname field can contain from 3 to 20 characters',
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
                        interfaceLang   : 'Interface language: ',
                        linkAvatar      : 'Set avatar by link',
                        inputName       : 'Name',
                        inputSurname    : 'Surname on Nickname',
                        inputEmail      : 'Email address',
                        inputPass       : 'Password',
                        inputConfPass   : 'Confirm password',
                        inputCurrPass   : 'Current password',
                        inputNameErr    : 'The name field can contain from 2 to 10 characters',
                        inputSurnameErr : 'The surname field can contain from 3 to 20 characters',
                        inputEmailErr   : 'The email field must have a valid email',
                        inputPassErr    : 'Password length at least 4 characters',
                        inputConfPassErr: 'Password confirmation does not match',
                        inputCurrPassErr: 'Current password is not correct',
                        enterCurrPassword: 'for update settings you must enter current password',
                        invalidData     : 'The given data was invalid',
                        updateSuccess   : 'Settings successfully updated',
                        updateSettings  : 'Update settings'
                    },
                    FOO: 'How are you'
                };

                return dictionary;
            }
        };
    }])
})();