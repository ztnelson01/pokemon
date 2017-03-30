

var furthestLog = -1;

var currentImage1 = "";
var currentImage2 = "";

var audio = new Audio('pokemon.mp3');
audio.volume = 0.1;
audio.play();

var click = new Audio('click2.wav');
click.volume = 1;
var faint = new Audio('faint.wav');
$('#poke1Attack1').css('background-color', 'green');
$('#poke1Attack2').css('background-color', 'green');
$('#poke2Attack1').css('background-color', 'green');
$('#poke2Attack2').css('background-color', 'green');

var loadCurrent = function(){
  $.get( "http://34.208.82.175:8022/fightingPokemon", function( data ) {
      var winRateHTML = "Wins: " + data.leftWins + "  Wins: " + data.rightWins;
      $('#winrates').html(winRateHTML);
      console.log(data);
      $('#name1').text(data[1].name);
      $('#name2').text(data[2].name);
      $('#hp1').text("HP: " + data[1].hp);
      $('#hp2').text("HP: " + data[2].hp);
      poke1Attack1 = data[1].attack1Name;
      poke2Attack1 = data[1].attack1Name;
      poke1Attack2 = data[1].attack2Name;
      poke2Attack2 = data[2].attack2Name;
      $('#poke1Attack1').text(data[1].attack1Name);
      $('#poke1Attack2').text(data[1].attack2Name);
      $('#poke2Attack1').text(data[2].attack1Name);
      $('#poke2Attack2').text(data[2].attack2Name);
      if (currentImage1 != data[1].image)
        $("#image1").attr("src",data[1].image);
      if (currentImage2 != data[2].image)
        $("#image2").attr("src",data[2].image);
      if (data.victor == 1){
        $("#victory1").text("WIN");
        $("#victory2").text("LOSE");
      }
      else if (data.victor == 2){
        $("#victory1").text("LOSE");
        $("#victory2").text("WIN");
      }
      else{
        $("#victory1").text("");
        $("#victory2").text("");
      }
      currentImage1 = data[1].image;
      currentImage2 = data[2].image;
      console.log("log", data.log);
      for (var i = 0; i < data.log.length; i++){
          if (data.log[i].count > furthestLog){
            $("ul").prepend("<li>" + data.log[i].text + "</li>");
            click.play();
            if (data.log[i].text.includes("fainted")) faint.play();
          }
      }
      furthestLog = data.log[data.log.length-1].count;
  });
}

loadCurrent();

var canAttack = true;

var canAttackAfterSeconds = function(){
    canAttack = true;
    $('#poke1Attack1').css('background-color', 'green');
    $('#poke1Attack2').css('background-color', 'green');
    $('#poke2Attack1').css('background-color', 'green');
    $('#poke2Attack2').css('background-color', 'green');
}

var doAttack = function(attacker, move){
    if (!canAttack) return;
    click.play();
    canAttack = false;
    setTimeout(function() { canAttackAfterSeconds(); }, 3000);
    $('#poke1Attack1').css('background-color', 'grey');
    $('#poke1Attack2').css('background-color', 'grey');
    $('#poke2Attack1').css('background-color', 'grey');
    $('#poke2Attack2').css('background-color', 'grey');
    var body = {"attacker":attacker, "move":move};
    $.post( "http://34.208.82.175:8022/attack", body,  function( data ) {
        $('#hp1').text("HP: " + data[1].hp);
        $('#hp2').text("HP: " + data[2].hp);

        for (var i = 0; i < data.log.length; i++){
            if (data.log[i].count > furthestLog){
              $("ul").prepend("<li>" + data.log[i].text + "</li>");
              if (data.log[i].text.includes("fainted")) faint.play();
            }
        }
        furthestLog = data.log[data.log.length-1].count;
    });
}

window.setInterval(function(){
    loadCurrent();
}, 2000);

$('#poke1Attack1').click(function(){
    doAttack(1,1);
});
$('#poke1Attack2').click(function(){
    doAttack(1,2);
});
$('#poke2Attack1').click(function(){
    doAttack(2,1);
});
$('#poke2Attack2').click(function(){
    doAttack(2,2);
});
