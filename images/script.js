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
    const header = document.getElementsByClassName('article-desc')[0].querySelectorAll('h2, h3, h4');

    for (let i = 0; i < header.length; i++) {
        header[i].id = header[i].innerText;
    }

    const inpage_nav = document.getElementById('inpage-navigator').querySelector('ul');
    for (let i = 0; i < header.length; i++) {
        let item = document.createElement('li');
        let anchor = document.createElement('a');

        anchor.href = `#${header[i].id}`;
        anchor.textContent = header[i].id;
        item.appendChild(anchor);
        inpage_nav.appendChild(item);
    }

    const fixedHeight = 60;
    window.addEventListener('scroll', () => {
        for (let i = 0; i < header.length - 1; i++) {
            const scrY = window.scrollY + fixedHeight;
            if (header[i].offsetTop <= scrY && scrY < header[i + 1].offsetTop) {
                inpage_nav.children[i].classList.add('fragment-reading');
            } else {
                inpage_nav.children[i].classList.remove('fragment-reading');
            }
        }
    });
}

// 현재 path를 받아서 카테고리 탐색 후 강조 클래스 부여
function category_emphasize(path) {
    const target_arr = decode(path);

    const listItems = document.getElementById('category-list').querySelectorAll("ul li a");
    for (const listItem of listItems) {
        const curr_category = listItem.innerHTML.substring(1, listItem.innerHTML.indexOf('<') - 1);
        if (target_arr.includes(curr_category)) {
            listItem.classList.add("curr-category");
        }
    }
}

// URI디코딩
function decode(path) {
    target_arr = path.split('/').splice(2);
    target_arr.forEach((v, i, arr) => arr[i] = decodeURIComponent(arr[i]));
    return target_arr;
}

// DOM이 로딩되면 실행
window.addEventListener('DOMContentLoaded', () => {
    const curr_path = location.pathname;
    let firstPath = curr_path.split('/')[1];

    if (firstPath === 'category') {
        category_function();
    } else if (firstPath === 'entry') {
        entry_function();
    }
});

// 몇 퍼센트 스크롤 했는지
function getScrollPercent() {
    return ((window.scrollY / (document.body.offsetHeight - window.innerHeight)).toFixed(2)) * 100;
}


// 진행 막대바 업데이트
window.addEventListener('scroll', () => {
    const percent = getScrollPercent();

    const loader = document.getElementById('loader');
    loader.style.width = `${percent}%`;
});