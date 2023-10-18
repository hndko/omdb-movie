function searchMovie() {
  $.ajax({
    type: "get",
    url: "http://www.omdbapi.com",
    data: {
      apikey: "395f583b",
      s: $("#search-input").val(),
    },
    dataType: "JSON",
    success: function (response) {
      if (response.Response == "True") {
        let movie = response.Search;
        console.log(movie);

        $("#movie-list").empty();

        $.each(movie, function (i, data) {
          $("#movie-list").append(
            "<div class='col-md-4 mb-4'><div class='card h-100'><img src='" +
              data.Poster +
              "' class='card-img-top' alt='...'><div class='card-body'><h5 class='card-title'>" +
              data.Title +
              "</h5><p class='card-text'>" +
              data.Year +
              ".</p><div class'card-footer'><a href='#' class='see-detail' data-bs-toggle='modal' data-bs-target='#exampleModal' data-id='" +
              data.imdbID +
              "'>Lihat Selengkapnya</a></div></div></div></div>"
          );
        });

        $("#search-input").val("");
      } else {
        $("#movie-list").html(
          "<h1 class='text-center text-danger'>" + response.Error + "</h1>"
        );
      }
    },
  });
}

$("#search-button").click(function (e) {
  e.preventDefault();
  searchMovie();
});

$("#search-input").keypress(function (e) {
  if (event.which === 13) {
    event.preventDefault(); // Menghentikan perilaku bawaan dari tombol 'Enter'
    let searchTerm = $("#search-input").val();
    $("#result").html("Anda menekan Enter dengan kata kunci: " + searchTerm);
    // Di sini Anda dapat menambahkan aksi lain yang ingin Anda lakukan saat 'Enter' ditekan
    searchMovie();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  console.log($(this).data("id"));

  $.ajax({
    type: "get",
    url: "http://www.omdbapi.com",
    data: {
      apikey: "395f583b",
      i: $(this).data("id"),
    },
    success: function (response) {
      if (response.Response == "True") {
        $(".modal-title").html(
          "<h1 class='modal-title fs-5' id='exampleModalLabel'>" +
            response.Title +
            "</h1>"
        );
        $(".modal-body").html(
          "<div class='container-fluid'><div class='row'><div class='col-md-4'><img src='" +
            response.Poster +
            "' class='img-fluid h-100'></div><div class='col-md-8'><ul class='list-group'><li class='list-group-item'> Realease: " +
            response.Released +
            "</li><li class='list-group-item'>Genre: " +
            response.Genre +
            "</li><li class='list-group-item'>Director: " +
            response.Director +
            "</li><li class='list-group-item'>Writer: " +
            response.Writer +
            "</li><li class='list-group-item'>Actors: " +
            response.Actors +
            "</li></ul></div></div></div>"
        );
      } else {
        console.log(response.Error);
      }
    },
  });
});
