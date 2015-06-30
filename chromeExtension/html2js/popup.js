$("#J_js1").click(function(){
    javascript1();
});
$("#J_js").click(function(){
    javascript();
});
function javascript() {
    var isArraySel = $("#arrays-sel").prop("checked");
    var htmlArr = $("#content").val().replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n');
    var len = htmlArr.length;
    var outArr = [];
    if (isArraySel) {
        outArr.push("[");
        jQuery.each(htmlArr, function (index, value) {
            if (value !== "") {
                if (index === len - 1) {
                    outArr.push("\"" + value + "\"");
                } else {
                    outArr.push("\"" + value + "\",\n");
                }
            }

        });
        outArr.push("].join(\"\");");
    } else {
        jQuery.each(htmlArr, function (index, value) {
            if (value !== "") {
                if (index === len - 1) {
                    outArr.push("\"" + value + "\";");
                } else {
                    outArr.push("\"" + value + "\"+\n");
                }
            }
        });
    }
    $("#result").val(outArr.join(""));
}
function javascript1() {
    var isArraySel = $("#arrays-sel").prop("checked");
    var htmlArr = $("#content").val().replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").split('\n');
    var len = htmlArr.length;
    var outArr = [];
    if (isArraySel) {
        outArr.push("[");
        jQuery.each(htmlArr, function (index, value) {
            if (value !== "") {
                if (index === len - 1) {
                    outArr.push("\'" + value + "\'");
                } else {
                    outArr.push("\'" + value + "\',\n");
                }
            }

        });
        outArr.push("].join(\"\");");
    } else {
        jQuery.each(htmlArr, function (index, value) {
            if (value !== "") {
                if (index === len - 1) {
                    outArr.push("\'" + value + "\';");
                } else {
                    outArr.push("\'" + value + "\'+\n");
                }
            }
        });
    }


    $("#result").val(outArr.join(""));

}