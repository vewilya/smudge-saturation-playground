import {el} from '@elemaudio/core';


export function saturation(drive, sine, a, b, c, d, x){
     let A = el.mul(a, el.pow(x, 3));
     let B = el.mul(b, el.pow(x, 5));
     let C = el.mul(c, el.pow(x, 3));
     let D = el.mul(d, x);

     let cheb = el.add(el.sub( el.add( A, B ), C), D);
     let si =  el.sin( el.mul(sine, cheb)); 
     let sat =  el.div( el.tanh(el.mul(drive, si)), el.tanh(drive) );

     let unity =  el.sub( 2.5, el.mul(sine, .5));
          return sat
}


