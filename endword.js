//html로 할 수 있는 걸 js로 표현할거임 연습겸
//var body = document.body;
var word=document.createElement('div');
word.textContent='제로초';
document.body.append(word);
var form=document.createElement('form');
document.body.append(form);
var input=document.createElement('input');
form.append(input);
var button=document.createElement('button');
button.textContent='입력';
form.append(button);
var result=document.createElement('div');
document.body.append(result);

form.addEventListener('submit',function(e){
//    form으로 한 이유는 버튼을 직접 누르지 않고 엔터가 치면 버튼이 눌러진것처럼 하기위해서였음 button.addEventListener('click',function()) 으로 하면 버튼누르면 실행됨
    e.preventDefault();
//    이거 왜 하냐면 form submit실행되면 새로고침이 항상 일어나서 그거 안일어나게 하려고한거임
    if(word.textContent[word.textContent.length-1]===input.value[0]){
        result.textContent='딩동댕';
        word.textContent=input.value;
        input.value='';
        input.focus();
    }
    else{
        result.textContent='땡';
        input.value='';
        input.focus();
    }
});