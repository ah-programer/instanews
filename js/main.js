$(document).ready(function(){

	$('#categorySelect').heapbox({
		'onChange':function(){
		$('.nav').removeClass('nav').addClass('nav2');
		$('.logo').removeClass('logo').addClass('logo2');
		$('footer').addClass('footer2');

		var category = document.getElementById('categorySelect').value;
		var $topStories = $('.topStories');
		var stories = "";
		var url = 'https://api.nytimes.com/svc/topstories/v2/'+category+'.json';
			url += '?' + $.param({'api-key': '4886f484aba04a0cb9c9ac120a07a0c8'});

		$topStories.empty();
		$topStories.append('<li><img class="loading" src="./assets/images/ajax-loader.gif"/></li>');

		$.ajax({
		    method: 'GET',
		    url: url
		})
		.done(function(data){
			$topStories.empty();
		  	var topStories = data.results;
		  	var i = 0;
		  	$.each(topStories, function(key, value) {
		  		if (value.multimedia.length && i < 12) {
			        stories += '<li style="background-image: url(' + value.multimedia[4].url + ')" class="li_wrapper">';
			        stories += '<a href="'+value.url+'" class="link_box">';
			        stories += '<div class="article">';
			        stories += '<div class="article_content">';
			        stories += '<h5 class="article_title">'+value.title+'</h5>'
			        stories += '<p class="article_abstract">'+value.abstract+'</p>';
			        stories += '</div>';
			        stories += '</div>';
			        stories += '</a>'
			        stories += '</li>';
			        i++;
			    }
		    });
		  	$topStories.append(stories);
		})
		.fail(function() {
			$topStories.empty();
    		$topStories.append('<li>Sorry! There was a problem, please try again.</li>');
 		});
	  	event.preventDefault();},
	});


});

