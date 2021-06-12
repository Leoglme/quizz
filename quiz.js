$(function newQcm() {
    $.getJSON('document.json', function (data) {
        // couleur aléatoire body //bonus pour la beauté
        randomColor();

        let countJson = data.length - 1;
        let indexJson = 0;
        let countGoodResponse = 0;
        let mauvaiseResponse = 0;
        console.log(data);


        // première question
        $('.modal-title').html(data[0]["question"]);
        $('.solution1').html(data[0]["reponses"][0]);
        $('.solution2').html(data[0]["reponses"][1]);
        $('.solution3').html(data[0]["reponses"][2]);
        $('.solution4').html(data[0]["reponses"][3]);
        $('.compteur').html(indexJson + " / " + countJson);

        // question suivante
        $('.next__question').on('click', function () {
            randomColor();
            if (indexJson < countJson) {
                indexJson++;
            } else {
                $('.modal__question').attr('style', 'display: none !important');
                $('.modal__response').addClass('affiche');

            }

            // calcul du résultat et pourcentage
            let indexSolution = indexJson - 1;
            let goodResponse = data[indexSolution]["solution"];
            //réponse user
            if (currentCheck() === goodResponse) {
                countGoodResponse++;
            }else{
                mauvaiseResponse++;
            }
            $('.score').html(countGoodResponse + " bonnes réponses !");

            // calcul pourcentage et width bar
            let percentage = countGoodResponse / countJson * 100;
            $(".progress-bar").css('width', percentage + '%');

            // compteur de question
            $('.compteur').html(indexJson + " / " + countJson);

            // question/réponse innerHtml
            $('.modal-title').html(data[indexJson]["question"]);
            $('.solution1').html(data[indexJson]["reponses"][0]);
            $('.solution2').html(data[indexJson]["reponses"][1]);
            $('.solution3').html(data[indexJson]["reponses"][2]);
            $('.solution4').html(data[indexJson]["reponses"][3]);

            $('.fa-check').html(" " + countGoodResponse);
            $('.fa-times').html(" " + mauvaiseResponse);

        })

    })

    let currentCheck = function () {
        let e = $("input:checked");
        return e.val();
    }


    function randomColor() {
        let r = Math.floor(256*Math.random());
        let g = Math.floor(256*Math.random());
        let b = Math.floor(256*Math.random());
        $("body").css('background', "rgb(" + r + "," + g + "," + b + ")");
    }



    $('.restart').on('click', function () {
        location.reload();
    })


})



