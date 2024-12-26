// banmenDisplay.js
async function loadBanmenData() {
    const banmenText = await fetch('Banmen.txt').then(r => r.text());
    const lines = banmenText.split('\n').filter(line => line.includes('['));
    const layout = lines.map(line => JSON.parse(line.replace(/\s/g, '')));
    return layout;
   }
   
   function createCell(value) {
    const cell = document.createElement('div');
    cell.style.width = '32px';
    cell.style.height = '32px';
    cell.style.position = 'relative';
   
    const baseImg = document.createElement('img');
    baseImg.src = 'https://t-arashiyama.com/wp-content/uploads/2024/12/renga_s.png';
    baseImg.style.position = 'absolute';
    baseImg.style.width = '100%';
    baseImg.style.height = '100%';
    cell.appendChild(baseImg);
   
    if (value === 1) {
      const sakuImg = document.createElement('img');
      sakuImg.src = 'https://t-arashiyama.com/wp-content/uploads/2024/12/saku1.png';
      sakuImg.style.position = 'absolute';
      sakuImg.style.width = '100%';
      sakuImg.style.height = '100%';
      cell.appendChild(sakuImg);
    } else if (value === 2) {
      const rocketImg = document.createElement('img');
      rocketImg.src = 'https://t-arashiyama.com/wp-content/uploads/2024/12/rocket_tri.png';
      rocketImg.style.position = 'absolute';
      rocketImg.style.width = '100%';
      rocketImg.style.height = '100%';
      cell.appendChild(rocketImg);
    }
   
    return cell;
   }
   
   async function init() {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(9, 32px)';
    container.style.gap = '0';
    document.body.appendChild(container);
   
    const layout = await loadBanmenData();
    layout.forEach(row => {
      row.forEach(value => {
        container.appendChild(createCell(value));
      });
    });
   }
   
   init();