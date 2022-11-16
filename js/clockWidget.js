// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>
class ClockWidget {
    constructor(xPos, yPos, width, height) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?
        this.x = xPos;
        this.y = yPos;

        this.w = width; //Width of the box
        this.h = height;

        this.hour = 0;
        this.minute = 0;
    }
    show() {
        stroke(0);
        // Different fill based on state
        if (hour() > 19 || hour() < 7) {
            if (this.dragging){
                fill(52, 61, 77, 90);
            }
            else {
                fill(52, 61, 77);
            }
        }
        else {
            if (this.dragging){
                fill(172, 195, 232, 90);
            }
            else {
                fill(172, 195, 232);
            }
        }
        rect(this.x, this.y, this.w, this.h, 30);

        if (hour() > 19 || hour() < 7) {
            fill(255);
        }
        else {
            fill(0);
        }
        this.drawClock();
    }

    over() {
        // Is mouse over object
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }

    }

    update() {
        // Adjust location if being dragged
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    pressed() {
        // Did I click on the rectangle?
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    released() {
        // Quit dragging
        this.dragging = false;
    }

    drawClock() {
        let radius = 75;
        let secondsRadius = radius * 0.72;
        let minutesRadius = radius * 0.60;
        let hoursRadius = radius * 0.50;
        let clockDiameter = radius * 1.8;

        fill(0);
        noStroke();
        ellipse(this.x + 50, this.y + 50, clockDiameter, clockDiameter);
    // Angles for sin() and cos() start at 3 o'clock;
    // subtract HALF_PI to make them start at the top
        let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
        let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI; 
        let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  
  // Draw the hands of the clock
        stroke(255);
        strokeWeight(1);
        line(this.x + 50, this.y + 50, this.x + 50 + cos(s) * secondsRadius, this.y + 50 + sin(s) * secondsRadius);
        strokeWeight(2);
        line(this.x + 50, this.y + 50, this.x + 50 + cos(m) * minutesRadius, this.y + 50 + sin(m) * minutesRadius);
        strokeWeight(4);
        line(this.x + 50, this.y + 50, this.x + 50 + cos(h) * hoursRadius, this.y + 50 + sin(h) * hoursRadius);
        strokeWeight(1);

    // Draw the minute ticks
        strokeWeight(2);
        beginShape(POINTS);
        for (let a = 0; a < 360; a+=6) {
            let angle = radians(a);
            let x = this.x + 50 + cos(angle) * secondsRadius;
            let y = this.y + 50 + sin(angle) * secondsRadius;
            vertex(x, y);
        }
        endShape();
        strokeWeight(1);

        let hourValue = hour();
        let minuteValue = minute();
        let isPM = false;
        if (hourValue > 12) {
            hourValue -= 12;
            isPM = true;
        }
        else if (hourValue == 12) {
            isPM = true;
        }
        else if (hourValue == 0) {
            hourValue = 12;
        }

        if (minuteValue < 10)
        {
            minuteValue = "0" + minuteValue;
        }

        textSize(40);
        if (isPM) {
            text(hourValue + ":" + minuteValue + " PM", this.x + 170, this.y + 50);
        }
        else {
            text(hourValue + ":" + minuteValue + " AM", this.x + 170, this.y + 50);
        }
        textSize(20);
        textStyle(NORMAL);
        let monthDict = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        };
        text(monthDict[month()] + " " + day() + ", " + year(), this.x + 155, this.y + 80);

    }
}