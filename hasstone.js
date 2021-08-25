var rivalhero=document.getElementById('rival-hero');
var myhero=document.getElementById('my-hero');
var rivaldeck=document.getElementById('rival-deck');
var mydeck=document.getElementById('my-deck');
var rivaldeckdata=[];
var mydeckdata=[];
var rivalherodata;
var myherodata;

//강의 상 함수로 표현하는게 더 쉽게 설명가능해서 함수로 표현했지 실무에선 이렇게 안함

function carddom(data, dom, hero){
    var card=document.querySelector('.card-hidden .card').cloneNode(true); //클론노드로 기존 태그를 그대로 복사사능하다. true를 넣으면 내부까지 다 
    card.querySelector('.card-cost').textContent=data.cost;
    card.querySelector('.card-att').textContent=data.att;
    card.querySelector('.card-hp').textContent=data.hp;
    if(hero){
        card.querySelector('.card-cost').style.display='none';
        var name=document.createElement('div');
        name.textContent='영웅';
        card.appendChild(name);
    }
    dom.appendChild(card);
}

function rivaldeckmade(num){
    for(var i=0;i<num;i++){
        rivaldeckdata.push(cardfac());
    }
    rivaldeckdata.forEach(function(data){
        carddom(data,rivaldeck);
    });
}
function mydeckmade(num){
     for(var i=0;i<num;i++){
        mydeckdata.push(cardfac());
    }
    mydeckdata.forEach(function(data){
        carddom(data,mydeck);
    });
}

function myheromade(){
    myherodata=cardfac(true);
    carddom(myherodata,myhero,true);
}

function rivalheromade(){
    rivalherodata=cardfac(true);
    carddom(rivalherodata,rivalhero,true);
}

function setting(){
    rivaldeckmade(5);
    mydeckmade(5);
    myheromade();
    rivalheromade();
}

function Card(hero){
    if(hero){
        this.att=Math.ceil(Math.random()*2);
        this.hp=Math.ceil(Math.random()*5)+25;
        this.hero=true;
    }else{
        this.att=Math.ceil(Math.random()*5);
        this.hp=Math.ceil(Math.random()*5);
        this.cost=Math.ceil(Math.floor(this.att+this.hp)/2);
    }
}
function cardfac(hero){ //매개변수를 줌으로써 더 다양한 기능~
    return new Card(hero);
}

setting();