var phrases = require('./phrases.json')
var $ = require('jquery')
option = {};
phrases.forEach(x => option[x[0]] = x[1]);
option_keys = phrases.map(x => x[0]);

function search_phrase(target) {
    //return  [ [SFL, description],[] ]
    target = target.trim().toUpperCase();
    let l = target.split(/[\s,.]+/ig);
    let result = option_keys.filter(x => l.every(y => x.search(y) != -1))
    let k = result.map(x => [x,option[x]])
    k = k.sort( (m,n) => m[0].length - n[0].length)
    return k.slice(0,10)
}
output = search_phrase("pcs").map(x=>`${x[0]}\t${x[1].slice(x[1].search(/Impression(:)/)+10,x[1].search("Impression")+100)}...`)
console.log(output)

var text =  
`Sonography of the abdomen was performed and showed: 
The liver parenchyma shows reflective pattern with increased sound attenuation without evidence of focal lesion.
The gall bladder is normal in size without evidence of stones.
The biliary tree is normal appearance without dilatation.
The pancreas shows normal appearance.
The spleen is normal appearance without enlargement.
The bilateral kidneys are normal configuration without hydronephrosis or stones but a hyperechoic nodule about 17 mm over *.
Impression: 
1.The echopattern in the liver parenchyma is compatible with fatty infiltration.
2.A hyperechoic nodule about 17 mm is noted over * pole of * kidney.
Harmatoma is considered.`


rex = /\n/gm
x = text.search(/impression:/igm)
a = text.substr(0,x)
m = a.replace(rex,' ')
m = m.replace(/(.{3,50})\b/gm,'$1\n')


//t = m.map(x=>text.search(x))
console.log(m, "\n" ,text.substr(x))
