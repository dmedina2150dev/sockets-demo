var socket = io.connect('http://192.168.1.10:6677',{'forceNew': true});

socket.on('messages', function(data){
	console.log(data);
	render(data);
});

function render(data){
	var html = data.map(function(message, index){
		return (`
			<div class="message">
				<strong>${message.nickname}</strong> dice: 
				<p>${message.text}</p>
			</div>
		`);
	}).join(' ');
	var div_msg = document.getElementById('menssages');
	div_msg.innerHTML = html;
	div_msg.scrollTop = div_msg.srcollHeight;
}
function addMessage(e){
	let nombre = document.querySelector('#nickname');
	let mensaje = document.querySelector('#text');
	
	var message = {
		nickname: nombre.value,
		text: mensaje.value,
	}

	nombre.style.display = "none";

	socket.emit('add-message', message);
	mensaje.reset();
	return false;

}