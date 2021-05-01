window.onload = init;

var kérdés;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 7;
var displayedQuestion;      //Épp ez a kérdés
var numberOfQuestions;      //Kérdések száma az adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
var timeoutHandler;


let i = 1;

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function init() {
    let l = window.localStorage.getItem("lista")
    if (l) {
        console.log("Volt már listánk")
        hotList = JSON.parse(l);
        displayedQuestion = 0;
        kérdésMegjelenítés();

    }
    else {
        console.log("Még nem volt listánk")
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0
            }
            hotList[i] = q;
        }

        //Első kérdések letöltése
        for (var i = 0; i < questionsInHotList; i++) {
            console.log("***" + nextQuestion)
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }

    }

}

/*function letöltés() {
    fetch('/questions/1')
        .then(response => response.json())
        .then(data => kérdésMegjelenítés(data));

    /*function letöltésBefejeződött(d) {
        console.log("Sikeres letöltés")
        console.log(d)
        kérdés = d;
        kérdésMegjelenítés(0)
    }
}*/

function kérdésMegjelenítés() {

    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3

    if (kérdés.image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép1").style.visibility = 'visible';
    }
    else {
        document.getElementById("kép1").style.visibility = 'hidden';
    }

    function előre() {
        visszaszín();
        displayedQuestion++;
        clearTimeout(timeoutHandler)
        if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
        kérdésMegjelenítés()

    }


    document.getElementById("gomb2").onclick = előre;
    document.getElementById("gomb1").onclick = function vissza() {
        visszaszín();
        i--;
        if (i == 0) {
            alert('Elértél az első kérdéshez!');

        }
        else {

            fetch('/questions/' + (i))
                .then(response => {
                    if (!response.ok) {
                        console.error(`Hibás válasz: $ {response.status}`)
                    }
                    else {
                        return response.json()
                    }
                })
                .then(data => kérdésMegjelenítés(data));
        }
    }

    function visszaszín() {
        document.getElementById("válasz1").style.backgroundColor = '#FFFFFF';
        document.getElementById("válasz2").style.backgroundColor = '#FFFFFF';
        document.getElementById("válasz3").style.backgroundColor = '#FFFFFF';
    }

    document.getElementById("válasz1").onclick = function válasz1() {
        timeoutHandler = setTimeout(előre, 3000);
        if (kérdés.correctAnswer == 1) {
            document.getElementById("válasz1").style.backgroundColor = "green";
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion++
            }
        }
        else {
            document.getElementById("válasz1").style.backgroundColor = "red";
            hotList[displayedQuestion].goodAnswers = 0;
        }
        window.localStorage.setItem("lista", JSON.stringify(hotList))
    }
    document.getElementById("válasz2").onclick = function válasz2() {
        timeoutHandler = setTimeout(előre, 3000);
        if (kérdés.correctAnswer == 2) {
            document.getElementById("válasz2").style.backgroundColor = "green";
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion++
            }
        }
        else {
            document.getElementById("válasz2").style.backgroundColor = "red";
            hotList[displayedQuestion].goodAnswers = 0;
        }
        window.localStorage.setItem("lista", JSON.stringify(hotList))
    }
    document.getElementById("válasz3").onclick = function válasz3() {
        timeoutHandler = setTimeout(előre, 3000);
        if (kérdés.correctAnswer == 3) {
            document.getElementById("válasz3").style.backgroundColor = "green";
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion++
            }
        }
        else {
            document.getElementById("válasz3").style.backgroundColor = "red";
            hotList[displayedQuestion].goodAnswers = 0;
        }
        window.localStorage.setItem("lista", JSON.stringify(hotList))
    }


}





/*function kérdésMegjelenítés(k) {
    document.getElementById("kérdés_szöveg").innerHTML = kérdés[k].questionText;
    console.log(`$ {kérdés.length} kérdés érkezett}`)

    for (var i = 1; i < 4; i++) {
        document.getElementById("válasz" + i).innerText = kérdés[k]["answer" + i]
    }


    if (kérdés[k].image != "") {
        document.getElementById("kép2").src = "https://szoft1.comeback.hu/hajo/" + kérdés[k].image
        document.getElementById("kép2").style.visibility = 'visible';
    }
    else {
        document.getElementById("kép2").style.visibility = 'hidden';
    }





    document.getElementById("gomb1").onclick = function vissza() {
        visszaszín();
        if (k == 0) {
            kérdésMegjelenítés(2);
        }
        else {
            kérdésMegjelenítés(k - 1);
        }
    }
    document.getElementById("gomb2").onclick = function előre() {
        visszaszín();
        if (k == 2) {
            kérdésMegjelenítés(0);
        }
        else {
            kérdésMegjelenítés(k + 1);
        }
    }



    document.getElementById("válasz1").onclick = function válasz1() {
        if (kérdés[k].correctAnswer == 1) {
            document.getElementById("válasz1").style.backgroundColor = "green";
        }
        else {
            document.getElementById("válasz1").style.backgroundColor = "red";
        }
    }
    document.getElementById("válasz2").onclick = function válasz2() {
        if (kérdés[k].correctAnswer == 2) {
            document.getElementById("válasz2").style.backgroundColor = "green";
        }
        else {
            document.getElementById("válasz2").style.backgroundColor = "red";
        }
    }
    document.getElementById("válasz3").onclick = function válasz3() {
        if (kérdés[k].correctAnswer == 3) {
            document.getElementById("válasz3").style.backgroundColor = "green";
        }
        else {
            document.getElementById("válasz3").style.backgroundColor = "red";
        }
    }



    function visszaszín() {
        document.getElementById("válasz1").style.backgroundColor = '#8860d0';
        document.getElementById("válasz2").style.backgroundColor = '#8860d0';
        document.getElementById("válasz3").style.backgroundColor = '#8860d0';
    }
}*/
