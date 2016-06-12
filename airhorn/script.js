var audio = new Audio('AIRHORN.mp3');
function myFunction(){
	if (audio.ended == false) {
		audio.load()
	};
	audio.play();
}