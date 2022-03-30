const player = new Player();

/**
 * Funckja inicjalizujaca dzialanie strony
 */
function startup(){

    /**
     * przechowalnia punktow do renderu
     * @type {Point[]}
     */
    let pointStore = [];
    /**
     * przechowalnia graczy do renderu
     * @type {Enemy[]}
     */
    let enemiesStore = [];

    /**
     * canvas
     */
    const ctx = document.getElementById('ctx').getContext('2d');

    /**
     * szerokosc pola gry (canvasu), dla wygody
     * @type {number}
     */
    ctx.canvas.width  = window.innerWidth;
    /**
     * wysokosc pola gry (canvasu), dla wygody
     * @type {number}
     */
    ctx.canvas.height = window.innerHeight;

    /**
     * zmienna do przechowywania x myszy
     * @type {number}
     */
    let mouseX = 0;

    /**
     * zmienna do przechowywania y myszy
     * @type {number}
     */
    let mouseY = 0;

    /**
     * event resize, dopasowuje rozmiar canvas do okna
     */
    addEvent(window, "resize", function(e) {
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    });

    /**
     * aktualizuje pozycje myszy
     */
    addEvent(window, "mousemove", function(e) {
        mouseX = e.clientX
        mouseY = e.clientY;
    });

    /**
     * interwal renderowania
     */
    const renderInterval = setInterval(()=>render(ctx, pointStore, enemiesStore, mouseX, mouseY), 10);

    /**
     * wysyla informacje do serwera
     */
    const websocketInterval = setInterval(()=>{
        player.ctxWidth = ctx.canvas.width;
        player.ctxHeight = ctx.canvas.width;

        socket.send(JSON.stringify(player));
    }, 100);

    /**
     * polaczenie z serwerem
     * @type {WebSocket}
     */
    const socket = new WebSocket('ws://localhost:8081');

    /**
     * obsluga broadcastu serwera, aktualizuje pointStore, enemyStore i masę gracza
     * @param e
     */
    socket.onmessage = (e) => {
        const res = JSON.parse(e.data);
        pointStore = res.points.map((x) => new Point(x));
        enemiesStore = res.players.map((x) => new Enemy(x));
        player.mass = res.player.mass;


        if(!res.player.alive){
            console.log(res);
            clearInterval(websocketInterval);
            clearInterval(renderInterval);
            window.alert("przegrales");
        }
    }

}


/**
 * Funckja renderujaca canvas
 * @param ctx kontekst do renderu
 * @param pointStore {Point[]} tablica punktow na polu gry
 * @param enemiesStore {Enemy[]} tablica przeciwnikow
 * @param mouseX {number} x myszy
 * @param mouseY {number} y myszy
 */
function render(ctx, pointStore, enemiesStore, mouseX, mouseY){

    // if(pointStore.length < 10000 && Math.round(Math.random() * (pointStore.length + 1)) == 1){
    //     pointStore.push(new Point(randomizePointCoords(ctx)));
    // }

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    player.move(mouseX, mouseY, width, height);


    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    let wasEaten = false;


    pointStore.forEach((x, i) => {
        if(Math.abs(player.x - x.x) < player.size
            && Math.abs(player.y - x.y) < player.size){

            player.eat(x.mass);
            pointStore.splice(i, 1);
            wasEaten = true;
            return;

        }

        const ctxX = x.getCtxX(player.x, width);
        const ctxY = x.getCtxY(player.y, height);

        if(ctxX >= 0 && ctxX <= width && ctxY >= 0 && ctxY <= height) {
            ctx.beginPath();
            ctx.fillStyle = x.color;
            const args = [player.x, player.y, width, height];
            ctx.arc(...x.getArc(...args));
            ctx.fill();
        }
    });

    enemiesStore.forEach((x, i) => {

        if (player.mass > x.mass+20 && Math.abs(player.x - x.x) < player.size-1
            && Math.abs(player.y - x.y) < player.size-1) {
            player.eat(x.mass);
            enemiesStore.splice(i, 1);
        }

        const ctxX = x.getCtxX(player.x, width);
        const ctxY = x.getCtxY(player.y, height);

        if(ctxX >= 0 && ctxX <= width && ctxY >= 0 && ctxY <= height) {
            ctx.beginPath();
            ctx.fillStyle = x.color;
            const args = [player.x, player.y, width, height];
            ctx.arc(...x.getArc(...args));
            ctx.fill();
        }
    });

    ctx.beginPath();
    ctx.fillStyle = player.color;
    ctx.arc(...player.getArc(width, height));
    ctx.fill();

}

/**
 * losuje pozycje nowego punktu i zwraca ja jako obiekt do konstruktora Point
 * @param ctx canvas, do pobrania danych
 * @returns {{x: number, y: number}}
 */
function randomizePointCoords(ctx){
    return {x: Math.random() * ctx.canvas.width - ctx.canvas.width / 2 + player.x,
        y: Math.random() * ctx.canvas.height - ctx.canvas.height / 2 + player.y}
}

/**
 * tworzy event listener, funkcja ze stackoverlow, bo addEventListener nie dzialalo
 * @param object obiekt, do ktorego dolacza listener np. window
 * @param type type of event
 * @param callback callback, po wystapieniu eventu
 */
function addEvent(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
}
