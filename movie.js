const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzk4ODExYTdkMTQ2YzcyNWIzYWQyZjRkNTdjNjZmMCIsInN1YiI6IjY2MmE2MzcxOGQ3N2M0MDA5YjJkYjQ5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vH_XqCfQGC1kpbDp8A2jzppncFJxl8q99-2xGXeoaq8'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
