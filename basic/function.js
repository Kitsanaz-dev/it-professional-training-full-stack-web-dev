// 1.Function Declaration
function greetStudent(name){
    return `Hello, ${name}!`;
}

console.log(greetStudent("Alice"));
console.log(greetStudent("Bob"));

// 2.Function Expression
const calculateAge = function(year){
    return 2025 - year;
}

console.log(`I am ${calculateAge(2004)} years old.`);

const isAdult = (age) => age >= 18;

console.log(`ທ້າວ ສຸກເປັນ ${isAdult(calculateAge(2004)) ? 'ຜູ້ໃຫຍ່ແລ້ວ' : 'ຍັງເປັນເດັກນ້ອຍຢູ່'}`);

const getGrade = (score) => {
    if(score >= 90) return 'A';
    else if(score >= 80) return 'B';
    else if(score >= 70) return 'C';
    else if(score >= 60) return 'D';
    else return 'F';
}

console.log(`ທ້າວ ສຸກໄດ້ເກຣດ ${getGrade(85)}`);

const myProfile = {
    name: "Suk",
    age: 21,
    isStudent: true,
    greet: function() {
        return `ສະບາຍດີ, ຂ້ອຍຊື່ ${this.name}`;
    }
}

console.log(myProfile.name);
console.log(myProfile.age);
console.log(myProfile.isStudent);
console.log(myProfile.greet());