
export default class VideoPlayer{

    private player:HTMLVideoElement

    constructor(player:HTMLVideoElement){
        this.player = player;
        this.player.volume = 0.5
        console.log(this.player)
    }

    public play(){
        this.player.paused && this.player.play();
    }
    public pause(){
        !this.player.paused && this.player.pause();

    }
    public toggle(){
        this.player.paused ? this.player.play() : this.player.pause();
    }
    get isPlaying(){
        return{
            state:this.player.paused ? false : true
        }
    }
    public setSourceStream(source:string){
        this.player.src = source;
    }
    public setVideoVolume(volume:number){
        this.player.volume = volume;
    }

    get SourceStream(){
        return this.player.src;
    }

}