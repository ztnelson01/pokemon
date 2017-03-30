var express = require('express');
var router = express.Router();

var typeIndex = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
var typeModifier = [
  [1,1,1,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1], //normal
  [1,.5,2,1,.5,.5,1,1,2,1,1,.5,2,1,1,1,.5,.5], //fire
  [1,.5,.5,2,2,.5,1,1,1,1,1,1,1,1,1,1,.5,1], //water
  [1,1,1,.5,1,1,1,1,2,.5,1,1,1,1,1,1,.5,1], //elec
  [1,2,.5,.5,.5,2,1,2,.5,2,1,2,1,1,1,1,1,1], // grass
  [1,2,1,1,1,.5,2,1,1,1,1,1,2,1,1,1,2,1], // ice
  [1,1,1,1,1,1,1,1,1,2,2,.5,.5,1,1,.5,1,2], // fight
  [1,1,1,1,.5,1,.5,.5,2,1,2,.5,1,1,1,1,1,.5], // pison
  [1,1,2,0,2,2,1,.5,1,1,1,1,.5,1,1,1,1,1], // ground
  [1,1,1,2,.5,2,.5,1,1,0,1,1,.5,2,1,1,1,1], // flying
  [1,1,1,1,1,1,.5,1,1,1,.5,2,1,2,1,2,1,1], // psychic
  [1,2,1,1,.5,1,.5,1,.5,2,1,1,2,1,1,1,1,1], // bug
  [.5,.5,2,1,2,1,2,.5,2,.5,1,1,1,1,1,1,2,1], // rock
  [0,1,1,1,1,1,0,.5,1,1,1,.5,1,2,1,2,1,1], //ghost
  [1,.5,.5,.5,.5,2,1,1,1,1,1,1,1,1,2,1,1,2], //dragon
  [1,1,1,1,1,1,2,1,1,1,0,2,1,.5,1,.5,1,2], //dark
  [.5,2,1,1,.5,.5,2,0,2,.5,.5,.5,.5,1,.5,1,.5,.5], //steel
  [1,1,1,1,1,1,.5,2,1,1,1,.5,1,1,0,1.5,2,1] //fairy
];

var moves = {};
moves.psychic = {"type":"psychic", "damage": 90};
moves.fireblast = {"type":"fire", "damage": 120};
moves.pound = {"type":"normal", "damage": 40};
moves.earthquake = {"type":"ground", "damage": 100};
moves.tackle = {"type":"normal", "damage": 35};
moves.bugbite = {"type":"bug", "damage": 60};
moves.swift = {"type":"normal", "damage":60};
moves.thunder = {"type":"electric", "damage":120};
moves.xscissor = {"type":"bug", "damage":80};
moves.slash = {"type":"normal", "damage":70};
moves.hyperbeam = {"type":"normal", "damage":150};
moves.dazzlinggleam = {"type":"fairy", "damage":80};
moves.sludgebomb = {"type":"poison", "damage":90};
moves.shadowball = {"type":"ghost", "damage":80};
moves.icebeam = {"type":"ice", "damage":90};
moves.rockslide = {"type":"rock", "damage":75};
moves.hydropump = {"type":"rock", "damage":120};
moves.aurasphere = {"type":"fighting", "damage":80};
moves.irontail = {"type":"steel", "damage":90};
moves.submission = {"type":"fighting", "damage":80};
moves.dualchop = {"type":"dragon", "damage":80};

var pokemon = function(number, name, type, image, hp, attack1Name, attack2Name, attack, defense){
    this.number = number;
    this.name = name;
    this.type = type;
    this.image = image;
    this.hp = hp;
    this.attack1Name = attack1Name;
    this.attack2Name = attack2Name;
    this.attack = attack;
    this.defense = defense;
}
var Mewtwo = {
    "number":150,
    "name":"Mewtwo",
    "type":"psychic",
    "image": "https://68.media.tumblr.com/e0e67c1a1e4fceabc58a7ea8c5b13ecc/tumblr_o52ivnbV7u1uazugyo1_500.gif",
    "hp":185,
    "attack1Name":"swift",
    "attack2Name":"psychic",
    "attack":120,
    "defense":100
}
var Caterpie = {
    "number":150,
    "name":"Caterpie",
    "type":"bug",
    "image": "http://umad.com/img/2015/10/caterpie-gif-537-594-hd-wallpapers.jpg",
    "hp":125,
    "attack1Name":"tackle",
    "attack2Name":"bugbite",
    "attack":51,
    "defense":54
}
var Pikachu = {
    "number":150,
    "name":"Pikachu",
    "type":"electric",
    "image": "https://media.giphy.com/media/U2nN0ridM4lXy/giphy.gif",
    "hp":120,
    "attack1Name":"irontail",
    "attack2Name":"thunder",
    "attack":75,
    "defense":61
}
var Blastoise = {
    "number":150,
    "name":"Blastoise",
    "type":"water",
    "image": "https://media.giphy.com/media/uCOg0liiLaLok/giphy.gif",
    "hp":163,
    "attack1Name":"hydropump",
    "attack2Name":"aurasphere",
    "attack":145,
    "defense":132
}
var Scyther = {
    "number":150,
    "name":"Scyther",
    "type":"bug",
    "image": "https://media.giphy.com/media/DQYcoOAXkWQ4E/giphy.gif",
    "hp":152,
    "attack1Name":"slash",
    "attack2Name":"xscissor",
    "attack":125,
    "defense":100
}
var Onyx = {
    "number":150,
    "name":"Onyx",
    "type":"rock",
    "image": "http://pa1.narvii.com/5823/d2ff63cc62e0cb8e1378138502d3652c2abbd4bd_hq.gif",
    "hp":118,
    "attack1Name":"rockslide",
    "attack2Name":"earthquake",
    "attack":65,
    "defense":170
}
var Ninetails = {
    "number":150,
    "name":"Ninetails",
    "type":"fire",
    "image": "http://pa1.narvii.com/5777/a2937779bfec0809c38f9034934628dbb4a89b8d_hq.gif",
    "hp":155,
    "attack1Name":"fireblast",
    "attack2Name":"icebeam",
    "attack":102,
    "defense":92
}
var JigglyPuff = {
    "number":150,
    "name":"JigglyPuff",
    "type":"normal",
    "image": "https://media.giphy.com/media/idKFx1AUCg1Yk/giphy.gif",
    "hp":220,
    "attack1Name":"pound",
    "attack2Name":"dazzlinggleam",
    "attack":65,
    "defense":44
}
var Muk = {
    "number":150,
    "name":"Muk",
    "type":"poison",
    "image": "https://media.tenor.co/images/ac5067efe2360f7f09462548235e539f/tenor.gif",
    "hp":185,
    "attack1Name":"sludgebomb",
    "attack2Name":"shadowball",
    "attack":100,
    "defense":115
}
var Machoke = {
    "number":150,
    "name":"Machoke",
    "type":"fighting",
    "image": "https://68.media.tumblr.com/061b6a8ba7cc1329fb0b8312f45f5c8e/tumblr_my3lcmBWrx1rjenv2o1_500.gif",
    "hp":165,
    "attack1Name":"submission",
    "attack2Name":"dualchop",
    "attack":115,
    "defense":85
}

var pokemonList = [Mewtwo, Caterpie, Pikachu, Blastoise, Scyther, Onyx, Ninetails, JigglyPuff, Muk, Machoke];

var OldResults = [];

var pokemon1 = {};
var pokemon2 = {};

var switching = false;

var generateNewBattle = function(){
    var random1 = Math.floor(Math.random() * (pokemonList.length));
    var random2 = Math.floor(Math.random() * (pokemonList.length));
    var pokeInfo1 = pokemonList[random1];
    var pokeInfo2 = pokemonList[random2];
    pokemon1 = new pokemon(pokeInfo1.number, pokeInfo1.name,pokeInfo1.type,pokeInfo1.image,pokeInfo1.hp,pokeInfo1.attack1Name,pokeInfo1.attack2Name, pokeInfo1.attack, pokeInfo1.defense);
    pokemon1.hp *=10;
    pokemon2 = new pokemon(pokeInfo2.number, pokeInfo2.name,pokeInfo2.type,pokeInfo2.image,pokeInfo2.hp,pokeInfo2.attack1Name,pokeInfo2.attack2Name, pokeInfo2.attack, pokeInfo1.defense);
    pokemon2.hp *=10;
    switching = false;
}
generateNewBattle();

var log = [];

/* GET home page. */
router.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

router.get('/login', function (req, res) {
    var params = req.body;
    var stuff = {"cool":"coolest"};

    res.send(Mewtwo);
})


router.get('/fightingPokemon', function (req, res) {
    var victor = 0;
    if (pokemon1.hp == 0) victor = 2;
    else if (pokemon2.hp == 0) victor = 1;
    res.send({"1":pokemon1, "2":pokemon2, "victor":victor, "log":log});
})


//takes in {"attacker":1, "move":"psychic"}
router.post('/attack', function (req, res) {
    if (switching) return;
    var attacker;
    var defender;

    if (req.body.attacker == 1){
      attacker = pokemon1;
      defender = pokemon2;
    }
    else{
      attacker = pokemon2;
      defender = pokemon1;
    }
    var move = "";
    if (req.body.move == 1) move = attacker.attack1Name;
    else move = attacker.attack2Name;
    var STAB = 1; if (moves[move].type == attacker.type) STAB = 1.5;
    var moveTypeIndex = typeIndex.indexOf(moves[move].type);
    var defenderTypeIndex = typeIndex.indexOf(defender.type);
    var RandomNumber = Math.floor(Math.random()*(100-85+1)+85);
    var moveDamage = moves[move].damage;
    var modifier = typeModifier[defenderTypeIndex][moveTypeIndex];
    Damage = Math.floor(((((2 * 50/5 + 2) * attacker.attack * moveDamage / defender.defense) / 50) + 2) * STAB * modifier * RandomNumber / 100);
    defender.hp -= Damage;
    var tempLog = attacker.name + " used " + move + " dealing " + Damage + " damage!";
    if (modifier == 2) tempLog += " It was super effective!";
    else if (modifier == 0.5) tempLog += " It was not very effective...";
    else if (modifier == 0) tempLog += " It had no effect!";
    log.push({"count":log.length, "text":tempLog});
    var victor = "0";
    if (defender.hp <= 0){
        defender.hp = 0;
        victor = req.body.attacker;
        if (!switching){
            switching = true;
            var tempStuff= defender.name + " fainted!!!";
            log.push({"count":log.length, "text":tempStuff});
            setTimeout(function() { generateNewBattle(); }, 5000);
        }
    }

    res.send({"1":pokemon1, "2":pokemon2, "damage":Damage, "victor":victor, "log":log});
})

module.exports = router;
