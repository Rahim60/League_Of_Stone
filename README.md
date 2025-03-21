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
        this.hand = [] // 4 cards au debut du match
        this.board = []
        this.cardPicked = //new Card()
        this.turn = false
        this.Champions = [];
        this.Deck = [];
    }

    //####################" PARTIE 1 ######################
    isLoggedIn(){
        return this?.token != -1 && this?.id != null;
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

    //####################### PREMATCH LOGIC ########################

    joinRequestMatchList(){ // S'ajoute a la liste de joueurs voulant jouer
        // endpoint = /matchmaking/participate

        const newMatch = Match()
        return newMatch
        // newMatch.getAllPlayers() - pour voir ceux qui veulent jouer
    }

    requestMatch(match){
        // endpoint = /request{match.matchmakingId}
    }


    acceptMatch(match){
        // endpoint = `.../acceptRequest${match.matchMakingId}`
    }


    //##################### IN MATCH ACTIONS ##############

    getAvailableChampions(cards){
        // endpoint = /cards
    }

    selectDeck(cards){ // {"key":"Jax"},{"key":"Ivern"}
        // endpoint = `/match/initDeck?deck=${cards.map(card => card.key)}`
    }

    showHand(){

    }

    pickCard(){
        // endpoint = /pickCard
        return cartePioche
    }

    playCard(card){
        //endpoint = /playCard${card.key}
    }

    attackCard(card, opponent){
        // ATTACK
        // endpoint = /match/attack?card={card.key}&ennemyCard=${opponent.board.card.key}

        if (/*card.info.attack > ennemyCard.info.defense*/){
            // DEGAT
            // ennemy.hp = ennemy.hp (card.info.attack ennemyCard.info.defense)
        }

        // endpoint = /match/endTurn
    }
    

    directAttack(){
        // endpoint = /attackPlayer
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
    constructor(matchMakingID, originator, players){
        this.id = matchMakingID
        this.originator = originator
        this.opponent = opponent
        this.status = "";
    }

    get(){
        //endpoint = /getMatch
    }

    getPlayers(){
        // endpoint = /matchmaking/getAll
    }

    start(){

    }

    endMatch(){
        // END MATCH
        // endpoint = /match/finishMatch
    }
}
```