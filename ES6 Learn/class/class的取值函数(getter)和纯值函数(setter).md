# class的取值函数(getter)和纯值函数(setter)

## Getter
get语法将对象属性绑定到查询该属性时将被调用的函数。

### 对象

```
  const obj = {
	  log: ['a', 'b', 'c'],
	  get latest() {
	    if (this.log.length === 0) {
	      return undefined;
	    }
	    return this.log[this.log.length - 1];
	  }
  };
  
  console.log(obj.latest);   // c
```

### 使用class 


```
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
.// 如果不加get，使用inst.latest()效果一样
console.log(inst.latest); // c
```

## Setter

当尝试设置属性时，set语法将对象属性绑定到要调用的函数。

### 对象

```
     const language = {
	  set current(name) {
	    this.log.push(name);
	  },
	  log: []
	};
	
	language.current = 'EN';
	language.current = 'FA';
	
	console.log(language.log);
	// expected output: Array ["EN", "FA"]
```

### 使用class 

```
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


console.log(lang.logger);
```




