var app = angular.module('MuppetApp', ['ngMaterial', 'ngMessages', 'ngMdIcons', 'ngRoute', 'ngResource', 'ngFacebook', 'angularFileUpload']);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);
	$routeProvider.
  when('/', {
    templateUrl: 'partials/selfie.html',
    controller: 'AppController'
  }).
	when('/selfie', {
		templateUrl: 'partials/selfie.html',
		controller: 'AppController'
	}).
	when('/selfie/el-pitbull', {
		templateUrl: 'partials/player.html',
		controller: 'AppController'
	}).
  when('/share/:imagen/', {
    templateUrl: 'partials/share.html',
    controller: 'sharer'
  }).
  when('/caminos', {
    templateUrl: 'partials/caminos.html',
    controller: 'AppCtrl'
  }).
  when('/caminos/matematicas', {
    templateUrl: 'partials/cursos-camino.html',
    controller: 'AppCtrl'
  }).
  when('/cursos', {
    templateUrl: 'partials/todos-los-cursos.html',
    controller: 'AppCtrl'
  }).
  when('/configuracion', {
    templateUrl: 'partials/configuracion.html',
    controller: 'AppCtrl'
  })/*.
	otherwise({redirectTo: '/',
		templateUrl: 'partials/404.html',
		controller: 'error',
	})*/;
});

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red', {
      'default': '700', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': '500' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('red', {
      'default': '900' // use shade 200 for default, and keep all other shades the same
    });
});

app.config(function($facebookProvider) {
  $facebookProvider.setAppId('1612448682327126');
});

app.run( function($rootScope) {
  // Carga asincrona de SDK de Facebook
  (function(){
  // If we've already installed the SDK, we're done
  if (document.getElementById('facebook-jssdk'))
    {return;
  }
  // Get the first script element, which we'll use to find the parent node
  var firstScriptElement = document.getElementsByTagName('script')[0];
  
  // Create a new script element and set its id
  var facebookJS = document.createElement('script'); 
  facebookJS.id = 'facebook-jssdk';

  // Set the new script's source to the source of the Facebook JS SDK
  facebookJS.src = '//connect.facebook.net/es_LA/all.js';

  // Insert the Facebook JS SDK into the DOM
  firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
  }());
});

app.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet){
  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
  $scope.showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'partials/bottom-sheet-grid-template.html',
      controller: 'GridBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
})

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})

app.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})


/*factoria de consulta de datos*/
app.factory('myService', function($http) {
  return {
    getFoo: function() {
      
      var datosCuenta = {
        "video_id": '1'
      };

      return $http.post("server/userLoadDataApplication.php", datosCuenta).then(function(result) {
        return result.data;
      });
    }
  }
});

app.controller('sharer', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
      $scope.imagen = $routeParams.imagen;
      /*var meta = document.createElement('meta');
      var ogUrl = window.location.hash;
      var ogImage = ogUrl.substring(8, ogUrl.length-1);
      var metaContent = 'http://ec2-54-173-219-172.compute-1.amazonaws.com/selfie-america/server/uploads/' + ogImage;
      meta.setAttribute('property', 'og:image');
      meta.setAttribute('content', metaContent);
      document.getElementsByTagName('head')[0].appendChild(meta);*/
    }
]);

app.controller('AppController', ['$scope','$mdSidenav', 'FileUploader', '$http', '$location', '$facebook', '$mdDialog',
  function($scope, $mdSidenav, FileUploader, $http, $location, $facebook, $mdDialog){
  
  var uploader = $scope.uploader = new FileUploader({
    url: 'server/upload.php'
  });

  // FILTERS

  uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });

  $scope.toggleSidenav = toggleSidenav;

  function toggleSidenav(name) {
    $mdSidenav(name).toggle();
  }

  $scope.isLoggedIn = false;
  $scope.login = function() {
    $facebook.login().then(function() {
      refresh();
//      window.location.href = 'http://ec2-54-173-219-172.compute-1.amazonaws.com/selfie-america/#/selfie' /*pagina de inicio aplicacion*/
    });
  }

  function refresh() {
    $facebook.api("/me").then( 
      function(response) {

        $scope.datosUsuario = {
          "id": response.id,
          "nombre": response.first_name,
          "apellido": response.last_name,
          "nombreCompleto": response.name,
          "resena": response.education,
          "email": response.email,
          "tipo": "facebook"
        };

        $scope.isLoggedIn = true;
      
      $scope.usuarioNombre = $scope.datosUsuario.nombre;
      $scope.usuarioApellido = $scope.datosUsuario.apellido;
      $scope.usuarioEmail = $scope.datosUsuario.email;
    });
  }
  refresh();

  $scope.alert = '';
  
  $scope.cerrarSession = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('Estás seguro que quieres cerrar tu sessión?')
      .ariaLabel('Buen día')
      .ok('Si, quiero salir!')
      .cancel('Cancelar')
      .targetEvent(ev);

      $mdDialog.show(confirm).then(function() {
        $scope.alert = 'Nos vemos mas tarde.';
        retorna();
        function retorna() {
          $scope.datosUsuario = {
            "id": '',
            "nombre": '',
            "apellido": '',
            "nombreCompleto": '',
            "resena": '',
            "email": '',
            "tipo": ''
          };
          $facebook.logout();
          $scope.isLoggedIn = false;
          console.log("la sesion esta en " + $scope.isLoggedIn);
      //$scope.logout = function() {
      //$facebook.logout().then(function() {
      //  retorna();
      //});
      //}
      //pegar retorna
        //window.location.href = 'http://ec2-54-173-219-172.compute-1.amazonaws.com/selfie-america/#/' /* reemplazar esta url por el sitio publico */
      }
      retorna();
    }, function() {
      $scope.alert = 'Haz decidido quedarte, genial!.';
    });
    refresh();
    console.log("se ha ejecutado refresh()")
  };

  $scope.guardar = function(){
    html2canvas(document.getElementById('markup'), {
      onrendered: function(canvas) {
        $scope.dataURL = canvas.toDataURL();
        $http.post('server/uploadCanvas.php', {'code': $scope.dataURL}).success(function(data, status){
          $scope.status = status;
          $scope.data = data;
          $scope.foto = data;
          $scope.oky = data.photoUrl;
          $scope.share = true;
        }).error(function(data, status){
          $scope.data = data || 'ha fallado';
          $scope.status = status;
        });
      }
    });
  }

  $scope.go = function(path){
    $location.path(path);
  };

  $scope.compartir = function(post, oky){
    FB.ui(
    {
        method: 'feed',
        name: 'Ya tengo el Look de Chile',
        link: 'http://www.ellookdechile.cl/',
        picture: 'http://ec2-54-173-219-172.compute-1.amazonaws.com/selfie-america/server/uploads/' + $scope.oky,
        caption: ' ',
        description: 'Entra a El Look de Chile y ponte el peinado de tu ídolo de la Selección Chilena',
        message: ''
    });
  }

  // CALLBACKS

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
      uploader.uploadAll();
  };
  uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers, $sce) {
      console.info('onCompleteItem', fileItem, response, status, headers);
      $scope.fotoJugador = response;
      $scope.valid = true;
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };
    console.info('uploader', uploader);
}]);

app.directive('ngThumb', ['$window', function($window) {
  var helper = {
    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
    isFile: function(item) {
      return angular.isObject(item) && item instanceof $window.File;
    },
    isImage: function(file) {
      var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  };

  return {
    restrict: 'A',
    template: '<canvas id="selfieUser"/>',
    link: function(scope, element, attributes) {
      if (!helper.support) return;

      var params = scope.$eval(attributes.ngThumb);

      if (!helper.isFile(params.file)) return;
      if (!helper.isImage(params.file)) return;

      var canvas = element.find('canvas');
      var reader = new FileReader();

      reader.onload = onLoadFile;
      reader.readAsDataURL(params.file);

      function onLoadFile(event) {
        var img = new Image();
        img.onload = onLoadImage;
        img.src = event.target.result;
      }

      function onLoadImage() {
        var width = params.width || this.width / this.height * params.height;
        var height = params.height || this.height / this.width * params.width;
        canvas.attr({ width: width, height: height });
        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
      }
    }
  };
}]);