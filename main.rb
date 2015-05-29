require 'pry'
require 'pg'
require 'sinatra'
require 'sinatra/contrib/all' 

get '/' do 
  erb :index
end   
get '/videos' do 
  sql = "SELECT * FROM videos"
  @videos = run_sql(sql)
  if request.xhr?
    json @videos.to_a
  else
    erb :index
  end
end

# get '/videos/upload' do
#   erb :upload
# end

# post '/videos' do
#   url_embed = format_for_embed(params['url'])
#   sql = "INSERT INTO videos (title, description, url, url_embed, genre) values ('#{params['title']}', '#{params['description']}', '#{params['url']}', '#{url_embed}', '#{params['genre']}' )"
#   run_sql(sql)
#   redirect to ('/videos')
# end

# get '/videos/:id' do
#   sql = "select * from videos where id = #{params['id']}"
#   @video = run_sql(sql).first
#   erb :show
# end

# get '/videos/:id/edit' do
#   sql = "select * from videos where id = #{params['id']}"
#   @video = run_sql(sql).first
#   erb :edit
# end

# post '/videos/:id' do
#   url_embed = format_for_embed(params['url'])
#   sql = "update videos set title = '#{params['title']}', description = '#{params['description']}', url = '#{params['url']}', url_embed = '#{url_embed}'"
#   run_sql(sql)
#   redirect to ("/videos/#{params['id']}")
# end

# delete '/videos/:id/delete' do 
#   sql = "delete from videos where id = #{params['id']}"
#   run_sql(sql)
#   redirect to ('/videos')
# end





def sql_string(value)
  "'#{value.gsub("'","''")}'"
end

private

def run_sql(sql)
  connect = PG.connect(dbname: 'videos', host: 'localhost')
  begin
    connect.exec(sql)
  ensure
    connect.close
  end
end