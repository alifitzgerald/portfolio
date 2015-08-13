var myapp = angular.module('portfolio', ['ngAnimate', 'ngTouch', 'ui.router'])

    myapp.config(function($stateProvider, $urlRouterProvider){
      
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/")
      
      $stateProvider
        .state('Code', {
            url: "/code",
            templateUrl: "port.html"
        })
          .state('route1.list', {
              url: "/list",
              templateUrl: "route1.list.html",
              controller: function($scope){
                $scope.items = ["A", "List", "Of", "Items"];
              }
          })
          
        .state('route2', {
            url: "/route2",
            templateUrl: "route2.html"
        })
          .state('route2.list', {
              url: "/list",
              templateUrl: "route2.list.html",
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
    })

myapp.controller('MainCtrl', function($scope) {
        

        $scope.categories = [
        {"id": 0, "name": "Code"},
        {"id": 1, "name": "Design"},
        {"id": 2, "name": "Marketing"},
        ];

        

        $scope.frames = [
        {"id": 0,
        "frame": "Canteen and Co.", 
        "category": "Code", 
        "url": "port.html",
        },

        {"id": 1,
         "frame": "This is Design Stuff", 
         "category": "Design",
         "url" : 'design.html',
        },

        {"id": 2, 
        "frame": "This is Marketing Stuff", 
        "category": "Marketing",
        "url": "marketing.html",
        }
        ];

        $scope.photos = [
            {"id": 0,
            "photo":"images/bowl-xtra.png",
            "name": "Canteen & Co."
            },
            {"id": 1,
            "photo":"images/dog-xtra.png",
            "name" : "Swag Dog Walking"   
            },
            {"id": 2,
            "photo":"images/rbggame-xtra.png" ,
            "name" : "Notorious RBGGame"  
            }
        ];
  


        


        function setCurrentCategory(category) {
            $scope.currentCategory = category;
        }

        function isCurrentCategory(category) {
            return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        }


        function setCurrentPhoto(photo) {
            $scope.currentPhoto = photo;
        }

        function isCurrentPhoto(photo) {
            return $scope.currentPhoto !== null && photo.name === $scope.currentPhoto.name;
        }


        $scope.currentCategory = null; 
        $scope.setCurrentCategory = setCurrentCategory;
        $scope.isCurrentCategory = isCurrentCategory;

        $scope.currentPhoto = null; 
        $scope.setCurrentPhoto = setCurrentPhoto;
        $scope.isCurrentPhoto = isCurrentPhoto;


        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function (photo) {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.photos.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function (photo) {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.photos.length - 1;
        };
    })
    myapp.animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.3, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.3, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    })
;


