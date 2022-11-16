// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>
class HealthWidget {
    constructor(xPos, yPos, width, height) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?
        this.x = xPos;
        this.y = yPos;

        this.w = width; //Width of the box
        this.h = height;

        this.json = loadJSON('assets/sleepMetrics.json');
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
        // ellipse(this.x, this.y, this.w, this.h);
        //Do other drawing thing here.
        if (hour() > 19 || hour() < 7) {
            fill(255);
        }
        else {
            fill(0);
        }
        this.drawGraph();
        textSize(30);
        textStyle(BOLD);
        text('Sleep Metrics', this.x + 15, this.y + 40);
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

    drawGraph() {
        strokeWeight(4);
        if (hour() > 19 || hour() < 7) {
            stroke(255);
        }
        else {
            stroke(0);
        }
        line(this.x + 20, this.y + 60, this.x + 20, this.y + this.h - 20);
        line(this.x + 20, this.y + this.h - 20, this.x + this.w - 30, this.y + this.h - 20);
        strokeWeight(1);
        let entries = this.json.entries;
        textSize(12);
        for (let i in entries) {
            fill(74, 163, 59);
            beginShape();
            vertex(this.x + 110 + ((i-1) * 50), this.y + this.h - 25 - ((entries[i].Hours/12) * 150));
            vertex(this.x + 80 + ((i-1) * 50), this.y + this.h - 25 - ((entries[i].Hours/12) * 150));
            vertex(this.x + 80 + ((i-1) * 50), this.y + this.h - 25);
            vertex(this.x + 110 + ((i-1) * 50), this.y + this.h - 25);
            endShape(CLOSE);
            // rect(this.x + 30 + ((i-1) * 50), this.y + ((entries[i].Hours/12) * 150), 40, ((entries[i].Hours/12) * 150));
            if (hour() > 19 || hour() < 7) {
                fill(255);
            }
            else {
                fill(0);
            }
            text(entries[i].Day, this.x + 85 + ((i-1) * 50), this.y + this.h - 5);
            text(entries[i].Hours, this.x + 85 + ((i -1) * 50), this.y + this.h - 35 - ((entries[i].Hours/12) * 150));
        }
    }
}
