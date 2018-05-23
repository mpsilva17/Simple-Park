$(document).ready(function() {
	applySeeMore ();
	// MONTAR OS THUMBS
	$('#video-container').find('[data-url]').each(function(index, el) {
		var jThis = $(this);
		jThis.find('img').attr('src', 'https://i.ytimg.com/vi/'+jThis.data('url')+'/mqdefault.jpg')
	}).end().find('.video-list').children().click(function(event) {
		createMainVideo($(this));
	}).end().end().find('#main-video').on('click', '.toggleDesc', function(e) {
		e.preventDefault();
		var jThis = $(this),
			desc = $('#main-video').find('div.desc');
		if(jThis.hasClass('vejaMais')){
			jThis.text('Veja Menos');
			desc.animate({
			    height: desc.attr('data-originalheight')
		  	}, 200);
		}else{
			jThis.text('Veja Mais');
			if(desc.hasClass('min') ){
				desc.animate({
				    height: 80
			  	}, 200);
			}
		}
		jThis.toggleClass('vejaMais vejaMenos');
	});

	// CRIAR O MAIN VIDEO
	createMainVideo( $('.video-list').children('li:first-child') );

	
	// CLIQUE NO PLAY PRINCIPAL
	$('video').click(function(){
		if ($('i').hasClass('fa-play bigPlay')) {
			$('i.bigPlay').removeClass('fa-play bigPlay').addClass('fa-pause bigPause').hide(150);
			$('i.smallPlay').removeClass('fa-play smallPlay').addClass('fa-pause smallPause');
			$(this).get(0).play();
		}
		else{
			$('i.bigPause').removeClass('fa-pause bigPause').addClass('fa-play bigPlay').show();
					$('i.smallPause').removeClass('fa-pause smallPause').addClass('fa-play smallPlay');

			$(this).get(0).pause();
		}
	})

	// CLIQUE PLAY PEQUENO
	$('.video-controls').find('i.smallPlay').click(function(){

		$('i.bigPlay').removeClass('fa-play bigPlay').addClass('fa-pause bigPause').hide(150);
		$('i.smallPlay').removeClass('fa-play smallPlay').addClass('fa-pause smallPause');
		$('video').get(0).play();
	})

	// CLIQUE NO PAUSE PEQUENO
	$('.video-controls').find('i.smallPause').click(function(){

		$('i.smallPause').removeClass('fa-pause smallPause').addClass('fa-play smallPlay');
		$('video').get(0).pause();
	})

	// PLAY APARECE AO FIM DO VIDEO
	$('video').on('pause', function() {

	  console.log('teste')
	  $('i.bigPause').removeClass('bigPause fa-pause').addClass('bigPlay fa-play').show();
	  $('i.smallPause').removeClass('fa-pause smallPause').addClass('fa-play smallPlay').show();
	});


	// CONTROLES DO TAMANHO DO VIDEO
	var videoSize = $('.video-content').width();

	$('.video-controls').clientWidth(videoSize);


	
		

});

function applySeeMore (){
	var container = $('#main-video').find('div.desc');
	container.removeClass('min').attr('style', '').attr('data-originalheight', container.height()).next('a').remove();
	if(container.height() > 80){
		container.addClass('min').after('<a href="#" title="Veja mais" class="toggleDesc vejaMais">Veja mais</a>');
	}
}

function createMainVideo(ref) {
	$('#main-video').find('iframe, video').hide();
	
	if(ref.is('[data-url]')){
		$('#main-video').find('iframe').show().attr('src', 'https://www.youtube.com/embed/'+ref.data('url') );
		// PLAY E PAUSE NÃO APARECE NO VIDEO EXTERNO
		$('.fa-play, .fa-pause').hide();
	}else{
		// PLAY APARECE NO VIDEO INTERNO
		$('.fa-play').show();
		
		$('#main-video').find('video').show().find('source[type="video/mp4"]').attr('src', ref.data('file')+'.mp4').end()
												 .find('source[type="video/webm"]').attr('src', ref.data('file')+'.webm').end()
												 .find('source[type="video/ogg"]').attr('src', ref.data('file')+'.ogv').end()
												 [0].load();

	


	}

	$('#main-video').find('h2').text(ref.find('h3').text())
					.siblings('div.desc').html(ref.find('.d-none').html());
	
	applySeeMore ();
}