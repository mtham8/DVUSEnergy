var citySDK = new CitySDK();
var	eia = citySDK.modules.eia;
eia.enable("1661F773CF10C39991D52DC4F86A5FFF");


var comm = [];
var trans = [];
var ind = [];
var res = [];
var pComm = [];
var pTrans = [];
var pInd = [];
var pRes = [];

var chart = null;

var Data = {
  labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  series: [
  	{name: 'Commmerce', data: comm}, {name: 'Transport', data: trans}, {name: 'Industrial', data: ind}, {name: 'Residential', data: res}
  ],
};
var Options = {
  low: 1000,
  scaleMinSpace: 20,
  axisY: {
    labelInterpolationFnc: function(value) {
      return value + ' Btu';
    	}
	},
	plugins: [
	    Chartist.plugins.ctAccessibility({
	      caption: 'Total Energy Consumption',
	      seriesHeader: '(in Btu)',
	      summary: 'Energy Consumption by Sector 2015',
	      valueTransform: function(value) {
        		return value ;
      		},
	      visuallyHiddenStyles: 'position: absolute; top: 100%; width: 100%; font-size: 14px; overflow-x: auto; padding: 14px;'
	    }),
	  ]
};

var app = {

	init: function (){
		app.postTransportation();
		app.postCommercial();
		app.postIndustrial();
		app.postResidential();
		app.postPrimaryTrans();
		app.postPrimaryComm();
		app.postPrimaryInd();
		app.postPrimaryRes();
	},

	postTransportation: function (){
		var id = "TOTAL.TEACBUS.M";
		eia.seriesRequest({series: id}, function (response) {
			for(var i = 0; i < 12; i++){
				trans.push(response.series[0]['data'][i][1]);
			}
			// console.log(trans);
			// chart = new Chartist.Line('#chart1', Data, Options);
        });
	},

	postCommercial: function (){
		var id = "TOTAL.TECCBUS.M";
		eia.seriesRequest({series: id}, function (response) {
			for(var i = 0; i < 12; i++){
				comm.push(response.series[0]['data'][i][1]);
			}
			// console.log(comm);
			// chart = new Chartist.Line('#chart1', Data, Options);
        });
	},

	postIndustrial: function (){
		var id = "TOTAL.TEICBUS.M";
		eia.seriesRequest({series: id}, function (response) {
			for(var i = 0; i < 12; i++){
				ind.push(response.series[0]['data'][i][1]);
			}
			// console.log(ind);
			// chart = new Chartist.Line('#chart1', Data, Options);
        });
	},

	postResidential: function (){
		var id = "TOTAL.TERCBUS.M";
		eia.seriesRequest({series: id}, function (response) {
			for(var i = 0; i < 12; i++){
				res.push(response.series[0]['data'][i][1]);
			}
			// console.log(res);
			chart = new Chartist.Line('#chart1', Data, Options);
        });
	},

	postPrimaryTrans: function (){
		var id = "TOTAL.TXACBUS.M";
		eia.seriesRequest({series: id}, function (response) {
			for(var i = 0; i < 12; i++){
				pTrans.push(response.series[0]['data'][i][1]);
			}
        });
	},

	postPrimaryComm: function (){
		var id = "TOTAL.TXCCBUS.M";
		eia.seriesRequest({series: id}, function (response) {
			for(var i = 0; i < 12; i++){
				pComm.push(response.series[0]['data'][i][1]);
			}
        });
	},

	postPrimaryInd: function (){
		var id = "TOTAL.TXICBUS.M";
		eia.seriesRequest({series: id}, function (response) {
			for(var i = 0; i < 12; i++){
				pInd.push(response.series[0]['data'][i][1]);
			}
        });
	},

	postPrimaryRes: function (){
		var id = "TOTAL.TXRCBUS.M";
		eia.seriesRequest({series: id}, function (response) {
			for(var i = 0; i < 12; i++){
				pRes.push(response.series[0]['data'][i][1]);
			}
			Plotly.plot(document.getElementById('myDiv'), pData, layout);
        });
	}
}



var PrimComm = {
  x: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06', '2015-06', '2015-07', '2015-08', '2015-09', '2015-10', '2015-11','2015-12'],
  y: pComm,
  fill:"tozeroy",
  uid:"c530f8",
  type: 'scatter',
  name: "Commercial"
};

var PrimTrans = {
  x: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06', '2015-06', '2015-07', '2015-08', '2015-09', '2015-10', '2015-11','2015-12'],
  y: pTrans,
  fill:"tonexty",
  uid:"b257ba",
  type: 'scatter',
  name: "Transporation"
};

var PrimInd = {
  x: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06', '2015-06', '2015-07', '2015-08', '2015-09', '2015-10', '2015-11','2015-12'],
  y: pInd,
  fill:"tonexty",
  uid:"f7dab2",
  type: 'scatter',
  name: "Industrial"
};

var PrimRes = {
  x: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06', '2015-06', '2015-07', '2015-08', '2015-09', '2015-10', '2015-11','2015-12'],
  y: pRes,
  fill:"tonexty",
  uid:"98b5cd",
  type: 'scatter',
  name: "Residential"
};

var pData = [PrimComm, PrimTrans, PrimInd, PrimRes];

var layout = {
  yaxis: { title: "Energy Consumption in Btu"},
  xaxis: {
    tickformat: "%b, %Y"
  }
};
