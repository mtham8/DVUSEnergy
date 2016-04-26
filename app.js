var citySDK = new CitySDK()
var	eia = citySDK.modules.eia
eia.enable("1661F773CF10C39991D52DC4F86A5FFF")


var comm = []
var trans = []
var ind = []
var res = []
var pComm = []
var pTrans = []
var pInd = []
var pRes = []

var chart = null

var Data = {
  labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  series: [
  	{name: 'Commmerce', data: comm}, {name: 'Transport', data: trans}, {name: 'Industrial', data: ind}, {name: 'Residential', data: res}
  ],
}

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
}

var app = {

	init: function (){
    app.chartist()
    app.plotly()
	},

	postTransportation: function (){
    return new Promise (function (resolve) {
      var id = "TOTAL.TEACBUS.M"
      eia.seriesRequest({series: id}, function (response) {
       for(var i = 0; i < 12; i++){
        trans.push(response.series[0]['data'][i][1])
      }
      resolve(trans)
      })
    })
  },

  postCommercial: function (){
    return new Promise (function (resolve) {
      var id = "TOTAL.TECCBUS.M"
      eia.seriesRequest({series: id}, function (response) {
       for(var i = 0; i < 12; i++){
        comm.push(response.series[0]['data'][i][1])
      }
      resolve(comm)
      })
    })
  },

  postIndustrial: function (){
    return new Promise (function (resolve) {
      var id = "TOTAL.TEICBUS.M"
      eia.seriesRequest({series: id}, function (response) {
       for(var i = 0; i < 12; i++){
        ind.push(response.series[0]['data'][i][1])
      }
      resolve(ind)
      })
    })
  },

  postResidential: function (){
    return new Promise (function (resolve) {
      var id = "TOTAL.TERCBUS.M"
      eia.seriesRequest({series: id}, function (response) {
       for(var i = 0; i < 12; i++){
        res.push(response.series[0]['data'][i][1])
      }
      resolve(res)
      chart = new Chartist.Line('#chart1', Data, Options)
      })
    })
  },

  chartist: function () {
    app.postTransportation().then(function (data) {
      app.postCommercial().then(function (data) {
        app.postIndustrial().then(function (data) {
          app.postResidential().then(function (data) {
            console.log('end of chartist')
          })
        })
      })
    })
  },

  postPrimaryTrans: function (){
    return new Promise (function (resolve) {
      var id = "TOTAL.TXACBUS.M"
      eia.seriesRequest({series: id}, function (response) {
       for(var i = 0; i < 12; i++){
        pTrans.push(response.series[0]['data'][i][1])
      }
      resolve(pTrans)
      })
    })
  },

  postPrimaryComm: function (){
    return new Promise (function (resolve) {
      var id = "TOTAL.TXCCBUS.M"
      eia.seriesRequest({series: id}, function (response) {
       for(var i = 0; i < 12; i++){
        pComm.push(response.series[0]['data'][i][1])
      }
      resolve(pComm)
      })
    })
  },

  postPrimaryInd: function (){
    return new Promise (function (resolve) {
      var id = "TOTAL.TXICBUS.M";
      eia.seriesRequest({series: id}, function (response) {
       for(var i = 0; i < 12; i++){
        pInd.push(response.series[0]['data'][i][1]);
      }
      resolve(pInd)
    });
    })
  },

  postPrimaryRes: function (){
    return new Promise (function (resolve) {
      var id = "TOTAL.TXRCBUS.M";
      eia.seriesRequest({series: id}, function (response) {
       for(var i = 0; i < 12; i++){
        pRes.push(response.series[0]['data'][i][1]);
      }
      resolve(pRes)
      Plotly.plot(document.getElementById('myDiv'), pData, layout);
    });
    })
  },

  plotly : function () {
    app.postPrimaryTrans().then(function (data) {
      app.postPrimaryComm().then(function (data) {
        app.postPrimaryInd().then(function (data) {
          app.postPrimaryRes().then(function (data) {
            console.log('end of plotly')
          })
        })
      })
    })
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
