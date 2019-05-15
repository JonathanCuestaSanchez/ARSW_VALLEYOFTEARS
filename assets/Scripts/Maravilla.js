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
        pos:0,
        stompClient: null
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.room = cc.find("form").getComponent("Menu").room;
        this.connectAndSubscribe();
    },

    onCollisionEnter: function (other, self) {

        this.node.destroy();
        if (other.node.name == "bullet") {
            this.stompClient.send('/app/maravilla/' + this.room, {}, JSON.stringify({
                pos:this.pos,
            }));
            

        }
        this.node.destroy();
    },
    onCollisionExit: function (other) {

    },
    connectAndSubscribe: function () {

        var self = this;
        getStompClient()
            .then((stpClient) => {
                self.stompClient = stpClient;
                subscribeTopic(self.stompClient, "/topic/maravilla-" + self.room, function (eventBody) {
                    var wonderland = JSON.parse(eventBody.body);

                });
            });


    },
    start() {
    },

    // update (dt) {},
});
