export function curvedValue(x, curve) {
     return  (Math.pow(Math.E, x*curve) - 1) / (Math.pow(Math.E, curve) - 1);
}