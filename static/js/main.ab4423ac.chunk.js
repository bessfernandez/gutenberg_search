(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,r){e.exports=r(20)},18:function(e,t,r){},20:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),s=r(4),i=r.n(s),c=(r(17),r(18),r(8)),l=r(1),o=r.n(l),u=r(5),h=r(6),f=r(9),m=r(7),d=r(10),p=r(2),g="https://cdn.mxpnl.com/static/misc/gutenberg-catalog.txt",v="gutenberg-catalog",w=50;function y(){return S.apply(this,arguments)}function S(){return(S=Object(p.a)(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=localStorage.getItem(v)){e.next=8;break}return e.next=4,fetch(g);case 4:return e.next=6,e.sent.text();case 6:t=e.sent,localStorage.setItem(v,t);case 8:return e.abrupt("return",t.trim().split("\n").reverse().map(function(e){var t=e.match(/^(.*?)\s+(\d+)$/),r=Object(c.a)(t,3),n=(r[0],r[1]);return{name:n,origName:n,id:r[2]}}));case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}var b=function(e){function t(){var e,r;Object(u.a)(this,t);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(r=Object(f.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={articles:[],filteredArticles:[],filterTime:0,resultsCount:0,search:""},r.resultsTimerId=null,r.filterStartTime=new Date(0),r.searchInput=n.createRef(),r.filterStartTimer=function(e){r.resultsTimerId||(r.filterStartTime=e)},r.stopTimer=function(){var e=(new Date).getMilliseconds()-r.filterStartTime.getMilliseconds();r.setState({filterTime:e})},r.searchArticles=function(e){if(e.length>3){var t=r.state.articles;return r.resetArticleNames(),t.filter(function(t){return-1!==t.name.toLowerCase().indexOf(e.toLowerCase())})}},r.addSearchMatchMarkup=function(e,t){var r=new RegExp(e,"gi");return t.forEach(function(e,t){var n=e.name.match(r);n&&(e.name=e.name.replace(n[0],'<span class="highlight">'.concat(n[0],"</span>")))}),t},r.resetArticleNames=function(){r.state.filteredArticles.forEach(function(e,t){e.name=e.origName})},r.filterResults=function(e){var t=new Date;if(r.filterStartTimer(t),e.length>3){var n=r.searchArticles(e);if(n){var a=r.addSearchMatchMarkup(e,n);a&&r.setState({filteredArticles:a,resultsCount:n.length},function(){r.stopTimer(),r.resultsTimerId=null})}}else r.resetArticleNames(),0===e.length&&(r.stopTimer(),r.resultsTimerId=null),r.setState({filteredArticles:r.state.articles.slice(0,w),resultsCount:0})},r.handleInputUpdate=function(e){r.setState({search:e.target.value}),r.filterResults(e.target.value)},r.handleElementScroll=function(e){if(!r.state.search.length){var t=e.target;t.offsetHeight+t.scrollTop>=t.scrollHeight&&r.setState({filteredArticles:r.state.articles.slice(0,r.state.filteredArticles.length+w)})}},r.handleKeyDown=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;40===e.keyCode?(e.preventDefault(),"INPUT"===e.target.nodeName?r.searchInput.current.children[0].focus():"A"===e.target.nodeName&&r.searchInput.current.parentElement.children[t+1].children[0].focus()):38===e.keyCode&&(e.preventDefault(),"A"===e.target.nodeName&&(0===t?r.searchInput.current.parentElement.parentElement.previousSibling.focus():r.searchInput.current.parentElement.children[t-1].children[0].focus()))},r}return Object(d.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(p.a)(o.a.mark(function e(){var t,r=this;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y();case 2:t=e.sent,this.setState({articles:t},function(){r.setState({filteredArticles:r.state.articles.slice(0,w)})});case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"createMarkup",value:function(e){return{__html:e}}},{key:"render",value:function(){var e=this,t=this.state.filteredArticles;return n.createElement("main",{className:"layout-search"},n.createElement("div",{className:"layout-search-inner"},n.createElement("input",{className:"search",type:"text",placeholder:"Search Gutenberg Catalog",onKeyDown:this.handleKeyDown,onChange:this.handleInputUpdate,value:this.state.search}),n.createElement("div",{className:"results"},!!this.state.resultsCount&&n.createElement("span",{className:"result-count"},"Found ",this.state.resultsCount," results in"," ",1===Math.sign(this.state.filterTime)?this.state.filterTime:0,"ms"),n.createElement("ul",{className:"articles",onScroll:this.handleElementScroll},t.map(function(t,r){return[n.createElement("li",{key:t.id,ref:0===r?e.searchInput:null},n.createElement("a",{target:"_blank",rel:"noopener noreferrer",tabIndex:"0","data-index":r,href:(a=t.id,"https://www.gutenberg.org/ebooks/".concat(a)),key:r,dangerouslySetInnerHTML:e.createMarkup(t.name),onKeyDown:function(t){return e.handleKeyDown(t,r)}}))];var a})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[11,1,2]]]);
//# sourceMappingURL=main.ab4423ac.chunk.js.map