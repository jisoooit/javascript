
var imgxy='0'; //이미지 좌표
var rsp={ //딕셔너리 자료구조
    scissor:'0',
    rock:'-97px',
    paper:'-200px',
}
//사실 이거 안만들고 밑에 if문 좌표로 한뒤에 딕셔너리를 반대로 만드는게 훨씬 효율적일듯

console.log(Object.entries(rsp)); //2차원 배열로 바꿔주는거..?
function com(imgxy){ //컴퓨터가 뭘 선택했는지 좌표를 통해 알수있다.
    return Object.entries(rsp).find(function(v){
//        console.log(v);
        return v[1]===imgxy;
    })[0];
}
//이건 위의 딕셔너리를 반대로 만드는게 효율적이지 못해서 반대로 찾는걸 만들어본거임
//find함수는 배열에서 특정값을 찾는 조건을 callback함수를 통해 전달하여 조간에 맞는 값중 첫번째 값을 리턴합니다. 
var interval;
function intervalmaker(){ //중복되는건 함수로
    interval=setInterval(function(){ //가위바위보 사진이 전환되게함
    if(imgxy===rsp.scissor){
       imgxy=rsp.rock;
    } else if(imgxy===rsp.rock){
       imgxy=rsp.paper;
    } else{
       imgxy=rsp.scissor;
    }
    document.querySelector('#computer').style.background='url(unnamed.png)'+imgxy+' 0';
    },150);
}

intervalmaker();
var score={
    scissor:1,
    rock:0,
    paper:-1,
};

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click',function(){
        clearInterval(interval); //setinterval을 멈춘다
        setTimeout(function(){
           intervalmaker(); //1초후에 다시 움직이게 함  
        },1000);
        var user=this.textContent;
        console.log(user, com(imgxy));
        var myscore=score[user];
        var comscore=score[com(imgxy)];
        var diff=myscore-comscore;
        if(diff===0){
            console.log('비겼습니다.');
        }else if([-1,2].includes(diff)){
//            diff==-1 || diff 2과 똑같은 거임 includes를 이용해서 더 간단히 표현
            console.log('이겼습니다!!');
        }else{
            console.log('졌습니다ㅠㅠ');
        }
    });
});

// 가위:1 바위:0 보:-1
//나|컴 가위    바위  보
// 가위 1 1    1 0   1 -1
// 바위 0 1    0 0   0 -1
// 보  -1 1   -1 0   -1 -1