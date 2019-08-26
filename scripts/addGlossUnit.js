// add a gloss-unit on button click
var glossUnits = 2;
function addGlossUnit(){
    // Add new word field
    // Row where word fields will be added
    var wordRow = document.getElementById("wordRow");
    // New table data element in word row
    var tdWord = document.createElement("td");
    tdWord.id = "wordTd" + glossUnits;
    // New input field for word row
    var inputWord = document.createElement("input");
    inputWord.type = "text";
    inputWord.id = "wordIn" + glossUnits;
    inputWord.size = 10;
    inputWord.addEventListener("input", convert);
    // Add new td to word row
    wordRow.appendChild(tdWord);
    // Add new word input field to new word td
    tdWord.appendChild(inputWord);

    // Add new gloss field
    // Row where gloss fields will be added
    var glossRow = document.getElementById("glossRow");
    // New table data element in gloss row
    var tdGloss = document.createElement("td");
    tdGloss.id = "glossTd" + glossUnits;
    // New input field for gloss row
    var inputGloss = document.createElement("input");
    inputGloss.type = "text";
    inputGloss.id = "glossIn" + glossUnits;
    inputGloss.size = 10;
    inputGloss.addEventListener("input", convert);
    // Add new td to gloss row
    glossRow.appendChild(tdGloss);
    // Add new gloss input field to new gloss td
    tdGloss.appendChild(inputGloss);
    glossUnits++;

    // Match the free translation's colspan to the number of total gloss glossUnits
    document.getElementById("ftTd").colSpan = glossUnits;
}