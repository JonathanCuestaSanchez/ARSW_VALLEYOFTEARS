// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        tank: {
            default: null,
            type: cc.Node
        },
        stompClient :null,
        channel:null,
    },

    // LIFE-CYCLE CALLBACKS:

     connectAndSubscribe : function (channel) {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            // 2 par el topico y lo que realizara al recibir un evento
            stompClient.subscribe('/topic/newpoint.'+channel, function (eventbody) {
                var pointReceived=JSON.parse(eventbody.body);
                app.receivePoint(parseInt(pointReceived.x),parseInt(pointReceived.y));
            });
            stompClient.subscribe('/topic/newpolygon.'+channel, function (eventbody) {
                var points=JSON.parse(eventbody.body);
                //TODO DRAW POLYGON
                app.drawPolygon(points);
                
            });
        });

    },
    disconnect: function () {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        //setConnected(false);
        console.log("Disconnected");
    },
    
    onLoad () {
       
    },
        
    start () {
        var channel =1;
        this.channel=channel;
        this.disconnect();
        //websocket connection
        this.connectAndSubscribe(channel);
    },
    
    // update (dt) {},
});
