// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>
class NewsWidget {
    constructor(xPos, yPos, width, height) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?
        this.x = xPos;
        this.y = yPos;
        this.w = width; //Width of the box
        this.h = height;

        this.story1Title = '';
        this.story1Author = '';
        this.story2Title = '';
        this.story2Author = '';
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
        textWrap(WORD);
        textAlign(LEFT);
        textSize(30);
        textStyle(BOLD);
        text('News', this.x + 15, this.y + 40);
        textSize(16);
        textStyle(NORMAL);
        text(this.story1Title, this.x + 10, this.y + 60, this.w - 10, this.h - 100);
        text(this.story2Title, this.x + 10, this.y + 130, this.w - 10, this.h - 100);
        textSize(12);
        text(this.story1Author, this.x + 10, this.y + 100, this.w - 10, this.h - 100);
        text(this.story2Author, this.x + 10, this.y + 170, this.w - 10, this.h - 100);
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