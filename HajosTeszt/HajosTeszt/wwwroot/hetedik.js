let jelenlegiKérdés;
let kérdésLista;
let kérdésSzám = 4;

function kérdésBetöltés(id) {
	fetch(`/questions/${id}`)
		.then(response => {
			if (!response.ok) {
				console.error(`Hibás válasz: ${response.status}`)
			}
			else {
				return response.json()
			}
		})
		.then(data => kérdésMegjelenítés(data));
}  

function listaLetöltés() {
	fetch('/questions/all')
		.then(response => response.json())
		.then(data => letöltésBefejeződött(data));

	function letöltésBefejeződött(d) {
		kérdésLista = d.length;
	}
}

listaLetöltés();
kérdésBetöltés(kérdésSzám);

function kérdésMegjelenítés(kérdés) {
	jelenlegiKérdés = kérdés;

	document.getElementById("kerdes_szoveg").innerHTML = jelenlegiKérdés.questionText;
	document.getElementById("valasz1").innerHTML = jelenlegiKérdés.answer1;
	document.getElementById("valasz1").classList = "kerdes kattinthato";

	document.getElementById("valasz2").innerHTML = jelenlegiKérdés.answer2;
	document.getElementById("valasz2").classList = "kerdes kattinthato";

	document.getElementById("valasz3").innerHTML = jelenlegiKérdés.answer3;
	document.getElementById("valasz3").classList = "kerdes kattinthato";

	document.getElementById("kép1").src = jelenlegiKérdés.image && `https://szoft1.comeback.hu/hajo/${jelenlegiKérdés.image}`;
}

function előzőKérdés() {
	kérdésSzám = kérdésSzám - 1 < 1 ? kérdésLista : kérdésSzám - 1;
	console.log(kérdésSzám)
	kérdésBetöltés(kérdésSzám);
}

function következőKérdés() {
	kérdésSzám = kérdésSzám + 1 > kérdésLista ? 1 : kérdésSzám + 1;
	kérdésBetöltés(kérdésSzám);
}

function kérdésEllenőrzés(id) {
	let jóVálasz = jelenlegiKérdés.correctAnswer;
	let megjelöltVálasz = parseInt(id.slice(id.length - 1));

	if (megjelöltVálasz === jóVálasz) {
		document.getElementById(id).classList.add("jo");
	} else {
		document.getElementById(id).classList.add("rossz");
		document.getElementById(`valasz${jóVálasz}`).classList.add("jo");
	}
}
