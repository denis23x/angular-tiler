<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/">
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>tiler develop</title>

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="node_modules/mdi/css/materialdesignicons.min.css" media="all" type="text/css" />
    <link rel="stylesheet" href="node_modules/animate.css/animate.min.css">
<!--    <link rel="stylesheet" href="node_modules/angular-loading-bar/build/loading-bar.min.css">-->

    <script src="node_modules/jquery/dist/jquery.js"></script>

    <script src="node_modules/angular/angular.js"></script>
    <script src="node_modules/@uirouter/angularjs/release/angular-ui-router.js"></script>
    <script src="node_modules/angular-animate/angular-animate.js"></script>
    <script src="node_modules/angular-sanitize/angular-sanitize.min.js"></script>
    <script src="node_modules/angulargrid/angulargrid.min.js"></script>

    <script src="node_modules/popper.js/dist/umd/popper.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="node_modules/moment/min/moment.min.js"></script>

    <script src="node_modules/angular-translate/dist/angular-translate.min.js"></script>

    <script src="node_modules/oclazyload/dist/ocLazyLoad.min.js"></script>

<!--    <script src="node_modules/angular-loading-bar/build/loading-bar.min.js"></script>-->


</head>

<body ng-app="app" class="pr-0">
    <div ng-controller="MainController as main">
        <header-component></header-component>
        <div ui-view></div>
    </div>
</body>

<script src="js/app.js"></script>

<script src="service/common-service.js"></script>
<script src="service/api-service.js"></script>
<script src="service/environment-service.js"></script>
<script src="service/router-service.js"></script>
<script src="service/translate-service.js"></script>
<script src="service/auth-service.js"></script>

<script src="components/header/header.js"></script>
<script src="components/grid/grid.js"></script>
<script src="components/modal/modal.js"></script>

<script src="directives/material-ripple-directive.js"></script>
<script src="directives/image-base64-directive.js"></script>

</html>