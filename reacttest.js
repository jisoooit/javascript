var screen=document.querySelector('#screen');
var starttime; //호출스택이라 클릭실행되고나면 변수에 저장된게 날아가서 비동기 바깥에 선언해줌 비동기함수는 호출스택에 들어갔다가 끝나면 바로 튀어나간다
var endtime;
var record=[];
var timeout;

screen.addEventListener('click',function(){
    
   if(screen.classList.contains('waiting')){ //현재 준비 상태인지 파악
       screen.classList.remove('waiting');
       screen.classList.add('ready');
       screen.textContent='초록색이 되면 클릭하세요';
       timeout=setTimeout(function(){
           starttime=new Date(); //performane.now()는 더 정밀한 시간을 측정하고 싶을때
           screen.click();
       },Math.floor(Math.random()*1000)+2000); //2000~3000 사이 수
   }else if(screen.classList.contains('ready')){ //준비상태
       if(!starttime){ //부정클릭
           clearTimeout(timeout);// settimeout을 중간에 취소할 수 있음 
           screen.classList.remove('ready');
           screen.classList.add('waiting');
           screen.textContent='너무 성급하시군요';
       }else{
           screen.classList.remove('ready');
           screen.classList.add('now');
           screen.textContent='클릭하세요!';   
       }
   }else if(screen.classList.contains('now')){ //시작상태
       endtime=new Date();
       console.log('반응속도',endtime-starttime,'ms');
       record.push(endtime-starttime);
       starttime=null;
       endtime=null;
       screen.classList.remove('now');
       screen.classList.add('waiting');
       screen.textContent='클릭해서 시작하세요';
   }
});