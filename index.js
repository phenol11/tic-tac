let button1 = document.querySelector(".btn1");
let button2 = document.querySelector('.btn2');

        button1.addEventListener('click',()=>{
            window.location.href = "C:/Users/USER/Desktop/Tic_Tac/game-board.html"
        });
        button2.addEventListener('click',()=>{
            window.location.href = "C:/Users/USER/Desktop/Tic_Tac/game-board.html"
        });

        let buttons = document.querySelectorAll('.btn-active');
        let span = document.getElementById('span')

        function buttonText(i){           
            if(i === 0){
                buttons[i+1].classList.add('btn-1');
                buttons[i].classList.remove('btn-1');
                buttons[i].classList.add('btn-2');
                
            }else if(i === 1){
                buttons[i-1].classList.add('btn-1');
                buttons[i].classList.remove('btn-1');
                buttons[i].classList.add('btn-2');
                
            }

            return span.innerText = buttons[i].innerText;
       
        }
        for(let i = 0;i<buttons.length;i++){
            buttons[i].addEventListener('click', ()=>{
                buttonText(i)
        })};

        

