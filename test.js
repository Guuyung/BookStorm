let b={name:'xxx',age:180};
let a={s:'aaa'}
Object.assign(b,a,{['name']:'sss'});
console.log(b)