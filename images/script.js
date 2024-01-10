// 카테고리일떄 다음을 실행
function category_function() {
    category_emphasize_in_category();
}

// 게시글일때 다음을 실행
function entry_function() {
    category_emphasize_in_article();
    generate_pageNav();
}

// 카테고리 탐색기에서 카테고리 강조
function category_emphasize_in_category() {
    const curr_path = location.pathname;

    category_emphasize(curr_path);
}

// 게시글에서 카테고리 강조시키기
function category_emphasize_in_article() {
    const category_anchor = document.getElementById("article-category").innerHTML
    const curr_path = category_anchor.substring(category_anchor.indexOf("/"), category_anchor.indexOf(">") - 1);

    category_emphasize(curr_path);
}

//게시글에서 자체 네비게이션 만들기
function generate_pageNav() {
    //TODO: 페이지 내에서 프래그먼트로 이동하기 기능 구현
}

// 현재 path를 받아서 카테고리 탐색 후 강조 클래스 부여
function category_emphasize(path) {
    const target_arr = decoder(path);

    const listItems = document.getElementById('category-list').querySelectorAll("ul li a");
    for (const listItem of listItems) {
        const curr_category = listItem.innerHTML.substring(1, listItem.innerHTML.indexOf('<') - 1)
        if (target_arr.includes(curr_category)) {
            listItem.classList.add("curr-category");
        }
    }
}

function decoder(path) {
    target_arr = path.split('/').splice(2);
    target_arr.forEach((v, i, arr) => arr[i] = decodeURIComponent(arr[i]));
    return target_arr;
}

window.onload = function () {
    const curr_path = location.pathname;
    let firstPath = curr_path.split('/')[1];

    if (firstPath === 'category') {
        category_function()
    } else if (firstPath === 'entry') {
        entry_function()
    }
}