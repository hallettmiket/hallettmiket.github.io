# -*- encoding: utf-8 -*-
# stub: jekyll-commonmark 1.3.1 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-commonmark".freeze
  s.version = "1.3.1".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Pat Hawks".freeze]
  s.date = "2019-03-25"
  s.email = "pat@pathawks.com".freeze
  s.homepage = "https://github.com/pathawks/jekyll-commonmark".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0".freeze)
  s.rubygems_version = "3.0.3".freeze
  s.summary = "CommonMark generator for Jekyll".freeze

  s.installed_by_version = "4.0.3".freeze

  s.specification_version = 4

  s.add_runtime_dependency(%q<commonmarker>.freeze, ["~> 0.14".freeze])
  s.add_runtime_dependency(%q<jekyll>.freeze, [">= 3.7".freeze, "< 5.0".freeze])
  s.add_development_dependency(%q<bundler>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<rake>.freeze, ["~> 12.0".freeze])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0".freeze])
  s.add_development_dependency(%q<rubocop-jekyll>.freeze, ["~> 0.5".freeze])
end
