var tbody=document.querySelector('#table tbody');
var dataset=[];
var 중단플래그=false;
var open=0; //열은칸
var 코드표={ //느낌표,물음표칸 안열리게 하기위한..
    연칸:-1,
    물음표:-2,
    깃발:-3,
    깃발지뢰:-4,
    물음표지뢰:-5,
    지뢰:1,
    보통칸:0,
};

document.querySelector('#exec').addEventListener('click',function(){
    tbody.innerHTML=''; //내부 먼저 초기화: 설정 눌렀을때 지뢰칸전체 초기화하게하는거임 밑에 붙게 하는게 아니라
    document.querySelector('#result').textContent='';
    dataset=[]; 
    중단플래그=false;
    open=0;
    var row=parseInt(document.querySelector('#row').value);
    var col=parseInt(document.querySelector('#col').value);
    var mine=parseInt(document.querySelector('#mine').value);
//    console.log(row,col,mine);
    
    //지뢰 위치 뽑기
    var shuffle=[]; //지뢰 위치 배열
    var candi=Array(row*col).fill().map(function(ele,index){
        return index;
    });
    while(candi.length>row*col-mine){ //20개만 뽑기위해 
        var num=candi.splice(Math.floor(Math.random()*candi.length),1)[0];
        shuffle.push(num);
    }   
//    console.log(shuffle);
    
    //지뢰 테이블 만들기
    for(var i=0;i<row;i++){
        var arr=[];
        var tr=document.createElement('tr');
        dataset.push(arr); //여기 괄호 대괄호로 해서 한참 찾았다 이 멍청아!!!!!!!!!!
        for(var j=0;j<col;j++){
            arr.push(코드표.보통칸); //데이터
            var td=document.createElement('td');
            td.addEventListener('contextmenu',function(e){ //오른쪽클릭할때
                e.preventDefault();
                if(중단플래그){
                    return; //중단플래그가 트루면 아래쪽이 실행되지 않
                }
                var partr=e.currentTarget.parentNode;
                var partbody=e.currentTarget.parentNode.parentNode;
                var 칸=Array.prototype.indexOf.call(partr.children,e.currentTarget);
                var 줄=Array.prototype.indexOf.call(partbody.children,partr);
                //이부분 children이 배열이 아니라 indexof로 할수없어서 이렇게 변형한건데 모르겟음 배열이었으면 var 칸=partr.children.indexOf(td);이렇게 할수있는디
                //클로저 회피하려고 td대신에 e.ct쓴거임 괄호안에...
                //dataset[줄].indexof(td); 이런식으로 해야되는데 td를 배열안에 안넣어놔서 못하는거 아님..?
//                console.log(partr,partbody,e.currentTarget,칸,줄);
                if(e.currentTarget.textContent==='' || e.currentTarget.textContent==='X'){
                    e.currentTarget.textContent='!'
                    e.currentTarget.classList.add('flag');
                    if(dataset[줄][칸]===코드표.지뢰){
                        dataset[줄][칸]=코드표.깃발지뢰;
                    }else{
                        dataset[줄][칸]=코드표.깃발;
                    }
                }else if(e.currentTarget.textContent==='!'){
                    e.currentTarget.textContent='?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if(dataset[줄][칸]===코드표.깃발지뢰){
                        dataset[줄][칸]=코드표.물음표지뢰;
                    }else{
                        dataset[줄][칸]=코드표.물음표;
                    }
                }else if(e.currentTarget.textContent==='?'){
                    e.currentTarget.classList.remove('question');
                    if(dataset[줄][칸]===코드표.물음표지뢰){ //여기서 데이터와 화면의 분리가 나오죠
                        e.currentTarget.textContent='X';
                        dataset[줄][칸]=코드표.지뢰;
                    }else {
                        e.currentTarget.textContent='';
                        dataset[줄][칸]=코드표.보통칸;
                    }
                }
            });
            td.addEventListener('click',function(e){
                if(중단플래그){
                    return; //중단플래그가 트루면 아래쪽이 실행되지 않
                }
                var partr=e.currentTarget.parentNode;
                var partbody=e.currentTarget.parentNode.parentNode;
                var 칸=Array.prototype.indexOf.call(partr.children,e.currentTarget);
                var 줄=Array.prototype.indexOf.call(partbody.children,partr);
                if([코드표.연칸,코드표.깃발,코드표.깃발지뢰,코드표.물음표지뢰,코드표.물음표].includes(dataset[줄][칸])){ //이미 열려있는 칸이면 리턴
                    return;
                }
                e.currentTarget.classList.add('opened');
                open+=1;
                
                if(dataset[줄][칸]===코드표.지뢰){
                    e.currentTarget.textContent='펑';
                    document.querySelector('#result').textContent='실패ㅠㅠ';
                    중단플래그=true;
                }else{
                    dataset[줄][칸]=코드표.연칸;
                    var 주변=[dataset[줄][칸-1],dataset[줄][칸+1]];
                    if(dataset[줄-1]){ //-1이되도 칸부분은 에러가 안난다고함, undifined처리되는듯 칸부분이 -1이면
                        주변=주변.concat([dataset[줄-1][칸-1],dataset[줄-1][칸],dataset[줄-1][칸+1]]); //주변= 이거 꼭 해줘야됨 ㅋㅋ
                    }
                    if(dataset[줄+1]){
                        주변=주변.concat([dataset[줄+1][칸-1],dataset[줄+1][칸],dataset[줄+1][칸+1]]);
                    }
                    var 주변지뢰개수=주변.filter(function(v){
                        return [코드표.지뢰, 코드표.깃발지뢰, 코드표.물음표지뢰].includes(v);
                    }).length;
                    
                    e.currentTarget.textContent=주변지뢰개수 || ''; //앞에 값이 거짓인값(false, '', 0, null, undefined, NAN)이면 뒤에걸 대신써라 0을 아무것도 안나오게 표시하게하기위해서
                    if(주변지뢰개수===0){
                        var 주변칸=[];
                        if(tbody.children[줄-1]){
                            주변칸=주변칸.concat([
                               tbody.children[줄-1].children[칸-1],
                                tbody.children[줄-1].children[칸],
                                tbody.children[줄-1].children[칸+1],
                            ]);
                        }
                        주변칸=주변칸.concat([tbody.children[줄].children[칸-1],
                                       tbody.children[줄].children[칸+1],]);
                        if(tbody.children[줄+1]){
                            주변칸=주변칸.concat([tbody.children[줄+1].children[칸-1],
                                        tbody.children[줄+1].children[칸],
                                        tbody.children[줄+1].children[칸+1],]);
                        }
                        주변칸.filter(function(v){return !!v;}).forEach(function(옆칸){ //undefined를 제거하는코드
                            var partr=옆칸.parentNode;
                            var partbody=옆칸.parentNode.parentNode;
                            var 옆칸칸=Array.prototype.indexOf.call(partr.children,옆칸);
                            var 옆칸줄=Array.prototype.indexOf.call(partbody.children,partr);
                            if(dataset[옆칸줄][옆칸칸]!==코드표.연칸) 
                                옆칸.click(); //재귀느낌으로
                        });
                    }
                }
                if(open===row*col-mine){
                    중단플래그=true;
                    document.querySelector('#result').textContent='승리!!';
                }
            });
            tr.appendChild(td);
//            td.textContent=1; //화면
        }
        tbody.appendChild(tr);
//        console.log(arr);
    }
    //지뢰심기
    for(var k=0;k<shuffle.length;k++){ //예 60
        var ver=Math.floor(shuffle[k]/col); //6! 세로 
        var hor=shuffle[k]%col; //0->0 가로
        console.log(ver,hor);
        tbody.children[ver].children[hor].textContent='X'; //화면
        dataset[ver][hor]=코드표.지뢰;
    }
//    console.log(dataset);
});