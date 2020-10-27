# ES6的class和ES5原型函数除了写法以外还有什么区别？


 **1.class 的所有方法（包括静态方法和实例方法）都是不可枚举的。**

```
      // 引用一个未声明的变量
	function Bar() {
	  this.bar = 42;
	}
	Bar.answer = function() {
	  return 42;
	};
	Bar.prototype.print = function() {
	  console.log(this.bar);
	};
	const barKeys = Object.keys(Bar); // ['answer']
	const barProtoKeys = Object.keys(Bar.prototype); // ['print']
	
	class Foo {
	  constructor() {
	    this.foo = 42;
	  }
	  static answer() {
	    return 42;
	  }
	  print() {
	    console.log(this.foo);
	  }
	}
	const fooKeys = Object.keys(Foo); // []
	const fooProtoKeys = Object.keys(Foo.prototype); // []
```

**2.class 声明内部会启用严格模式**

```
// 引用一个未声明的变量
function Bar() {
  baz = 42; // it's ok
}
const bar = new Bar();

class Foo {
  constructor() {
    fol = 42; // ReferenceError: fol is not defined
  }
}
const foo = new Foo();
```

**3.class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。**

```
const bar = new Bar(); // it's ok
function Bar() {
  this.bar = 42;
}

const foo = new Foo(); // ReferenceError: Foo is not defined
class Foo {
  constructor() {
    this.foo = 42;
  }
}
```
**4.必须使用 new 调用 class**

```
function Bar() {
  this.bar = 42;
}
const bar = Bar(); // it's ok

class Foo {
  constructor() {
    this.foo = 42;
  }
}
const foo = Foo();
```
**5.class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。**

```

function Bar() {
  this.bar = 42;
}
Bar.prototype.print = function() {
  console.log(this.bar);
};

const bar = new Bar();
const barPrint = new bar.print(); // it's ok

class Foo {
  constructor() {
    this.foo = 42;
  }
  print() {
    console.log(this.foo);
  }
}
const foo = new Foo();
const fooPrint = new foo.print(); 

```

