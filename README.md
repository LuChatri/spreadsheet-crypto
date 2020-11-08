# Google Sheets Cryptography
This repo contains a set of Google Sheets add-on functions for encryption and cryptographic analysis.
Disclaimer: These functions are not written for security and some send data to remote APIs.  DO NOT USE THIS IN SECURITY-CRITICAL APPLICATIONS.
## Example
## Installation
## Current Functions
- Encryption
  - caesarShift - Implements a common Caesar Cipher
- Hashing
  - Hash - Support hashing in:
     - Blake2b-256, -384, and -512
     - Blake2s-128 and -256
     - HighwayHash-64, -128, and -256
     - MD4 and MD5
     - SHA1, 256, 384, 512, and 512-256
     - SHA3-384 and -512
     - Hex, Base64, and Base32 formats
     - Anything supported by [the hashify API](https://hashify.net/).
- Number Manipulation
