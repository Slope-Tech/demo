"object"!=typeof __ADGEAR&&(__ADGEAR={}),"function"!=typeof __ADGEAR.usegment_url&&(__ADGEAR.usegment_url=function(e,n){var t=[],o="";if("object"==typeof __AGDATA){for(var _ in __AGDATA)t.push(encodeURIComponent(_)+"="+encodeURIComponent(__AGDATA[_]));o=encodeURIComponent(t.join("&"))}var A="http:";("undefined"!=typeof __ADGEAR_SSL&&__ADGEAR_SSL||"https:"==window.location.protocol)&&(A="https:");var r="rtb.adgrx.com",i="/usegments/"+String(e)+"/"+String(n)+".html",d=window.location.href,u="",p="",f="";"object"==typeof __AG&&(d="undefined"!=typeof __AG.url?__AG.url:d,u="undefined"!=typeof __AG.txn_id?"&AG_TXN="+encodeURIComponent(String(__AG.txn_id)):u,p="undefined"!=typeof __AG.revenue?"&AG_REV="+encodeURIComponent(String(__AG.revenue)):p,f="undefined"!=typeof __AG.referrer?"&AG_REF="+encodeURIComponent(String(__AG.referrer)):f);var l=String(Math.floor(1e13*Math.random()));return A+"//"+r+i+"?AG_URL="+encodeURIComponent(d)+"&AG_VARS="+o+u+p+f+"&AG_R="+l}),"function"!=typeof __ADGEAR.load_usegment&&(__ADGEAR.load_usegment=function(e,n){var t=__ADGEAR.usegment_url(e,n);if(null!=t){var o=document.createElement("iframe");o.width="1",o.height="1",o.marginHeight="0",o.marginWidth="0",o.scrolling="no",o.frameBorder="0",o.style.visibility="hidden",o.style.width="1px",o.style.height="1px",o.style.position="absolute",o.style.top="-1px",o.style.left="-1px",o.src=t,document.getElementsByTagName("body")[0].appendChild(o)}}),__ADGEAR.load_usegment("uHjqmmWNAdxTo-8-G1YRiIa1ySOeUMo3IN2uIj3AwQg=","219");