function resetFields() {
    // When fields are reset, set glossUnits back to its original value
    glossUnits = 2;
    // Return to initial state
    document.getElementById("glossForm").innerHTML = initState;
}