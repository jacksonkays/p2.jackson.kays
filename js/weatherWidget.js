// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>
class WeatherWidget {
    constructor(xPos, yPos, width, height) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?
        this.x = xPos;
        this.y = yPos;
        this.w = width; //Width of the box
        this.h = height;
        this.description = 'sunny';
        this.currentTemp = 0;
        this.icon = loadImage('assets/sunny.svg');
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
        textSize(30);
        textStyle(BOLD);
        text('Weather', this.x + 15, this.y + 40);
        textStyle(NORMAL);
        textSize(20);
        text(this.description, this.x + 40, this.y + 90);
        text(this.currentTemp + ' \xB0F', this.x + 40, this.y + 140);
        this.icon.resize(75,75);
        image(this.icon, this.x + 100, this.y + 100);
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
}