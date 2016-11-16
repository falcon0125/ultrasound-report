// import 
const React = require('react') 
const d3 = require('d3')
const _ = require('lodash')
const $ = require('jquery')
// load data
var data = require('./dummy.json');
const print = console.log

r= data.map(x => x['category'])
var category = _.uniq(r)
g = _.groupBy(data, x=> x['category'])
f = g['liver parenchyma']
s = f.map(x=> `${x.code}\n${x.label}\n${x.description}`)

String.prototype.wrap = function(tag, attrs={}){    
    return `<${tag} ${_.entries(attrs).map(x =>` ${x[0]}="${x[1]}"`).join(' ')}>` + this + `</${tag}>`
}

for (cat of category){
    var l  = g[cat].map(x=> `<input type="checkbox" value="${x.code}"/><label>${x.code}:${x.label}</label>`.wrap('div',{'id':'DD'}))
    var s = `<legend>${cat}</legend>` + l.join('')
    //return s.wrap('fieldset',{'id':'cat',name: cat})
    print(s.wrap('fieldset',{'id':'cat',name: cat})) 
}
