var candi;
var arr;

function choose(){ //1~9까지의 수중에서 랜덤으로 44개를 뽑는다.
    candi=[1,2,3,4,5,6,7,8,9];
    arr=[];
    for(var i=0;i<4;i+=1){
        var num=candi.splice(Math.floor(Math.random()*(9-i)),1)[0]; 
        arr.push(num);
    }
}

choose();
console.log(arr);

var body=document.body;
var result=document.createElement('h1');
body.append(result);
var form=document.createElement('form');
document.body.append(form);
var input=document.createElement('input');
form.append(input);
var button=document.createElement('button');
button.textContent='입력';
form.append(button);

var count=0;
form.addEventListener('submit',function(e){
    e.preventDefault();
    var answer=input.value;
    if(answer===arr.join('')){ //join은 하나의 문자로 합쳐준다.
        result.textContent='홈런!!';
        input.value='';
        input.focus();
        choose();
        count=0;
    }
    else{
        var ansarr=answer.split(''); //하나하나 비교하기 위해 문자열을 배열로 하는 split
        var strike=0;
        var boll=0;
        count++;
        if(count>10){
            result.textContent='10번 넘게 틀려서 실패! 답은'+arr.join('')+'이었습니다!!';
            input.value='';
            input.focus();
            choose();
            count=0;
        }else{
//            console.log("답이 틀리면",ansarr);
            for(var i=0;i<3;i++){
//                이게 왜 3으로 하는지 모르겠음
                if(Number(ansarr[i])===arr[i]){
                    strike++;
                }
                else if(arr.indexOf(Number(ansarr[i]))>-1){ //포함되지 않으면 -1이기 때문에, 0도 고려해서 >-1로 함     /includes써도 될거같기두
                    boll++;
                }
            }
            result.textContent='스크라이크'+strike+'볼'+boll+'입니다.'+(10-count)+'번 남았습니다';
            input.value='';
            input.focus();     
        }
       
    }
})