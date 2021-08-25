var hor=4;
var ver=3;
var colorcandi2=['red','red','orange','orange','green','green','yellow','yellow','white','white','pink','pink'];
var colorset=[]; //이거 배열 이름 color로 했다가 아예 실행한되는 오류 10분넘게 겪음 ㅅㅂ
var colorcandi=colorcandi2.slice(); //백업 개념 , 참조개념이라(복사 아님) colorcand2도 같이 바뀌는걸 박기위해(참조관계 끊기위해) slice함
var clickflag=true; //성질급한 사람ㄷ르이 미리 누르는것을 방지하기 위해
var clickcard=[];
var wincard=[]; //완성카드(짝이 지어진 카드)
var starttime;

//문자열, 숫자 , boolean은 복사가 되고
//객체,배열,함수는 대입하면 복사관계가 되는게 아니라 참조관계가 된다!!
//Object.keys메서드는 갯체의 속성명들을 배열로 바꾼다.
//var obj={a:1,b:2,c:3}; 을 참조가 아니라 복사되게 하려면
//Object.keys(obj)를 하면 ["a","b","c"]가 됨
//var obj2={};
//Object.keys(obj).forEach(funtion(key){
//    obj2[key]=obj[key];
//}); 근데 이것도 객체안에 객체는 복사가 아니라 참조가된다....완전한 방법이 아님!(1단계만 복사, 나머지는 참조)
//위에 거 더 간단하게 하면 Object.assign(obj1,obj2); 임
//참조관계가 있는지 알아보려면 obj===obj2 하면 된다. true면 참조관계인거임

//얕은 복사-->참조, 깊은복사-->복사

//obj={a:1,b:{c:1}}
//obj2=JSON.parse(JSON.stringify(obj)) 
//이게 제일 간단하게 복사하는 방법임(2단계도 복사가능) 근데 성능최악이라 최대한 안쓰는게 좋다. 1단계는 1단계 방법으로 하는게좋다
//배열같은 경우에는 앞의 상황처럼 .slice()를 하면 참조관계가 끊기긴한다. 단점은 정확한 깊은복사는 아니라는거 위의 foreach문이랑 똑같다. (1단계만 복사, 나머지는 참조) 2단계는 배열안에 배열, 객체안에 객체의 경우임 ㅋㅋ
//arr=[1,2,3]; arr2=[...arr]; 해도 복사됨

function shuffle(){
    for(var i=0;colorcandi.length>0;i++){ //색깔 랜덤으로 섞기 >=0은 안됨 ㅋㅋ
        colorset=colorset.concat(colorcandi.splice(Math.floor(Math.random()*colorcandi.length),1));
    }
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
        cardback.style.backgroundColor=colorset[i]; //색깔적용
        cardinner.appendChild(cardfront);
        cardinner.appendChild(cardback);
        card.appendChild(cardinner);
        (function(c){ //클로저 때문에 
            card.addEventListener('click',function(){
                if(clickflag && !wincard.includes(c)){ //clickflag가 true고 wincard가 아닐때만 클릭할 수 있게(완성카드를 클릭할 수 없게하기위해)
                    c.classList.toggle('flipped'); //toggle은 스위치개념, flipped라는 클래스가 있으면 넣고 없으면 빼고   
                    clickcard.push(c);
                    if(clickcard.length===2){
                        if(clickcard[0].querySelector('.card-back').style.backgroundColor===clickcard[1].querySelector('.card-back').style.backgroundColor){
                            wincard.push(clickcard[0]);
                            wincard.push(clickcard[1]);
                            clickcard=[];
                            if(wincard.length===12){
                                var endtime=new Date();
                                alert('축하합니다 성공!'+(endtime-starttime)/1000+'초 걸렸습니다.');
                                document.querySelector('#wrapper').innerHTML=''; //내부 태그들 다 지울 수 있다
                                colorcandi=colorcandi2.slice();
                                colorset=[];
                                wincard=[];
                                starttime=null;
                                shuffle();
                                cardset(hor,ver);
                            }
                        }else{
                            clickflag=false; //1초를 못기다리고 클릭하는 사람들 막기위해
                            setTimeout(function(){
                                clickcard[0].classList.remove('flipped'); //안맞으니까 다시 뒤집는다.
                                clickcard[1].classList.remove('flipped');
                                clickflag=true;
                                clickcard=[]; //밖에 넣으면 이게 더 빨리 실행되서 클릭카드 초기화된채로 settime~실행되니까 안에 넣어야함
                            },1000);
                        }
                        
                    }
                }
            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
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
        starttime=new Date() //카드 세팅이 끝났을때 시간잼
    },5000);
    
}
shuffle();
cardset(hor,ver);