function tAndSControl(elId){
    var _elId = elId;
    var defaultHtml = $(_elId + " .J_tAndS_select").html();
    $(_elId + " .J_tAndS_hidden").val($(_elId + " .J_tAndS_select").val());
    $(_elId + " .J_tAndS_txt").css("width",$(_elId + " .J_tAndS_select").css("width"));
    $(_elId + " .J_tAndS_select").change(function(){
        var item = $(this).val();
        if(item === "-9999"){
            $(_elId + " .J_tAndS_select").hide();
            $(_elId + " .J_tAndS_txt").show();
            $(_elId + " .J_tAndS_txt").val($(_elId + " .J_tAndS_hidden").val());
            $(_elId + " .J_tAndS_txt").focus();
        }else{
            $(_elId + " .J_tAndS_hidden").val($(_elId + " .J_tAndS_select").val());
        }
    })
    $(_elId + " .J_tAndS_txt").blur(function(){
        var txtVal = $(_elId + " .J_tAndS_txt").val();
        $(_elId + " .J_tAndS_hidden").val(txtVal);
        $(_elId + " .J_tAndS_select").show();
        $(_elId + " .J_tAndS_txt").hide();
        var item = $(_elId + " .J_tAndS_txt").val();
        var options = $(_elId + " .J_tAndS_select option");
        var hasSame = false;
        for(var i = 0; i < options.length; i++){
            var op = $(options[i]).val();
            if(item == op){
                $(_elId + " .J_tAndS_select option").eq(0).val();
                $(_elId + " .J_tAndS_select").val(item);
                hasSame = true;
                break;
            }
        }
        if(!hasSame){
            $(_elId + " .J_tAndS_select").html("<option value='" + txtVal + "'>" + txtVal + "</option>" + defaultHtml);
            $(_elId + " .J_tAndS_select").val(txtVal);

        }
    })
}