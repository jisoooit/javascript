var candi=Array(45).fill().map(function(ele,index){
    return index+1;
});
//이걸 단축시키면 위처럼 됨
//var candi=Array(45); 빈 배열 만드는거
//var fill=candi.fill(); 빈배열을 undifiend로 채우는거
//var map=fill.map(function(ele, index){ 매핑시키는거
//    return index+1;
//});

//fill.forEach(function(ele, index){
//    fill[index]=index+1;
//}); 
//이것도 가능함
//consol.log(map);
console.log(candi);

var shuffle=[];
while(candi.length>0){ //조건이 바뀔 수 있는 경우레는 while을 써라 for문 쓰면 length줄어서 곤란 splice는 해당 배열이 직접 수정되기때문에 제거됨에따라 길이가 점점 짧아짐
    var num=candi.splice(Math.floor(Math.random()*candi.length),1)[0];
    shuffle.push(num);
}
console.log(shuffle);
var bonus=shuffle[shuffle.length-1]; //shuffle맨 마지막 값

var win=shuffle.slice(0,6).sort(function(p,c){return p-c;});
// function ~은 오름차순으로 정렬하게 함 return c-p를 하면 내림차순으로 정렬함

console.log('당첨숫자:',win,'보너스:',bonus);

var result=document.querySelector('#result');
//getElementById('result'); 이거도됨
function color(num, result){
    var ball=document.createElement('div');
    ball.textContent=num;
    ball.style.display='inline-block';
    ball.style.border='1px solid black';
    ball.style.borderRadius='10px';
    ball.style.width='20px';
    ball.style.height='20px';
    ball.style.textAlign='center';
    ball.style.marginRight='10px';
    ball.style.fontSize='12px';
    ball.id='ballid'+num;
    var backcolor;
    if(num<=10)
        backcolor='red';
    else if(num<=20)
        backcolor='orange';
    else if(num<=30)
        backcolor='yellow';
    else if(num<=40)
        backcolor='blue';
    else
        backcolor='green';
    ball.style.background=backcolor;
    ball.style.color='white';
    result.appendChild(ball);
}

setTimeout(function 비동기콜백함수(){
    color(win[0],result);
},1000);
setTimeout(function 비동기콜백함수(){
    color(win[1],result);
},2000);

setTimeout(function 비동기콜백함수(){
    color(win[2],result);
},3000);

setTimeout(function 비동기콜백함수(){
    color(win[3],result);
},4000);

setTimeout(function 비동기콜백함수(){
    color(win[4],result);
},5000);

setTimeout(function 비동기콜백함수(){
    color(win[5],result);
},6000);
setTimeout(function 비동기콜백함수(){
    var bon=document.querySelector('.bon');
    //.getElementsByClassName('bon)[0]도 됨
    color(bonus,bon);
},7000);
//이게 반복문(for)안에 비동기 함수가 들어가면 클로저라는게 발생해서 어쩔수없이 반복문을 풀었다는.. 그리고 공통된거 다 함수로 묶어준거임!!
//중요한건 묶을때 공통된건 함수로 다른건 매개변수로(result부분)!!!

//클로저 해결한거임!!
//for(var i=0;i<win.length;i++){
//    function 클로저(j){
//        setTimeout(function(){
//            color(win[j],result);
//        },(j+1)*1000);
//    }
//    클로저(i);
//}

//이렇게 줄여씀!!
//for(var i=0;i<win.length;i++){
//    (function 클로저(j){
//        setTimeout(function(){
//            color(win[j],result);
//        },(j+1)*1000);
//    })(i);
//}
