
$(document).ready(function(){
    $(".input-box input").on("focus",function(){
        $(this).addClass("focus");
    });

    $(".input-box input").on("blur",function(){
        if($(this).val() == "")
        $(this).removeClass("focus");
    });

    // JSON
    
    $(".add-btn").click (() => {
        $.post("/jsonSave", {
            class: "Service",
            data: {
                nom: $('.serviceName').val(),
                description: $('.serviceDesc').val()
            }

            }, (response) => {
                console.log(response);
        })

    }
)});



