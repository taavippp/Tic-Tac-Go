class Square {
    constructor(htmlID) {
        this.htmlID = htmlID;
        this.htmlElement = document.querySelector("#" + htmlID);
        this.htmlElement.classList.add("defaultSquare");

        this.rowNum = parseInt(htmlID[htmlID.length-2]);
        this.colNum = parseInt(htmlID[htmlID.length-1]);
        
        this.letter = "?";
        this.available = false;
        this.htmlElement.addEventListener("click", () => {
            this.clickEvent();
        });
    }
/*
isGameActive    false
startingLetter  X
whoseTurn       null
parentSquare    null
*/
    clickEvent() {
        if(isGameWon) {
            return;
        }
        if(!isGameActive) {
            isGameActive = true;
            starterButton.disabled = true;
            movementModeButton.disabled = true;
            this.setLetter(startingLetter);
            nextTurn(this);
            return;
        }

        if(!parentSquare) {
            if(this.letter == "?") {
                this.setLetter(whoseTurn);
                nextTurn(this);
                return;
            }
            if(this.letter == whoseTurn) {
            parentSquare = this;
            this.markParent();
            markAvailableSquares();
            return;
            }
        }
        
        if(parentSquare == this) {
            parentSquare = null;
            this.unmarkParent();
            availableSquares.forEach(square => {
                square.unmarkAvailable();
            });
            availableSquares = [];
            return;
        }

        if(parentSquare && availableSquares.includes(this)) {
            if(parentSquare.letter == whoseTurn) {
                parentSquare.reset();
                parentSquare = null;
                this.setLetter(whoseTurn);
                availableSquares.forEach(square => {
                    square.unmarkAvailable();
                });
                availableSquares = [];
                nextTurn(this);
                return;
            }
        }
    }

    log() {
        console.dir(this);
    }

    setLetter(newLetter) {
        this.letter = newLetter;
        this.htmlElement.textContent = newLetter;
    }

    getLetter() {
        return this.letter;
    }

    reset() {
        this.setLetter("?");
        this.resetColor();
        this.available = false;
    }

    resetColor() {
        this.htmlElement.classList.remove("parentSquare");
        this.htmlElement.classList.remove("availableSquare");
        this.htmlElement.classList.remove("gameWon");
        this.htmlElement.classList.add("defaultSquare");
    }
    
    markParent() {        
        this.htmlElement.classList.remove("defaultSquare");
        this.htmlElement.classList.add("parentSquare");
    }

    unmarkParent() {
        this.resetColor();
    }

    markAvailable() {
        this.available = true;
        this.htmlElement.classList.remove("defaultSquare");
        this.htmlElement.classList.add("availableSquare");
    }

    unmarkAvailable() {
        this.available = false;
        this.resetColor();
    }
}