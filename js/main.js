var phrases = require('./phrases.json')
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
console.log( output )
