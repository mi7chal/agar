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
     * Przypisuje x i y, losuje rozmiar i kolor
     * @param x wspolrzedna x
     * @param y wspolrzedna y
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

    getArc(x, y, width, height){
        return [this.x - x + width / 2, this.y - y + height / 2, this.size, 0, this.#_rad(2)]
    }

    get size(){
        return Math.sqrt(this.mass / Math.PI);
    }

    getCtxX(x, width){
        return this.x - x + width / 2;
    }

    getCtxY(y, height){
        return this.y - y + height / 2;
    }

    #_rad(rad){
        return rad * Math.PI;
    }


}
