# go through software and clean and update

require 'yaml'

$basedir = Dir.pwd						
config = YAML.load_file("_config.yml")

config["software"].each do |repo|
	name = repo.split('/').drop(1).join('')		
	Dir.chdir($basedir + "/software")			
	if !Dir.exists?(name)								# clone  repo
		`git clone https://github.com/#{repo}.git`
	end
	Dir.chdir($basedir + "/software/" + name)			# drop into blotter dir	
	`git clean -f`										# remove untracked files, but keep directories
	`git reset --hard HEAD`								# bring back to head state
	`git pull origin master`							# git pull					
end

Dir.chdir($basedir)
`ruby _scripts/preprocess-markdown.rb`
`ruby _scripts/generate-software-data.rb`
