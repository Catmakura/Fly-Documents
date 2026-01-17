
function printFile() {
    const text = document.getElementById("editor").value;

    const w = window.open("", "", "width=800,height=600");

    w.document.write(`
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>Print</title>
<style>
    @page {
        size: A4;
        margin: 20mm;
    }

    body {
        font-family: "Meiryo", "Hiragino Sans", sans-serif;
        white-space: pre-wrap;
        word-break: break-word;
        line-height: 1.6;
        font-size: 12pt;
    }
</style>
</head>
<body>
${escapeHtml(text)}
</body>
</html>
    `);

    w.document.close();
    w.focus();
    w.print();
}
