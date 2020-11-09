/**     Encryption     */


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


/**     Hashing     */


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


/**     Prime Numbers     */


/**
 * Finds divisors of the input value.
 *
 * @param {number} n The value to factor.
 * @return An unsorted array of divisors of n.
 * @customfunction
 */
function factorization(n) {
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
 * Get a number of primes.
 *
 * @param {number} n Number of primes to get.
 * @param {number} from Inclusive minimum value from which to search for primes.
 * @return Array of chunks of data.
 * @customfunction
 */
function nPrimes(n, from=0) {
  let primes = [];
  let gen = primes_();
  for (let i = 0; i < n; i++) {
    primes.push(gen.next().value);
  }
  return primes;
}


/**
 * Generate primes in a range using incremental Sieve of Erastothenes.
 * @param {number} lower Inclusive minimum number for primes.
 * @param {number} upper Inclusive maximum number for primes.
 * @return Array of primes.
 * @customfunction
 */
function primesBetween(lower, upper) {
  let gen = primes_();
  let primes = [];
  let val;
  while (true) {
    val = gen.next().value;
    if (val >= lower) {
      if (val >= upper) {
        return primes;
      }
      primes.push(val);
    }
  }
}


/**
 * Finds prime factors of the input value.
 *
 * @param {number} n The value to factor.
 * @return An array of prime factors of n.
 * @customfunction
 */
function primeFactorization(n) {
  let factors = [];
  let gen = primes_();
  let m = gen.next().value;
  
  while (n != 1) {
    if (n % m === 0) {
        factors.push(m);
        n /= m;
    } else if (m > parseInt(n/2)) {
        factors.push(n);
        break;
    } else {
      m = gen.next().value;
    }
  }
  return factors;
}


/**     Other     */


/**
 * Chunk a string into parts.
 *
 * @param {String} data The data to chunk.
 * @param {number} size Characters per chunk.
 * @return Array of chunks of data.
 * @customfunction
 */
function chunk(data, size) {
  let ret = [];
  for (let i = 0; i < data.length; i += size) {
    ret.push(data.slice(i, i+size));
  }
  return ret;
}


/**
 * Converts number to a base.
 *
 * @param {String} n The number (as either a string or number) to convert.
 *     If n is large, pass it as text so Google Sheets doesn't truncate it.
 *     If n is not base 10, prepend 0b, 0x, or another prefix to it.
 * @param {number} radix The base to convert to.
 * @return Representation of n in base radix.
 * @customfunction
 */
function strToBase(n, radix=2) {
  return (BigInt(n) >> BigInt(0)).toString(radix);
}




/**     Internal     */
function* primes_() {
  // Two is prime
  yield 2
  
  let i = 3;
  let primes = [2];
  let limit, isPrime;
  
  while (true) {
    limit = parseInt(i**0.5);
    isPrime = true;
    
    for (let p of primes) {
      if (p > limit) {
        break;
      } else if (i%p === 0) {
        isPrime = false;
        break;
      }
    }
    
    if (isPrime) {
      primes.push(i);
      yield i;
    }
    i += 2;
  }
}
