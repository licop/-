# ES6 Map()方法

## 基本含义

ES6提供了Map数据结构，它类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值（包括对象) 都可以当作键。也就是说，Object结构提供了“字符串-值”的对应，Map结构提供了“值--值得”对应，是一种更完善的Hash结构实现。如果需要“键值对”的数据结构，Map比Object更合适。

```
 const m = new Map();
 
 const o = {p: 'hello world'}
  
  m.set(o,  'content');
  m.get(o); // "content"
  
  m.has(o)
  m.delete(o)
```

作为构造函数，Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。该数组的成员是一个个表示键值对的数组

```
const map1 = new Map([["name", "licop"], ["age", "25"]]);
map1.get(name)；
map1.get('name');  // "licop"
map1.has('name'); // true
```

Set和Map都可以用来生成新的Map
```
   const m1 = new Map([["baz", 3]]);
   
   const m2 = new  Map(m1)
   
   m2.get('baz') // 3
```

## 示例的属性和操作方法

- **size属性：** 返回Map结构的成员总数
- **set(key, value):** set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。  
- **get(key):** 方法读取key对应的键值，如果找不到key，则返回undefined
- **has(key):** 返回一个布尔值，表示某个键是否在Map数据结构中
- **delete(key)**： 
- **clear()**: clear方法清除所有成员，没有返回值


## 遍历方法

- keys(): 返回键名的遍历器
- values(): 返回键值的遍历器
- entries()：返回所有成员的遍历器
- forEach(): 遍历Map的所有成员

## 与其他数据结构的相互转换

### Map转为数组
Map转为数组最方便的方法就是使用扩展运算符（...）

```
   [...myMap]
```

### 数组转为Map
 
 ```
   new Map([[ture, 7], [{foo: 3}, ['abc']]])
 ```

### Map转为对象

```
  function strMapToObj(strMap) {
      let obj = {};
      for(let [k, v] of strMap) {
      	   obj[k] = v;
      }
      return obj
  }
```

### 对象转为Map

```
  function objToStrMap(obj) {
     let strMap = new Map();
     for(let k of Object.keys(obj)) {
         strMap.set(k, obj[k])
     }
     return strMap;
  }
```





