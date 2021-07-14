const images = [
  'image-0',
  'image-1',
  'image-2',
  'image-3',
  'image-4',
  'image-5',
  'image-6',
  'image-7',
  'image-8'
];

const puzzle = document.getElementById('puzzle');
const pieces = document.getElementById('pieces');
const message = document.getElementById('message');

let finished = images.length

while (images.length) {
  const index = Math.floor(Math.random() * images.length);
  const div = document.createElement('div');
  div.className = 'piece';
  div.id = images[index];
  div.draggable = true;
  div.style.backgroundImage = `url("resources/${images[index]}.jpg")`;
  pieces.appendChild(div);
  images.splice(index, 1);
}

for (let i = 0; i < finished; i++) {
  const div = document.createElement('div');
  div.className = 'placeholder';
  div.dataset.id = i;
  puzzle.appendChild(div);
}

pieces.addEventListener('dragstart', event => {
  event.dataTransfer.setData('id', event.target.id);
});

puzzle.addEventListener('dragover', event => {
  event.preventDefault();
  event.target.classList.add('hover');
});

puzzle.addEventListener('dragleave', event => {
  event.target.classList.remove('hover');
});

puzzle.addEventListener('drop', event => {
  event.target.classList.remove('hover');
  const id = event.dataTransfer.getData('id');
  const number = id.split('-')[1];
  if (  event.target.dataset.id === number) {
    event.target.appendChild(document.getElementById(id));
    finished--;
    if (finished === 0) {
      document.body.classList.add('you-win')
    }
  }
});