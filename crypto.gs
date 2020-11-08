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
 * @return An unsorted array of divisors of n.
 * @customfunction
 */
function naiveFactorization(n) {
  const step = (n%2 === 0) ? 1 : 2;
  const limit = parseInt(n**0.5) + 1;
  let factors = [];
  let complement;
  
  for (let i = 0; i <= limit; i++) {
    if (n%i == 0) {
        factors.push(i);
     
      if (i*i != n) {
        factors.push(parseInt(n / i));
      }
      
    }
  }
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


/**
 * Hash the input value.  NOT NECESSARILY SECURE; queries an external API.
 *
 * @param {String} str The text to hash.
 * @param {String} hashMethod The type of hash to apply.
 *      Valid options: Blake2b-256, -384, and -512; Blake2s-128 and -256; HighwayHash-64, -128, and -256; MD4; MD5; 
 *      SHA1, 256, 384, and 512; SHA512-256; SHA3-384 and -512
 * @param {String, default: "hex"} format The encoding to return the hash in.
 *      Valid options: hex, base32, base64, base64url
 * @return The hash of the input value.
 * @customfunction
 */
function hash(str, hashMethod, format='hex') {
  const url = Utilities.formatString('https://api.hashify.net/hash/%s/%s', hashMethod, format);
  let opts = {'method': 'post', 'payload': str};
  let response = UrlFetchApp.fetch(url, opts);
  response = response.getContentText();
  response = JSON.parse(response);
  return response["Digest"];
}


/**
 * Converts large decimal number to binary
 *
 * @param {str} n The number (as either a string or number) to convert to binary.
 * @return Binary representation of n.
 * @customfunction
 */
function decimalToBinary(n) {
  return (BigInt(n) >> BigInt(0)).toString(2);
}
