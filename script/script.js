/* global $*/

var ajax = {

    delete: function () {
        $.ajax(
            {
                url: "http://157.230.17.132:3030/todos",
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

    post: function (id = "") {
        $.ajax(
            {
                url: "http://157.230.17.132:3030/todos/" + id,
                method: "POST",
                success: function (data) {

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


});