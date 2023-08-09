const moment = require('moment');
const datee1 = '2023-08-05T23:37'
const datee = moment(datee1).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
console.log(datee)
console.log(moment(datee).utc())
console.log(moment(datee).utc().add(2, 'hours'))


let current = new Date();
 let current_utc =  moment(current).utc()

console.log(current_utc)