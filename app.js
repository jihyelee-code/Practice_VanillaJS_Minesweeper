const btnOk = document.querySelector('#ok'),
    row = document.querySelector('#row'),
    column = document.querySelector('#column'),
    bomb = document.querySelector('#bomb'),
    paint = document.querySelector('#paint');
let rowV = '';
let columnV = '';
function btnHandler(event) {
    event.preventDefault();
    const set = document.querySelector('.set');
    const ET = event.target;
    const btnAll = document.querySelectorAll('.item');
    const parsedET = parseInt(ET.id);
    const parsedRow = parseInt(rowV);
    const parsedCol = parseInt(columnV);
    if (ET.classList.contains('bomb')) {
        console.log('폭탄 Boooommm')
        btnAll.forEach((btn) => {
            if (btn.classList.contains('bomb')) {
                btn.classList.add('bombImg');
            }
        })

    } else {
        ET.style.backgroundColor = 'lightslategray';
        ET.style.border = '1px solid lightslategray';
        const checkET = [];
        let cnt = 0;
        // checkET.push(parseInt(ET.id) - 1);
        // checkET.push(parseInt(ET.id) + 1);
        // checkET.push(parseInt(ET.id) - 11);
        // checkET.push(parseInt(ET.id) - 10);
        // checkET.push(parseInt(ET.id) - 9);
        // checkET.push(parseInt(ET.id) + 9);
        // checkET.push(parseInt(ET.id) + 10);
        // checkET.push(parseInt(ET.id) + 11);
        if (parsedET === 1) {
            checkET.push(parsedET + 1);
            checkET.push(parsedET + 10);
            checkET.push(parsedET + 11);
        } else if (parsedET === parsedRow) { //오른쪽 위 구석
            checkET.push(parsedET - 1);
            checkET.push(parsedET + 9);
            checkET.push(parsedET + 10);
        } else if (parsedET > 1 && parsedET < parsedRow) {
            checkET.push(parsedET - 1);
            checkET.push(parsedET + 1);
            checkET.push(parsedET + 9);
            checkET.push(parsedET + 10);
            checkET.push(parsedET + 11);
        } else if (parsedET === parsedRow * parsedCol - parsedRow + 1) {
            //왼쪽 아래 구석
            checkET.push(parsedET + 1);
            checkET.push(parsedET - 10);
            checkET.push(parsedET - 9);
        } else if (parsedET % 10 === 1) { 
            //왼쪽 줄
            checkET.push(parsedET -10);
            checkET.push(parsedET - 9);
            checkET.push(parsedET + 1);
            checkET.push(parsedET + 10);
            checkET.push(parsedET + 11);
        } else if (parsedET === parsedRow * parsedCol) {
            //오른쪽 아래 구석
            checkET.push(parsedET - 1);
            checkET.push(parsedET - 11);
            checkET.push(parsedET - 10);
        } else if (parsedET > parsedRow * parsedCol - parsedRow && (parsedET < parsedRow * parsedCol)) {
            //아랫줄
            checkET.push(parsedET - 10);
            checkET.push(parsedET - 9);
            checkET.push(parsedET - 11);
            checkET.push(parsedET - 1);
            checkET.push(parsedET + 1);
        } else if (parsedET % 10 === 0) {
            //오른쪽 줄
            checkET.push(parsedET - 10);
            checkET.push(parsedET - 11);
            checkET.push(parsedET - 1);
            checkET.push(parsedET + 9);
            checkET.push(parsedET + 10);
        } else {
            checkET.push(parsedET - 1);
            checkET.push(parsedET + 1);
            checkET.push(parsedET - 11);
            checkET.push(parsedET - 10);
            checkET.push(parsedET - 9);
            checkET.push(parsedET + 9);
            checkET.push(parsedET + 10);
            checkET.push(parsedET + 11);
        }
        for (let i = 0; i < checkET.length; i++) {
            if (btnAll[checkET[i] - 1].classList.contains('bomb')) {
                cnt++;
            }
            if (!(btnAll[checkET[i] - 1].classList.contains('bomb'))) {
                btnAll[checkET[i] - 1].style.backgroundColor = 'lightslategray';
                btnAll[checkET[i] - 1].style.border = '1px solid lightslategray';
            }
        }
        ET.classList.remove('flag');
        if (cnt !== 0) {
            ET.innerText = cnt;
        }
    }
}
function rightClickHandler(event) { //깃발 기능
    event.preventDefault();
    const ET = event.target;
    if (ET.classList.contains('item')) {
        ET.classList.toggle('flag');
    }
}
function putBomb(num, bombV) {
    //폭탄위치 배열
    const emptyArray = [];
    for (let i = 0; i < bombV; i++) {
        //랜덤숫자 폭탄위치 생성
        const bombNum = Math.floor(Math.random() * num) + 1;
        emptyArray.push(bombNum);
    }
    const btnAll = document.querySelectorAll('.item');
    btnAll.forEach((btn) => {
        for (let i = 0; i < emptyArray.length; i++) {
            if (btn.id === JSON.stringify(emptyArray[i])) {
                btn.classList.add('bomb')
            }
        }
    })

}
function clickHandler(event) {
    event.preventDefault();
    const set = document.querySelector('.set');
    rowV = row.value;
    columnV = column.value;
    const bombV = bomb.value;
    const num = rowV * columnV;
    set.innerText = `${rowV} x ${columnV}, Bomb:${bombV}`;
    while (paint.hasChildNodes()) {
        paint.removeChild(paint.firstChild);
    }
    for (let i = 0; i < num; i++) {
        const btn = document.createElement('button');
        btn.innerText = '';
        btn.id = `${i + 1}`;
        btn.classList.add('item');
        btn.addEventListener('click', btnHandler);
        paint.appendChild(btn);
    }
    paint.style.width = `${20 * rowV}px`
    paint.style.height = `${20 * columnV}px`
    paint.style.gridTemplateColumns = `repeat(${columnV}, 1fr)`;
    row.value = "";
    column.value = "";
    bomb.value = "";
    putBomb(num, bombV);
}
function init() {
    btnOk.addEventListener('click', clickHandler);
    paint.addEventListener('contextmenu', rightClickHandler);
}

init();