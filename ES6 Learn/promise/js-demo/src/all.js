// 多个异步任务并发运行
const promises = [2, 3, 5, 7, 11, 13].map((id) => {
    return getJSON('/post/' + id + '.json');
})

Promise.all(promises).then((post) => {
    
}).catch((reason) => {

})


// 
const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
  .then(result => result)
  .catch(e => e);
  
  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
  .then(result => result)
  .catch(e => e);
  
  Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(e => console.log(e));
  // ["hello", Error: 报错了]