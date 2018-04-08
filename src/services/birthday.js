export const birthdayDays = (() => {
  const numbers = [];
  for (let i = 1; i <= 31; i++) {
    numbers.push(i);
  }
  return numbers;
})();

export const birthdayYears = (() => {
  const numbers = [];
  const yearLimit = new Date().getFullYear() - 18;
  for (let i = yearLimit; i >= 1918; i--) {
    numbers.push(i);
  }
  return numbers;
})();

export const birthdayMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
