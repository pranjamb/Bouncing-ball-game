const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  speed: 5,
  dx: 0,
  dy: 0,
  bounceCount: 0,
};

let resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {
  ball.bounceCount = 0;
});

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const angle = Math.atan2(mouseY - ball.y, mouseX - ball.x);
  ball.dx = ball.speed * Math.cos(angle);
  ball.dy = ball.speed * Math.sin(angle);
});

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce off walls
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
    ball.bounceCount++;
  }

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
    ball.bounceCount++;
  }

  requestAnimationFrame(update);
}

update();
