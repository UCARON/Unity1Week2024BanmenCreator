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
   
    if (value === 1) {
      const sakuImg = document.createElement('img');
      sakuImg.src = 'saku1.png';
      sakuImg.style.width = '100%';
      cell.appendChild(sakuImg);
    } else if (value === 2) {
      const rocketImg = document.createElement('img');
      rocketImg.src = 'rocket_tri.png';
      rocketImg.style.width = '100%';
      cell.appendChild(rocketImg);
    }
   
    cell.onclick = () => {
      cell.dataset.value = (parseInt(cell.dataset.value) + 1) % 3;
      cell.innerHTML = '';
      createCell(parseInt(cell.dataset.value), x, y).childNodes.forEach(node => cell.appendChild(node.cloneNode(true)));
    };
   
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
   
   async function init() {
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
   
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Banmen.txt';
    downloadBtn.onclick = downloadLayout;
    document.body.appendChild(downloadBtn);
   }
   
   init();