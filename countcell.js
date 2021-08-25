var table=document.getElementById('table');
var trs=[];
var tds=[];
var body=document.body;
var n=10;
var ccolor={
    back:0,
    image:1,
    already:2,
};

for(var i=0;i<n;i++){ //틀만들고 틀에 데이터 집어넣는 느낌
    var tr=document.createElement('tr');
    trs.push(tr); //이거 굳이 왜 하는지 싶긴해
    tds.push([]);
    for(var j=0;j<n;j++){
        var td=document.createElement('td');
//        tds[i].push(td);
        td.addEventListener('click',function(e){
//            var whatrow=trs.indexOf(e.target.parentNode);
//            console.log("몇줄",whatrow);
//            var whatcol=tds[whatrow].indexOf(e.target);
//            console.log("몇칸",whatcol);
            //이건 tds[i].push(td)를 한 경우에만 가능한듯
            var partr=e.target.parentNode; //일단 지뢰찾기 배낌 이유는 모름 ㅋㅋ
            var parbody=e.target.parentNode.parentNode;
            var col=Array.prototype.indexOf.call(partr.children,e.target);
            var row=Array.prototype.indexOf.call(parbody.children,partr);
//            console.log(row,col);
            var cnt=countcell(row,col);
            draw();
            console.log(cnt);
        });
        tds[i].push(0);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

function random(num){ //랜덤으로 칠할칸 고름(열,행 한꺼번에 랜덤으로 고를 수 있음)
    var vacant=[]; //row는 열데이터, col은 행데이터
    tds.forEach(function(row,i){ //빈칸검사해서 빈칸배열에 넣기
        tds[i].forEach(function(col,j){
            if(!col){
                vacant.push([i,j]);
            }
        });
    });
    for(var i=0;i<num;i++){
        var shuffle=vacant[Math.floor(Math.random()*vacant.length)];
        tds[shuffle[0]][shuffle[1]]=1;   
    }
//    console.log(tds);
    draw();
}

function draw(){ //데이터와 화면을 일치시키기 위한..데이터만 바꾸면 이게 알아서 화면에 반영해준다.
    tds.forEach(function(row,i){
        tds[i].forEach(function(col,j){
            if(col===1){
                 table.children[i].children[j].style.background='blue';    
            }else if(col===2){
                table.children[i].children[j].style.background='red';
            }
        })
    })
}


function countcell(x,y){ //블록세는 재귀함수
    if(x<0|| y<0|| x>=n||y>=n){
        return 0;
    }else if(tds[x][y]!=ccolor.image){
        return 0;
    }else{
        tds[x][y]=ccolor.already;
        return 1+countcell(x-1,y+1)+countcell(x,y+1)+countcell(x+1,y+1)+countcell(x-1,y)+countcell(x+1,y)+countcell(x-1,y-1)+countcell(x,y-1)+countcell(x+1,y-1);
    }
}

random(35);

//td.addEventListener('click',function(e){ //td이벤트 여기다 하니까 안됨 ㅋㅋ 이거 배웠는데 이유 까먹음
//    console.log(11);
//    var row=tdr.indexOf(e.target.parentNode);
//    console.log("몇줄",row);
//    var col=tds[row].indexOf(e.target);
//    console.log("몇칸",col);
//})

//이게 랜덤함수인듯 ㅋㅋ
//var shuffle=[]; //벽 위치 배열
//var candi=Array(n*n).fill().map(function(ele,index){
//    return index;
//});
//while(candi.length>60){ //20개만 뽑기위해 
//    var num=candi.splice(Math.floor(Math.random()*candi.length),1)[0];
//    shuffle.push(num);
//}   
//console.log(shuffle);
//
//for(var k=0;k<shuffle.length;k++){ //예 60
//    var ver=Math.floor(wall[k]/10); //6! 세로 
//    var hor=shuffle[k]%10; //0->0 가로
////    console.log(ver,hor);
//    table.children[ver].children[hor].textContent='X'; //화면
//    tds[ver][hor]=1;
//}
