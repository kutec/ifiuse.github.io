var app = angular.module("ifIUseApp",[]);
	
	app.controller('ifIUseCtrl', function($scope){
		// set the default search snippet 
		$scope.searchCode = '';
	});
	
	// Initialization
	app.controller('initCtrl', function($scope, $http) {
		$http.get('data/inits.json')
		.then(function(res){
			$scope.inits = res.data;
		});
	});
	
	// selectors
	app.controller('SelectorCtrl', function($scope, $http) {
		$http.get('data/selectors.json')
		.then(function(res){
			$scope.selectors = res.data;
		});
	});
	
	// events
	app.controller('EventsCtrl', function($scope, $http) {
		$http.get('data/events.json')
		.then(function(res){
			$scope.events = res.data;
		});
	});
	
	// styles
	app.controller('StylesCtrl', function($scope, $http) {
		$http.get('data/styles.json')
		.then(function(res){
			$scope.styles = res.data;
		});
	});
	
	$(document).ready(function(){
		setTimeout(function(){
			Prism.highlightAll();
		}, 2000);
		
		$('.search--input').on('keyup', function(){
			Prism.highlightAll();
			setTimeout(function(){
			}, 600);
		});
        
		var flAction = $('.filters--action input');
        
		flAction.on('change', function(){
			var chkChecked = flAction.filter(':checked').length,
                chkUnChecked = flAction.filter(':not(:checked)').length;
            
			if (chkChecked == 3){
				flAction.filter(':not(:checked)').prop('disabled', true);
                flAction.filter(':checked').prop('disabled', false);
			}else if(chkChecked == 2){
				flAction.filter(':checked').prop('disabled', true);
				flAction.filter(':not(:checked)').prop('disabled', false);
			}            
			setSearchPlaceholder();
		});
        
		setSearchPlaceholder();
		function setSearchPlaceholder(){
            var getTitle = [];
                flAction.filter(':checked').each(function(){
                    getTitle.push($(this).next().attr('title'));
                });
			$('.search--input').attr('placeholder','Search '+ getTitle.join(", ") +'...');
		}
		
        var flDropdown = $('.filter--dropdown input');
		flDropdown.on('change', function(){
			var chkChecked = flDropdown.filter(':checked').length;
			if(chkChecked == 1){
				flDropdown.filter(':checked').prop('disabled', true)
			}else{
				flDropdown.filter(':checked').prop('disabled', false)
			}
		});
	});
