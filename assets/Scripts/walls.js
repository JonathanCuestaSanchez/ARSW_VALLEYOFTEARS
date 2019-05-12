import { getStompClient, subscribeTopic, getStompClientsSize, unsubscribeTopic } from './aaaaa';

cc.Class({
    extends: cc.Component,

    properties: {
        life: 0,
        id: 0,
        stompClient:null
    },
    onLoad: function () {
        this.room = cc.find("form").getComponent("Menu").room;
        //this.connectAndSubscribe();
    },

    onCollisionEnter: function (other, self) {

        if (other.node.name == "bullet") {
            if (this.life != -1) {
                this.life -= 1;
            }
        }




    },
    onCollisionExit: function (other) {

    },
    golpe: function () {        
        if (this.life == 0) {
            this.stompClient.send('/app/wall/' + this.room+"/"+this.id, {}, JSON.stringify({
                id: this.id               
            }));
            this.node.destroy();
        }
    },

    connectAndSubscribe: function () {
        var self = this;
        getStompClient()
            .then((stpClient) => {
                self.stompClient = stpClient;
                console.
                subscribeTopic(self.stompClient, "/topic/walls/" + self.room+"/"+self.id, function (eventBody) {
                    var walls = JSON.parse(eventBody.body);
                    if (walls.id==self.id){
                        self.node.destroy();
                    }
                    
                
                });
            });
        

    },

    
    start() {
        
    },

    update(dt) {
        this.golpe();
    },
});
     