class Player {
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
     * rozmiar (pole)
     * @type number
     */
    mass;

    ctxWidth;

    ctxHeight;

    /**
     * Przypisuje x i y, losuje rozmiar i kolor
     * @param x wspolrzedna x
     * @param y wspolrzedna y
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
     * @param mouseX pozycja x myszy
     * @param mouseY pozycja y myszy
     */
    move(mouseX, mouseY, width, height){

        const x = mouseX - width / 2;
        const y = mouseY - height / 2;

        const absX = Math.abs(x);
        const absY = Math.abs(y);
        const sum = absX + absY;

        let normalizedX = absX / sum * this.sigmoid(this.mass) ;//* x
        let normalizedY = absY / sum * this.sigmoid(this.mass) ;

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

    getArc(width, height){
        return [width/2, height/2, this.size, 0, this.#_rad(2)]
    }

    eat(mass){
        this.mass += mass/2;
    }

    get size(){
        return Math.sqrt(this.mass/Math.PI);
    }


    #_rad(rad){
        return rad*Math.PI;
    }

    sigmoid(z) {
        return (1 - (1 / (1 + Math.exp(-z/5000))))+1.5;
    }

}
