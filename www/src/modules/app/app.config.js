'use strict';

module.exports = /*@ngInject*/
  function config($locationProvider, $httpProvider, $mdThemingProvider) {
    $locationProvider.html5Mode(true);

    $mdThemingProvider
      .theme('default')
      .primaryPalette('grey', {
        'default': '600'
      })
      .accentPalette('teal', {
        'default': '500'
      })
      .warnPalette('defaultPrimary');

    $mdThemingProvider.theme('dark', 'default')
      .primaryPalette('defaultPrimary')
      .dark();

    $mdThemingProvider.theme('grey', 'default')
      .primaryPalette('grey');

    $mdThemingProvider.theme('custom', 'default')
      .primaryPalette('defaultPrimary', {
        'hue-1': '50'
      });

    $mdThemingProvider.definePalette('defaultPrimary', {
      '50': '#FFFFFF',
      '100': 'rgb(255, 198, 197)',
      '200': '#E75753',
      '300': '#E75753',
      '400': '#E75753',
      '500': '#E75753',
      '600': '#E75753',
      '700': '#E75753',
      '800': '#E75753',
      '900': '#E75753',
      'A100': '#E75753',
      'A200': '#E75753',
      'A400': '#E75753',
      'A700': '#E75753'
    });

    //HTTP
    $httpProvider.defaults.headers.common.Accept = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
    $httpProvider.defaults.withCredentials = true;

    var restConfig = {
      baseUrl: "http://localhost:8080" || ''
    };

  };
