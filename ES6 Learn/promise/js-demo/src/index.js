// 定时器
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done')
    }, ms);
  })
}

timeout(1000).then((value)=> {
  console.log(value);
})


// 异步加载图片
function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = function() {
      resolve(image)
    }
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    } 

    image.src = url;
  })
}

loadImageAsync('https://wx1.sinaimg.cn/large/a26409a6ly1gk4urwct1rj20u00g5h1s.jpg').then((value) => {
  document.getElementById('app').appendChild(value)
})

// promise完成ajax操作
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const handler = function() {
      if(this.readyState !== 4) {
        return;
      }
      if(this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText));
      }
    }
    
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', "application/json");
    client.send();
  })

}
 
// 调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。
// 这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1




