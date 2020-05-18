class Clock {

    constructor(hours = 0, minutes = 0) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = 0;
        
        var canvas = document.querySelector("canvas");
        this.ctx = canvas.getContext("2d");
        this.ctx.translate(canvas.width/2, canvas.height / 2);

        this.radius = (canvas.height/2) * 0.90;
        this.draw();
    }

    start() {
        let c = this;
        this.clockTimer = setInterval(function() {
            c.tick();
        }, 1000);
    }

    stop() {
        clearInterval(this.clockTimer);
    }

    reset() {
        this.hour = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.draw();
    }

    tick() {
        this.updateTime();
        this.draw();
    }

    updateTime() {
        this.seconds++;
        if (this.seconds >= 60) {
            this.seconds = 0;
            this.minutes += 1;
        }
        if (this.minutes >= 60) {
            this.minutes = 0;
            this.hours += 1;
        }
        if (this.hours >= 24) {
            this.hours = 0;
        }
        console.log(`hours= ${this.hours}, minutes= ${this.minutes}, seconds= ${this.seconds}`);
    }

    draw() {
        const ctx = this.ctx;
        const radius = this.radius;
        this.drawFace(ctx, radius);
        this.drawNumbers(ctx, radius);
        this.drawTime(ctx, radius);
    }

    drawFace(ctx, radius) {
        var grad;

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        grad.addColorStop(0, '#333');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1, '#333');
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius * 0.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
    }


    drawNumbers(ctx, radius) {
        var ang;
        var num;
        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (num = 1; num < 13; num++) {
            printNumber(6, 0.75);
        }

        ctx.font = radius * 0.07 + "px arial";
        for (num = 1; num < 61; num++) {
            printNumber(30, 0.90, num);
        }

        function printNumber(baseAngule, inner, num) {
            ang = num * Math.PI / baseAngule;
            ctx.rotate(ang);
            ctx.translate(0, -radius * inner);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * inner);
            ctx.rotate(-ang);
        }

    }

    drawTime(ctx, radius) {
        var hour = this.hours;
        var minute = this.minutes;
        var second = this.seconds;
        hour = hour % 12;
        hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
        this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
        second = (second * Math.PI / 30);
        this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
    }

    drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }
    
}
