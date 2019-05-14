import { getStompClient, subscribeTopic, getStompClientsSize, unsubscribeTopic } from './aaaaa';

cc.Class({
    extends: cc.Component,

    properties: {      
        tipo: 0,
        life: 0,        
        stompClient: null
    },

    onLoad: function () {
        this.room = cc.find("form").getComponent("Menu").room;
    },


    onCollisionEnter: function (other, self) {

        
        if (other.node.name == "bullet") {

            if (this.life > 0) {
                this.life -= 1;
            }
            if (this.life == 1) {
                this.connectAndSubscribe();
            }
            if (this.life == 0) {
                this.stompClient.send('/app/walls-' + this.room, {}, JSON.stringify({
                    id: this.node.id,                    
                    tipo: this.tipo,
                }));

                this.node.destroy();
            }
        }




    },
    onCollisionExit: function (other) {

    },
    connectAndSubscribe: function () {

        var self = this;
        getStompClient()
            .then((stpClient) => {
                self.stompClient = stpClient;
                subscribeTopic(self.stompClient, "/topic/walls-" + self.room, function (eventBody) {
                    var move = JSON.parse(eventBody.body);
                });
            });


    },
   






});
