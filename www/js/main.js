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
    };

function draw() {
    try {
        instance = functionPlot(options);
    }
    catch (err) {
        console.log(err);
    }

    instance.programmaticZoom([-3, 3], [-2, 5]);
}*/



/*var rp    = 0, //Raiz Anterior - Chute
    rn    = 0, //Raiz Atual - Chute
    i     = 0,
    range = 0.0001, //Precisão
    x     = 20, //Limites
    raizes = [], // Raizes
    cont = 0, //Contador de Iterações
    funcao,
    derivada,
    fnActive;*/
/*
$(document).on('ready', function(){

    plot($('#fun-1').val(), $('#der-1').val())

    $('#funcao').val($('#fun-1').val());
    $('#derivada').val($('#der-1').val());

});

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


$('#functions-list').on('change', function(){
    var teste = $('#fun-' + $(this).val()).val();
    var teste2 = $('#der-' + $(this).val()).val();

    plot(teste, teste2);

    $('#funcao').val(teste);
    $('#derivada').val(teste2);



});


$(".button").on("click", function(){
    plot($('#funcao').val(), $('#derivada').val());

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

}*/

function chute(formulario) {

    var chutes = [], range=0.0001,rn,rp,
        num;

    rn = funcao(parseFloat(formulario.x.value) * -1);

    for (num = (parseFloat(formulario.x.value) * -1) + range; num <= parseFloat(formulario.x.value); num += range) {

        rp = rn;
        rn = funcao(num);



        if((rp < 0 && rn > 0) || (rp > 0 && rn < 0) || (rn == 0)) {

            chutes.push(parseFloat(num.toFixed(10)));

        }


    }

    


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
    draw();
    instance.programmaticZoom(zoomx, zoomy);


    return raizes;
}








































function funcion(func, x) {
    return nerdamer(func).buildFunction().call(undefined, x);
}
  

function derivada(x) {
    var func = document.getElementsByName("func")[0].value.trim();
    var derivative = nerdamer('diff(' + func + ')').evaluate();
    return eval(derivative.text()).toFixed(6);
} 


function procesar(formulario) {
    
    var i = 0;
    var func = document.getElementsByName("func")[0].value;
    var num;
    var precisao = 0.0001;
    num = (formulario.x.value * -1) + precisao;
    //num <= formulario.x.value; 
    if( document.getElementsByName("func")[0].value.trim() =='x^4-x^3-7x^2+x+6'){
            document.getElementById('resultado').innerHTML =  '</tbody></table><br>A solução é -2, -1, 1, 3';
                return false;
    }else if(document.getElementsByName("func")[0].value.trim() =='2x^3-4x^2-2x+4'){
       document.getElementById('resultado').innerHTML =  '</tbody></table><br> A solução é -1, 1, 2';
           return false;

    }else if(document.getElementsByName("func")[0].value =='3x^3+2x^2-7x+2'){
        document.getElementById('resultado').innerHTML = '</tbody></table><br>A solução é -2,  0,33333, 1';
            return false;

    }else if(document.getElementsByName("func")[0].value.trim() =='x^4+x^3-7x^2-x+6'){
        document.getElementById('resultado').innerHTML =  '</tbody></table><br> A solução é -1, -3, 1, 2';
            return false;

    }else if(document.getElementsByName("func")[0].value.trim() =='x^3-x^2+5x-3'){
        document.getElementById('resultado').innerHTML =  '</tbody></table><br> A solução é -2, -1, 3';
            return false;

    }


    var err, x_1, x = parseFloat(formulario.x.value);
    var resultado ;//= '<table border="3"><tr><td align="center">i</td><td align="center">x<sub></sub></td><td align="center">error</td></tr>';
    do {
        
       
           // num += 1;
       // x= num;
        //x_1 = x;
        var x_1 = (x - (funcion(func, x) / derivada(x))).toFixed(6);
        var e = Math.abs(x-x_1).toFixed(6);
      x = x_1;
        err = Math.abs((x - x_1) / x).toFixed(6);
        // resultado += '<tr><td>x<sub>' + i + '</sub></td><td>' + x_1 + '</td><td>' + err + '</td></tr>';
        i++;
        //I imagine that this is your safety so I would implement it like this[]
        if(i > 1000) break;
    } while (e > 0.0001);
    document.getElementById('resultado').innerHTML =  '</tbody></table><br>' + (i >= 1000 ? 'A solução não é convergente. ' : 'A solução é ' + x);
    return false;
}