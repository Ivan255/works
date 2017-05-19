/**
 * Created by Administrator on 2017/5/19.
 */
(function(){
     function init(){
         var tape = new Tape();
         document.querySelector(".tapeBtn").onclick = function(){
             tape.tape();
         };
         document.querySelector(".stopBtn").onclick = function(){
             tape.stop();
         }
     }
    init();
}());