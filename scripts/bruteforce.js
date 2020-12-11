var p=require('../pearson32.js');

// a very crude brute-force collision test to confirm both that the column mixing
// and hash functions are invertable and that the hash function is actually a
// perfect hash function. it needs slightly over 500 megabytes of memory and
// runs for several hours.
var t=Buffer.alloc(536870912);
for(var i=0; i<4294967296; i++) {
  var b=p.u32tostring(i);
  var ib=p.stringtou32(b);
  if (i != ib) { console.log(i+" -> "+b+" -> "+ib); console.log("base64 test failed at i="+i); process.exit(1); }

  var g=p.mix_columns(i);
  if (i != p.inverse_mix_columns(g)) { console.log("mix_columns failed at i="+i); process.exit(1); }

  var h=p.from_u32(g);
  if (g != p.invert_u32(h)) { console.log("inverse hash function failed at i="+i); process.exit(1); }

  v=p.inverse_mix_columns(p.invert_u32(h));
  if (i != v) { console.log("round-trip failure at i="+i); process.exit(1); }

  var x=h>>>3, d=t[x], b=1<<(h&7);
  if (d&b) { console.log("hash function failed at i="+i);process.exit(1); }

  t[x]=d|b;
  if ((i&(256*1024-1)) == (256*1024-1))console.log(i.toString(16)+" -> "+g.toString(16)+" -> "+h.toString(16)+" t["+x+"]="+(t[x]).toString(2));  
}
