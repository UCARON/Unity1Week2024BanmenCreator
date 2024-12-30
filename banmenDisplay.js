// banmenDisplay.js
async function loadBanmenData() {
    const banmenText = await fetch('Banmen.txt').then(r => r.text());
    const lines = banmenText.split('\n').filter(line => line.includes('['));
    const layout = lines.map(line => JSON.parse(line.replace(/\s/g, '')));
    return layout;
}

function downloadLayout() {
    const container = document.getElementById('container');
    const layout = [];
    let currentRow = [];

    Array.from(container.children).forEach((cell, index) => {
        currentRow.push(parseInt(cell.dataset.value));
        if ((index + 1) % 9 === 0) {
            layout.push([...currentRow]);
            currentRow = [];
        }
    });

    const content = layout.map(row => `[${row.join(',')}]`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Banmen.txt';
    a.click();
}

function createCell(value, x, y) {
    const cell = document.createElement('div');
    cell.style.width = '32px';
    cell.style.height = '32px';
    cell.style.position = 'relative';
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.dataset.value = value;

    const rengaImg = document.createElement('img');
    rengaImg.src = 'renga_s.png';
    rengaImg.style.width = '100%';
    rengaImg.style.position = 'absolute';
    cell.appendChild(rengaImg);

    if (value === 1) {
        const sakuImg = document.createElement('img');
        sakuImg.src = 'saku1.png';
        sakuImg.style.width = '100%';
        sakuImg.style.position = 'absolute';
        cell.appendChild(sakuImg);
    } else if (value === 2) {
        const rocketImg = document.createElement('img');
        rocketImg.src = 'rocket_tri.png';
        rocketImg.style.width = '100%';
        rocketImg.style.position = 'absolute';
        cell.appendChild(rocketImg);
    } else if (value === 3) {
        const kutusitaImg = document.createElement('img');
        kutusitaImg.src = 'kutusita3.png';
        kutusitaImg.style.width = '100%';
        kutusitaImg.style.position = 'absolute';
        cell.appendChild(kutusitaImg);
    }else if (value === 4) {
        const bombImg = document.createElement('img');
        bombImg.src = 'bomb_1.png';
        bombImg.style.width = '100%';
        bombImg.style.position = 'absolute';
        cell.appendChild(bombImg);
    }else if (value === 5) {
        const wantedImg = document.createElement('img');
        wantedImg.src = 'wanted.png'; // Add the wanted image
        wantedImg.style.width = '100%';
        wantedImg.style.position = 'absolute';
        cell.appendChild(wantedImg);
    }

    return cell;
}

function downloadLayout() {
    const container = document.getElementById('container');
    const layout = [];
    let currentRow = [];

    Array.from(container.children).forEach((cell, index) => {
        currentRow.push(parseInt(cell.dataset.value));
        if ((index + 1) % 9 === 0) {
            layout.push([...currentRow]);
            currentRow = [];
        }
    });

    const content = layout.map(row => `[${row.join(',')}]`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Banmen.txt';
    a.click();
}

// パレットとセレクターを追加
function createPalette() {
    const palette = document.createElement('div');
    palette.style.position = 'fixed';
    palette.style.right = '20px';
    palette.style.top = '20px';
    palette.style.display = 'flex';
    palette.style.flexDirection = 'column';
    palette.style.gap = '10px';
    palette.style.background = 'white';
    palette.style.padding = '10px';
    palette.style.border = '1px solid #ccc';
    palette.style.borderRadius = '5px';
    palette.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

    const items = [
        { value: 0, img: null, label: '空', description: '0番 何も置かない' },
        { value: 1, img: 'saku1.png', label: '柵', description: '1番 固定壁' },
        { value: 2, img: 'rocket_tri.png', label: 'ロケット', description: '2番 ロケット' },
        { value: 3, img: 'kutusita3.png', label: '靴下', description: '3番 靴下' },
        { value: 4, img: 'bomb_1.png', label: 'ボム', description: '4番 爆弾' },
        { value: 5, img: 'wanted.png', label: 'ワンテッド', description: '5番 ワンテッドポスター' } // Add new item
    ];

    let selectedValue = 0;

    items.forEach(item => {
        const itemContainer = document.createElement('div');
        itemContainer.style.textAlign = 'center';

        const button = document.createElement('button');
        button.style.width = '60px';
        button.style.height = '60px';
        button.style.position = 'relative';
        button.style.border = '1px solid #ccc';
        button.style.borderRadius = '5px';
        button.style.background = 'white';

        if (item.img) {
            const img = document.createElement('img');
            img.src = item.img;
            img.style.width = '100%';
            img.style.height = '100%';
            button.appendChild(img);
        } else {
            button.textContent = item.label;
        }

        const label = document.createElement('div');
        label.textContent = item.description;
        label.style.fontSize = '12px';
        label.style.marginTop = '5px';
        label.style.color = '#666';

        button.onclick = () => {
            selectedValue = item.value;
            palette.querySelectorAll('button').forEach(btn => {
                btn.style.border = '1px solid #ccc';
                btn.style.boxShadow = 'none';
            });
            button.style.border = '2px solid #007bff';
            button.style.boxShadow = '0 0 5px rgba(0,123,255,0.5)';
        };

        itemContainer.appendChild(button);
        itemContainer.appendChild(label);
        palette.appendChild(itemContainer);
    });

    // クリック時の動作を変更
    const oldCreateCell = createCell;
    createCell = (value, x, y) => {
        const cell = oldCreateCell(value, x, y);
        cell.onclick = () => {
            cell.dataset.value = selectedValue;  // パレットで選択された値を使用
            cell.innerHTML = '';
            oldCreateCell(selectedValue, x, y).childNodes.forEach(node => cell.appendChild(node.cloneNode(true)));
        };
        return cell;
    };

    return palette;
}

// init関数を修正
async function init() {
    const palette = createPalette();
    document.body.appendChild(palette);

    const container = document.createElement('div');
    container.id = 'container';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(9, 32px)';
    container.style.gap = '0';
    document.body.appendChild(container);

    const layout = await loadBanmenData();
    layout.forEach((row, y) => {
        row.forEach((value, x) => {
            container.appendChild(createCell(value, x, y));
        });
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '10px';

    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Banmen.txt';
    downloadBtn.onclick = downloadLayout;
    buttonContainer.appendChild(downloadBtn);

    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear All';
    clearBtn.style.marginLeft = '10px';
    clearBtn.onclick = () => {
        Array.from(container.children).forEach(cell => {
            cell.dataset.value = 0;
            cell.innerHTML = '';
            createCell(0, cell.dataset.x, cell.dataset.y).childNodes.forEach(node =>
                cell.appendChild(node.cloneNode(true)));
        });
    };
    buttonContainer.appendChild(clearBtn);

    // ファイル選択機能を追加
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt';
    fileInput.style.display = 'none';

    const openBtn = document.createElement('button');
    openBtn.textContent = 'Open Banmen.txt';
    openBtn.style.marginLeft = '10px';
    openBtn.onclick = () => fileInput.click();

    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.includes('['));
        const layout = lines.map(line => JSON.parse(line.replace(/\s/g, '')));
        
        container.innerHTML = '';
        layout.forEach((row, y) => {
            row.forEach((value, x) => {
                container.appendChild(createCell(value, x, y));
            });
        });
    };

    buttonContainer.appendChild(openBtn);
    buttonContainer.appendChild(fileInput);

    document.body.appendChild(buttonContainer);
}

init();
