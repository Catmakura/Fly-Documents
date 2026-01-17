/* =====================
  ファイルを開く
===================== */
async function openFile() {
    try {
        [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const text = await file.text();
        editor.value = text;
        originalContent = text;
        originalFileName = file.name;
        currentFile.value = originalFileName;
        historyStack = [];
        redoStack = [];
        document.title = originalFileName + " - Fly Documents";
        updateFileInfo();
    } catch (e) {}
}

/* =====================
  新規ファイル
===================== */
function createNewFile() {
    const fname = prompt("ファイル名を入力（例: 新規.txt）", "新規.txt");
    if (!fname) return;
    if (/[\\\/:*?"<>|]/.test(fname)) {
        alert("使用できない文字が含まれています");
        return;
    }
    editor.value = "";
    currentFile.value = fname;
    originalFileName = fname;
    originalContent = "";
    fileHandle = null;
    historyStack = [];
    redoStack = [];
    document.title = fname + " - Fly Documents";
    updateFileInfo();
}

/* =====================
  raw保存
===================== */
async function saveFile() {
    const name = currentFile.value.trim();
    if (!name) return alert("ファイル名を入力してください");

    try {
        const blob = new Blob([editor.value], { type: "text/plain" });

        if (fileHandle) {
            const w = await fileHandle.createWritable();
            await w.write(blob);
            await w.close();
        } else {
            fileHandle = await window.showSaveFilePicker({
                suggestedName: name,
            });
            const w = await fileHandle.createWritable();
            await w.write(blob);
            await w.close();
        }
        alert("保存しました！");
        originalFileName = name;
        originalContent = editor.value;
        document.title = name + " - Fly Documents";
    } catch (e) {
        alert("保存に失敗しました");
    }
}

/* =====================
  .fdt保存
===================== */
async function savefdtFile() {
    const name = currentFile.value.trim();
    if (!name) return alert("ファイル名を入力してください");

    try {
        const blob = new Blob([editor.value], { type: "text/plain" });

        if (fileHandle) {
            const w = await fileHandle.createWritable();
            await w.write(blob);
            await w.close();
        } else {
            fileHandle = await window.showSaveFilePicker({
                suggestedName: name,
            });
            const w = await fileHandle.createWritable();
            await w.write(blob);
            await w.close();
        }
        alert("保存しました！");
        originalFileName = name;
        originalContent = editor.value;
        document.title = name + " - Fly Documents";
    } catch (e) {
        alert("保存に失敗しました");
    }
}