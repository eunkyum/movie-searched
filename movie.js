const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTJhN2E1OWNlMDU5YTBkOWUxMDA5N2Y1NDgwM2U4MiIsInN1YiI6IjY2MjY0MjI3ZTI5NWI0MDE4NzliZDRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jFZYYy_OiC0tGJIuwP-IkQSBRyU4Qo47ujN22aGzXQ8',
    },
};

const $movie_list = document.querySelector('.movie_list');
const $serach_form = document.getElementById('serach_form');

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
            const img_url = `https://image.tmdb.org/t/p/w500${v['backdrop_path']}`;
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

// 검색 기능
function serach_btn() {
    const $serach_input = document.getElementById('serach_input').value;
    const $movie_card_arr = document.getElementsByClassName('movie_card');

    if (!$serach_input) {
        alert('영화 제목을 입력하세요!');
    } else {
        // 전체 영화 제목을 담을 배열
        let movie_title_arr = [];
        for (let i = 0; i < $movie_card_arr.length; i++) {
            movie_title_arr[i] =
                $movie_card_arr[i].getElementsByTagName('h3')[0].textContent;
            $movie_card_arr[i].style = 'display:none';
        }
        // 키워드가 들어간 영화 제목을 담을 배열
        let filter_movie_title = movie_title_arr.filter(
            (v) => v.toLowerCase().indexOf($serach_input.toLowerCase()) > -1
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

// 새로고침 문제 보완
function onSubmit(event) {
    event.preventDefault(); // 브라우저의 기본 동작을 제어
}
$serach_form.addEventListener('submit', onSubmit);