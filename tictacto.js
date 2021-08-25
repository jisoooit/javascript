var body=document.body;
var table=document.createElement('table');
var rows=[];
var cols=[];
var turn='X';
var result=document.createElement('div');

function check(whatrow, whatcol){
      var full=false; //세칸이 다찼는지이다
        //가로줄 검사
        if(cols[whatrow][0].textContent===turn &&
           cols[whatrow][1].textContent===turn &&
           cols[whatrow][2].textContent===turn){
            full=true;
        }
        //세로줄
        if(cols[0][whatcol].textContent===turn &&
           cols[1][whatcol].textContent===turn &&
           cols[2][whatcol].textContent===turn){
            full=true;
        }
    //대각선1
        if(cols[0][0].textContent===turn &&
           cols[1][1].textContent===turn &&
           cols[2][2].textContent===turn){
            full=true;
        }

    //대각선2
        if(cols[0][2].textContent===turn &&
           cols[1][1].textContent===turn &&
           cols[2][0].textContent===turn){
            full=true;
        }
        return full;
}

function reset(무승부){
    if(무승부){
        result.textContent='무승부';
    }else{
        result.textContent=turn+'님이 승리!!';   
    }
    //초기화
    setTimeout(function(){
        turn='X';
        cols.forEach(function(row){
            row.forEach(function(col){
                col.textContent='';
            });
        });  
    },1000);
}

var cm=function(e){ //칸을 클릭했을때 실행될 함수
    if(turn==='O'){ //컴퓨터의 턴일때 내가 클릭하지 못하도록
        return;
    }
//    console.log(e.target); //칸
//    console.log(e.target.parentNode); //줄
//    console.log(e.target.parentNode.parentNode); //테이블
//    console.log(rows); 
//    console.log(cols);
    var whatrow=rows.indexOf(e.target.parentNode);
    console.log("몇줄",whatrow);
    var whatcol=cols[whatrow].indexOf(e.target);
    console.log("몇칸",whatcol);
    if(cols[whatrow][whatcol].textContent!==''){
        console.log('빈칸아닙니다.');
    }
    else{
        console.log('빈칸입니다.');
        cols[whatrow][whatcol].textContent=turn;
        var full=check(whatrow,whatcol); //세칸 다 채워졌니?
        //모든 칸이 다 찼는지 검사
        var candi=[]; //컴퓨터가 고르기위해 만든 배열
        cols.forEach(function(row){
            row.forEach(function(col){
                candi.push(col);
            });
        });
        candi=candi.filter(function(col){return !col.textContent }); // '',0,MaM,undefined,null,false 걸러주는거
        if(full){
           reset(false);
        }else if(candi.length===0){ //칸을 더이상 선택할 수 없음
            reset(true);
        }else{
            if(turn==='X')
                turn='O';
            else
                turn='X';   
            setTimeout(function(){
                //빈칸 중 하나를 고른다. 컴퓨터가 골라주는거임
                var select=candi[Math.floor(Math.random()*candi.length)];
                select.textContent='O';
                var whatrow=rows.indexOf(select.parentNode); 
                var whatcol=cols[whatrow].indexOf(select);
                var full=check(whatrow,whatcol);
               
                if(full){
                    reset();
                }
                //턴을 나한테 넘긴다.
                turn='X';
            },1000);
        }
    }
};

for(var i=1;i<=3;i++){
    var row=document.createElement('tr');
    rows.push(row);
    cols.push([]);
    for(var j=1;j<=3;j++){
        var col=document.createElement('td');
        col.addEventListener('click', cm);
        cols[i-1].push(col);
        row.appendChild(col);
    }
    table.appendChild(row);
}
body.appendChild(table);
body.appendChild(result);
//console.log('줄들',rows,'칸들',cols);