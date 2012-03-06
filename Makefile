PROJECT = $(notdir ${PWD})

UMLDIR := docs/uml
MDDIR := docs/md
	
IMAGESDIR := webui/docs/images
UMLPNGS := $(addprefix $(IMAGESDIR)/, \
component.png \
usecase.png \
)
#contacts.png \

HTMLDIR := webui/docs
HTMLS := $(addprefix $(HTMLDIR)/, \
index.html \
usersGuide.html \
install.html \
)
#administratorsGuide.html \
#usersGuide.html \
#developersGuide.html \

PDFDIR := webui/docs/pdf
PDFS := $(addprefix $(PDFDIR)/, \
install.pdf \
)

all: clean docs

tests:
	@echo "Run tests..."
	mocha

docs: $(HTMLS) $(UMLPNGS) $(PDFS) images

images:
	@echo "Copy screenshots and other static images to the public images folder"
	cp docs/images/* $(HTMLDIR)/images/


$(HTMLDIR)/%.html : $(MDDIR)/%.md $(MDDIR)/biblio.bib $(MDDIR)/refs.md
	pandoc --standalone \
	    --toc \
	    --offline \
	    --bibliography=$(MDDIR)/biblio.bib \
	    --template docs/templates/manual \
	    $< $(MDDIR)/refs.md > $@

$(PDFDIR)/%.pdf : $(MDDIR)/%.md $(MDDIR)/biblio.bib $(MDDIR)/refs.md
	markdown2pdf $< -V fontsize=12pt --toc -o $@


$(IMAGESDIR)/%.png : $(UMLDIR)/%.uml $(UMLDIR)/%.iuml $(UMLDIR)/stereotypes.iuml
	java -jar ~/bin/plantuml.jar $< -o ${PWD}/$(IMAGESDIR) 

.PHONY: clean

clean:
	rm -f ${HTMLDIR}/*.html
	rm -f ${PDFDIR}/*.pdf
	rm -f ${IMAGESDIR}/*.png
