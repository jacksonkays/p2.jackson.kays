// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>
class SpotifyWidget {
    constructor(xPos, yPos, width, height) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?
        this.x = xPos;
        this.y = yPos;
        this.w = width; //Width of the box
        this.h = height;

        this.currentSongTitle = "Bad Habit";
        this.currentArtist = "Steve Lacy";
        this.currentAlbumCover = loadImage('assets/steveLacy.png');
        this.currentValue = 0;
        this.isPaused = false;
        if (hour() > 19 || hour() < 7) {
            this.pause = laodImage('assets/pause-night.svg');
            this.fastForward = loadImage('assets/fastForward-night.svg');
            this.rewind = loadImage('assets/rewind-night.svg');
            this.play = loadImage('assets/play-night.svg');
        }
        else {
            this.pause = loadImage('assets/pause-day.svg');
            this.fastForward = loadImage('assets/fastForward-day.svg');
            this.rewind = loadImage('assets/rewind-day.svg');
            this.play = loadImage('assets/play-day.svg');
        }
        this.json = loadJSON('assets/musicPlaylist.json');
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
        text('Music', this.x + 15, this.y + 40);
        textSize(18);
        text(this.currentSongTitle, this.x + 150, this.y + 80);
        textSize(14);
        textStyle(NORMAL);
        text(this.currentArtist, this.x + 150, this.y + 100)
        this.currentAlbumCover.resize(100,100);
        image(this.currentAlbumCover, this.x + 25, this.y + 60);
        this.fastForward.resize(50, 50);
        this.pause.resize(50, 50);
        this.rewind.resize(50, 50);
        this.play.resize(50,50);
        image(this.fastForward, this.x + 240, this.y + 120);
        image(this.rewind, this.x + 140, this.y + 120);
        if (this.isPaused) {
            image(this.play, this.x + 190, this.y + 120);
        }
        else {
            image(this.pause, this.x + 190, this.y + 120);
        }
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
        if (mouseX > 300 && mouseX < 330 && mouseY > 400 && mouseY < 425){
            this.currentValue += 1;
            if (this.currentValue > 2) {
                this.currentValue = 0;
            }
            this.setPlaylist();
        }
        else if (mouseX > 200 && mouseX < 230 && mouseY > 400 && mouseY < 425){
            this.currentValue -= 1;
            if (this.currentValue < 0) {
                this.currentValue = 2;
            }
            this.setPlaylist();
        }
        else if (mouseX > 250 && mouseX < 280 && mouseY > 390 && mouseY < 430){
            this.isPaused ? this.isPaused = false : this.isPaused = true;
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

    setPlaylist() {
        spotifyWidget.currentSongTitle = this.json.playlist[spotifyWidget.currentValue].songTitle;
        spotifyWidget.currentArtist = this.json.playlist[spotifyWidget.currentValue].artist;
        if (this.currentValue == 0) {
            this.currentAlbumCover = loadImage('assets/steveLacy.png');
        }
        else if (this.currentValue == 1) {
            this.currentAlbumCover = loadImage('assets/kendrickLamar.png');
        }
        else {
            this.currentAlbumCover = loadImage('assets/rexOrangeCounty.png');
        }
      }
}