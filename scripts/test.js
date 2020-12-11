var p=require('../pearson32.js');

var hash=p.u32tostring(0x00c0ffee);
console.log("0x00c0ffee -> "+hash);
console.log(hash+" -> 0x"+p.stringtou32(hash).toString(16));

// a quick round-trip test for inputs i=[0,20[
for(var i=0;i<20;i++) {
  var hash=p.u32tostring(i);
  console.log(i + " -> " + hash + " -> " + p.stringtou32(hash));
}
