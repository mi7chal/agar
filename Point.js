class Point{

    /**
     * wspolrzedna x
     * @type number
     */
    x;

    /**
     * wspolrzedna y
     * @type number
     */
    y;

    /**
     * kolor hex
     * @type string
     */
    color;

    /**
     * rozmiar (pole) z zakresu od 5 do 10
     * @type number
     */
    mass;

    /**
     * przypisuje wartosci z argumentow lub losuje
     * @param x {number} wspolrzedna x
     * @param y {number} wspolrzedna y
     * @param color {string} kolor hex, opcjonalny
     * @param mass {number} masa (rozmiar), opcjonalny
     */
    constructor({x, y, color = undefined, mass = undefined}) {
        this.x = x;
        this.y = y;
        if(color===undefined)
            this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        else
            this.color = color;
        if(mass===undefined)
            this.mass = Math.random() * 300 + 150;
        else
            this.mass = mass;
    }

    /**
     * zwraca liste argumentow do renderowania
     * @param width {number} szerokosc pola gry
     * @param height {number} wysokosc pola gry
     * @returns {array} tablica argumentow do funkcji canvas.arc()
     */
    getArc(x, y, width, height){
        return [this.x - x + width / 2, this.y - y + height / 2, this.size, 0, this.#_rad(2)]
    }

    /**
     * wylicza promien kulki gracza
     * @returns {number} promien kola gracza
     */
    get size(){
        return Math.sqrt(this.mass / Math.PI);
    }

    /**
     * zwraca wspolrzedna x canvasu, w ktorej punkt powininen zostac wyrenderowany
     * @param x {number} wspolrzedna x gracza
     * @param width {number} szerokosc canvasu
     * @returns {number} wspolrzdna x do renderu
     */
    getCtxX(x, width){
        return this.x - x + width / 2;
    }

    /**
     * zwraca wspolrzedna y canvasu, w ktorej punkt powininen zostac wyrenderowany
     * @param y {number} wspolrzedna y gracza
     * @param height {number} wysokosc canvasu
     * @returns {number} wspolrzdna y do renderu
     */
    getCtxY(y, height){
        return this.y - y + height / 2;
    }

    /**
     * zwraca predkosc gracza (ilosc px, o ktore sie przemieszcza)
     * funkcja normalizuje liczbe, jest to wariacja funckji sigmoid,
     * szybkosc poruszania sie gracza rosnie wykladniczo w zaleznosci od jego masy
     * @param z {number} masa
     * @returns {number} ilosc px do przemieszczenia
     */
    #_rad(rad){
        return rad * Math.PI;
    }


}
