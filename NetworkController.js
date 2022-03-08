class NetworkController{

    connection;
    isConnected;

    constructor(){
        this.connection = null;
        this.isConnected = false;
        this.connect();
    }

    connect(){
        try{
            this.connection = new WebSocket('ws://localhost:8081', 'ProtocolOne');

            this.connection.onopen = this.onOpen;
            this.connection.onmessage = this.onMessage;
            this.connection.onclose = this.onClose;
            this.connection.onerror = this.onError;
        }
        catch(e){
            console.log(e);
        }
    }

    onOpen(e){

    }

    onMessage(e){
    }

    onClose(e){

    }

    onError(e){
        console.log()
    }
}
