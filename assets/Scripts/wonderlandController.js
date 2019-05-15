// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import { getStompClient, subscribeTopic, getStompClientsSize, unsubscribeTopic } from './aaaaa';
cc.Class({
    extends: cc.Component,

    properties: {
        loadedwonderland:{
            default: [],
            type: [cc.Node],
            stompClient: null,
        },
        maravilla1: {
            default: null,
            type: cc.Node,
        },
        maravilla2: {
            default: null,
            type: cc.Node,
        },
        maravilla3: {
            default: null,
            type: cc.Node,
        },
        maravilla4: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.room = cc.find("form").getComponent("Menu").room;
        this.connectAndSubscribe(); 
        this.cargamaravillas();
    },
    connectAndSubscribe: function () {

        var self = this;
        getStompClient()
            .then((stpClient) => {
                self.stompClient = stpClient;
                subscribeTopic(self.stompClient, "/topic/maravilla-" + self.room, function (eventBody) {
                    var wonderland = JSON.parse(eventBody.body);
                        self.loadedwonderland.forEach(
                            function(element){
                                if(element.pos==wonderland.pos){
                                    element.destroy();
                                }
                            }
                        );
                });
            });
        },
    cargamaravillas:function (){
        var self=this;
        console.log("entra");
        var plr1 = cc.instantiate(self.maravilla1);
        var plr2 = cc.instantiate(self.maravilla2);
        var plr3 = cc.instantiate(self.maravilla3);
        var plr4 = cc.instantiate(self.maravilla4);
        self.loadedwonderland.push(plr1);
        self.loadedwonderland.push(plr2);
        self.loadedwonderland.push(plr3);
        self.loadedwonderland.push(plr4);
        var scene = cc.find("mapa");
        scene.addChild(plr1);
        scene.addChild(plr2);
        scene.addChild(plr3);
        scene.addChild(plr4);
        plr1.active=true;
        plr2.active=true;
        plr3.active=true;
        plr4.active=true;

    },
    start () {

    },

    // update (dt) {},
});
