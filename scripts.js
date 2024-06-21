$(document).ready(function() {
  // Load movies when the page loads
  loadMovies();

  // Handle the form submission for adding a new movie
  $('#addMovieForm').submit(function(event) {
      event.preventDefault();

      // Get the input values
      const title = $('#title').val();
      const director = $('#director').val();
      const leadActor = $('#leadActor').val();

      // Check if the input fields are not empty
      if (title && director && leadActor) {
          // Make an AJAX POST request to add the movie
          $.ajax({
              url: 'http://localhost:3000/movies',
              method: 'POST',
              contentType: 'application/json',
              data: JSON.stringify({ title, director, leadActor }),
              success: function() {
                  // Clear the input fields
                  $('#title').val('');
                  $('#director').val('');
                  $('#leadActor').val('');
                  // Reload the movies
                  loadMovies();
              },
              error: function() {
                  alert('Error adding movie. Please try again.');
              }
          });
      } else {
          alert('Please fill out all fields.');
      }
  });

  // Function to load movies from the server
  function loadMovies() {
      $.ajax({
          url: 'http://localhost:3000/movies',
          method: 'GET',
          success: function(data) {
              // Clear the table body
              $('#moviesTable tbody').empty();
              // Loop through each movie and append to the table
              data.forEach(movie => {
                  $('#moviesTable tbody').append(`
                      <tr>
                          <td>${movie.id}</td>
                          <td>${movie.title}</td>
                          <td>${movie.director}</td>
                          <td>${movie.leadActor}</td>
                          <td>
                              <button class="btn btn-info btn-sm update-btn" data-id="${movie.id}" data-title="${movie.title}" data-director="${movie.director}" data-leadactor="${movie.leadActor}">Update</button>
                              <button class="btn btn-danger btn-sm delete-btn" data-id="${movie.id}">Delete</button>
                          </td>
                      </tr>
                  `);
              });

              // Bind update and delete events to the buttons
              $('.update-btn').click(showUpdateModal);
              $('.delete-btn').click(deleteMovie);
          },
          error: function() {
              alert('Error loading movies. Please try again.');
          }
      });
  }

  // Function to show the update modal with pre-filled data
  function showUpdateModal() {
      const id = $(this).data('id');
      const title = $(this).data('title');
      const director = $(this).data('director');
      const leadActor = $(this).data('leadactor');

      // Set the values in the modal form
      $('#updateMovieId').val(id);
      $('#updateTitle').val(title);
      $('#updateDirector').val(director);
      $('#updateLeadActor').val(leadActor);
      // Show the modal
      $('#updateMovieModal').modal('show');
  }

  // Handle the form submission for updating a movie
  $('#updateMovieForm').submit(function(event) {
      event.preventDefault();

      // Get the updated values
      const id = $('#updateMovieId').val();
      const title = $('#updateTitle').val();
      const director = $('#updateDirector').val();
      const leadActor = $('#updateLeadActor').val();

      // Check if the input fields are not empty
      if (title && director && leadActor) {
          // Make an AJAX PUT request to update the movie
          $.ajax({
              url: `http://localhost:3000/movies/${id}`,
              method: 'PUT',
              contentType: 'application/json',
              data: JSON.stringify({ title, director, leadActor }),
              success: function() {
                  // Hide the modal
                  $('#updateMovieModal').modal('hide');
                  // Reload the movies
                  loadMovies();
              },
              error: function() {
                  alert('Error updating movie. Please try again.');
              }
          });
      } else {
          alert('Please fill out all fields.');
      }
  });

  // Function to delete a movie
  function deleteMovie() {
      const id = $(this).data('id');

      // Make an AJAX DELETE request to delete the movie
      $.ajax({
          url: `http://localhost:3000/movies/${id}`,
          method: 'DELETE',
          success: function() {
              // Reload the movies
              loadMovies();
          },
          error: function() {
              alert('Error deleting movie. Please try again.');
          }
      });
  }
});
