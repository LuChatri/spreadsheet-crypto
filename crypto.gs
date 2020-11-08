/**
 * Finds prime factors of the input value.
 *
 * @param {number} n The value to factor.
 * @return An array of prime factors of n.
 * @customfunction
 */
function naivePrimeFactorization(n) {
  let factors = [1];
  let m = 2;
  while (n != 1) {
    if (n % m === 0) {
        factors.push(m);
        n /= m;
    } else if (m > parseInt(n/2)) {
        factors.push(n);
        break;
    } else {
        m++;
    }
  }
  return factors;
}


/**
 * Finds divisors of the input value.
 *
 * @param {number} n The value to factor.
 * @return An array of divisors of n.
 * @customfunction
 */
function naiveFactorization(n) {
  const step = (n%2 === 0) ? 1 : 2;
  const limit = parseInt(n**0.5) + 1;
  let factors = [1];
  for (let i = 0; i < limit; i += 2) {
    if (n%i == 0) {
        factors.push(i);
    }
  }
  // So factors are ordered lowest to highest.
  factors.push(n)
  return factors;
}


/**
 * Caesar Shift the input string.
 *
 * @param {String} str The message to encrypt.
 * @param {number} n Number to shift by.
 * @param {boolean} shiftNonLetters Whether to shift non-alphabetical characters in the ASCII range.
 * @return The encrypted message.
 * @customfunction
 */
function caesarShift(str, n, shiftNonLetters=false) {
  n %= 26;
  let ret = ""; 
  
  for (let i = 0; i < str.length; i++) {
    let val = str.charCodeAt(i);
    
    if (65 <= val && val <= 90) {
      // Uppercase
      val = (val - 65 + n) % 26 + 65;
    } else if (97 <= val && val <= 122) {
      // Lowercase
      val = (val - 97 + n) % 26 + 97;
    } else {
      // Non-Letters
      if (shiftNonLetters) {
        val = (val + n) % 128;
      }
    }
    
    ret += String.fromCharCode(val);
  }
  
  return ret;
}
