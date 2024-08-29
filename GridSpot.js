class GridSpot {
    element
    owner

    constructor(element) {
        this.element = element
        this.owner = 0
        this.updateColor()
    }

    setOwner(owner) {
        if (this.owner > 0) {
            return false
        }
        this.owner = owner
        this.updateColor()
        return true
    }

    forceOwner(owner) {
        this.owner = owner
        this.updateColor()
        return true
    }

    updateColor() {
        if (this.owner == 0) {
            this.element.style.backgroundColor = "#3f3f3f"
        } else if (this.owner == 1) {
            this.element.style.backgroundColor = "#137c00"
        } else if (this.owner == 2) {
            this.element.style.backgroundColor = "#7c0000"
        }
    }
}

export default GridSpot