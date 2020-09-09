function mapToJson(serializedFormArray){
    var jsonObj = {};
    $.map( serializedFormArray, function( n, i ) {
        jsonObj[n.name] = n.value;
    });

    return jsonObj;
}
