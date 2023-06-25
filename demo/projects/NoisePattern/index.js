// nr_of_particles：粒子数量
// particles：一个数组，用于存储粒子的信息，初始化为空数组。
// field：一个数组，用于存储场的信息，初始化为空数组。
// size：每个粒子和场的宽度和高度，初始化为20。
// purple：一个字符串，表示紫色的颜色，使用 RGBA 格式设置（红色值为140，绿色值为82，蓝色值为255，不透明度为1）。
  const nr_of_particles = 5000;
  const particles = [];
  const field = [];
  const size = 10;
  const purple = 'rgba(140, 82, 255, 1)';

  function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for (let x = 0; x < nr_of_particles; x++) {
      particles.push(new Particle());
    }

    createField();
    background(purple);
    drawText();
  }

  function draw() {
    particles.forEach(particle => {
      particle.update();
      particle.draw();
      particle.setForceFromField(field);
    });
// 使用 if 语句判断当前帧数是否为 10 的整数倍。若是，则调用 drawText() 函数，在画布中绘制文字。这一步主要是为了优化性能，在每 10 帧才绘制一次文字。
    if (frameCount % 10 === 0) {
      drawText();
    }
  }

  function drawText() {
    fill('rgba(255,255,255, 0.1)');
    strokeWeight(0);
    textSize(width / 12);
    textAlign(CENTER);
    textFont('Lora');
    text('j5库绘画有点东西', width / 2, height / 2);
  }

  class Particle {
    constructor() {
      this.pos = createVector(random(width), random(height));
      this.prevPos = this.pos.copy();
      //vel：表示粒子的当前速度，由 createVector() 函数创建的向量，默认值为 (0, 0)。
      //acc：表示粒子的当前加速度，由 createVector() 函数创建的向量，默认值为 (0, 0)。
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.maxSpeed = 3;
    }

    applyForce(force) {
      this.acc.add(force);
    }
//模拟粒子运动
    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.prevPos = this.pos.copy();
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.checkEdges();
    }

    draw() {
      stroke(random() < 0.5 ? purple : 'rgba(255,255,255, 1)');
      // stroke();
      strokeWeight(0.5);
      line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    }

    checkEdges() {
      if (this.pos.x > width) {
        this.pos.x = 0;
        this.prevPos = this.pos.copy();
      }
      if (this.pos.x < 0) {
        this.pos.x = width;
        this.prevPos = this.pos.copy();
      }
      if (this.pos.y > height) {
        this.pos.y = 0;
        this.prevPos = this.pos.copy();
      }
      if (this.pos.y < 0) {
        this.pos.y = height;
        this.prevPos = this.pos.copy();
      }
    }

    setForceFromField(field) {
      const x = Math.floor(this.pos.x / size);
      const y = Math.floor(this.pos.y / size);
      const idx = y + x * size;
      const force = field[idx];
      this.applyForce(force);
    }
  }

  function createField() {
    const rows = Math.floor(width / size);
    const cols = Math.floor(height / size);
    let x_noise = 0;
    for (let i = 0; i < rows; i++) {
      let y_noise = 0;
      for (let j = 0; j < cols; j++) {
        const angle = noise(x_noise, y_noise) * TWO_PI * 10;
        const vec = p5.Vector.fromAngle(angle);
        vec.setMag(0.3);
        field.push(vec);
        y_noise += 0.1;
      }
      x_noise += 0.1;
    }
  }