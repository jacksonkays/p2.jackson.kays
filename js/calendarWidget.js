// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>
class CalendarWidget {
    constructor(xPos, yPos, width, height) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?
        this.x = xPos;
        this.y = yPos;

        this.w = width; //Width of the box
        this.h = height;

        this.json = loadJSON('assets/todoList.json');
        this.checkMark = loadImage('assets/checkMark.png');
        this.undo = loadImage('assets/undo.png');

        this.itemsFinished = [false, false, false, false, false];
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
        textSize(22);
        textStyle(BOLD);
        text('Events For Today', this.x + 15, this.y + 40);
        textSize(16);
        textStyle(NORMAL);
        this.createTodoList();
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
        if (mouseX > 1300 && mouseX < 1325) {
            if (mouseY > 125 && mouseY < 145) {
                this.itemsFinished[0] ? this.itemsFinished[0] = false : this.itemsFinished[0] = true;
            }
            else if (mouseY > 175 && mouseY < 195) {
                this.itemsFinished[1] ? this.itemsFinished[1] = false : this.itemsFinished[1] = true;
            }
            else if (mouseY > 225 && mouseY < 245) {
                this.itemsFinished[2] ? this.itemsFinished[2] = false : this.itemsFinished[2] = true;
            }
            else if (mouseY > 275 && mouseY < 295) {
                this.itemsFinished[3] ? this.itemsFinished[3] = false : this.itemsFinished[3] = true;
            }
            else if (mouseY > 325 && mouseY < 345) {
                this.itemsFinished[4] ? this.itemsFinished[4] = false : this.itemsFinished[4] = true;
            }
        }
        else if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
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

    createTodoList() {
        let items = this.json.items;
        this.checkMark.resize(25, 25);
        this.undo.resize(25,25);
        for (let i in items) {
            if (!this.itemsFinished[i]) {
                if (hour() > 19 || hour() < 7) {
                    fill(255);
                }
                else {
                    fill(0);
                }
                text(items[i].item, this.x + 15, this.y + 100 + (i * 50));
                image(this.checkMark, this.x + 210, this.y + 80 + (i * 50));
            }
            else {
                fill(100);
                text(items[i].item, this.x + 15, this.y + 100 + (i * 50));
                line(this.x + 15, this.y + 95 + (i * 50), this.x + this.w - 30, this.y + 95 + (i * 50));
                image(this.undo, this.x + 210, this.y + 80 + (i * 50));
            }
        }
    }
}