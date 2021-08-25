var table=document.getElementById('table');
var trs=[];
var tds=[];
var body=document.body;
var n=8;
var button=document.getElementById('button');
var mcolor={
    pathway:0,
    wall:1,
    blocked:2,
    path:3,
};

var maze=[
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 0, 1, 1, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 1],
      [0, 1, 0, 0, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 1, 1],
      [0, 1, 0, 0, 0, 1, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0, 1, 0, 0],
  ];

for(var i=0;i<8;i++){ //틀만들고 틀에 데이터 집어넣는 느낌
    var tr=document.createElement('tr');
    trs.push(tr);
    tds.push([]);
    for(var j=0;j<8;j++){
        var td=document.createElement('td');
//        tds[i].push(td);
        tds[i].push(maze[i][j]);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

function draw(){ //데이터와 화면을 일치시키기 위한..데이터만 바꾸면 이게 알아서 화면에 반영해준다.
    tds.forEach(function(row,i){
        tds[i].forEach(function(col,j){
            if(col===1){
                 table.children[i].children[j].style.background='blue';    
            }else if(col===3){
                table.children[i].children[j].style.background='red';
            }
        })
    })
}

function findpath(x,y){ //길 찾는 재귀함수
    if(x<0||y<0||x>=n||y>=n){
        return false;
    }else if(tds[x][y]!=mcolor.pathway){
        return false;
    }else if(x==n-1 && y==n-1){
        tds[x][y]=mcolor.path;
        return true;
    }else{
        tds[x][y]=mcolor.path;
        if(findpath(x-1,y)||findpath(x,y+1)||findpath(x+1,y)||findpath(x,y-1)){
            return true;
        }
        tds[x][y]=mcolor.blocked;
        return false;
    }
}

draw();
button.addEventListener('click',function(){
    findpath(0,0);
    draw();
});








//만약 랜덤으로 벽 위치를 지정한다면
//var wall=[]; //벽 위치 배열
//var candi=Array(10*10).fill().map(function(ele,index){
//    return index;
//});
//while(candi.length>60){ //20개만 뽑기위해 
//    var num=candi.splice(Math.floor(Math.random()*candi.length),1)[0];
//    wall.push(num);
//}   
//console.log(wall);
//
//for(var k=0;k<wall.length;k++){ //예 60
//    var ver=Math.floor(wall[k]/10); //6! 세로 
//    var hor=wall[k]%10; //0->0 가로
////    console.log(ver,hor);
//    table.children[ver].children[hor].textContent='X'; //화면
//    tds[ver][hor]=1;
//}
//console.log(tds);

