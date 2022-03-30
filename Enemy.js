class Enemy {

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
     * rozmiar (pole) kulki gracza
     * @type number
     */
    mass;

    /**
     * Przypisuje 0 do x i y, losuje kolor, ustawia mass (rozmiar) na wartosc poczatkowa (700)
     * ustawia wysokosc i szerkosc pola gry na domyslne wartosci
     * @param x {number} x gracza
     * @param y {number} y gracza
     * @param color {string} color hex gracza
     * @param mass {number} masa (wynik) gracza
     */
    constructor({x, y, color, mass}){
        this.x = x;
        this.y = y;
        this.color = color;
        this.mass = mass;
    }

    /**
     * zwraca liste argumentow do renderowania
     * @param width {number} szerokosc pola gry
     * @param height {number} wysokosc pola gry
     * @returns {array} tablica argumentow do funkcji canvas.arc()
     */
    getArc(x, y, width, height){
        return [this.x - x + width / 2, this.y - y + height / 2, this.size, 0, this.#rad(2)]
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
     * wylicza promien kulki gracza
     * @returns {number} promien kola gracza
     */
    get size(){
        return Math.sqrt(this.mass/Math.PI);
    }

    /**
     * zwraca radiany z liczby
     * @param rad radiany
     * @returns {number} radiany
     */
    #rad(rad){
        return rad*Math.PI;
    }
}
