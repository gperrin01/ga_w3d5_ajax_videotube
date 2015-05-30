$(document).ready(function() {
  getVideos();
  // $('#upload_link a').on('click', function(){
  //   makeVisible($('#upload'));
  // })
  // $('#home_link a').on('click', function(){
  //   makeVisible($('#homepage'));
  // })
  $('.nav_link a').on('click', function(){
    makeVisible( $('#'+$(this).parent().attr('value')));
  })
  $('#submit_upload').on('click', createVideo);
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
    $('#genre_list').append("<li class='nav_link' id='"+genre+"' value='"+genre+"'><a href='#'>" +genre+ "</a></li>");
  } 
}

function makeVisible($sub_frame) {
  $('.sub_frame').addClass('hide');
  $sub_frame.removeClass('hide');
}

function createVideo(){
  // ajax request - post /videos - ruby sql insert into videos returning *
  event.preventDefault;
  $.ajax({
    type: 'post',
    url: '/videos',
    data: {title: $('#input_title').val(),
        description: $('#input_description').val(),
        url: $('#input_url').val(),
        genre: $('#input_genre').val()
            }, 
    dataType: 'json'
  }).done(function(data){
    addVideoToFrame(data[0]);
    addGenreToMenu(data[0].genre);
    makeVisible($('#homepage'));
    // Need to add to genres!
  })
}






// TO DO
// Click on upload -> load form for new in database (post /videos/new)
//                 -> hide homepage and show upload 
//                 -> add video to frame / add genre to menu

// Click on genres -> show only video of the genre - creaet ruby dynamic /videos/:genre to get genre= from database


