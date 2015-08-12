angular.module('portfolio', ["ngAnimate", "ngTouch"])


.controller('MainCtrl', function($scope) {
        

        $scope.categories = [
        {"id": 0, "name": "Code"},
        {"id": 1, "name": "Design"},
        {"id": 2, "name": "Marketing"}
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
            "photo":"images/canteen.png"
            },
            {"id": 1,
            "photo":"images/dog.png"   
            }
        ];
  


        


        function setCurrentCategory(category) {
            $scope.currentCategory = category;
        }

        function isCurrentCategory(category) {
            return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        }


        $scope.currentCategory = null; 
        $scope.setCurrentCategory = setCurrentCategory;
        $scope.isCurrentCategory = isCurrentCategory;


        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.photos.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.photos.length - 1;
        };
    })
    .animation('.slide-animation', function () {
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


