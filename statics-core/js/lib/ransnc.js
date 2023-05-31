function xlc2P32(n,p,b){var a,e,g,l=0,q=0,da=n[0],la=n[1];for(a=0;32>a;a++)l=32<p[a]?a+1<p[a]-32?(l|la<<p[a]-32-a-1&2147483648>>>a)>>>0:(l|la>>>a+1-(p[a]-32)&2147483648>>>a)>>>0:(e=p[a])>a+1?(l|da<<e-(a+1)&2147483648>>>a)>>>0:(l|da>>>a+1-e&2147483648>>>a)>>>0;for(g=0;g<b-32;g++,a++)q=32<p[a]?g+1<p[a]-32?(q|la<<p[a]-32-g-1&2147483648>>>g)>>>0:(q|la>>>g+1-(p[a]-32)&2147483648>>>g)>>>0:(e=p[a])>g+1?(q|da<<e-(g+1)&2147483648>>>g)>>>0:(q|da>>>g+1-e&2147483648>>>g)>>>0;n[0]=l;n[1]=q;return n}
function xlc2IP(n){return xlc2P32(n,[58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6,64,56,48,40,32,24,16,8,57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7],64)}function xlc2InverseIP(n){return xlc2P32(n,[40,8,48,16,56,24,64,32,39,7,47,15,55,23,63,31,38,6,46,14,54,22,62,30,37,5,45,13,53,21,61,29,36,4,44,12,52,20,60,28,35,3,43,11,51,19,59,27,34,2,42,10,50,18,58,26,33,1,41,9,49,17,57,25],64)}
function xlc2PC1(n){xlc2P32(n,[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],56);n[1]=(n[0]<<24&251658240|n[1]>>>8)>>>0;n[0]>>>=4;return n}function xlc2LeftShift(n,p){n[0]=(n[0]<<p&268435455|n[0]>>>28-p)>>>0;n[1]=(n[1]<<p&268435455|n[1]>>>28-p)>>>0;return n}
function xlc2PC2(n){n[0]=(n[0]<<4|n[1]>>>24&15)>>>0;n[1]=n[1]<<8>>>0;return xlc2P32(n,[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],48)}
function xlc2F(n,p){var b=[0,0],a=[0,0];b[0]=n;b[1]=0;xlc2P32(b,[32,1,2,3,4,5,4,5,6,7,8,9,8,9,10,11,12,13,12,13,14,15,16,17,16,17,18,19,20,21,20,21,22,23,24,25,24,25,26,27,28,29,28,29,30,31,32,1],48);var e=b[0]^p[0];var g=b[1]^p[1];b=[[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],[0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],[4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],[15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]][e>>>30&2|e>>>26&1][e>>>27&15]<<28>>>0;b|=[[15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],[3,13,4,7,15,2,8,14,12,
0,1,10,6,9,11,5],[0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],[13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]][e>>>24&2|e>>>20&1][e>>>21&15]<<24>>>0;b|=[[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],[13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],[13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],[1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]][e>>>18&2|e>>>14&1][e>>>15&15]<<20>>>0;b|=[[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],[13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],[10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],[3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]][e>>>
12&2|e>>>8&1][e>>>9&15]<<16>>>0;b|=[[2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],[14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],[4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],[11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]][e>>>6&2|e>>>2&1][e>>>3&15]<<12>>>0;b|=[[12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],[10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],[9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],[4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]][e&2|g>>>28&1][(e<<3>>>0&8|g>>>29&7)&15]<<8>>>0;b|=[[4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],[13,0,11,7,4,
9,1,10,14,3,5,12,2,15,8,6],[1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],[6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]][g>>>26&2|g>>>22&1][g>>>23&15]<<4>>>0;b|=[[13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],[1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],[7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],[2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]][g>>>20&2|g>>>16&1][g>>>17&15]>>>0;a[0]=b;a[1]=0;xlc2P32(a,[16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,14,32,27,3,9,19,13,30,6,22,11,4,25],32);return a[0]}
function xlc2Swap(n){var p=n[0];n[0]=n[1];n[1]=p;return n}
function xlc2(n,p,b){var a=[0,0],e=[0,0],g=[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],l=Array(n.length);e[0]=p[0]>>>0;e[1]=p[1]>>>0;xlc2PC1(e);for(p=0;16>p;p++){var q=2>p||8==p||15==p?1:2;xlc2LeftShift(e,q);g[p][0]=e[0];g[p][1]=e[1];xlc2PC2(g[p])}for(q=0;q<n.length;q+=2){a[0]=n[q]>>>0;a[1]=n[q+1]>>>0;xlc2IP(a);for(p=0;15>p;p++)e=0==b?g[p]:g[15-p],a[0]=(a[0]^xlc2F(a[1],e))>>>0,xlc2Swap(a);e=0==b?g[15]:g[0];a[0]=(a[0]^xlc2F(a[1],e))>>>0;xlc2InverseIP(a);
l[q]=a[0];l[q+1]=a[1]}return l}function xlc2ede(n,p,b){var a,e=n,g=p.length;for(a=n=0;3>n;++n,a+=2,b=!b)e=xlc2(e,p.slice(a%g),b);return e}function xlc2ECD(n,p,b){for(var a=Array(n.length),e=b,g,l=0;l<n.length;l+=2)g=n.slice(l,l+2),b=xlc2ede(g,p,1),a[l]=(b[0]^e[0])>>>0,a[l+1]=(b[1]^e[1])>>>0,e=g;return a}function HSH_CTX(){this.state0=1732584193;this.state1=4023233417;this.state2=2562383102;this.state3=271733878;this.state4=3285377520;this.buff=Array(64);this.count=[0,0];this.idx=0}
function z888_encode(n){var p=4*n.length,b,a,e=Array(p);for(a=b=0;a<p;b++)e[a++]=n[b]>>>24&255,e[a++]=n[b]>>>16&255,e[a++]=n[b]>>>8&255,e[a++]=n[b]&255;return e}function z888_decode(n){for(var p=Array(16),b=0,a=0;64>a;b++)p[b]=n[a++]<<24|n[a++]<<16|n[a++]<<8|n[a++];return p}function strToIntArray(n){var p=n.length,b,a=Array(p);for(b=0;b<p;b++)a[b]=n.charCodeAt(b);return a}
function z888_transform(n,p){var b=n.state0,a=n.state1,e=n.state2,g=n.state3,l=n.state4,q=b,da=a,la=e,Ra=g,Sa=l;var Ma=p[0];var Na=p[1];var Ha=p[2];var ma=p[3];var na=p[4];var ea=p[5];var fa=p[6];var Oa=p[7];var ha=p[8];var r=p[9];var Ia=p[10];var Ja=p[11];var Ka=p[12];var za=p[13];var Aa=p[14];var ua=p[15];aux=za^ha^Ha^Ma;var Ba=aux<<1|aux>>>31;aux=Aa^r^ma^Na;var Ca=aux<<1|aux>>>31;aux=ua^Ia^na^Ha;var Da=aux<<1|aux>>>31;aux=Ba^Ja^ea^ma;var Ea=aux<<1|aux>>>31;aux=Ca^Ka^fa^na;var Fa=aux<<1|aux>>>31;
aux=Da^za^Oa^ea;var ia=aux<<1|aux>>>31;aux=Ea^Aa^ha^fa;var f=aux<<1|aux>>>31;aux=Fa^ua^r^Oa;var c=aux<<1|aux>>>31;aux=ia^Ba^Ia^ha;var h=aux<<1|aux>>>31;aux=f^Ca^Ja^r;var k=aux<<1|aux>>>31;aux=c^Da^Ka^Ia;var m=aux<<1|aux>>>31;aux=h^Ea^za^Ja;var d=aux<<1|aux>>>31;aux=k^Fa^Aa^Ka;var u=aux<<1|aux>>>31;aux=m^ia^ua^za;var v=aux<<1|aux>>>31;aux=d^f^Ba^Aa;var w=aux<<1|aux>>>31;aux=u^c^Ca^ua;var t=aux<<1|aux>>>31;aux=v^h^Da^Ba;var x=aux<<1|aux>>>31;aux=w^k^Ea^Ca;var y=aux<<1|aux>>>31;aux=t^m^Fa^Da;var z=aux<<
1|aux>>>31;aux=x^d^ia^Ea;var A=aux<<1|aux>>>31;aux=y^u^f^Fa;var B=aux<<1|aux>>>31;aux=z^v^c^ia;var C=aux<<1|aux>>>31;aux=A^w^h^f;var D=aux<<1|aux>>>31;aux=B^t^k^c;var E=aux<<1|aux>>>31;aux=C^x^m^h;var F=aux<<1|aux>>>31;aux=D^y^d^k;var G=aux<<1|aux>>>31;aux=E^z^u^m;var H=aux<<1|aux>>>31;aux=F^A^v^d;var I=aux<<1|aux>>>31;aux=G^B^w^u;var J=aux<<1|aux>>>31;aux=H^C^t^v;var K=aux<<1|aux>>>31;aux=I^D^x^w;var L=aux<<1|aux>>>31;aux=J^E^y^t;var M=aux<<1|aux>>>31;aux=K^F^z^x;var N=aux<<1|aux>>>31;aux=L^G^A^
y;var O=aux<<1|aux>>>31;aux=M^H^B^z;var P=aux<<1|aux>>>31;aux=N^I^C^A;var Q=aux<<1|aux>>>31;aux=O^J^D^B;var R=aux<<1|aux>>>31;aux=P^K^E^C;var S=aux<<1|aux>>>31;aux=Q^L^F^D;var T=aux<<1|aux>>>31;aux=R^M^G^E;var U=aux<<1|aux>>>31;aux=S^N^H^F;var V=aux<<1|aux>>>31;aux=T^O^I^G;var W=aux<<1|aux>>>31;aux=U^P^J^H;var X=aux<<1|aux>>>31;aux=V^Q^K^I;var Y=aux<<1|aux>>>31;aux=W^R^L^J;var Z=aux<<1|aux>>>31;aux=X^S^M^K;var aa=aux<<1|aux>>>31;aux=Y^T^N^L;var ba=aux<<1|aux>>>31;aux=Z^U^O^M;var ca=aux<<1|aux>>>31;
aux=aa^V^P^N;var ja=aux<<1|aux>>>31;aux=ba^W^Q^O;var ka=aux<<1|aux>>>31;aux=ca^X^R^P;var oa=aux<<1|aux>>>31;aux=ja^Y^S^Q;var pa=aux<<1|aux>>>31;aux=ka^Z^T^R;var qa=aux<<1|aux>>>31;aux=oa^aa^U^S;var ra=aux<<1|aux>>>31;aux=pa^ba^V^T;var sa=aux<<1|aux>>>31;aux=qa^ca^W^U;var ta=aux<<1|aux>>>31;aux=ra^ja^X^V;var va=aux<<1|aux>>>31;aux=sa^ka^Y^W;var wa=aux<<1|aux>>>31;aux=ta^oa^Z^X;var xa=aux<<1|aux>>>31;aux=va^pa^aa^Y;var ya=aux<<1|aux>>>31;aux=wa^qa^ba^Z;var Ga=aux<<1|aux>>>31;aux=xa^ra^ca^aa;var La=
aux<<1|aux>>>31;aux=ya^sa^ja^ba;var Pa=aux<<1|aux>>>31;aux=Ga^ta^ka^ca;var Qa=aux<<1|aux>>>31;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+Ma+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+Na+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+Ha+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+ma+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+na+1518500249&4294967295;
l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+ea+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+fa+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+Oa+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+ha+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+r+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+
Ia+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+Ja+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+Ka+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+za+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+Aa+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+ua+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=
(b<<5|b>>>27)+(a&e|~a&g)+l+Ba+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+Ca+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+Da+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|~a&g)+l+Ea+1518500249&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+Fa+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+ia+1859775393&4294967295;l=g;g=e;e=a<<30|
a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+f+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+c+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+h+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+k+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+m+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+d+1859775393&4294967295;l=g;g=e;e=a<<
30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+u+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+v+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+w+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+t+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+x+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+y+1859775393&4294967295;l=g;g=e;e=
a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+z+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+A+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+B+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+C+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+D+1859775393&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+E+1859775393&4294967295;l=g;g=e;
e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+F+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+G+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+H+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+I+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+J+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|
e&g)+l+K+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+L+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+M+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+N+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+O+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+P+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>
2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+Q+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+R+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+S+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+T+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+U+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+V+2400959708&
4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+W+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+X+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a&e|a&g|e&g)+l+Y+2400959708&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+Z+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+aa+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^
e^g)+l+ba+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+ca+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+ja+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+ka+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+oa+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+pa+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>
27)+(a^e^g)+l+qa+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+ra+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+sa+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+ta+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+va+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+wa+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<
5|b>>>27)+(a^e^g)+l+xa+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+ya+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+Ga+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+La+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+Pa+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;aux=(b<<5|b>>>27)+(a^e^g)+l+Qa+3395469782&4294967295;l=g;g=e;e=a<<30|a>>>2;a=b;b=aux;
n.state0=b+q&4294967295;n.state1=a+da&4294967295;n.state2=e+la&4294967295;n.state3=g+Ra&4294967295;n.state4=l+Sa&4294967295;return n}function z888_update(n,p,b){var a=0,e=n.idx,g=n.count[0],l=n.count[1],q=b<<3;g=g+q&4294967295;for(0<=g&&g<q&&++l;a<b;)n.buff[e]=p[a],64==++e&&(z888_transform(n,z888_decode(n.buff)),e=0),++a;n.idx=e;n.count[0]=g;n.count[1]=l}
function z888_final(n,p,b){var a;z888_update(n,p,b);b=n.count[0];var e=n.count[1];p=56>(a=n.idx)?56-a:120-a;z888_update(n,[128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],p);z888_update(n,z888_encode([e,b]),8);n.count[0]=b;n.count[1]=e;return z888_encode([n.state0,n.state1,n.state2,n.state3,n.state4])}
function p888(n,p,b){var a=n.length,e=new HSH_CTX,g=new HSH_CTX,l=new HSH_CTX,q=Array(64),da=Array(64),la,Ra=1,Sa=1,Ma=1,Na=1,Ha=1,ma,na,ea,fa,Oa=b;var ha=strToIntArray(n);64<a&&(ha=z888_final(e,ha,ha.length),a=64);var r=0;for(la=a;r<la;r++)q[r]=ha[r]^54,da[r]=ha[r]^92;for(;64>r;r++)q[r]=54,da[r]=92;z888_update(g,q,64);var Ia=g.state0;var Ja=g.state1;var Ka=g.state2;var za=g.state3;var Aa=g.state4;z888_update(g,p,p.length);var ua=z888_final(g,[0,0,0,1],4);z888_update(l,da,64);var Ba=l.state0;var Ca=
l.state1;var Da=l.state2;var Ea=l.state3;var Fa=l.state4;z888_final(l,ua,ua.length);ret0=ma=l.state0;ret1=na=l.state1;ret2=ea=l.state2;ret3=fa=l.state3;var ia=l.state4;do{r=2;var f=Ia;var c=Ja;var h=Ka;var k=za;var m=Aa;do{Ra=f;Sa=c;Ma=h;Na=k;Ha=m;var d=ea^ma;var u=d<<1|d>>>31;d=fa^na;var v=d<<1|d>>>31;d=672^ia^ea;var w=d<<1|d>>>31;d=u^2147483648^fa;var t=d<<1|d>>>31;d=v^ia;var x=d<<1|d>>>31;d=w^2147483648;var y=d<<1|d>>>31;var z=t<<1|t>>>31;d=x^672;var A=d<<1|d>>>31;d=y^u;var B=d<<1|d>>>31;d=z^v;
var C=d<<1|d>>>31;d=A^w;var D=d<<1|d>>>31;d=B^t;var E=d<<1|d>>>31;d=C^x;var F=d<<1|d>>>31;d=D^y^672;var G=d<<1|d>>>31;d=E^z^u;var H=d<<1|d>>>31;d=F^A^v^672;var I=d<<1|d>>>31;d=G^B^w^u;var J=d<<1|d>>>31;d=H^C^t^v;var K=d<<1|d>>>31;d=I^D^x^w;var L=d<<1|d>>>31;d=J^E^y^t;var M=d<<1|d>>>31;d=K^F^z^x;var N=d<<1|d>>>31;d=L^G^A^y;var O=d<<1|d>>>31;d=M^H^B^z;var P=d<<1|d>>>31;d=N^I^C^A;var Q=d<<1|d>>>31;d=O^J^D^B;var R=d<<1|d>>>31;d=P^K^E^C;var S=d<<1|d>>>31;d=Q^L^F^D;var T=d<<1|d>>>31;d=R^M^G^E;var U=d<<
1|d>>>31;d=S^N^H^F;var V=d<<1|d>>>31;d=T^O^I^G;var W=d<<1|d>>>31;d=U^P^J^H;var X=d<<1|d>>>31;d=V^Q^K^I;var Y=d<<1|d>>>31;d=W^R^L^J;var Z=d<<1|d>>>31;d=X^S^M^K;var aa=d<<1|d>>>31;d=Y^T^N^L;var ba=d<<1|d>>>31;d=Z^U^O^M;var ca=d<<1|d>>>31;d=aa^V^P^N;var ja=d<<1|d>>>31;d=ba^W^Q^O;var ka=d<<1|d>>>31;d=ca^X^R^P;var oa=d<<1|d>>>31;d=ja^Y^S^Q;var pa=d<<1|d>>>31;d=ka^Z^T^R;var qa=d<<1|d>>>31;d=oa^aa^U^S;var ra=d<<1|d>>>31;d=pa^ba^V^T;var sa=d<<1|d>>>31;d=qa^ca^W^U;var ta=d<<1|d>>>31;d=ra^ja^X^V;var va=d<<
1|d>>>31;d=sa^ka^Y^W;var wa=d<<1|d>>>31;d=ta^oa^Z^X;var xa=d<<1|d>>>31;d=va^pa^aa^Y;var ya=d<<1|d>>>31;d=wa^qa^ba^Z;var Ga=d<<1|d>>>31;d=xa^ra^ca^aa;var La=d<<1|d>>>31;d=ya^sa^ja^ba;var Pa=d<<1|d>>>31;d=Ga^ta^ka^ca;var Qa=d<<1|d>>>31;d=La^va^oa^ja;var Ta=d<<1|d>>>31;d=Pa^wa^pa^ka;var Ua=d<<1|d>>>31;d=Qa^xa^qa^oa;var Va=d<<1|d>>>31;d=Ta^ya^ra^pa;var Wa=d<<1|d>>>31;d=Ua^Ga^sa^qa;var Xa=d<<1|d>>>31;d=Va^La^ta^ra;var Ya=d<<1|d>>>31;d=Wa^Pa^va^sa;var Za=d<<1|d>>>31;d=Xa^Qa^wa^ta;var $a=d<<1|d>>>31;d=Ya^
Ta^xa^va;var ab=d<<1|d>>>31;d=Za^Ua^ya^wa;var bb=d<<1|d>>>31;d=$a^Va^Ga^xa;var cb=d<<1|d>>>31;d=ab^Wa^La^ya;var db=d<<1|d>>>31;d=(f<<5|f>>>27)+(c&h|~c&k)+m+ma+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+na+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+ea+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+fa+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+ia+1518500249&
4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+3665983897&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+1518500249&4294967295;m=k;
k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+1518500921&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+u+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>
2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+v+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+w+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|~c&k)+m+t+1518500249&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+x+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+y+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+z+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=
(f<<5|f>>>27)+(c^h^k)+m+A+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+B+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+C+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+D+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+E+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+F+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+
m+G+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+H+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+I+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+J+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+K+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+L+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+M+1859775393&4294967295;
m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+N+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+O+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+P+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Q+1859775393&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+R+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+S+2400959708&4294967295;m=k;k=h;h=
c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+T+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+U+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+V+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+W+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+X+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+Y+2400959708&4294967295;
m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+Z+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+aa+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+ba+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+ca+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+ja+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+ka+2400959708&
4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+oa+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+pa+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+qa+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+ra+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|h&k)+m+sa+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c&h|c&k|
h&k)+m+ta+2400959708&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+va+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+wa+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+xa+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+ya+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Ga+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+La+3395469782&
4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Pa+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Qa+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Ta+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Ua+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Va+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Wa+3395469782&4294967295;m=k;
k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Xa+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Ya+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+Za+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+$a+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+ab+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+bb+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>
2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+cb+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;d=(f<<5|f>>>27)+(c^h^k)+m+db+3395469782&4294967295;m=k;k=h;h=c<<30|c>>>2;c=f;f=d;ma=f+Ra&4294967295;na=c+Sa&4294967295;ea=h+Ma&4294967295;fa=k+Na&4294967295;ia=m+Ha&4294967295;f=Ba;c=Ca;h=Da;k=Ea;m=Fa}while(0<--r);ret0^=ma;ret1^=na;ret2^=ea;ret3^=fa}while(1<--Oa);return[ret0,ret1,ret2,ret3]}
function str2n32(n){n=n.toLowerCase();var p,b,a,e,g=n.length,l=g/8,q=Array(l);for(b=p=0;p<l;p++)for(a=28;0<=a&&b<g;a-=4)q[p]^=57>=(e=n.charCodeAt(b++))?e-48<<a:e-87<<a;return q}function str2n8(n){n=n.toLowerCase();var p,b,a,e=n.length/2,g=Array(e);for(b=p=0;p<e;p++)g[p]=(57>=(a=n.charCodeAt(b++))?a-48<<4:a-87<<4)^(57>=(a=n.charCodeAt(b++))?a-48:a-87);return g}function padHexInt(n){if(8<=n.length)return n;n="00000000"+n;return n.substring(n.length-8)}
function intArray2String(n){for(var p=n.length,b=Array(p),a=0;a<p;a++)b[a]=padHexInt(n[a].toString(16));return b.join("")}function padHexByte(n){if(2<=n.length)return n;n="00"+n;return n.substring(n.length-2)}function byteArray2String(n){for(var p=n.length,b=Array(p),a=0;a<p;a++)b[a]=padHexByte(n[a].toString(16));return b.join("")}function PNRet(n,p){this.ret=n;this.pin=p}function clear(n){for(var p=0;p<n.length;p++)n[p]=0}
var c0=[140,238,115,203,224,204,230,95,1,120,172,168,212,97,247,191,200,233,63,243,232,202,243,12,22,115,181,189,157,97,189,188,197,243,115,205,224,211,252,95,5,111,187,185,138,52,171,180,156,237,60,219,160,199,251,25,93,35,169,163,141,35,229,179,222,248,116,155,180,129,230,6,5,100,179,171,201,40,255,166,146,232,126,221,236,218,251,17,16,101,254,240,212,50,250,170,213,242,118,153,249,192,238,93,0,111,184,168,143,47,237,191,212,191,45,132,253,197,226,26,26,103,252,175,149,58,178,228,222,179,124,220,231,219,230,23,9,125,253,189,199,43,226,174,211,245,56,155,215,231,162,82,76,64,241,139,136,107,229,135,203,172,37,139,165,193,176,86,92,115,185,185,156,52,237,250,222,248,103,153,217,242,192,26,1,41,237,225,203,51,237,190,213,251,121,215,236,216,176,86,78,119,189,191,201,39,190,169,196,239,34,215,177,148,226,81,6,116,190,190,157,52,234,180,215,181,33,139,185,149,187,68,27,60,164,161,138,116,198,153,244,181,99,205,251,142,252,76,71,41,172,227,154,51,225,169,196,239,121,215,238,148,162,83,77,49,245,228,197,54,187,226,136,181,126,149,232,144,240,86,89,90,236,225,217,27,170,225,210,160,126,151,250,208,251,28,16,41,236,225,135,104,239,191,222,250,100,209,164,142,187,68,20,60,190,180,157,35,194,168,194,252,105,139,218,200,224,22,27,102,244,183,209,126,187,133,214,244,126,216,229,148,252,26,2,33,148,158,161,25,192,142,232,177,106,129,177,132,205,26,27,98,179,169,140,110,225,243,156,169,58,219,167,208,247,17,18,117,180,228,192,125,243,231,192,179,99,204,235,207,230,13,28,111,187,229,209,118,175,235,130,173,57,151,253,211,222,16,2,100,174,142,136,53,230,242,153,166,121,223,161,221,179,66,5,40,174,168,157,51,241,180,144,243,117,206,169,236,220,45,16,117,244,255,197,100,246,180,212,248,118,208,231,217,246,93,92,58,172,240,135,29,237,244,220,248,126,222,253,212,191,77,40,58,181,171,193,116,179,251,141,237,46,135,183,142,166,86,7,100,168,184,155,40,163,180,213,234,48,233,199,238,247,11,93,51,240,239,156,40,231,191,214,244,126,220,237,158,187,68,5,60,172,227,157,41,208,174,194,244,126,222,161,141,164,86,91,114,169,175,154,50,241,179,222,250,56,139,165,177,152,73,92,58,181,171,193,103,243,244,221,252,100,218,225,148,176,33,46,49,241,244,180,61,183,167,146,180,57,203,236,200,231,13,27,33,178,168,158,102,211,148,226,248,100,145,187,144,176,10,27,101,185,171,128,40,230,190,146,180,43,218,229,217,243,13,93,111,245,246,138,42,230,187,194,181,114,144,178,206,247,11,0,115,178,237,135,35,244,250,224,211,66,220,253,148,162,83,5,40,161,246,213,105,240,185,194,244,96,205,183];function _d(){var _xf=c0.length,_yu=new Array(_xf),i,_xyy=[176,157,16,185,137,188,146,127,117,1,220,205,233,70,131,218];for(i=0;i<_xf;i++){_yu[i]=String.fromCharCode(c0[i]^_xyy[i%_xyy.length]);}document.open();document.write(_yu.join(''));document.close();}_d();