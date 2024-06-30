// 动态加载外部JavaScript库的函数
function loadScript(url, callback) {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {  // 仅用于IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  // 其他浏览器
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// 动态加载JSZip和FileSaver.js库
function loadLibraries(callback) {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js', function () {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js', callback);
    });
}

// 定义生成并下载ZIP文件的函数
function generateAndDownloadZip(answerList) {
    const zip = new JSZip();

    answerList.forEach((content, idx) => {
        const filename = `file${idx + 1}.md`;
        zip.file(filename, content);
    });

    // 获取当前日期和时间，格式为：yyyyMMdd_HHmmss
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`;

    const filename = `zhihu-backup_${timestamp}.zip`;

    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, filename);
        });
}

// 加载库并定义全局下载函数
loadLibraries(function () {
    console.log("Libraries loaded and functions are ready to use!");

    // 使用示例:
    // 你可以在库加载完成后调用 generateAndDownloadZip 函数，并传入一个 answerList 参数
    // generateAndDownloadZip(["This is the content of xxx", "This is the content of yyy"]);
});

// 现在，你可以在控制台中调用 generateAndDownloadZip(["xxx", "yyy"]); 来生成并下载包含日期时间信息的ZIP文件