let currentSong=0;

const music=document.querySelector('#audio');   
const seekbar=document.querySelector('.seekbar');
const artist=document.querySelector('.artist');
const songname=document.querySelector('.song-name');
const boxdisk=document.querySelector('.box-disk');
const currenttime=document.querySelector('.current-time');
const musictime=document.querySelector('.music-time');
const btnback=document.querySelector('.btn-backward');
const btnplay=document.querySelector('.btn-play');
const btnnext=document.querySelector('.btn-nextward');


btnplay.addEventListener('click',()=>{
    if(btnplay.className.includes('pause'))
        music.play();
    else
        music.pause();

        btnplay.classList.toggle('pause');
    boxdisk.classList.toggle('play');
});

//Cài đặt bài hát

const setSong=(i)=>{
    seekbar.value=0;
    let song=songs[i];
    currentSong=i;
    music.src=song.path;
    songname.innerHTML=song.name;
    artist.innerHTML=song.artist;
    boxdisk.style.backgroundImage=`url('${song.image}')`;

    currenttime.innerHTML='00:00';
    setTimeout(()=>{
        seekbar.max=music.duration;
        musictime.innerHTML=formatTimes(music.duration);
    }, 300);
}

setSong(0); 

const formatTimes=(time)=>{
    let min=Math.floor(time/60);
    if(min<10)
        min=`0${min}`;

    let sec=Math.floor(time%60);
    if(sec<10)
        sec=`0${sec}`;

    return `${min}:${sec}`
}

//cài đặt seekbar và current time
setInterval(() => {
    seekbar.value=music.currentTime;
    currenttime.innerHTML=formatTimes(music.currentTime);
}, 500);

seekbar.addEventListener('change',()=>{
    music.currentTime=seekbar.value;
})

const playMusic=()=>{
    music.play();
    btnplay.classList.remove('pause');
    boxdisk.classList.add('play');
}

//cài đặt cho button nextward và backward
btnnext.addEventListener('click',()=>{
    if(currentSong >= songs.length - 1){
        currentSong = 0;
    }
    else{
        currentSong++;}
    setSong(currentSong);
    playMusic();
});

btnback.addEventListener('click',()=>{
    if(currentSong <= 0){
        currentSong = songs.length - 1;
    }
    else{
        currentSong--;}
    setSong(currentSong);
    playMusic();
});

//chuyển bài
music.addEventListener('ended',()=>{
    btnnext.click();
})

