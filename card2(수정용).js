var hor=4;
var ver=3;

var colorcandi=['red','red','orange','orange','green','green','yellow','yellow','white','white','pink','pink'];
var colorset=[]; //이거 배열 이름 color로 했다가 아예 실행한되는 오류 10분넘게 겪음 ㅅㅂ
var clickflag=true; //성질급한 사람ㄷ르이 미리 누르는것을 방지하기 위해
for(var i=0;colorcandi.length>0;i++){ //색깔 랜덤으로 섞기
    colorset=colorset.concat(colorcandi.splice(Math.floor(Math.random()*colorcandi.length),1));
}
console.log(colorset);

function cardset(hor,ver){
    clickflag=false;
    for(var i=0;i<hor*ver;i+=1){
        var card=document.createElement('div');
        card.className='card';
        var cardinner=document.createElement('div');
        cardinner.className='card-inner';
        var cardfront=document.createElement('div');
        cardfront.className='card-front';
        var cardback=document.createElement('div');
        cardback.className='card-back';
        cardback.style.backgroundColor=colorset[i]; //색깔 넣기
        cardinner.appendChild(cardfront);
        cardinner.appendChild(cardback);
        card.appendChild(cardinner);
        (function(c){ //클로저 때문에 
            card.addEventListener('click',function(){
                if(clickflag){
                  c.classList.toggle('flipped'); //toggle은 스위치개념, flipped라는 클래스가 있으면 넣고 없으면 빼고   
                }
            });
        })(card);
        document.body.appendChild(card);
    }
    document.querySelectorAll('.card').forEach(function(card,index){
        setTimeout(function(){
            card.classList.add('flipped');
        },1000+100*index);
    });
    
    setTimeout(function(){
        document.querySelectorAll('.card').forEach(function(card,index){
            card.classList.remove('flipped');
        });
        clickflag=true;
    },5000);
    
}
cardset(hor,ver);