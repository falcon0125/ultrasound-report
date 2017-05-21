// import 
const React = require('react')
const d3 = require('d3')
const _ = require('lodash')
const $ = require('jquery')
    // load data
var data = require('./dummy.json');
const print = console.log

r = data.map(x => x['category'])
var category = _.uniq(r)
g = _.groupBy(data, x => x['category'])
f = g['liver parenchyma']
s = f.map(x => `${x.code}\n${x.label}\n${x.description}`)

String.prototype.wrap = function (tag, attrs = {}) {
        return `<${tag} ${_.entries(attrs).map(x => ` ${x[0]}="${x[1]}"`).join(' ')}>` + this + `</${tag}>`
}

for (cat of category) {
    var l = g[cat].map(x => `<label><input type="checkbox" value="${x.code}"/><span>${x.code}:</span>${x.label}</label>`.wrap('div', { 'id': 'DD' }))
    var s = `<legend>${cat}</legend>${l.join('')}`
    //return s.wrap('fieldset',{'id':'cat',name: cat})
    //print(s.wrap('fieldset',{'id':'cat',name: cat})) 
}

S = `Sonography evaluation of the abdomen was performed:
The liver parenchyma shows reflective pattern with increased sound attenuation without evidence of focal lesion.
The gall bladder is normal in size without stone.
The common bile duct shows normal appearance.
The pancreas is normal echogenicity and size.
The spleen is normal in appearance.
The bilateral kidneys are normal configuration without evidence of hydronephrosis but a hyperechoic nodule right kidney, multiple cysts over bilateral kidneys and multiple cysts with milk of calcium within its lumen over bilateral kidneys.
Impression:
1. Fatty liver
2. A hyperechoic nodule about 12 mm in size over the cortex of right kidney.
Hamartoma is first considered.
3. Multiple renal cysts about 19 mm in size over Bil kidneys
4. Multiple calyceal diverticula with milk of calcium about 5-9 mm in size over bilateral kidneys
5. Otherwise, no signigicant abnormal findings
`
// description part
re = /(sono.*):/igm
m = re.exec(S)
description_title = m[0]
S = S.slice(re.lastIndex)
    // Impression part
re = /impression:/igm
m = re.exec(S)
description_content_raw = S.slice(0, m.index)
impression_title = m[0]
impression_content_raw = S.slice(re.lastIndex)
    //print(description_title, description_content_raw,impression_title, impression_content_raw)

// description
//   to one line.
function chop(s, n, spliter) {
    s = s.replace(/\s+/igm, " ").trim()
    charater_number = n
    temp_l = s.split(/\s/igm)
        //print(temp_l)
    r = []
    k = ''
    for (let i in temp_l) {
        if (k.length + temp_l[i].length <= charater_number) {
            k += (temp_l[i] + ' ');
        } else {
            r.push(k + ' ')
            k = temp_l[i] + ' '
        }
    }
    r.push(k)
    return (r.map(x => x.trim()).join(spliter))
}
description_content = chop(description_content_raw, 60, '\n')

//print(description_content)

// impression
impression_content_raw = impression_content_raw.trim().replace(/\s+/igm, ' ')
    //print(impression_content_raw)
l = impression_content_raw.split(/\d+\.\s?/igm)
l = l.slice(1)
l = l.map(x => x.trim())
l = l.map(x => chop(x, 57, '\n   '))
impression_content = l.map((x, i) => String(i + 1) + '. ' + x).join('\n')
out = [description_title, description_content, impression_title, impression_content].join('\n')
print(out)




while (m = re.exec(S)) {
    //console.log(re.lastIndex)
    //console.log(S.slice(m.index,re.lastIndex))
}