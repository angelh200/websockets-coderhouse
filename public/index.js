const socket = io();

// Renderiza los items recibidos con handlebars
socket.on('items', items => {
  render('table.hbs', {items}, 'table');
});

socket.on('msgs', msgs => {
  render('mensajes.hbs', {msgs}, 'msg-center');
});

// Renderiza el template con la informacion y lo pone dentro del elemento con el id
function render(template, data, wrapperId) {
  fetch(template).then(res => {
    return res.text();
  }).then(temp => {
    let template = Handlebars.compile(temp);
    document.getElementById(wrapperId).innerHTML = template(data);
  });
}

function addItems(e) {
  const newItem = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value
  };

  socket.emit('new-item', newItem);
  document.getElementById('title').value = '';
  document.getElementById('price').value = '';
  document.getElementById('thumbnail').value = '';
  return false;
}

function addMsg(e) {
  const email = document.getElementById('email').value;
  const msg = document.getElementById('msg').value;

  if(!email || !msg) {
    return false;
  }
  const newMsg = {
    email,
    date: moment().format('DD/MM/YYYY HH:MM:SS'),
    msg: document.getElementById('msg').value
  }

  socket.emit('new-msg', newMsg);
  document.getElementById('msg').value = '';

  return false;
}