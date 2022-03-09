const player = new Player();

/**
 * Funckja inicjalizujaca dzialanie strony
 */
function startup(){

    let pointStore = [];

    const ctx = document.getElementById('ctx').getContext('2d');

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    let mouseX = 0;
    let mouseY = 0;

    const socket = new WebSocket('ws://localhost:8081');

    socket.onmessage = (e) => {

        const res = JSON.parse(e.data);
        pointStore = res.points.map((x) => new Point(x));
        console.log(res);
        player.mass = res.player.mass;
    }

    addEvent(window, "resize", function(e) {
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    });

    addEvent(window, "mousemove", function(e) {
        mouseX = e.clientX
        mouseY = e.clientY;
    });

    setInterval(()=>render(ctx, pointStore, mouseX, mouseY), 10);

    setInterval(()=>{
        player.ctxWidth = ctx.canvas.width;
        player.ctxHeight = ctx.canvas.width;

        socket.send(JSON.stringify(player));
    }, 100);

}


/**
 * Funckja renderujaca canvas
 * @param ctx kontekst
 */
function render(ctx, pointStore, mouseX, mouseY){

    // if(pointStore.length < 10000 && Math.round(Math.random() * (pointStore.length + 1)) == 1){
    //     pointStore.push(new Point(randomizePointCoords(ctx)));
    // }

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    player.move(mouseX, mouseY, width, height);


    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    let wasEeaten = false;

    pointStore.forEach((x, i) => {
        if(Math.abs(player.x - x.x) < player.size && Math.abs(player.y - x.y) < player.size){

            player.eat(x.mass);
            pointStore.splice(i, 1);
            wasEeaten = true;
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

    ctx.beginPath();
    ctx.fillStyle = player.color;
    ctx.arc(...player.getArc(width, height));
    ctx.fill();

}

/**
 * losuje pozycje nowego punktu i zwraca ja jako obiekt do konstruktora Point
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
