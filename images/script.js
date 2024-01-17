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

function decode(path) {
    target_arr = path.split('/').splice(2);
    target_arr.forEach((v, i, arr) => arr[i] = decodeURIComponent(arr[i]));
    return target_arr;
}

window.addEventListener('DOMContentLoaded', () => {
    const curr_path = location.pathname;
    let firstPath = curr_path.split('/')[1];

    if (firstPath === 'category') {
        category_function();
    } else if (firstPath === 'entry') {
        entry_function();
    }
});

function getScrollPercent() {
    return ((window.scrollY / (document.body.offsetHeight - window.innerHeight)).toFixed(2)) * 100;
}

const drawer_btn = document.getElementById('sidebar-btn');
drawer_btn.addEventListener('click', () => {
    const drawer = document.getElementById('left-sidebar');

    if (drawer.style.display === 'none') {
        drawer.style.width = "10rem";
        drawer.style.display = 'block';
    } else {
        drawer.style.display = 'none';
    }
})

window.addEventListener('scroll', () => {
    const percent = getScrollPercent();

    const loader = document.getElementById('loader');
    loader.style.width = `${percent}%`;
});
