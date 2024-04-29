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

// 검색
function search_btn() {
    const $search_input = document.getElementById('search_input').value;
    const $movie_card_arr = document.getElementsByClassName('movie_card');

    if (!$search_input) {
        alert('영화 제목을 입력하세요!');
    } else {
        // 영화 제목 배열
        let movie_title_arr = [];
        for (let i = 0; i < $movie_card_arr.length; i++) {
            movie_title_arr[i] =
                $movie_card_arr[i].getElementsByTagName('h3')[0].textContent;
            $movie_card_arr[i].style = 'display:none';
        }
        // 영화 제목 배열 - 키워드
        let filter_movie_title = movie_title_arr.filter(
            (v) => v.toLowerCase().indexOf($search_input.toLowerCase()) > -1
        );

        movie_title_arr.forEach((v, i) => {
            for (let j = 0; j < filter_movie_title.length; j++) {
                if (v === filter_movie_title[j]) {
                    $movie_card_arr[i].style = 'display:block';
                }
            }
        });
    }
}

// // 장르 버튼 클릭 이벤트 핸들러
// document.querySelectorAll('.genre-btn').forEach(button => ){
//     button.addEventListener('click', () => ){
//         const genreId = button.getAttribute('data-genre-id');
//         se
//     }
// }




// 새로고침 문제 
function onSubmit(event) {
    event.preventDefault(); // 브라우저 기본 동작 제어
}
$search_form.addEventListener('submit', onSubmit);