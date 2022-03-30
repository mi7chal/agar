class Player{

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
     *  szerokosc pola gry
     *  @type number
     */
    ctxWidth;

    /**
     *  wysokosc pola gry
     *  @type number
     */
    ctxHeight;

    /**
     * Przypisuje 0 do x i y, losuje kolor, ustawia mass (rozmiar) na wartosc poczatkowa (700)
     * ustawia wysokosc i szerkosc pola gry na domyslne wartosci
     */
    constructor(){
        this.ctxWidth=1920;
        this.ctxHeight=1080;
        this.x = 0;
        this.y = 0;
        this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        this.mass = 700;
    }

    /**
     * przemieszcza kulke gracza po planszy
     * @param mouseX {number} pozycja x myszy
     * @param mouseY {number} pozycja y myszy
     * @param width {number} szerokosc pola gry, sluzy do okreslenia pozycji myszy
     * @param height {number} wysokosc pola gry, do okreslenia pozycji myszy
     */
    move(mouseX, mouseY, width, height){

        const x = mouseX - width / 2;
        const y = mouseY - height / 2;

        const absX = Math.abs(x);
        const absY = Math.abs(y);
        const sum = absX + absY;

        let normalizedX = absX / sum * this.#sigmoid(this.mass) ;//* x
        let normalizedY = absY / sum * this.#sigmoid(this.mass) ;

        if(x<0){
            normalizedX *= -1;
            if(this.x<=-5000)
                normalizedX = 0;
        }
        else if (this.x >= 5000) {
            normalizedX = 0;
        }

        if(y<0){
            normalizedY *= -1 ;
            if(this.y<=-5000)
                normalizedX = 0;
        }
        else if (this.y >= 5000){
            normalizedY = 0;

        }

        this.x += normalizedX;
        this.y += normalizedY;

    }

    /**
     * zwraca liste argumentow do renderowania
     * @param width {number} szerokosc pola gry
     * @param height {number} wysokosc pola gry
     * @returns {array} tablica argumentow do funkcji canvas.arc()
     */
    getArc(width, height){
        return [width/2, height/2, this.size, 0, this.#rad(2)]
    }

    /**
     * zjadanie kulek, zwieksza mase o podana ilosc
     * @param mass {number} masa, ktora gracz "zjadl"
     */
    eat(mass){
        this.mass += mass/4;
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

    /**
     * zwraca predkosc gracza (ilosc px, o ktore sie przemieszcza)
     * funkcja normalizuje liczbe, jest to wariacja funckji sigmoid,
     * szybkosc poruszania sie gracza rosnie wykladniczo w zaleznosci od jego masy
     * @param z {number} masa
     * @returns {number} ilosc px do przemieszczenia
     */
    #sigmoid(z) {
        return (1 - (1 / (1 + Math.exp(-z/5000))))+1.5;
    }

}
