$("#calculatorFormToAirport").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formErrorToAirport();
        submitMSGToAirport(false, "Biztos, hogy mindent bejelölt?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitFormToAirport();
    }
});

$("#calculatorFormFromAirport").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formErrorFromAirport();
        submitMSGFromAirport(false, "Biztos, hogy mindent bejelölt?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitFormFromAirport();
    }
});

function submitFormToAirport(){
    // Initiate Variables With Form Content
    var fromAddress = $('#calculatorFormToAirport').find('.fromAddress').val();
    var toAddress = $('#calculatorFormToAirport').find('.toAddress').val();
    var nbrPerson = $('#calculatorFormToAirport').find('.nbrPersond').val();

    $.ajax({
        type: "POST",
        url: "test.php",
        data: "toAddress=" + toAddress + "&fromAddress=" + fromAddress + "&nbrPerson=" + nbrPerson,
        success : function(text){
            var obj = $.parseJSON(text);
            if (obj[0] == "success" && obj){
                formSuccessToAirport(obj[1]);
            } else {
                formErrorToAirport();
                submitMSGToAirport(false,text);
            }
        }
    });
}

function submitFormFromAirport(){
    // Initiate Variables With Form Content
    var toAddress = $('#calculatorFormFromAirport').find('.toAddress').val();
    var vehicleType = $('#calculatorFormFromAirport').find('.vehicleType:checked').val();

    $.ajax({
        type: "POST",
        url: "calculate.php",
        data: "toAddress=" + toAddress + "&vehicleType=" + vehicleType,
        success : function(text){
            var obj = $.parseJSON(text);
            if (obj[0] == "success" && obj){
                formSuccessFromAirport(obj[1]);
            } else {
                formErrorFromAirport();
                submitMSGFromAirport(false,text);
            }
        }
    });
}

function formSuccessToAirport(text){
    submitMSGToAirport(true, text);
}
function formSuccessFromAirport(text){
    submitMSGFromAirport(true, text);
}

function formErrorToAirport(){
    $("#calculatorFormToAirport").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}
function formErrorFromAirport(){
    $("#calculatorFormFromAirport").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSGToAirport(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $('#calculatorFormToAirport').find("#msgSubmitToAirport").removeClass().addClass(msgClasses).text(msg);
}

function submitMSGFromAirport(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $('#calculatorFormFromAirport').find("#msgSubmitFromAirport").removeClass().addClass(msgClasses).text(msg);
}