
import { getStompClient, subscribeTopic, getStompClientsSize, unsubscribeTopic } from './aaaaa';
cc.Class({
    extends: cc.Component,

    properties: {
        loadedwalls1: {
            default: [],
            type: [cc.Node],
        },
        loadedwalls2: {
            default: [],
            type: [cc.Node],
        },
        wall1: {
            default: null,
            type: cc.Node,
        },
        wall2: {
            default: null,
            type: cc.Node,
        },
        stompClient: null,
        
    },    
    connectAndSubscribe: function () {
        
        var self = this;
        getStompClient()
            .then((stpClient) => {
                self.stompClient = stpClient;
                subscribeTopic(self.stompClient, "/topic/walls-" + self.room, function (eventBody) {
                    var move = JSON.parse(eventBody.body);                   
                    if(move.tipo==1){
                        self.loadedwalls1.forEach(
                            function (wall1) {
                                if (wall1.id == move.id ){
                                    wall1.destroy();
                                }
                            }
                        );
                    }else{
                        self.loadedwalls2.forEach(
                            function (wall2) {
                                
                                if (wall2.id == move.id){
                                    wall2.destroy();
                                }
                            }
                        );
            
                    }
                });
            });
        

    },

    cargarmuros: function () {
        var self = this;
        for (var i = 0; i < 20; i++) {
            var plr = cc.instantiate(self.wall1);
            self.loadedwalls1.push(plr);
            plr.id = i;   
            plr.cont= i;         
            if (i < 4) {
                plr.y = -50;
                switch (i) {
                    case 0:
                        plr.x = -450;
                        break;
                    case 1:
                        plr.x = -400;
                        break;
                    case 2:
                        plr.x = 450;
                        break;
                    case 3:
                        plr.x = 400;
                        break;
                }
            } else if (i < 8) {
                plr.y = 50;
                switch (i) {
                    case 4:
                        plr.x = -450;
                        break;
                    case 5:
                        plr.x = -400;
                        break;
                    case 6:
                        plr.x = 450;
                        break;
                    case 7:
                        plr.x = 400;
                        break;
                }
            } else if (i < 12) {
                plr.x = -50;
                switch (i) {
                    case 8:
                        plr.y = -250;
                        break;
                    case 9:
                        plr.y = -300;
                        break;
                    case 10:
                        plr.y = 250;
                        break;
                    case 11:
                        plr.y = 300;
                        break;
                }
            }
            else if (i < 16) {

                plr.x = 50;
                switch (i) {
                    case 12:
                        plr.y = -250;
                        break;
                    case 13:
                        plr.y = -300;
                        break;
                    case 14:
                        plr.y = 250;
                        break;
                    case 15:
                        plr.y = 300;
                        break;
                }
            }
            else if (i < 18) {
                plr.y = 0;
                switch (i) {
                    case 16:
                        plr.x = -400;
                        break;
                    case 17:
                        plr.x = 400;
                        break;

                }
            } else if (i < 20) {
                plr.x = 0;
                switch (i) {
                    case 18:
                        plr.y = -250;
                        break;
                    case 19:
                        plr.y = 250;
                        break;

                }
            }
            var scene = cc.find("mapa");
            scene.addChild(plr);
            plr.active = true;





        }
        var id=0
        for (var i = 0; i < 42; i++) {
            var plr = cc.instantiate(self.wall2);                     
            plr.cont= i;   
            plr.id=id;
            id+=1;
            plr.tipo = 2;
            plr.life = 5;
            switch (true) {
                case i < 3:
                    plr.y = 200;
                    plr.x = 350 + (50 * i);
                    break;
                case i < 6:
                    plr.y = 200;
                    plr.x = -350 - (50 * (i - 3));
                    break;
                case i < 9:
                    plr.x = -200;
                    plr.y = -200 - (50 * (i - 6));
                    break;
                case i < 12:
                    plr.x = -200;
                    plr.y = 200 + (50 * (i - 9));
                    break;
                case i < 15:
                    plr.x = 200;
                    plr.y = -200 - (50 * (i - 12));
                    break;
                case i < 18:
                    plr.x = 200;
                    plr.y = 200 + (50 * (i - 15));
                    break;
                case i < 21:
                    plr.y = -200;
                    plr.x = 350 + (50 * (i - 18));
                    break;
                case i < 24:
                    plr.y = -200;
                    plr.x = -350 - (50 * (i - 21));
                    break;
                case i < 27:
                    plr.x = -100;
                    plr.y = -50 + (50 * (i - 24));
                    break;
                case i < 30:
                    plr.x = 100;
                    plr.y = -50 + (50 * (i - 27));
                    break;
                case i < 35:
                    plr.y = -100;
                    plr.x = -100 + (50 * (i - 30));
                    break;
                case i < 40:
                    plr.y = 100;
                    plr.x = -100 + (50 * (i - 35));
                    break;
                case i == 40:
                    plr.y = 0;
                    plr.x = 250;
                    break;
                case i == 41:
                    plr.y = 0;
                    plr.x = -250;
                    break;
            }
            self.loadedwalls2.push(plr);
            var scene = cc.find("mapa");
            scene.addChild(plr);
            plr.active = true;

        }
     
    },

    onLoad: function () {
       
        this.room = cc.find("form").getComponent("Menu").room;
        this.connectAndSubscribe();        
        this.cargarmuros();
        
    },

    // update (dt) {},
});
