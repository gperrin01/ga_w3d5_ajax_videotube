$(document).ready(function() {
  getVideos();
})

var allGenres = [];

function getVideos() {
  $.ajax({
    type: 'GET',
    url: '/videos',
    dataType: 'json'
  }).done(function(data){
    $.each(data, function(index, video){
      addVideoToFrame(video);
      addGenreToMenu(video.genre);
    })
  })
}

function addVideoToFrame(video) {
  var url_embed = video.url.replace('watch?v=', 'embed/');
  $("<div class='video_frame'> <h5><a href='/videos/"+video.id+"'>" + video.title + "</a></h5> <iframe width='230' height='160' src='"+url_embed+"'> frameborder='0' allowfullscreen><iframe> </div>").prependTo('#all_videos');
}

function addGenreToMenu(genre){
  if ($.inArray(genre, allGenres) == -1) {
    allGenres.push(genre);
    $('#genre_list').append("<li><a href='/videos/"+genre+"'>"+ genre +"</a> </li>")
  } 
 // creaet ruby dynamic /videos/:genre
}






