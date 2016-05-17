var citySDK = new CitySDK()
var	eia = citySDK.modules.eia
eia.enable("1661F773CF10C39991D52DC4F86A5FFF")

var canvas,ctx,count,N,sint,cost,gob,rectank,ptank,rand

window.onload=function(){
    canvas = document.getElementsByTagName('canvas')[0]
    ctx = canvas.getContext('2d')
    canvas.width=canvas.height=400
    rand=Math.random
    N=3*4
    sint=[]
    cost=[]
    r=0
    for(a=0;a<N*2;a++){
        sint[a]=Math.sin(r)
        cost[a]=Math.cos(r)
        r+=Math.PI/N
    }

    gtx=canvas.width/2
    gty=canvas.height/2
    obt=[]
    count=0
    abc()
    byo()
};

function abc(){
    var a,b,c,d,i,x,y,r,p,las,lasc,err
    p=[]
    rectank=[]
    hen=45
    han=hen/Math.sin(Math.PI/N)
    r=0
    for(a=0;a<N;a++){
        x=Math.cos(r)*han+gtx
        y=Math.sin(r)*han+gty
        p.push([x,y])
        r+=Math.PI*2/N
    }

    for(i=0;i<10000;i++){
        err=lasc=0
        las=10000
        rectank=[]

        o=[]
        for(a=0;a<N*2;a++){
            if(a%2==1){
                b=(a/2)|0
                c=p[b]
                d=p[(b+1)%N]
                b={};
                b.x=(c[0]+d[0])/2
                b.y=(c[1]+d[1])/2
                b.sr=a/2+N/4
                b.er=a/2-N/4
                b.han=han
            }else{
                b={}
                b.x=p[a/2][0]
                b.y=p[a/2][1]
                b.sr=a/2+(N/4+0.5)
                b.er=a/2-(N/4+0.5)
                b.han=han
            }
            o.push(b)
        }

        for(a=0;a<N*2;a++){
            b=o[a]
            c=o[(a+1)%(N*2)]
            d=o[(a+N*2-1)%(N*2)]
            b.mae=c
            b.tugi=d
        }

        e=ttt(o[(rand()*N*2)|0],rectank)
        for(b=0;b<135;b++){
            e=a=ttt(e,rectank)
            a.st=1
            max=0
            for(c=0;c<1000000;c++){
                if(a.han>las){
                    err=1
                    break
                }
                if(a.han>max){
                    max=a.han
                    e=a
                }
                a=a.tugi
                if(a.st){
                    las=max+0.001
                    a.st=0
                    break
                }
            }
            if(c<=0)break
            if(!err && c<2){
                lasc=rectank.length
            }
        }
        if(!err)break
        if(err){
            if(lasc)break
        }
    }
}

function byo(){
    var a,b,c,d,x,y,x1,y1,ms,mc,tim,p,r1,r2
    ctx.fillStyle="#b3e6cc"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    tim=new Date().getTime()/100

    a=tim/17
    ms=Math.sin(a)
    mc=Math.cos(a)
    r1=0.25+Math.sin(tim/11)/2
    if(r1<0)r1=0
    if(r1>0.5)r1=0.5
    r2=1-r1

    for(a=0;a<60;a++){
        c=rectank[a]
        b=50+Math.sin(c[4]+tim/23)*20
        ctx.fillStyle=ctx.strokeStyle="hsl(22,60%,"+(b|0)+"%)"
        p=[]
        for(b=0;b<4;b++){
            x=c[b][0]-gtx
            y=c[b][1]-gty
            x1=mc*x-ms*y
            y1=ms*x+mc*y
            p.push([x1+gtx,y1+gty])
        }

        p2=[]
        for(b=0;b<4;b++){
            c=p[b]
            d=p[(b+1)%4]
            p2.push([c[0]*r1+d[0]*r2,c[1]*r1+d[1]*r2])
        }

        ctx.beginPath()
        for(b=0;b<4;b++)ctx.lineTo(p2[b][0],p2[b][1])
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
    }
    requestAnimationFrame(byo)
}

function ttt(ob,rc){
    var a,b,c,d,e,p,x,y,bai,p1,p2,o,k,tx,ty,sr,er,z,n2,err1
    tx=ob.x
    ty=ob.y
    sr=ob.sr
    er=ob.er
    n2=N/2
    e=(er-sr)%N
    if(e<=0)e+=N
    b=sr

    for(z=0;z<20;z++){
        p=ranset(e)
        err1=0
        if(ob.mae && p.length>=2){
            a=ob.mae
            a=(a.er-a.sr+N*2)%N
            b=n2-p[0]-a

            if(b>0 || b==-1){
                err1=1
            }

            a=ob.tugi
            a=(a.er-a.sr+N*2)%N
            c=n2-p[p.length-1]-a
            if(c>0 || c==-1){
                err1=1
            }

            if(b===0){
                a=ob.mae.mae
                a=(a.er-a.sr+N*2)%N
                b=p[0]
                if(a<b){
                    err1=1
                }
            }

            if(c===0){
                a=ob.tugi.tugi
                a=(a.er-a.sr+N*2)%N
                b=p[p.length-1]
                if(a<b){
                    err1=1
                }
            }
        }
        if(!err1)break
    }

    p1=[]
    p2=[]
    b=sr
    for(a=0;a<p.length;a++){
        x=cost[(N*2+b*2)%(N*2)]*hen
        y=sint[(N*2+b*2)%(N*2)]*hen
        p1.push([x,y])

        c=cost[p[a]]*hen*2
        d=b+p[a]/2

        x=cost[(N*2+d*2)%(N*2)]*c
        y=sint[(N*2+d*2)%(N*2)]*c
        p2.push([x,y])
        b+=p[a]
    }
    x=cost[(N*2+b*2)%(N*2)]*hen
    y=sint[(N*2+b*2)%(N*2)]*hen
    p1.push([x,y])


    for(a=0;a<p1.length-1;a++){
        b=p1[a]
        c=p2[a]
        d=p1[a+1]
        rc.push(
            [
                [tx,ty],[b[0]+tx,b[1]+ty],[c[0]+tx,c[1]+ty],[d[0]+tx,d[1]+ty],count
            ]
        );
        count++
    }

    k=[]
    b=sr
    for(a=0;a<p.length;a++){
        k.push((b+p[a])%N)
        b+=p[a]
        k.push((b-p[a]+n2)%N)
    }

    o=[];
    for(a=0;a<p.length*2;a++){
        if(a%2===0){
            b=p1[a/2]
        }else{
            b=p2[(a/2)|0]
        }

        c={};
        c.x=b[0]+tx
        c.y=b[1]+ty
        c.er=k[a]
        x=c.x-gtx
        y=c.y-gty
        c.han=Math.pow(x*x+y*y,0.5)
        o.push(c)
    }

    for(a=0;a<o.length;a++){
        c=o[a]
        if(a){
            c.mae=o[a-1]
            c.sr=(o[a-1].er+n2)%N
        }
        if(a<o.length-1)c.tugi=o[a+1]
    }

    a=o[0]
    b=o[o.length-1]
    c=ob.mae.mae
    d=ob.tugi
    a.mae=c
    a.sr=(c.er+n2)%N
    c.tugi=a
    b.tugi=d
    d.mae=b
    d.sr=(b.er+n2)%N

    ob=o[o.length-1].tugi
    e=(ob.er-ob.sr+N)%N
    if(e===0){
        a=ob.mae
        c=ob.tugi
        b=ob.tugi.tugi
        a.tugi=b
        a.er=(b.sr+n2)%N
        b.mae=a
    }

    ob=o[0]
    e=(ob.er-ob.sr+N)%N
    if(e===0){
        a=ob.mae
        c=ob.tugi
        b=ob.tugi.tugi
        a.tugi=b
        a.er=(b.sr+n2)%N
        b.mae=a
        ob=ob.mae
    }
    return ob
}

function ranset(e){
    var a,b,c,d,p,n2
    n2=N/2
    if(e==1){
        return [1]
    }else if(e==2){
        if(rand()<0.5)return [2]
        return [1,1]
    }

    p=[];
    a=e;
    for(var zz=0;zz<10000;zz++){
        b=(1+(rand()*(n2-1)))|0
        if(b>a)b=a
        p.push(b)
        a-=b
        if(a<=0)break
    }

    for(a=0;a<p.length;a++){
        b=(rand()*p.length)|0
        c=p[a];p[a]=p[b];p[b]=c
    }
    return p
}


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
