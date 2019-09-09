// convert input into html
function convert() {
    var textOut = document.getElementById("textOut");
    var nCells = document.getElementById("allInput").rows[0].cells.length;
    var ft = document.getElementById("ftIn").value;

    // Put word values in array
    var glUnits = [];
    for (i=1;i<nCells;i++) {
        var wordCell = document.getElementById("allInput").rows[0].cells[i].children[0].value;
        var glossCell = document.getElementById("allInput").rows[1].cells[i].children[0].value;
        glUnits[i] =
            '\t\t<div class="align-unit">\n' +
            '\t\t\t<div class="word">' + wordCell + '</div>\n' +
            '\t\t\t<div class="gloss">' + glossCell + '</div>\n' +
            '\t\t</div>\n';
    }
        
    // Value of textbox
    textOut.value = 
        '<div class="example">\n' +
        '\t<div class="all-align-units">\n' +
        glUnits.join("") + '\n' +
        '\t</div>\n' +
        '\t<div class="free-transl">\n' +
        '\t\t' + ft + '\n' +
        '\t</div>\n' +
        '</div>';
    
    // Render HTML
    var examplePreview = document.getElementById("examplePreview");
    document.getElementById("examplePreview").style.color = "black";
    examplePreview.innerHTML = textOut.value;
}