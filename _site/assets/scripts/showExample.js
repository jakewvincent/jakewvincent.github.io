function showExample() {
    // Clear all the fields
    clearFields();
    // Reset glossUnits to original value
    glossUnits = 2;
    // Add 6 more gloss units for Chamorro example
    addGlossUnit();
    addGlossUnit();
    addGlossUnit();
    addGlossUnit();
    addGlossUnit();
    addGlossUnit();
    
    // Insert example
    document.getElementById("wordIn1").value = "Chumålik";
    document.getElementById("wordIn2").value = "i";
    document.getElementById("wordIn3").value = "[matå'chung";
    document.getElementById("wordIn4").value = "na";
    document.getElementById("wordIn5").value = "påtgun";
    document.getElementById("wordIn6").value = "gi";
    document.getElementById("wordIn7").value = "siya.]";
    document.getElementById("glossIn1").value = "<span>sg.agr</span>:laugh";
    document.getElementById("glossIn2").value = "the";
    document.getElementById("glossIn3").value = "<span>sg.agr</span>.sit";
    document.getElementById("glossIn4").value = "<span>lk</span>";
    document.getElementById("glossIn5").value = "child";
    document.getElementById("glossIn6").value = "<span>loc</span>";
    document.getElementById("glossIn7").value = "chair";
    document.getElementById("ftIn").value = "'The child who sat in the chair laughed.'";

    // Convert to HTML after above steps
    convert();
}