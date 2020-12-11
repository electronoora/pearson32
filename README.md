# pearson32.js

This is a simple implementation of the Pearson hash extended to use 32-bit unsigned integers. It is packaged into a module for Node.js.

Pearson hash is a fast hash function for 8-bit input and output. It was introduced by Peter Pearson on ACM June 1990. It is what's known as a perfect hash function, meaning that each possible hash value is returned by one and only one input value (ie. no possible hash collisions).

The most trivial ways of extending it to 32-bit values either cause it generate collisions or produce very similar looking hash values for sequential numbers. To overcome those problems, my 32-bit extension of the hash function uses Rijndael's Galois field multiplication from the AES encryption standard to mix the input bits. This is enough to produce more aesthetically pleasing hash values while still avoiding collisions. :)

Simple base64 encoding/decoding is included for easy generation of unique short URLs. Because 6 characters can encode up to 36 bits, I use the spare headroom to to only encode 5 bits into the first and last character. This way the short URL code avoids having either '-' or '_' as the first or last characters.

## Example

This simple example converts a 32-bit unsigned int `0xc0ffee` into a 6-character string and then back.

```javascript
var p=require('pearson32');

var hash=p.u32tostring(0xc0ffee);
console.log("0xc0ffee -> "+hash);
console.log(hash+" -> 0x"+p.stringtou32(hash).toString(16));
```

Output:
```
0xc0ffee -> O0191G
O0191G -> 0xc0ffee
```

Because the conversion is invertable and every input value maps to just one hash and vice-versa, it's super handy with database tables with automatic primary key indexes that are assigned sequentially.

This small test shows how the hashes will look for the first 20 indexes:

```javascript
var p=require('pearson32');

for(var i=0;i<20;i++) {
  var hash=p.u32tostring(i);
  console.log(i + " -> " + hash + " -> " + p.stringtou32(hash));
}
```

Output:
```
0 -> BIgACA -> 0
1 -> R5qrYA -> 1
2 -> QNmYMD -> 2
3 -> GjBGkF -> 3
4 -> ZDWYzH -> 4
5 -> GQWZHF -> 5
6 -> Z3MzMA -> 6
7 -> MxUTDG -> 7
8 -> OIv8AC -> 8
9 -> VO4gFH -> 9
10 -> B1ADMB -> 10
11 -> amKqcE -> 11
12 -> AK_8DF -> 12
13 -> YwczhC -> 13
14 -> MnFWqG -> 14
15 -> GZ0RLG -> 15
16 -> OzBHyA -> 16
17 -> Ir4iNC -> 17
18 -> Ns6qhH -> 18
19 -> fv2abH -> 19
```
 
(c) 2017 Noora Halme. Source code released under MIT license.

