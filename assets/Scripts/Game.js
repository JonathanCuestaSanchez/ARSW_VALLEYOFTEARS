// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import {getStomp} from './stomp';

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
        //var socket = new SockJS('http://localhost:8080//stompendpoint');
        //var socket = new SockJS('/stompendpoint');
        var self=this;
        
        getStomp()
            .then((stpClient) => {
                self.stompClient = stpClient;
                subscribeTopic(self.stompClient, "/topic/conect" + self.channel, function(eventBody){
                    console.log("asda");
                    //var tank = JSON.parse(eventBody.body);
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
