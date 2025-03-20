# League_Of_Stone

# HOCs - https://brdnicolas.medium.com/react-les-higher-order-components-hoc-d3394f3d1c9c

# Component Containers - https://www.developerway.com/posts/components-composition-how-to-get-it-right

``` js
export class User{
    constructor(id, name, email, token=-1){
        this.id = id;
        this.email = email;
        this.token = token;
        this.hp = 0;
        this.Champions = [];
        this.Deck = [];
    }

    isLoggedIn(){
        return this?.token != -1 && this?.id != null;
    }

    selectChampions(cards){
        // endpoint = /cards
    }

    selectDeck(cards){ // {"key":"Jax"},{"key":"Ivern"}
        // endpoint = `/match/initDeck?deck=${cards}`
    }

    login(){
        // endpoint = /login 
    }

    logout(){
        try{
            if (!isLoggedIn()) throw new Error("Faut etre connecté pour être deconnecté");
        }
        // endpoint = /logout
    }

    signup(){
        // endpoint = /user 
    }

    deleteAccount(){
        // endpoint = /unsubscribe
    }

    requestMatch(){
        // endpoint = /matchmaking/participate
        const newMatch = Match()
        return newMatch
    }

    viewMatchParticipants(){
        if ()
    }

    acceptMatch(matchMakingId){
        // endpoint = `.../acceptRequest${matchMakingId}`
    }

    attack(){
        // ATTACK
        // endpoint = /match/attackPlayer

        if (/*card.info.attack > ennemyCard.info.defense*/){
            // DEGAT
            // ennemy.hp = ennemy.hp (card.info.attack ennemyCard.info.defense)
        }

        // endpoint = /match/endTurn
    }
}

export class Card{
    constructor(id, name, attack, defense, img){
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.img = img;
        this.id = id;
    }

    display(){}
}

export class Match(){
    constructor(matchID, originator, players){
        this.id = matchID
        this.originator = originator
        this.players = players
    }

    getAllPlayers(){
        // endpoint = /matchmaking/participate
    }

    endMatch(){
        // END MATCH
        // endpoint = /match/finishMatch
    }
}
```