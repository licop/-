### Tasks, microtasks, queues and schedules（翻译）

（注本文中的tasks指宏任务，即marcotasks）

考虑下面 JavaScript 代码：

```
  console.log('script start');
  
  setTimeout(function(){
     console.log('setTimeout')
  }, 0);
  
  Promise.resolve().then(function() {
      console.log('promise1');
  }).then(function() {
     console.log('promise2');
  })
  
  console.log('script end');
```
打印的顺序是？

正确的答案是：script start, script end, promise1, promise2, setTimeout，但是各浏览器不一致。

Microsoft Edge, Firefox 40, iOS Safari 及桌面 Safari 8.0.8 在 promise1 和 promise2 之前打印 setTimeout ——尽管这似乎是竞争条件导致的。很奇怪的是，Firefox 39 和 Safari 8.0.7 是对的。

### 为什么会这样

要了解这一点，您需要了解事件循环如何处理任务和微任务。第一次遇到这个问题可能会让您大吃一惊。深呼吸… 

每个线程都有自己的事件循环，所以每个 web worker 有自己的事件循环（event loop），所以它能独立地运行。而所有同源的 window 共享一个事件循环，因为它们能同步的通讯。事件循环持续运行，执行 tasks 列队。一个事件循环有多个 task 来源，并且保证在 task 来源内的执行顺序（IndexedDB 等规范定义了自己的 task 来源），在每次循环中浏览器要选择从哪个来源中选取 task，这使得浏览器能优先执行敏感 task，例如用户输入。

Tasks 被列入队列，于是浏览器能从它的内部转移到 Javascript/DOM 领地，并且确使这些 tasks 按序执行。在 tasks 之间，浏览器可以更新渲染。来自鼠标点击的事件回调需要安排一个 task，解析 HTML 和 setTimeout 同样需要。

setTimeout 延迟给定的时间，然后为它的回调安排一个新的 task。这就是为什么 setTimeout 在 script end 之后打印，script end 在第一个 task 内，setTimeout 在另一个 task 内。

Mircotasks 通常用于安排一些事，它们应该在正在执行的代码之后立即发生，例如响应操作，或者让操作异步执行，以免付出一个全新 task 的代价。mircotask 队列在回调之后处理，只要没有其它执行当中的（mid-execution）代码；或者在每个 task 的末尾处理。在处理 microtasks 队列期间，新添加的 microtasks 添加到队列的末尾并且也被执行。 microtasks 包括 mutation observer 回调。上面的例子中的 promise 的回调也是。

promise 一旦解决（settled），或者已解决，它便为它的回调安排一个 microtask。这确使 promise 回调是异步的，即便 promise 已经解决。因此一个已解决的 promise 调用 .then(yey, nay) 将立即把一个 microtask 加入队列。这就是为什么 promise1 和 promise2 在 script end 之后打印，因为正在运行的代码必须在处理 microtasks 之前完成。promise1 和 promise2 在 setTimeout 之前打印，因为 microtasks 总是在下一个 task 之前执行。

### 怎么知道是task还是microtask

测试是一种办法，查看相对于 promise 和 setTimeout 如何打印，尽管这取决于实现是否正确。

一种方法是查看规范。例如，[setTimeout 的第十四步](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timer-initialisation-steps)将一个 task 加入队列，[mutation record 的第五步](https://dom.spec.whatwg.org/#queue-a-mutation-record)将 microtask 加入队列。

如上所述，ECMAScript 将 microtask 称为 job。[PerformPromiseThen 的第八步](https://dom.spec.whatwg.org/#queue-a-mutation-record)调用 EnqueueJob 将一个 microtask 加入队列。

现在，让我们看一个更复杂的例子。

### 例子1 
这是一些html:
```
   <div class="outer">
       <div class="inner"></div>
   </div>
```
给定以下JS，如果我单击div.inner将记录什么？ 

```
 // Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function () {
  console.log('mutate');
}).observe(outer, {
  attributes: true,
});

// Here's a click listener…
function onClick() {
  console.log('click');

  setTimeout(function () {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function () {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
```

答案是： click promise mutate click promise mutate timeout timeout


### 总结
- tasks按需执行，浏览器会在tasks之间执行渲染
-  mircotasks按序执行，在下面情况是执行：
   - 在每个回调之后，只要没有其他代码正在运行
   - 在每个task的末尾

   
  [原文地址](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)






