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
                            inputPassErr    : 'Неверный пароль'
                        },
                        reg: {
                            header          : 'Регистрация',
                            title           : 'Присоединяйтесь к нам',
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
                            inputSurnameErr : 'Поле фамилия должно быть от 3 до 20 символов',
                            inputEmailErr   : 'Не корректный электронный адрес',
                            inputPassErr    : 'Пароль это обязательное поле',
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
                        logOut      : 'Log Out',
                        about       : 'About'
                    },
                    modal: {
                        auth: {
                            header          : 'Authorization',
                            title           : 'Good evening! Welcome back.',
                            desc            : 'Sign into your account here:',
                            signIn          : 'Sign in',
                            forgotPass      : 'Forgotten password?',
                            orContinue      : 'Or continue with',
                            dontHaveAcc     : 'Don\'t have an account?',
                            signUp          : 'Registration',
                            inputEmail      : 'Email address',
                            inputPass       : 'Password',
                            inputEmailErr   : 'Incorrect email',
                            inputPassErr    : 'Incorrect password'
                        },
                        reg: {
                            header          : 'Registration',
                            title           : 'Join us!',
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
                            inputSurnameErr : 'The surname field can contain from 3 to 20 characters',
                            inputEmailErr   : 'The email field must have a valid email',
                            inputPassErr    : 'The password field is required',
                            inputConfPassErr: 'Password confirmation does not match',
                            inputTermsErr   : 'You must agree with the terms of use'
                        }
                    },
                    FOO: 'How are you'
                };

                return dictionary;
            }
        };
    }])
})();