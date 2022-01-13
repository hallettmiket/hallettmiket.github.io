# Hallett Lab research website


## Build site

To build the website locally, clone the repo with:

```
git clone --recurse-submodules https://github.com/vdumeaux/researchweb.git
```

Then install necessary Ruby dependencies by running:

```
bundle install
```

from within the `shahwebsite` directory. If you do not have root permissions you may need to run:

```
bundle install --path vendor/bundle
```

After this, the site can be be built with:

```
bundle exec jekyll build
```

(If you are getting errors at this stage, it may be due to your version of `bundle`. Try `gem uninstall bundler` + `gem install bundler -v 1.13.1`.)

To view the site, run `bundle exec jekyll serve` and point a browser to `http://localhost:4000/`. More information on Jekyll can be found [here](http://jekyllrb.com/).

To include projects, preprocessing scripts are necessary to clone project repos and update Jekyll metadata. This can be accomplished with:

```
bundle exec ruby _scripts/update-and-preprocess.rb
```

> Note that you need to create a .netrc file to allow the ruby script to pull data using the github api.

Then `bundle exec jekyll build` works as normal.

In short, running `bundle install && bundle exec ruby _scripts/update-and-preprocess.rb && bundle exec jekyll build && bundle exec jekyll serve` will do everything you need.

## Updating

The website is built using Travis, with builds triggered for each commit. If you commit your changes to a branch and do a pull request, Travis will build your branch and you will be able to check your changes build correctly before going live. Commit your changes to master and they will go live in a few minutes.

## Contribute

Blog posts just require YAML top matter that looks something like:

```
---
layout: post
title: Newton Institute presentation
author_handle: Trevor Bedford
link: http://www.newton.ac.uk/programmes/IDD/seminars/2013082213301.html
image: /images/blog/transmission.png
---
```

The `layout`, `title` and `author_handle` tags are required, while `link` and `image` tags are optional. Just save a Markdown file with this top matter as something like `blog/_posts/2013-08-27-newton-institute.md`, where `2013-08-27` is the date of the post and `newton-institute` is the short title. The `author_handle` tag on the blog post must match the `handle` tag in the `.md` file of the team member authoring the post (team member `.md` files can be found in `team/_posts`). This short title is used in the URL of the post, so this becomes `blog/newton-institute/`, so the short title should be long enough and unique enough not to cause conflicts with other posts.

## Adding a new publication

Specific to the Shah Lab, for each new paper added

1) Find the relevant entry on Pubmed, note the numerical pubmed ID
    e.g.: https://www.ncbi.nlm.nih.gov/pubmed/29449679
2) Obtain the metadata XML from Pubmed:
    - From the link found in 1) click the Send to in the top right
    - Select File radio button, Format XML drop down, then Create File
    - Insert the PubmedArticle entry into ./assets/pubmed_results.xml
3) Download the PDF, rename and place into the assets directory:
    e.g.: ./assets/pdfs/papers/29449679.pdf
4) Create a image for the paper, preferably a square .png file, name and place:
    e.g.: ./assets/images/papers/29449679.png
5) Run the following command `bundle exec ruby _scripts/add-papers.rb` to generate a page for your paper, and then make sure it appears on the website when the site is hosted locally (use `bundle exec jekyll build && bundle exec jekyll serve` to host a local server)
6) If the local server's website looks okay, commit your changes and push to production


## For more information

* How to add [papers](https://github.com/shahcompbio/shahwebsite)
* Look over the [metadata format guide](http://bedford.io/guide/format/)
* Look over the [Markdown style guide](http://bedford.io/guide/style/)


## License

All source code in this repository, consisting of files with extensions `.html`, `.css`, `.less`, `.rb` or `.js`, is freely available under an MIT license, unless otherwise noted within a file.

**The MIT License (MIT)**

Copyright (c) 2013-2016 Trevor Bedford

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
