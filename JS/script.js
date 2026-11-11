/* 
    TOdo aplikacija
    Dodaj, ukoloni te označi obavljeni zadatal
*/

// samopozivajuca funkcija: omoguciti ce nam da ogranicimo doseg njenih clanova

(function () {
    "use strict";

    // funkcije konstruktora
    function Todo() {
        // dohvacanje pojedinih HTML elemenata
        const polje = document.querySelector("input"),
            gumbicDodaj = document.querySelector("button"),
            lista = document.querySelector("ul");

        // deklaracija funkcije za upravljanje listom
        function oznaciObavljenim(event) {
            const gumbicOznaci = event.target;
            gumbicOznaci.parentNode.classList.toggle("obavljeno");
        }

        function ukoloniStavku(event) {
            const gumbicUkloni = event.target;
            gumbicUkloni.parentNode.remove();
            polje.focus();
        }

        function dodajGumbicOznaci(stavka) {
            const gumbicOznaci = document.createElement("input");
            gumbicOznaci.setAttribute("type", "checkbox");
            gumbicOznaci.addEventListener("click", oznaciObavljenim);
            stavka.insertBefore(gumbicOznaci, stavka.firstChild);
        }

        function dodajGumbicUkloni(stavka) {
            const gumbicUkloni = document.createElement("div");
            gumbicUkloni.className = "gumbic-ukloni";
            gumbicUkloni.addEventListener("click", ukoloniStavku);
            stavka.appendChild(gumbicUkloni);
        }

        function kreirajStavku(text) {
            const stavka = document.createElement("li");
            stavka.innerText = text;
            dodajGumbicOznaci(stavka);
            dodajGumbicUkloni(stavka);
            return stavka;
        }

        function dodajStavku() {
            const text = polje.value.trim();
            if (text != "") {
                const stavka = kreirajStavku(text);
                lista.appendChild(stavka);
                polje.value = "";
                polje.focus();
            }
            else {
                alert("upišite opis zadatka");
                polje.focus();
            }
        }

        // deklaracija metode dostupne preko objekta koji ce se kreirati iz funkcije konstruktora
        this.init = function () {
            gumbicDodaj.addEventListener("click", dodajStavku);
        }
    }

    // kreiranje objekta iz funkcije konstruktora
    const todo = new Todo();

    // poziv metode init() nakon ucitavanja kompletne stranice s vanjskim resursima
    window.addEventListener("load", todo.init);

})();