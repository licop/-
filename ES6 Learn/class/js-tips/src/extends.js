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

// class ColorPoint extends Point {
//     constructor(...args) {
//         super(...args);
//         this.color = color;
//     }
// }

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