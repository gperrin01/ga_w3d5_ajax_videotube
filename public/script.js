$(document).ready(function() {
  getVideos();
  $('#all_videos').on('click', '.video_frame a', function() {
    showVideo($(this).data('id'));
  })
  $('#submit_upload').on('click', createVideo);
  $('.nav_link a').on('click', function(){
    makeVisible( $('#'+$(this).parent().attr('value')));
  })

  $('#show').on('click', '#edit-button', editVideo)

  $('#show').on('click', 'form>button', function(){
    deleteVideo($(this).data('id'));
  })

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
  $("<div class='video_frame'> <h5><a data-id=" +video.id+ " href='#'>" + video.title + "</a></h5> <iframe width='230' height='160' src='"+url_embed+"'> frameborder='0' allowfullscreen><iframe> </div>").prependTo('#all_videos');
  // Removed the full a link " href='/videos/"+video.id+"
}
function addGenreToMenu(genre){
  if ($.inArray(genre, allGenres) == -1) {
    allGenres.push(genre);
    $('#genre_list').append("<li class='nav_link' id='"+genre+"' value='show'><a href='#'>" +genre+ "</a></li>");
  } 
}

function makeVisible($sub_frame) {
  $('.sub_frame').addClass('hide');
  $sub_frame.removeClass('hide');
}

function createVideo(){
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
  })
}

function showVideo(id){
  makeVisible($('#show'));
  $.ajax({
    type: 'get',
    url: '/videos/'+id,
    data: {id: id},
    dataType: 'json'
  }).done(function(data){
    var video = data[0];
    $('#id h3').html(video.title);
    $('#edit-delete').html("<button id='edit-button' data-id="+video.id+"> <a href='#'>Edit</a></button>  <button id='delete-button' data-id="+video.id+"> <a href='#'>Delete</a></button>  <iframe width='850' height='480' src='"+video.url_embed+"' frameborder='0' allowfullscreen></iframe>  <ul> <li>"+video.name+"</li> <li>"+video.description+"</li> <li>"+video.url+"</li></ul>");
  })
}



function editVideo() {
    makeVisible($('#edit'));
    var id = $(this).data('id');
    $('#input_title_foredit')
    $.ajax({
    type: 'post',
    url: '/videos/'+id,
    data: {id: id},
    dataType: 'json'
  }).done(function(data){
    debugger;
  })
}

function deleteVideo() {

}




// TO DO
// Click on genres -> show only video of the genre - creaet ruby dynamic /videos/:genre to get genre= from database

      // <form action='/videos/"+video.id+"/delete' method='post'>   
      // <button name='_method' value='delete'> Off the roster! </button>
      //  </form>     
