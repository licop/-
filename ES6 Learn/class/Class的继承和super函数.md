# Class的继承和super函数

Class可以通过extends关键字实现继承，这比ES5通过修改原型链实现继承更加清晰和方便。 

```
  class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        // this.color = color; // this关键字在color之前会报错
        super(x, y)
        this.color = color;
    }
    toString() {
        console.log(this.color + ' ' + super.toString()); 
    }
}

let cp = new ColorPoint(1, 3, 'red')

cp.toString() // red (1,3)
```

如果子类没有定义construction方法，那么这个方法会被默认添加。

```
class ColorPonit extends Point {}

// 等同于
 class ColorPoint extends Point {
    constructor(...args) {
             super(...args);
        this.color = color;
     }
  }
```

## super 关键字

super这个关键字既可以当做函数使用，也可以当做对象使用。在这两种情况下，它的用法完全不同。

### 当函数使用

super作为函数调用时代表父类的构造函数。ES6要求，子类的构造函数必须执行一次super函数。

```
  class A {}
  
  class B extends A {
     constructor() {
        super()
     }
  }
 
```

上面代码，子类B的构造函数中的super()代表调用父类的构造函数。这是必须的，否则Javascript引擎会报错。

### 当对象使用

super作为对象是在普通方法中指向父类的原型对象；在静态方法中指向父类

```
 class A {
	    p() {
	        return 2
	    }
  }
	  
class B extends A {
    constructor() {
      super()
      console.log(super.p()); // 2
    }
}
	
let b = new B();
```
上面的代码，子类B中的super.p()就是将super当作一个对象来使用。这时，super在普通方法之中指向A.prototype,所以super.p()就相当于A.prototype.p()

在使用super的时候，必须显示指定是作为函数还是作为对象使用，否则会报错

```
  class A {}
   
  class B extends A {
     constructor() {
        super()
        console.log(super) // 报错
     }
  }
```








