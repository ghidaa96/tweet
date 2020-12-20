export function loadTweet(callBack) {
    const xhr = new XMLHttpRequest()
    const method = "GET"
    const url = "http://localhost:8000/api/tweets"
    const resposeType = "json"
    xhr.responseType = resposeType;
    xhr.open(method, url)
    xhr.onload = function () {
        callBack(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
        console.log(e);
        callBack({ "message": "the request is in error" }, 400);

    }
    xhr.send();
}
