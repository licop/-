// function Point(x, y) {
//     this.x = x;
//     this.y = y;
// }

// Point.prototype.toString = function() {
//     return '(' + this.x + ',' + this.y + ')';
// }

// var p = new Point(1, 2);

let name = 'getName';
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }

    [name]() {
        console.log('licop')
    }
}

console.log(typeof Point); // function
// prototype对象的constructor属性直接指向“类”本身
console.log(Point === Point.prototype.constructor); // true
let point = new Point();
point.getName(); // licop

point.hasOwnProperty('x') // true;
point.hasOwnProperty('toString') // false;
point.__proto__.hasOwnProperty('toString') // true;

Point.name; // Point

// 等同于
// Point.prototype  = {
//    constructor() {},
//    toString()
// };


// this的指向
// 类的方法内部如果含有this，它将默认指向类的实例
class Logger {
    // 解决办法1： 在构造函数中绑定this
    // constructor() {
    //     this.printName = this.printName.bind(this);
    // }
    // 解决办法2： 使用箭头函数
    printName = (name = 'there') => {
        this.print(`hello ${name}`);
    }
    // printName(name = 'there') {
    //     this.print(`hello ${name}`);
    // }
    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
const {printName} = logger;
printName(); // Cannot read property 'print' of undefined

// const obj = {
//     log: ['a', 'b', 'c'],
//     get latest() {
//       if (this.log.length === 0) {
//         return undefined;
//       }
//       return this.log[this.log.length - 1];
//     }
// };
 
// console.log(obj.latest, 80);

class myClass {
    constructor() {
        this.log = ['a', 'b', 'c'];
    }

    get latest() {
        if (this.log.length === 0) {
            return undefined;
        }
        return this.log[this.log.length - 1];
    }
}

let inst = new myClass();
console.log(inst.latest);

class language {
    constructor() {   
        this.logger = []
    }
    
    set current(name) {
        this.logger.push(name)
    }
}

let lang = new language();
lang.current = 'EN';
lang.current = 'FA';

console.log(lang.logger, 111);


// 静态方法
class Foo {
    static classMethod() {
        return 'hello'
    }
}
Foo.classMethod(); // hello

var foo = new Foo();
foo.classMethod(); // foo.classMethod is not a function


