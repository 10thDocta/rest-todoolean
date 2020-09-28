/* global $*/

var ajax = {

    delete: function (id) {
        $.ajax(
            {
                url: "http://157.230.17.132:3030/todos/" + id,
                method: "DELETE",
            }
        );
    },

    get: function (id = "") {
        $.ajax(
            {
                url: "http://157.230.17.132:3030/todos/" + id,
                method: "GET",
                success: function (data) {
                    console.log(data);
                    render(data);
                },
                error: function (richiesta, stato, errori) {
                    alert("E' avvenuto un errore.", errori);
                }
            }
        );
    },

    patch: function (id, string) {
        $.ajax(
            {
                url: "http://157.230.17.132:3030/todos/" + id,
                method: "PATCH",
                data: {
                    text: string
                },
                success: function (data) {
                    console.log("Modificato" + data);
                },
                error: function (richiesta, stato, errori) {
                    alert("E' avvenuto un errore.", errori);
                }
            }
        );
    },

    post: function (string) {
        $.ajax(
            {
                url: "http://157.230.17.132:3030/todos/",
                method: "POST",
                data: {
                    text: string
                },
                success: function (data) {
                    render([data]);
                },
                error: function (richiesta, stato, errori) {
                    alert("E' avvenuto un errore.", errori);
                }
            }
        );
    },

};



function render(data) {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);

    data.forEach(element => {
        var html = template(element);
        $("#list").append(html);
    });
}



/* ----------------- DOCUMENT READY ---------------- */
$(document).ready(function () {

    ajax.get();

    // per aggoungere un elemento alla lista
    $("#add-item").keyup(function (e) {

        if (e.which == 13) {
            var input = $(this).val();
            if (input != "") {
                ajax.post(input);
                $(this).val("");
            }
        }
    });


    // per modificare un elemento della lista
    $("#list").on("click", "#edit-btn", function () {

        var currentText = $(this).val();
        var idItem = $(this).parent().attr("id");
        var disable = $(this).parent().find("input");

        disable.prop("disabled", "");

        $(this).parent().find("input").keyup(function (e) {

            if (e.which == 13) {
                var input = $(this).val();
                if (input != "" && input != currentText) {
                    ajax.patch(idItem, input);
                    disable.prop("disabled", "disabled");
                }
            }
        });


    });

    // per eliminare un elemento della lista
    $("#list").on("click", "#delete-btn", function () {

        var idItem = $(this).parent().attr("id");
        $(this).parent().remove();
        ajax.delete(idItem);
    });


});