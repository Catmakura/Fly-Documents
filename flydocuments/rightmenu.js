/* =====================
  開発中
===================== */
const menu = document.getElementById('context-menu');

// 右クリックでメニュー表示
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  menu.style.display = 'block';
  menu.style.left = `${e.pageX}px`;
  menu.style.top = `${e.pageY}px`;
});

// 左クリックでメニューを閉じる
document.addEventListener('click', () => {
  menu.style.display = 'none';
});

// メニュー内クリックが document に伝播しないようにする
menu.addEventListener('click', async (e) => {
  e.stopPropagation();

  const action = e.target.dataset.action;
  if (!action) return;

  try {
    const active = document.activeElement;

    switch (action) {
      case 'copy': {
        const selectedText = window.getSelection().toString();
        if (!selectedText) {
          alert('コピーするテキストが選択されていません');
          break;
        }
        await navigator.clipboard.writeText(selectedText);
        break;
      }

      case 'paste': {
        if (
          active &&
          (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')
        ) {
          const text = await navigator.clipboard.readText();

          const start = active.selectionStart;
          const end = active.selectionEnd;

          active.value =
            active.value.slice(0, start) +
            text +
            active.value.slice(end);

          active.selectionStart = active.selectionEnd = start + text.length;
        } else {
          alert('貼り付け先を選択してください');
        }
        break;
      }

      case 'delete': {
        if (
          active &&
          (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')
        ) {
          const start = active.selectionStart;
          const end = active.selectionEnd;

          if (start !== end) {
            active.value =
              active.value.slice(0, start) +
              active.value.slice(end);
            active.selectionStart = active.selectionEnd = start;
          }
        }
        break;
      }
    }
  } catch (err) {
    console.error(err);
    alert('操作に失敗しました');
  }

  menu.style.display = 'none';
});
