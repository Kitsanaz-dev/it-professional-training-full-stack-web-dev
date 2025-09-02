const students = [
  { name: 'Alice', age: 20},
  { name: 'Bob', age: 22},
  { name: 'Charlie', age: 23},
  { name: 'David', age: 21},
];

console.log(`Students: ${JSON.stringify(students)}`);

students.forEach((student, index) => {
    console.log(`Student ${index + 1}: ${student.name}, Age: ${student.age}`);
});
