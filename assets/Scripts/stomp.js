export function getStomp(){
    return new Promise((resolve)=> {
        var socket = new SockJS('/stompendpoint');
        var stompClient = Stomp.over(socket);

    });
}