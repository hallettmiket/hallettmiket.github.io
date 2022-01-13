# Reads assets/pubmed_result.xml, and turns into paper .md
# For each entry, create a new file and add information to it

require 'nokogiri'

xml = File.open("assets/pubmed_result.xml") { |f| Nokogiri::XML(f) }
xml.xpath('//PubmedArticle').each do |article|
	
	file_name = article.xpath('PubmedData/History/PubMedPubDate[@PubStatus="pubmed"]/Year').text + "-" + article.xpath('PubmedData/History/PubMedPubDate[@PubStatus="pubmed"]/Month').text + "-" + article.xpath('PubmedData/History/PubMedPubDate[@PubStatus="pubmed"]/Day').text + "-" + article.xpath('PubmedData/ArticleIdList/ArticleId[@IdType="pubmed"]').text
	
	file = File.new("papers/_posts/" + file_name + ".md", "w")

	file.puts("---")
	file.puts("layout: paper")
	file.puts("title: " + "\"" + article.xpath('MedlineCitation/Article/ArticleTitle').text + "\"")
	file.puts("image: /assets/images/papers/" + article.xpath('PubmedData/ArticleIdList/ArticleId[@IdType="pubmed"]').text + ".png")

	file.print("authors: ")
	authors = article.xpath('MedlineCitation/Article/AuthorList/Author')
	
	authors.each do |author|
		file.print(author.xpath('ForeName').text + " " + author.xpath('LastName').text)
		
		if !author.xpath('ForeName').text.eql?(authors.last.xpath('ForeName').text) then file.print(", ") end
	end
	
	file.puts("")

	file.puts("ref: " + article.xpath('MedlineCitation/Article/AuthorList/Author/LastName')[0].text + " et al. " + article.xpath('MedlineCitation/Article/Journal/JournalIssue/PubDate/Year').text + ". " + article.xpath('MedlineCitation/Article/Journal/ISOAbbreviation').text + ".")
	
	if article.at_xpath('MedlineCitation/Article/Journal/JournalIssue/Volume') then
		file.puts("journal: " + "\"" + article.xpath('MedlineCitation/Article/Journal/Title').text + " " + "<b>" + article.xpath('MedlineCitation/Article/Journal/JournalIssue/Volume').text + "</b>" + ", " + article.xpath('MedlineCitation/Article/Pagination/MedlinePgn').text + " (" + article.xpath('MedlineCitation/Article/Journal/JournalIssue/PubDate/Year').text + ")\"")
	else
		file.puts("journal: " + "\"" + article.xpath('MedlineCitation/Article/Journal/Title').text + " " + article.xpath('MedlineCitation/Article/Pagination/MedlinePgn').text + " (" + article.xpath('MedlineCitation/Article/Journal/JournalIssue/PubDate/Year').text + ")\"")
	end
	
	if File.exists? File.expand_path("", "assets/pdfs/papers/" + article.xpath('PubmedData/ArticleIdList/ArticleId[@IdType="pubmed"]').text + ".pdf") then
		file.puts("pdf: /assets/pdfs/papers/" + article.xpath('PubmedData/ArticleIdList/ArticleId[@IdType="pubmed"]').text + ".pdf")
	end
	
	file.puts("doi: " + article.xpath('PubmedData/ArticleIdList/ArticleId[@IdType="doi"]').text)
	
	if article.at_xpath('MedlineCitation/Article/Journal/JournalIssue/Volume') then
		file.puts("abbrev: " + "\"" + article.xpath('MedlineCitation/Article/Journal/ISOAbbreviation').text + " " + "<b>" + article.xpath('MedlineCitation/Article/Journal/JournalIssue/Volume').text + "</b>" + ", " + article.xpath('MedlineCitation/Article/Pagination/MedlinePgn').text + " (" + article.xpath('MedlineCitation/Article/Journal/JournalIssue/PubDate/Year').text + ")\"")
	else
		file.puts("abbrev: " + "\"" + article.xpath('MedlineCitation/Article/Journal/ISOAbbreviation').text + " " + article.xpath('MedlineCitation/Article/Pagination/MedlinePgn').text + " (" + article.xpath('MedlineCitation/Article/Journal/JournalIssue/PubDate/Year').text + ")\"")
	end
	
	file.puts("pub_year: " + article.xpath('MedlineCitation/Article/Journal/JournalIssue/PubDate/Year').text)
	file.puts("---")
	file.puts("")

	file.puts("<br />")
	file.puts("<div data-badge-popover=\"right\" data-badge-type=\"donut\" data-pmid=\"" + article.xpath('PubmedData/ArticleIdList/ArticleId[@IdType="pubmed"]').text + "\" data-hide-no-mentions=\"true\" class=\"altmetric-embed\"></div>")
	file.puts("")
	
	if article.at_xpath('MedlineCitation/Article/Abstract/AbstractText') then
		file.puts("# Abstract")
		file.puts("")
		
		abstracts = article.xpath('MedlineCitation/Article/Abstract/AbstractText')
		
		abstracts.each do |abstract|
			file.puts(abstract.text)
			file.puts("")	
		end
	end

	file.close
end