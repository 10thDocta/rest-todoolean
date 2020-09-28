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

    patch: function (id) {
        $.ajax(
            {
                url: "http://157.230.17.132:3030/todos/" + id,
                method: "PATCH",
                success: function (data) {

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




$(document).ready(function () {

    ajax.get();

    // per aggoungere un elemento alla lista
    $("#add-item").keyup(function (e) {

        if (e.which == 13) {

            var input = $(this).val();

            if (input != "") {

                ajax.post(input);
            }
        }

    });

    // per eliminare un elemento della lista
    $("#list").on("click", "#delete-btn", function () {

        var idItem = $(this).parent().attr("id");
        $(this).parent().remove();
        ajax.delete(idItem);
    });


});