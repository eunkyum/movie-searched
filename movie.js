const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTJhN2E1OWNlMDU5YTBkOWUxMDA5N2Y1NDgwM2U4MiIsInN1YiI6IjY2MjY0MjI3ZTI5NWI0MDE4NzliZDRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jFZYYy_OiC0tGJIuwP-IkQSBRyU4Qo47ujN22aGzXQ8',
    },
};

const $movie_list = document.querySelector('.movie_list');
const $search_form = document.getElementById('search_form');

// 영화 데이터 가져오기
fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    options
)
    .then((response) => response.json())
    .then((response) => {
        const movie_list = response['results'];

        let temp_html = ``;
        movie_list.forEach((v) => {
            const img_url = `https://image.tmdb.org/t/p/w500${v['poster_path']}`;
            const movie_title = v['title'];
            const overview = v['overview'];
            const vote = v['vote_average'];
            const id = v['id'];

            // toFixed(n) n 자리수까지 반올림 후 표시
            temp_html += ` 
        <div class="movie_card" onclick="alert('영화 id: ${id}')">
          <img src='${img_url}' alt="">
          <div class="overlay">
            <h3>${movie_title}</h3>
            <p>${overview}</p>
            <p>⭐ ${vote.toFixed(1)}</p>
          </div>
        </div>`;

            $movie_list.innerHTML = temp_html;
        });
    });

// 검색 버튼 클릭 이벤트 핸들러
document.getElementById('search_form').addEventListener('submit', function (event) {
    event.preventDefault(); // 기본 동작 제어

    const searchInput = document.getElementById('search_input').value.trim().toLowerCase();
    const movieCards = document.querySelectorAll('.movie_card');

    movieCards.forEach(card => {
        const title = card.querySelector('h3').textContent.trim().toLowerCase();
        if (title.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// 장르 버튼 클릭 이벤트 핸들러
document.querySelectorAll('.genre-btn').forEach(button => {
    button.addEventListener('click', function () {
        const genreId = button.getAttribute('data-genre-id');
        searchMoviesByGenre(genreId);
    });
});

// API 활용 - 장르별 영화 검색 함수
function searchMoviesByGenre(genreId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzk4ODExYTdkMTQ2YzcyNWIzYWQyZjRkNTdjNjZmMCIsInN1YiI6IjY2MmE2MzcxOGQ3N2M0MDA5YjJkYjQ5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vH_XqCfQGC1kpbDp8A2jzppncFJxl8q99-2xGXeoaq8'
        }
    };

    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`, options)
        .then(response => response.json())
        .then(data => {
            const movieList = data.results;
            const $movieList = document.querySelector('.movie_list');
            let html = '';

            movieList.forEach(movie => {
                const imgURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                const title = movie.title;
                const overview = movie.overview;
                const vote = movie.vote_average;

                html += `
                    <div class="movie_card" onclick="alert('영화 id: ${movie.id}')">
                        <img src="${imgURL}" alt="${title}">
                        <div class="overlay">
                            <h3>${title}</h3>
                            <p>${overview}</p>
                            <p>⭐ ${vote.toFixed(1)}</p>
                        </div>
                    </div>`;
            });

            $movieList.innerHTML = html;
        })
        .catch(error => console.error('Error fetching movies by genre:', error));
}

// 내배캠 플러스 로고 클릭시 홈 이동
document.querySelector('.title_style a').addEventListener('click', function (event) {
    event.preventDefault();
    location.href = '/index.html';
});