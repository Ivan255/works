/**
 * Created by Administrator on 2017/5/19.
 */
(function(){
    function Tape(){
        this.buffer = [];
        this.getMediaStream();
    }
    Tape.prototype.getMediaStream = function(){
        var config = {video:true};
        navigator.mediaDevices.getUserMedia(config).then(function(stream){
            this.mediaTape = new MediaTape(stream);
            this.mediaTape.ondataavailable = function(event){
                this.buffer.push(event,data);
            };
            this.addEventListener();
        }.bind(this)).catch(function(error){
            console.log(error);
        });
    };
    Tape.prototype.addEventListener = function(){
      this.mediaTape.onstop =function(){
          var blob = new Blob(this.buffers,{mimeType:"video/webm"});
          var url = URL.createObjURL(blob);
          var video = document.createElement("video");
          video.src = url;
          document.documentElement.appendChild(video);
          video.autoplay = true;
          video.onended = function(){
              document.documentElement.removeChild(this);
          };
          var downloadBtn = document.createElement("a");
          downloadBtn.textContent = "下载并保存到本地";
          downloadBtn.href = url;
          downloadBtn.download = url;
          document.documentElement.appendChild(downloadBtn);
      };
    };
    Tape.prototype.start = function(){
        if(this.mediaTape.state == "recording"){
            return;
        };
        this.mediaTape.start();

    };
    Tape.prototype.tape = function(){
        if(this.mediaTape.state == "paused"){
            //console.log(111);
            this.mediaTape.resume();
        }else{
            this.start();
        }
    };
  Tape.prototype.pause = function(){
      this.mediaTape.pause();
  };
    Tape.prototype.stop = function(){
        //console.log(222);
        this.mediaTape.stop();
    };


    window.Tape = Tape;
}());