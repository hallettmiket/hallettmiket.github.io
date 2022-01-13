task :default do
  sh 'bundle exec ruby _scripts/update-and-preprocess.rb'
  sh 'bundle exec jekyll build'
end
