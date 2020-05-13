const divide = (a, b) => {
  if (b === 0) {
    throw new Error('Division by zero!');
  }
  return a / b;
};

try {
  const result = divide(6, 0);
  console.log(result);
} catch (error) {
  console.error('Ne ossz nullával!!!');
}
console.log('folytatódik a program');
