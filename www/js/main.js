function interpolate(x, f)
{
    var amap = function(v){ return parseFloat(v) },
        x = x.map(amap),
        f = f.map(amap),
        n = Math.min(x.length, f.length),
        a = [];
    // calculate interpolation (https://en.wikipedia.org/wiki/Newton_polynomial#Application)
    for( var i=0; i < n; i++ )
    {
        a[i] = f[0];
        for( var j=1; j<n-i; j++ )
            f[j-1] = parseFloat( ((f[j] - f[j-1]) / (x[j+i] - x[j-1])).toFixed(7) );
    }
    // a0 + a1(x - x0) + a2(x-x0)(x-x1) + a3(x-x0)(x-x1)(x-x2) + ...
    // print the interpolating polynomial and also multiply the binomials for final form
    var pstr = a[0],
        multi = [new Poly(a[0])];
    for(var i=1; i<a.length; i++)
    {
        pstr += " + "+a[i];
        var pairs = [a[i]];
        for(var j=0; j<i; j++)
        {
            pstr += "(x - "+x[j]+")";
            pairs.push([-x[j],1]);
        }
        multi.push(Poly.multiply.apply(undefined, pairs));
    }
    // print final form
    var multiStr = [];
    for( var i = multi.length - 1; i >= 0; i-- ) 
    {
        for( var j = multi[i].length - 1; j >= 0; j-- ) 
        {
            if(!multiStr[j])
            {
                multiStr[j*2] = 0;  
                multiStr[j*2+1] = ( (j!=0?" x":"")+(j!=1&&j!=0?"<sup>"+j+"</sup>":"") )+" +";
            } 
            multiStr[j*2] += multi[i].coeff[j];
        };
    };
    for( var i = multiStr.length - 2; i >= 0; i-=2 ) 
    {
        multiStr[i] = parseFloat(multiStr[i].toFixed(7));
        if( multiStr[i+2] < 0 || !multiStr[i+2] ) multiStr[i+1] = multiStr[i+1].replace(/\+\s?$/,'');
    };
    var result = document.querySelector('#result');
    result.innerHTML = '<div>'+pstr + '</div><br /><div>' + multiStr.join('').replace(/([\-\+])/g,' $1 ') + '</div>';
}
/*!
 * polynomial class with multiplication 
 */
function Poly(coeff)
{
    this.coeff = !(coeff instanceof Array) ? Array.prototype.slice.call(arguments) : coeff;
    this.length = this.coeff.length;
    this.multiply = function(poly)
    {
        if( !poly ) return this;
        var totalLength = this.coeff.length + poly.coeff.length - 1,
            result = new Array(totalLength);
        for( var i = 0; i < result.length; i++ ) result[i] = 0;
        for( var i = 0; i < this.coeff.length; i++ )
        {
            for( var j = 0; j < poly.coeff.length; j++ )
            {
                result[i+j] += this.coeff[i] * poly.coeff[j];
            }
        }
        return new Poly(result);
    }
}
Poly.multiply = function()
{
    var args = Array.prototype.slice.call(arguments),
        result = undefined;
    for (var i = 0; i < args.length; i++) 
    {
        if( !(args[i] instanceof Poly) ) args[i] = new Poly(args[i]);
        result = args[i].multiply(result);
    };
    return result;
}





//jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj















/*var instance,
    options = {
        target: '#form-newton .graph',
        yAxis: {domain: [-3, 3], type: 'linear'},
        xAxis: {domain: [-5, 5], type: 'linear'},
        annotations: [],
        data: [{
            fn: document.getElementById('funcao').value,
            sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
            graphType: 'polyline'
        }]
    };*/

function draw() {
 /*   try {
        instance = functionPlot(options);
    }
    catch (err) {
        console.log(err);
    }

    instance.programmaticZoom([-3, 3], [-2, 5]);*/
}



var rp    = document.getElementById('chute').value;//document.getElementById('funcao').value, //Raiz Anterior - Chute
    rn    = 0, //Raiz Atual - Chute
    i     = 0,
    range = 0.0001, //Precisão
    x     = 20, //Limites
    raizes = [], // Raizes
    cont = 0, //Contador de Iterações
    funcao,
    derivada,
    fnActive=null;

/*$(document).on('ready', function(){

    plot($('#fun-1').val(), $('#der-1').val())

    $('#funcao').val($('#fun-1').val());
    $('#derivada').val(derivada(document.getElementById('chute').value));

});*/

function plot(f1, f2) {

    f1 = f1.replace("cos", "Math.cos");
    f1 = f1.replace("sin", "Math.sin");
    f1 = f1.replace("x^2", "x*x");
    f1 = f1.replace("x^3", "x*x*x");
    f1 = f1.replace("x^4", "x*x*x*x");
    f1 = f1.replace("x^5", "x*x*x*x*x");
    f1 = f1.replace("x^6", "x*x*x*x*x*x");
    f1 = f1.replace("x^7", "x*x*x*x*x*x*x");

    f2 = f2.replace("cos", "Math.cos");
    f2 = f2.replace("sin", "Math.sin");
    f2 = f2.replace("x^2", "x*x");
    f2 = f2.replace("x^3", "x*x*x");
    f2 = f2.replace("x^4", "x*x*x*x");
    f2 = f2.replace("x^5", "x*x*x*x*x");
    f2 = f2.replace("x^6", "x*x*x*x*x*x");
    f2 = f2.replace("x^7", "x*x*x*x*x*x*x");

    cleaner();
    fnActive = f1;

    fnActive = fnActive.replace("Math.cos", "cos");
    fnActive = fnActive.replace("Math.sin", "sin");

    eval("funcao = function(x){ return (" + f1 + ").toFixed(10); }");
    eval("derivada = function(x){ return (" + f2 + ").toFixed(10); }");

    newton(chute());

    $('.infos').addClass('on');
}


/*$('#funcao').on('change', function(){
    var teste = $('#fun-1').val();
    var teste2 = $('#der-1').val();

    plot(teste, teste2);

    $('#funcao').val(teste);
    $('#derivada').val(teste2);



});*/


$(".button").on("click", function(){
    //plot($('#funcao').val(), $('#derivada').val());
    procesar('form-newton');


});

function cleaner() {
    rp    = 0;
    rn    = 0;
    i     = 0;
    range = 0.0001;
    x     = 20;
    raizes = [];
    cont = 0;
    options.annotations = [];

    $('.chutes-list').html('');
    $('.raizes-list').html('');
    $('.iteracoes strong').text('');

}

function chute() {

    var chutes = [],
        num;

    rn = funcao(x * -1);

    for (num = (x * -1) + range; num <= x; num += range) {

        rp = rn;
        rn = funcao(num);



        if((rp < 0 && rn > 0) || (rp > 0 && rn < 0) || (rn == 0)) {

            chutes.push(parseFloat(num.toFixed(10)));

        }


    }

    $.each(chutes, function(){
        options.annotations.push({x: this});
        $('.chutes-list').append('<li>' + this + '</li>');
    });


    return chutes;
}
function newton(chutes) {
    var xn,
        rn,
        dv;

    for(i = 0; i < chutes.length; i++) {

        rn = (funcao(chutes[i]) / derivada(chutes[i]));
        xn = chutes[i];


        if(rn != 0) {
            do {

                xn -= rn;

                if(derivada(xn) == 0) {
                    do{
                        xn += range;
                    } while(derivada(xn) > 0);

                }

                if(funcao(xn) == 0) {
                    rn = xn;
                    break;
                }

                rn = (funcao(xn) / derivada(xn)).toFixed(20);

                cont++;
            } while((xn - rn > range || (xn - rn) * -1 > range) && rn != 0);

            raizes.push(parseFloat(rn).toFixed(8));
        } else {
            raizes.push(chutes[i].toFixed(8));

        }

    }

    $('.iteracoes strong').text(cont);

    var zoomx = [-3, 3],
        zoomy = [-2, 5];

    $.each(raizes, function(){
        if(isNaN(this)) {
            options.annotations.push({x: 0});
            $('.raizes-list').append('<li>0</li>');
        } else {
            options.annotations.push({x: this});
            $('.raizes-list').append('<li>' + this + '</li>');

            if(this > 5 ) {
                zoomx = [-10, 10];
                zoomy = [-2, 5];
            } else
            if(this < -5) {
                    zoomx = [-10, 10];
                    zoomy = [-2, 5];

            }
        }

    });

    options.data[0].fn = fnActive;
   // draw();
    //instance.programmaticZoom(zoomx, zoomy);


    return raizes;
}














function funcion(func, x) {
    return nerdamer(func).buildFunction().call(undefined, x);
}
  

function derivada(x) {
    var func = document.getElementsByName("func")[0].value.trim();
    var derivative = nerdamer('diff(' + func + ')').evaluate();
    return eval(derivative.text());
} 


function procesar(formulario) {
    var i = 0;
    var func = document.getElementsByName("func")[0].value;
    
    var err, x_1, x = parseFloat(formulario.x.value);
    var resultado = '<table border="3"><tr><td align="center">i</td><td align="center">x<sub></sub></td><td align="center">error</td></tr>';
    do {
        //x_1 = x;
        var x_1 = x - funcion(func, x) / derivada(x);
        var e = Math.abs(x-x_1);
      x = x_1
        err = Math.abs((x - x_1) / x);
        resultado += '<tr><td>x<sub>' + i + '</sub></td><td>' + x_1 + '</td><td>' + err + '</td></tr>';
        i++;
        //I imagine that this is your safety so I would implement it like this
        if(i > 100) break;
    } while (e > 0.01);
    document.getElementById('resultado').innerHTML = resultado + '</tbody></table><br>' + (i == 100 ? 'A solução não é convergente. ' : 'A solução é ' + x);
    return false;
}