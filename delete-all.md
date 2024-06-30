# 如何快速删除自己的知乎回答~

```js
// 删除单个回答
function deleteAnswer(answerId) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("DELETE", "https://www.zhihu.com/api/v4/answers/" + answerId);
    xhr.setRequestHeader("authority", "www.zhihu.com");
    xhr.setRequestHeader("accept", "*/*");
    xhr.setRequestHeader("accept-language", "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7");
    xhr.send();
    console.log('delete answer: ' + answerId + ' success');
}

// 清理整页回答（小于100字）
function clearAllAnswers(longer_than = 100) {
    let answerItemList = document.querySelectorAll('.AnswerItem');
    for (let answerItem of answerItemList) {
        let answerContentDev = answerItem.querySelector('.RichContent-inner');
        if (!answerContentDev) {
            continue;
        }
        let ans_id = answerItem.getAttribute('name');

        let answerContent = answerContentDev.innerText;
        if (answerContent.length >= longer_than) {
            console.log(`answer:${ans_id} is too long, skip`);
            continue
        }
        console.log(`delete answerContent: ${answerContent}`);
        deleteAnswer(ans_id);
    }
}
```

定位到回答列表页，打开浏览器控制台（F12），

把上面的代码复制到 Console 输入处，回车。



然后输出 clearAllAnswers(50) ，回车。


PS: 50代表抄过50字的回答不处理。

不断切页，重复输入

clearAllAnswers(50)
完事。

发布于 2024-03-01 16:58・IP 属地上海
