// tutorial.js

// チュートリアルのデータ
const tutorialData = {
    title: "盤面エディタの使い方",
    sections: [
        {
            title: "基本操作",
            content: [
                "右側のパレットからアイテムを選択し、グリッド上のマスをクリックして配置できます。",
                "各アイテムの配置方法:",
                "- 空白マス(0番): 何も置かない状態に戻します",
                "- 柵(1番): 当たるとダメージを受ける障害物",
                "- ロケット(2番): まっすぐ飛んでくる障害物",
                "- アイテム(3番): 収集するおもちゃ",
                "- ボム(4番): 爆弾アイテムと",
                "- ワンテッド(5番): ポスターとして機能します",
                "- キー(6番): ドアを開けるための鍵",
                "- ドア(7番): ゴールとなるドア"
            ]
        },
        {
            title: "ファイル操作",
            content: [
                "盤面データの保存と読み込み:",
                "- [Download Banmen.txt] ボタン: 現在の盤面をファイルとして保存",
                "- [Open Banmen.txt] ボタン: 保存した盤面ファイルを読み込み",
                "- [Clear All] ボタン: 盤面をすべてクリア"
            ]
        }
    ]
};

// スタイルを追加
function addTutorialStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }

        .modal-close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            cursor: pointer;
            border: none;
            background: none;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }

        .modal-close:hover {
            background: #f0f0f0;
        }

        .modal-section {
            margin-bottom: 20px;
        }

        .modal-section h3 {
            margin-bottom: 10px;
            color: #333;
        }

        .modal-section p {
            margin: 5px 0;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);
}

// モーダルを作成
function createTutorialModal() {
    const modalHTML = `
        <div class="modal-overlay" id="tutorialModal">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2 style="margin-bottom: 20px;">${tutorialData.title}</h2>
                ${tutorialData.sections.map(section => `
                    <div class="modal-section">
                        <h3>${section.title}</h3>
                        ${section.content.map(text => `<p>${text}</p>`).join('')}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // イベントリスナーを設定
    const modal = document.getElementById('tutorialModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.onclick = () => hideModal();
    modal.onclick = (e) => {
        if (e.target === modal) {
            hideModal();
        }
    };
}

// モーダルを表示
function showModal() {
    const modal = document.getElementById('tutorialModal');
    modal.style.display = 'flex';
}

// モーダルを非表示
function hideModal() {
    const modal = document.getElementById('tutorialModal');
    modal.style.display = 'none';
}

// ヘルプボタンを追加
function addHelpButton(buttonContainer) {
    const helpBtn = document.createElement('button');
    helpBtn.textContent = '使い方';
    helpBtn.style.marginLeft = '10px';
    helpBtn.onclick = showModal;
    buttonContainer.appendChild(helpBtn);
}

// 初期化関数
function initTutorial() {
    addTutorialStyles();
    createTutorialModal();
}

// グローバルスコープで利用できるようにする
window.tutorialSystem = {
    init: initTutorial,
    addHelpButton: addHelpButton
};