var table=document.getElementById('table');
var data=[];
var score=document.getElementById('score');

function reset(){ //화면,데이터 만들기
    var fragment=document.createDocumentFragment();
    [1,2,3,4].forEach(function(){
        var row=[]; 
        data.push(row);
        var tr=document.createElement('tr');
        [1,2,3,4].forEach(function(){
            row.push(0);
            var td=document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function random(){
    var vacant=[]; //row는 열데이터, col은 행데이터
    data.forEach(function(row,i){ //빈칸검사해서 빈칸배열에 넣기
        row.forEach(function(col,j){
            if(!col){
                vacant.push([i,j]);
            }
        });
    });
    if(vacant.length===0){
        alert('게임오버: '+score.textContent);
        table.innerHTML=''; //테이블 초기화
        reset();
    }
    var rancan=vacant[Math.floor(Math.random()*vacant.length)];
    data[rancan[0]][rancan[1]]=2;
    draw();
}

function draw(){ //데이터와 화면을 일치시키기 위한..데이터만 바꾸면 이게 알아서 화면에 반영해준다.
    data.forEach(function(row,i){
        row.forEach(function(col,j){
            if(col>0){
                table.children[i].children[j].textContent=col;
            }else{
                table.children[i].children[j].textContent='';
            }
        })
    })
}

reset();
random();
draw();

var dragstart=false;
var draging=false;
var start;
var end;
window.addEventListener('mousedown',function(e){ //마우스 눌렀을때
    dragstart=true;
    start=[e.clientX, e.clientY];
});
window.addEventListener('mousemove',function(e){ //마우스 움직였을때
    if(dragstart){
        draging=true;
    }
});
window.addEventListener('mouseup',function(e){ //마우스 땟을때
    end=[e.clientX, e.clientY];
    if(draging){
        var xdiff=end[0]-start[0];
        var ydiff=end[1]-start[1];
        var direction;
        if(xdiff<0 && Math.abs(ydiff)/Math.abs(xdiff)<1){ //사분면 그려보면 안다
            direction='왼쪽';
        }else if(xdiff>0 && Math.abs(ydiff)/Math.abs(xdiff)<1){
            direction='오른쪽';
        }else if(ydiff<0 && Math.abs(ydiff)/Math.abs(xdiff)>1){
            direction='위';
        }else if(ydiff>0 && Math.abs(ydiff)/Math.abs(xdiff)>1){
            direction='아래'
        }
        console.log(xdiff,ydiff,direction);    
    }
    dragstart=false;
    draging=false;
    
    switch(direction){
        case '왼쪽':
            var newdata=[
                [],
                [],
                [],
                [],
            ];
            data.forEach(function(row,i){
                row.forEach(function(col,j){
                    if(col){
                        if(newdata[i][newdata[i].length-1] && newdata[i][newdata[i].length-1]===col){
                            newdata[i][newdata[i].length-1]*=2;
                            var currentscore=parseInt(score.textContent);
                            score.textContent=currentscore+newdata[i][newdata[i].length-1];
                        }else{
                             newdata[i].push(col);   
                        }
                    }
                });
            });
            console.log(newdata);
            [1,2,3,4].forEach(function(row,i){
                [1,2,3,4].forEach(function(col,j){
                   data[i][j]=newdata[i][j]||0;
                });
            });
            break;
        case '오른쪽':
            var newdata=[
                [],
                [],
                [],
                [],
            ];
            data.forEach(function(row,i){
                row.forEach(function(col,j){
                    if(col){
                        if(newdata[i][0] && newdata[i][0]===col){
                            newdata[i][0]*=2;
                            var currentscore=parseInt(score.textContent);
                            score.textContent=currentscore+newdata[i][0];
                        }else{
                             newdata[i].unshift(col);   
                        }
                    }
                });
            });
            console.log(newdata);
            [1,2,3,4].forEach(function(row,i){
                [1,2,3,4].forEach(function(col,j){
                   data[i][3-j]=newdata[i][j]||0;
                });
            });
            break;
        case '위':
            var newdata=[
                [],
                [],
                [],
                [],
            ];
            data.forEach(function(row,i){
                row.forEach(function(col,j){
                    if(col){
                        if(newdata[j][newdata[j].length-1] && newdata[j][newdata[j].length-1]===col){
                            newdata[j][newdata[j].length-1]*=2;
                            var currentscore=parseInt(score.textContent);
                            score.textContent=currentscore+newdata[j][newdata[j].length-1];
                        }else{
                             newdata[j].push(col);   
                        }
                    }
                });
            });
            console.log(newdata);
            [1,2,3,4].forEach(function(col,i){
                [1,2,3,4].forEach(function(row,j){
                   data[j][i]=newdata[i][j]||0;
                });
            });
            break;
        case '아래':
             var newdata=[
                [],
                [],
                [],
                [],
            ];
            data.forEach(function(row,i){
                row.forEach(function(col,j){
                    if(col){
                        if(newdata[j][0] && newdata[j][0]===col){
                            newdata[j][0]*=2;
                            var currentscore=parseInt(score.textContent);
                            score.textContent=currentscore+newdata[j][0];
                        }else{
                             newdata[i].unshift(col);   
                        }
                    }
                });
            });
            console.log(newdata);
            [1,2,3,4].forEach(function(col,i){
                [1,2,3,4].forEach(function(row,j){
                   data[3-j][i]=newdata[i][j]||0;
                });
            });
            break;
            
    }
    random();
});

