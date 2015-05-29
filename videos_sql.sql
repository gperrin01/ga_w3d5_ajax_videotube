drop table videos;

CREATE TABLE videos(
  id serial8 primary key, 
  title varchar(225),
  description text,
  url varchar(225),
  url_embed varchar(225),
  genre varchar(30)
);

insert into videos (title, description, url, url_embed, genre) values ('KD offseason 2014', 'documentary on kevin durant during the 2014 offseason after his conference finals loss to the spurs', 'https://www.youtube.com/watch?v=f02MfCTWIow)', 'https://www.youtube.com/embed/f02MfCTWIow', 'biopic');

insert into videos (title, description, url, url_embed, genre) values ('D-Rose mix', 'highlights of Derrick Rose during his MVP season 2011','www.youtube.com/watch?v=wBrMygyqidM', 'https://www.youtube.com/embed/Plt4b2RHT48', 'highlights');

  insert into videos (title, description, url, url_embed, genre) values ('Shaqtin a fool 2014/15', 'the best of the 2014/2015 season','www.youtube.com/watch?v=xHHoqL7ElGM', 'www.youtube.com/embed/xHHoqL7ElGM', 'bloopers');

