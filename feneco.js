(function(){                
    'use strict';

    // elementos do DOM
    var $btnPrev = document.querySelector('.carousel__btn--prev');
    var $btnNext = document.querySelector('.carousel__btn--next');
    var $carousel = document.querySelector('.carousel');
    var $carouselInner = document.querySelector('.carousel__inner');
    var $carouselItem = document.querySelectorAll('.carousel__item');
    var $ul = document.querySelector('ul');
    const tamanhoImg = parseInt(800);

    // mostro os btns de nav e escondo a barra horizontal
    $btnPrev.style.display = 'block';
    $btnNext.style.display = 'block';
    $carousel.style.overflowX = 'hidden';

    // estilo efeito carousel
    $carouselInner.style.transform = 'translateX(0px)';

    //add os listeners aos btns left e right
    $btnPrev.addEventListener('click', function(){clicouSeta('prev');});
    $btnNext.addEventListener('click', function(){clicouSeta('next');});

    criarLis(); //crio as bullets

    function clicouSeta(seta){
        var totalImgs = (parseInt($carouselItem.length) -1) * tamanhoImg * -1; //posicao da ultima imagem
        var $transformAtual = $carouselInner.style.transform; //posicao atual img slider
        var num = parseInt($transformAtual.match(/\d/g).join('')) * -1; //num transform atual resgatado (sem sinal -)

        // preparar bullets
        var $liRemove = document.querySelector('li.atual')//saber qual remover
        var pegaIndex = parseInt([...$liRemove.parentNode.children].indexOf($liRemove.closest('li')));//pegar o id para remover

        switch (seta){
            case "prev":
                if (num === 0){return;} //se for primeiro não faz nada
                num += + tamanhoImg; 
                pegaIndex += - 1; //bullet prev
            break;

            case "next":
                if (num === totalImgs){
                    num = 0; //volta primeiro
                    pegaIndex = 0; //bullet next
                } else{
                    num += - tamanhoImg; 
                    pegaIndex += + 1; //bullet next
                }//fim if
            break;
        }

        $carouselInner.style.transform = 'translateX('+num+'px)';
        bulletAtiva(pegaIndex);
    }

    function criarLis(){
        for(var i=1; i <= $carouselItem.length; ++i){
            var li = document.createElement('li'); //cria li
            if (i===1)li.classList.add('atual'); //add class 1° li
            $ul.appendChild(li); //inclui li criada na ul
        } // fim for
    } // fim func.

    $ul.addEventListener('click', function (e){
        if(e.target.nodeName === 'LI')linkLis(e.target);          
    })

    function linkLis(li){
        var index = [...li.parentNode.children].indexOf(li.closest('li'));

        var calculaTransition = parseInt(index) * tamanhoImg * -1;
        $carouselInner.style.transform = 'translateX('+calculaTransition+'px)';

        bulletAtiva(index);
    }

    function bulletAtiva(index){
        var $liRemove = document.querySelector('li.atual');
        var $liAtual = document.querySelectorAll('li')[index];

        $liRemove.classList.remove('atual');
        $liAtual.classList.add('atual');
    }

    // temporizador
    var temp; iniciarTemporizador();

    $carousel.addEventListener('mouseover',pararTemporizador);
    $carousel.addEventListener('mouseout',iniciarTemporizador);

    function pararTemporizador(){clearInterval(temp);}
    function iniciarTemporizador(){temp = setInterval(function(){clicouSeta('next');}, 2000);}
})()