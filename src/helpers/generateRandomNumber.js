// Generates a new random phone number
const generateRandomNumber = (data) => {
  const randomNumber = `0${Math.floor(Math.random() * Number('9'.padEnd(9, 0)))+ Number('1'.padEnd(9, 0))}`;

  if (data.includes(randomNumber)) {
    return generateRandomNumber(data);
  } else {
    return randomNumber;
  }
}

// Sorts the phone numbers in the specified order
const sortPhoneNumbers = (data, sortOrder) => {
  if (sortOrder === 'ASC') {
    return data.sort();
  }

  return data.sort((a, b) => b - a);
}

// Generates an array of new random phone numbers
const generatePhoneNumbers = (data, phoneNumberCount, sortOrder) => {
  const generatedNumbers = [];

  for (let i = phoneNumberCount; i > 0; i--) {
    const newNumber = generateRandomNumber([...data, ...generatedNumbers]);
    generatedNumbers.push(newNumber);
  }

  return sortPhoneNumbers(generatedNumbers, sortOrder);
}

export default generatePhoneNumbers;
