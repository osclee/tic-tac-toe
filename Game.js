import GridSpot from './GridSpot.js'

class Game {

    currentPlayer
    difficulty
    gameOver = false
    enableLogging = false

    constructor(document, difficulty) {
        this.gridSpotOne = new GridSpot(document.querySelector("#one"))
        this.gridSpotTwo = new GridSpot(document.querySelector("#two"))
        this.gridSpotThree = new GridSpot(document.querySelector("#three"))
        this.gridSpotFour = new GridSpot(document.querySelector("#four"))
        this.gridSpotFive = new GridSpot(document.querySelector("#five"))
        this.gridSpotSix = new GridSpot(document.querySelector("#six"))
        this.gridSpotSeven = new GridSpot(document.querySelector("#seven"))
        this.gridSpotEight = new GridSpot(document.querySelector("#eight"))
        this.gridSpotNine = new GridSpot(document.querySelector("#nine"))

        this.registerButton(this.gridSpotOne)
        this.registerButton(this.gridSpotTwo)
        this.registerButton(this.gridSpotThree)
        this.registerButton(this.gridSpotFour)
        this.registerButton(this.gridSpotFive)
        this.registerButton(this.gridSpotSix)
        this.registerButton(this.gridSpotSeven)
        this.registerButton(this.gridSpotEight)
        this.registerButton(this.gridSpotNine) 

        //document.querySelector("#winner").textContent = ""

        this.difficulty = difficulty

        this.currentPlayer = this.getRandom(1,2)

        if (this.currentPlayer == 2) {
            if (difficulty == 1) {
                this.aiTurnMedium()
            } else {
                this.aiTurn()
            }
            
        }
    }

    registerButton(gridSpot) {
        gridSpot.element.onclick = () => this.buttonPressed(gridSpot)
    }

    buttonPressed(gridSpot) {
        if (this.gameOver)  {
            return
        }
        if (this.getAvaliableSpaces().length == 0) {
            document.querySelector("#options").textContent = `No one won!`
            this.gameOver = true
            return
        }
        const wasBlank = gridSpot.setOwner(this.currentPlayer)
        if (wasBlank) {
            if (this.gameOver) {
                return
            }
            if (this.currentPlayer == 1) {
                //console.log("AI Turn")
                //document.querySelector("#winner").textContent = `Player one's turn`
                this.currentPlayer = 2
                this.checkForWin()
                if (this.gameOver)  {
                    return
                }
                if (this.difficulty == 1) {
                    this.aiTurnMedium()
                } else {
                    this.aiTurn()
                }
            } else {
                this.currentPlayer = 1
                //document.querySelector("#winner").textContent = `Player one's turn`
            }

            if (!this.checkForWin()) {
                const avaliableSpaces = this.getAvaliableSpaces()
                if (avaliableSpaces.length == 0) {
                    document.querySelector("#options").textContent = `No one won!`
                    this.gameOver = true
                    return
                }
            }
          
        } else {
            console.log("Was not blank!")
            console.log(gridSpot)
        }
    }

    getAvaliableSpaces() {
        const avaliableSpaces = []
        if (this.gridSpotOne.owner === 0) {
            avaliableSpaces.push(this.gridSpotOne)
        }
        if (this.gridSpotTwo.owner === 0) {
            avaliableSpaces.push(this.gridSpotTwo)
        }
        if (this.gridSpotThree.owner === 0) {
            avaliableSpaces.push(this.gridSpotThree)
        }
        if (this.gridSpotFour.owner === 0) {
            avaliableSpaces.push(this.gridSpotFour)
        }
        if (this.gridSpotFive.owner === 0) {
            avaliableSpaces.push(this.gridSpotFive)
        }
        if (this.gridSpotSix.owner === 0) {
            avaliableSpaces.push(this.gridSpotSix)
        }
        if (this.gridSpotSeven.owner === 0) {
            avaliableSpaces.push(this.gridSpotSeven)
        }
        if (this.gridSpotEight.owner === 0) {
            avaliableSpaces.push(this.gridSpotEight)
        }
        if (this.gridSpotNine.owner === 0) {
            avaliableSpaces.push(this.gridSpotNine)
        }

        return avaliableSpaces
    }

    aiTurn() {      
        this.logMessage("normal ai turn")
        const avaliableSpaces = this.getAvaliableSpaces()

        if (avaliableSpaces.length == 0) {
            document.querySelector("#options").textContent = `No one won!`
            this.gameOver = true
            return
        }
        
        const rand = this.getRandom(0, avaliableSpaces.length - 1)
        
        this.buttonPressed(avaliableSpaces[rand])
    }

    aiTurnMedium() {
        
        if (this.gridSpotFive.owner == 0) {
            this.logMessage("here 0")
            this.buttonPressed(this.gridSpotFive)
            return
        }
        for (let i = 2; i >= 1; i--) { // First iteration will be to try and win, and then try and block a player from winning next
            if (this.gridSpotOne.owner == i) {
                if (this.gridSpotTwo.owner == i && this.gridSpotThree.owner == 0) {
                    this.logMessage("here 1")
                    this.buttonPressed(this.gridSpotThree)
                    return
                } 
                if (this.gridSpotThree == i && this.gridSpotTwo.owner == 0) {
                    this.logMessage("here 2")
                    this.buttonPressed(this.gridSpotTwo)
                    return
                }
                if (this.gridSpotFour.owner == i && this.gridSpotSeven.owner == 0) {
                    this.logMessage("here 3")
                    this.buttonPressed(this.gridSpotSeven)
                    return
                } 
                if (this.gridSpotSeven.owner == i && this.gridSpotFour.owner == 0) {
                    this.logMessage("here 4")
                    this.buttonPressed(this.gridSpotFour)
                    return
                }
                if (this.gridSpotFive.owner == i && this.gridSpotNine.owner == 0) {
                    this.logMessage("here 5")
                    this.buttonPressed(this.gridSpotNine)
                    return
                }
                if (this.gridSpotNine.owner == i && this.gridSpotFive.owner == 0) {
                    this.logMessage("here 6")
                    this.buttonPressed(this.gridSpotFive)
                    return
                }
            }
            if (this.gridSpotTwo.owner == i) {
                if (this.gridSpotFive.owner == i && this.gridSpotEight.owner == 0) {
                    this.logMessage("here 7")
                    this.buttonPressed(this.gridSpotEight)
                    return
                } 
                if( this.gridSpotEight.owner == i && this.gridSpotFive.owner == 0) {
                    this.logMessage("here 8")
                    this.buttonPressed(this.gridSpotFive)
                    return
                }
            }
            if (this.gridSpotThree.owner == i) {
                if(this.gridSpotSix.owner == i && this.gridSpotNine.owner == 0) {
                    this.logMessage("here 9")
                    this.buttonPressed(this.gridSpotNine)
                    return
                } 
                if(this.gridSpotNine.owner == i && this.gridSpotSix.owner == 0) {
                    this.logMessage("here 10")
                    this.buttonPressed(this.gridSpotSix)
                    return
                }
            }
            if (this.gridSpotFour.owner == i) {
                if(this.gridSpotFive.owner == i && this.gridSpotSix.owner == 0) {
                    this.logMessage("here 11")
                    this.buttonPressed(this.gridSpotSix)
                    return
                } 
                if(this.gridSpotSix.owner == i && this.gridSpotFive.owner == 0) {
                    this.logMessage("here 12")
                    this.buttonPressed(this.gridSpotFive)
                    return
                }
            }
            if (this.gridSpotSeven.owner == i) {
                if(this.gridSpotEight.owner == i && this.gridSpotNine.owner == 0) {
                    this.logMessage("here 13")
                    this.buttonPressed(this.gridSpotNine)
                    return
                } 
                if(this.gridSpotNine.owner == i && this.gridSpotEight.owner == 0) {
                    this.logMessage("here 14")
                    this.buttonPressed(this.gridSpotEight)
                    return
                }
            }
            if (this.gridSpotSeven.owner == i) {
                if(this.gridSpotFive.owner == i && this.gridSpotThree.owner == 0) {
                    this.logMessage("here 15")
                    this.buttonPressed(this.gridSpotThree)
                    return
                } 
                if(this.gridSpotThree.owner == i && this.gridSpotFive.owner == 0) {
                    this.logMessage("here 16")
                    this.buttonPressed(this.gridSpotFive)
                    return
                }
            }

            if (this.gridSpotTwo.owner == i) {
                if (this.gridSpotThree.owner == i && this.gridSpotOne.owner == 0) {
                    this.logMessage("here 17")
                    this.buttonPressed(this.gridSpotOne)
                    return
                }
            }

            if (this.gridSpotFive.owner == i) {
                if (this.gridSpotSix.owner == i && this.gridSpotFour.owner == 0) {
                    this.logMessage("here 18")
                    this.buttonPressed(this.gridSpotFour)
                    return
                }
            }

            if (this.gridSpotEight.owner == i) {
                if (this.gridSpotNine.owner == i && this.gridSpotSeven.owner == 0) {
                    this.logMessage("here 19")
                    this.buttonPressed(this.gridSpotSeven)
                    return
                }
            }
            
            if (this.gridSpotSeven.owner == i) {
                if (this.gridSpotFour.owner == i && this.gridSpotOne.owner == 0) {
                    this.logMessage("here 20")
                    this.buttonPressed(this.gridSpotOne)
                    return
                }
            }

            if (this.gridSpotEight.owner == i) {
                if (this.gridSpotFive.owner == i && this.gridSpotTwo.owner == 0) {
                    this.logMessage("here 21")
                    this.buttonPressed(this.gridSpotTwo)
                    return
                }
            }

            if (this.gridSpotNine.owner == i) {
                if (this.gridSpotSix.owner == i && this.gridSpotThree.owner == 0) {
                    this.logMessage("here 22")
                    this.buttonPressed(this.gridSpotThree)
                    return
                }
            }

            if (this.gridSpotNine.owner == i) {
                if (this.gridSpotFive.owner == i && this.gridSpotOne.owner == 0) {
                    this.logMessage("here 23")
                    this.buttonPressed(this.gridSpotOne)
                    return
                }
            }

            if (this.gridSpotThree.owner == i) {
                if (this.gridSpotFive.owner == i && this.gridSpotSeven.owner == 0) {
                    this.logMessage("here 24")
                    this.buttonPressed(this.gridSpotSeven)
                    return
                }
            }
        }
        
        this.aiTurn()
    }

    checkForWin() {
        for (let i = 1; i <= 2; i++) {
            let win = false
            if (this.gridSpotOne.owner == i) {
                if (this.gridSpotTwo.owner == i && this.gridSpotThree.owner == i) {
                    win = true
                }
                if (this.gridSpotFour.owner == i && this.gridSpotSeven.owner == i) {
                    win = true
                }
                if (this.gridSpotFive.owner == i && this.gridSpotNine.owner == i) {
                    win = true
                }
            }
            if (this.gridSpotTwo.owner == i && this.gridSpotFive.owner == i && this.gridSpotEight.owner == i) {
                win = true
            }
            if (this.gridSpotThree.owner == i && this.gridSpotSix.owner == i && this.gridSpotNine.owner == i) {
                win = true
            }
            if (this.gridSpotFour.owner == i && this.gridSpotFive.owner == i && this.gridSpotSix.owner == i) {
                win = true
            }
            if (this.gridSpotSeven.owner == i && this.gridSpotEight.owner == i && this.gridSpotNine.owner == i) {
                win = true
            }
            if (this.gridSpotSeven.owner == i && this.gridSpotFive.owner == i && this.gridSpotThree.owner == i) {
                win = true
            }
            
            if (win) {
                document.querySelector("#options").textContent = `Player ${i} won`
                this.gameOver = true
                return true
            }
        }

        return false
    }

    checkForNoMoreSpaces() {
        if (avaliableSpaces.length == 0) {
            document.querySelector("#options").textContent = `No one won!`
            this.gameOver = true
            return
        }
    }

    logMessage(message) {
        if(this.enableLogging) {
            console.log(message)
        }
    }

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    clearGame() {
        this.gridSpotOne.forceOwner(0)
        this.gridSpotTwo.forceOwner(0)
        this.gridSpotThree.forceOwner(0)
        this.gridSpotFour.forceOwner(0)
        this.gridSpotFive.forceOwner(0)
        this.gridSpotSix.forceOwner(0)
        this.gridSpotSeven.forceOwner(0)
        this.gridSpotEight.forceOwner(0)
        this.gridSpotNine.forceOwner(0)

        document.querySelector("#options").textContent = "Options"
    }
}

export default Game