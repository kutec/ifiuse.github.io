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
		
		$('.searchCode').on('keyup', function(){
			Prism.highlightAll();
			setTimeout(function(){
			}, 600);
		});
		
		$('.filters > li:not(.filter-dropdown)').click(function(){
			var chkChecked = $(this).parent().find('input:checkbox:checked').length;
			if (chkChecked > 2){
				$(this).parent().find('input:checkbox:not(:checked)').prop('disabled', true);
                $(this).parent().find('input:checkbox:checked').prop('disabled', false);
                $('.checkboxNtf').text('You can compare only 3 scripts all together.')
                $('.checkboxNtf').fadeIn().promise().done(function() {
					$('.checkboxNtf').delay(1000).fadeOut("slow");
				});
			}else if(chkChecked <= 2){
				$(this).parent().find('input:checkbox:checked').prop('disabled', true);
				$(this).parent().find('input:checkbox:not(:checked)').prop('disabled', false);
				$('.checkboxNtf').text('You can check minimum 2 scripts all together.')
				$('.checkboxNtf').fadeIn().promise().done(function() {
					$('.checkboxNtf').delay(1000).fadeOut("slow");
				});
			}else{
				$(this).parent().find('input:checkbox:not(:checked)').prop('disabled', false);
			}
			setSearchPlaceholder();
		});
		setSearchPlaceholder();
		function setSearchPlaceholder(){
			var activeFiltersPlaceholder = $('.filters').find(' > li > input:checkbox:checked').next().text();
			$('.searchCode').attr('placeholder','Search '+activeFiltersPlaceholder.replace(/([a-z])([A-Z])/g, "$1 $2")+'...');
		}
		
		$('.filter-dropdown input').on('change', function(){
			var chkChecked = $(this).parents('.filter-dropdown').find('input:checkbox:checked').length;
			if(chkChecked == 1){
				$(this).parents('.filter-dropdown').find('input:checkbox:checked').prop('disabled', true)
			}else{
				$(this).parents('.filter-dropdown').find('input:checkbox:checked').prop('disabled', false)
			}
		});
		
		$('.close-nav').click(function(){
		     $(this).parent('nav').removeClass('active')
		});
		
		$('.navigation').click(function(){
		     $('.side-navigation').addClass('active')
		});
	});
