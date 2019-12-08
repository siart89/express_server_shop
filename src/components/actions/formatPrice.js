export default (str) => +str.replace(/[\sр.]/g, '').replace(/,/, '.');
