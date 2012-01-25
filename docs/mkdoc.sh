#!/bin/bash

declare -rx pdfFiles="overview install"
declare -rx mdFiles="index install opening module-1 module-2 module-3 module-4 closing"
declare -rx umlFiles="component usecase domain_model"
declare -rx mdDir=md
declare -rx htmlDir=html
declare -rx umlDir=uml
declare -rx pdfDir=pdf

for mdFile in $mdFiles ; do
    pandoc --bibliography=${mdDir}/biblio.bib --standalone --offline --template myslidy ${mdDir}/${mdFile}.md ${mdDir}/refs.md > ${htmlDir}/${mdFile}.html
done

for umlFile in $umlFiles ; do
    #echo ${umlDir}/${umlFile}.uml
    java -jar ~/bin/plantuml.jar ${umlDir}/${umlFile}.uml 
done
mv ${umlDir}/*.png ${htmlDir}/images

# markdown2pdf --bibliography=${mdDir}/biblio.bib -f markdown ${mdDir}/opening.md ${mdDir}/module-1.md ${mdDir}/module-2.md ${mdDir}/module-3.md ${mdDir}/module-4.md ${mdDir}/closing.md

for pdfFile in $pdfFiles ; do
    markdown2pdf ${mdDir}/${pdfFile}.md -V fontsize=12pt --toc -o ${pdfDir}/${pdfFile}.pdf
done

# markdown2pdf md/agenda.md -V fontsize=12pt -o ${pdfDir}/agenda.pdf
# markdown2pdf md/install.md -V fontsize=12pt --toc -o ${pdfDir}/install.pdf
