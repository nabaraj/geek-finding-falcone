(window["webpackJsonpgeek-finding-falcone"]=window["webpackJsonpgeek-finding-falcone"]||[]).push([[0],{30:function(e,t,a){e.exports=a(58)},35:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(12),l=a.n(r),s=(a(35),a(3)),i=a(4),o=a(6),u=a(5),p=a(9),h=a(7),m=a(11),d="STORE_PLANETS_DATA",v="STORE_VEHICLE_DATA",f="SHOW_NOTIFICATION",b="RESET_APP",O="GOT_RESULT",j=a(27),A=a.n(j),y={method:"POST"},E=function(e){var t=Object.assign({},y,e),a=A()(t);return a.catch((function(e){e&&e.response&&e.response.status})),a};function k(){var e=this;return function(t){E({method:"GET",url:"https://findfalcone.herokuapp.com/planets"}).then((function(e){t({type:d,payload:e.data})})).catch((function(t){e.displayNotification("Please try agin letter"),console.log(t)}))}}function g(){var e=this;return function(t){E({method:"GET",url:"https://findfalcone.herokuapp.com/vehicles"}).then((function(e){t({type:v,payload:e.data})})).catch((function(t){e.displayNotification("Please try agin letter"),console.log(t)}))}}function N(e){return function(t){clearTimeout(void 0),t({type:f,payload:e}),setTimeout((function(){t({type:f,payload:""})}),3e3)}}function S(e){return function(t){t({type:b,payload:e})}}function T(e){return function(t){E({url:"https://findfalcone.herokuapp.com/token",method:"POST",headers:{Accept:"application/json"}}).then((function(a){var n=[],c=[];Object.keys(e).map((function(t,a){n.push(e[t].planetName),c.push(e[t].vehicleName)}));var r={url:"https://findfalcone.herokuapp.com/find",method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},data:{token:a.data.token,planet_names:n,vehicle_names:c}};E(r).then((function(e){t({type:O,payload:e.data})}))}))}}var C=a(2),_=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.parentIndex,a=e.trackObject,n=e.planetsArr,r=a[t]?this.props.trackObject[t].planetValue:"-".concat(t);return c.a.createElement("div",{className:"form-group"},c.a.createElement("select",{onChange:this.props.selectPlanete,value:r,className:"form-control"},c.a.createElement("option",{defaultValue:!0,value:"-".concat(t)},"Select Planet"),n.map((function(e,a){return c.a.createElement("option",{key:"".concat(e.name,"-").concat(a),value:"".concat(a,"-").concat(t),disabled:e.disabled},e.name)}))))}}]),t}(n.Component),P=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.vehicleArr,n=t.parentIndex,r=t.trackObject;return c.a.createElement("div",null,c.a.createElement("ul",{className:"list-unstyled"},a.map((function(t,a){var l=!1,s="".concat(t.name.toLowerCase().split(" ").join("-"),"-").concat(n);return a===parseInt(r[n].vehicle)&&r[n].vehicleChecked&&(l=!0),c.a.createElement("li",{key:t.name,className:"form-check"},c.a.createElement("input",{className:"form-check-input",type:"radio",value:"".concat(a,"-").concat(n),name:"radio-".concat(n),onChange:e.props.selectVehicle,disabled:0===t.total_no,id:"".concat(s),checked:l}),c.a.createElement("label",{htmlFor:"".concat(s),className:"form-check-label"},t.name,"(",t.total_no,")"))}))))}}]),t}(n.Component),D=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.trackObject,a=e.parentIndex;return c.a.createElement("div",{className:"col-sm"},c.a.createElement(_,this.props),t[a]&&t[a].planet&&c.a.createElement(P,this.props))}}]),t}(n.Component),F=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={vehicleArr:[],planetsArr:[],trackObject:{},distance:{total:0},columnCount:4,disabled:!0},a.renderFilter=a.renderFilter.bind(Object(p.a)(a)),a.selectPlanete=a.selectPlanete.bind(Object(p.a)(a)),a.selectVehicle=a.selectVehicle.bind(Object(p.a)(a)),a.calculateDistance=a.calculateDistance.bind(Object(p.a)(a)),a.renderResult=a.renderResult.bind(Object(p.a)(a)),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.getPlanetesData(),this.props.getVehcleData()}},{key:"componentWillReceiveProps",value:function(e){var t=this;if(e.planetsArr!==this.props.planetsArr&&this.setState({planetsArr:JSON.parse(JSON.stringify(e.planetsArr))}),e.vehicleArr!==this.props.vehicleArr&&this.setState({vehicleArr:JSON.parse(JSON.stringify(e.vehicleArr))}),!0===e.resetApp){var a=JSON.parse(JSON.stringify(this.props.planetsArr)),n=JSON.parse(JSON.stringify(this.props.vehicleArr));this.setState({distance:{total:0},planetsArr:a,vehicleArr:n,trackObject:{}},(function(){t.calculateDistance(),t.props.resetAppFn(!1)}))}}},{key:"selectPlanete",value:function(e){var t=this.state,a=t.planetsArr,n=t.vehicleArr,c=t.trackObject,r=e.target.value.split("-");c[r[1]]||(c[r[1]]={});var l=c[r[1]]?c[r[1]].vehicle:null;c[r[1]].planet=r[0]?r[0]:"",c[r[1]].planetName=r[0]?a[r[0]].name:"",c[r[1]].vehicle="",l&&(n[l].total_no=n[l].total_no+1>this.props.vehicleArr[l].total_no?this.props.vehicleArr[l].total_no:n[l].total_no+1),c[r[1]].planetValue=e.target.value,a.map((function(e,t){return t===parseInt(r[0])?(e.disabled=!0,e.currentIndex=r[1]):e.currentIndex===r[1]&&(e.disabled=!1,e.currentIndex=""),e})),this.setState({planetsArr:a,trackObject:c,vehicleArr:n},this.calculateDistance)}},{key:"selectVehicle",value:function(e){var t=e.target.value.split("-"),a=this.state,n=a.vehicleArr,c=a.planetsArr,r=a.trackObject,l=r[t[1]].vehicle||"";n[t[0]].max_distance>=c[t[1]].distance?(r[t[1]].vehicle=t[0],r[t[1]].vehicleName=n[t[0]].name,r[t[1]].vehicleChecked=!0,n[t[0]].total_no=this.state.vehicleArr[t[0]].total_no-1,l&&(n[l].total_no=this.state.vehicleArr[l].total_no+1),this.setState({vehicleArr:n,trackObject:r},this.calculateDistance)):this.props.displayNotification("Planet's distance is more then vehicle's max distance")}},{key:"renderFilter",value:function(){for(var e=[],t=0;t<this.state.columnCount;t++)e.push(c.a.createElement(D,{key:t,planetsArr:this.state.planetsArr,vehicleArr:this.state.vehicleArr,selectPlanete:this.selectPlanete,trackObject:this.state.trackObject,selectVehicle:this.selectVehicle,parentIndex:t}));return e}},{key:"calculateDistance",value:function(){var e=!0,t=0,a=this.state,n=a.trackObject,c=a.planetsArr,r=a.vehicleArr,l=a.distance,s=0;Object.keys(n).map((function(e,a){if(n[e].vehicle&&n[e].planet){var l=r[n[e].vehicle].speed,i=c[n[e].planet].distance;s+=i/l,t++}})),l.total=s,t===this.state.columnCount&&(e=!1),this.setState({disabled:e,distance:l})}},{key:"renderResult",value:function(e){return c.a.createElement("div",{className:"text-center col-sm-12"},e.status&&"false"!==e.status?c.a.createElement(c.a.Fragment,null,c.a.createElement("h5",null,"Success! Congratulations on Finding Falcon. King Shan is mighty pleased."),c.a.createElement("h5",null,"Time Taken: ".concat(this.state.distance.total)),c.a.createElement("h5",null,"Planet found: ".concat(e.planet_name))):c.a.createElement(c.a.Fragment,null,c.a.createElement("h5",null,"Could not not found, try again.")))}},{key:"render",value:function(){var e=this,t=this.state,a=t.vehicleArr,n=t.planetsArr,r=t.distance,l=t.disabled;return c.a.createElement("div",{className:"row"},this.props.result?this.renderResult(this.props.result):c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"col-sm-12"},c.a.createElement("h3",{className:"text-center"},"Select Planes You Want To Search In")),a.length>0&&n.length>0?c.a.createElement(c.a.Fragment,null,this.renderFilter(),c.a.createElement("div",{className:"col-sm"},c.a.createElement("h4",null,"Time Taken:",r.total)),c.a.createElement("div",{className:"col-sm-12 text-center"},c.a.createElement("button",{type:"button",className:"btn btn-outline-success",disabled:l,onClick:function(t){return e.props.submitResult(e.state.trackObject)}},"Find Falcon!"))):c.a.createElement("div",{className:"col-sm-12 text-center"},c.a.createElement("h5",null,'"Loading ..."'))))}}]),t}(n.Component);var x=Object(m.b)((function(e){return{planetsArr:e.appsData.planetsArr,vehicleArr:e.appsData.vehicleArr,resetApp:e.appsData.resetApp,result:e.appsData.result}}),(function(e){return Object(C.bindActionCreators)({getPlanetesData:k,getVehcleData:g,displayNotification:N,resetAppFn:S,submitResult:T},e)}))(F),w=function(e){var t=e.position;return c.a.createElement("div",{className:"toast fade show ".concat(t)},c.a.createElement("div",{className:"toast-header"},c.a.createElement("span",{className:"bg-danger rounded"}),"Notification"),c.a.createElement("div",{className:"toast-body"},e.notification))},I=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return c.a.createElement("header",{className:"App-header shadow-sm p-3 mb-5 bg-white"},c.a.createElement("div",{className:"container"},c.a.createElement("ul",{className:"nav justify-content-end headerNav"},c.a.createElement("li",null,c.a.createElement("span",{onClick:function(t){return e.props.resetAppFn(!0)},className:"text-success resetLink"},"Reset")),c.a.createElement("li",null,c.a.createElement("a",{href:"https://www.geektrust.in/",className:"text-success"},"Geek Trust Home")))),this.props.notification&&c.a.createElement(w,{notification:this.props.notification}))}}]),t}(n.Component);var R=Object(m.b)((function(e){return{notification:e.appsData.notificationObject}}),(function(e){return Object(C.bindActionCreators)({resetAppFn:S},e)}))(I);var V=function(){return c.a.createElement("div",null,c.a.createElement(R,null),c.a.createElement("div",{className:"container"},c.a.createElement("h1",{className:"text-center"},"Finding Falcone!"),c.a.createElement(x,null)))},J=a(28),L=a(16),G={planetsArr:[],vehicleArr:[],mixObject:{},trackObject:{},notificationObject:"",resetApp:!1,result:null},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0,a=e.trackObject,n=e.result;switch(t.type){case d:return Object.assign({},e,{planetsArr:Object(L.a)(t.payload)});case v:return Object.assign({},e,{vehicleArr:Object(L.a)(t.payload)});case f:return Object.assign({},e,{notificationObject:t.payload});case b:return t.payload&&(a={},n=null),Object.assign({},e,{resetApp:t.payload,trackObject:a,result:n});case O:return Object.assign({},e,{result:t.payload});default:return e}},H=Object(C.combineReducers)({appsData:W}),M=function(e,t){return H(e,t)},B=a(29),K=[];K.push(J.a);var U=Object(C.createStore)(M,Object(B.composeWithDevTools)(C.applyMiddleware.apply(void 0,K)));l.a.render(c.a.createElement(m.a,{store:U},c.a.createElement(V,null)),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.e5e7ebb0.chunk.js.map