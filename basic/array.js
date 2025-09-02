const fruits = ['apple', 'banana', 'cherry'];

fruits.push('dragonfruit');
fruits.push('elderberry');
fruits.unshift('orange');

console.log(`Fruits: ${fruits.join(', ')}`);
console.log(`This fruit [${fruits.indexOf('banana')}] is : ${fruits[2]}`);
console.log(`This fruit [${fruits.indexOf('dragonfruit')}] is : ${fruits[4]}`);

console.log(`Total Fruits: ${fruits.length}`);