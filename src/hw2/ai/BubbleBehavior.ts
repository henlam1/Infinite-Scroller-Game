import AI from "../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";

/**
 * A class that represents the behavior of the bubbles in the HW2Scene
 * @author PeteyLumpkins
 */
export default class BubbleBehavior implements AI {
    // The GameNode that owns this behavior
    private owner: Graphic;

    // The current horizontal and vertical speed of the bubble
    private currentXSpeed: number;
    private currentYSpeed: number;

    // How much to increase the speed of the bubble by each frame
    private xSpeedIncrement: number;
    private ySpeedIncrement: number;

    // Upper and lower bounds on the horizontal speed of the bubble
    private minXSpeed: number;
    private maxXSpeed: number;

    // Upper and lower bounds on the vertical speed of the bubble
    private minYSpeed: number;
    private maxYSpeed: number;

    public initializeAI(owner: Graphic, options: Record<string, any>): void {
        this.owner = owner;

        this.currentXSpeed = 50;
        this.xSpeedIncrement = 0;
        this.minXSpeed = 50;
        this.maxXSpeed = 50;

        this.currentYSpeed = 50;
        this.ySpeedIncrement = 0;
        this.minYSpeed = 50;
        this.maxYSpeed = 50;

        this.activate(options);
    }

    public destroy(): void {
        
    }

    public activate(options: Record<string, any>): void {}

    public handleEvent(event: GameEvent): void {
        switch(event.type) {
            default: {
                throw new Error("Unhandled event caught in BubbleBehavior! Event type: " + event.type);
            }
        }
    }

    public update(deltaT: number): void {   
        // Only update the bubble if it's visible
        if (this.owner.visible) {
            // Increment the speeds
            this.currentXSpeed += this.xSpeedIncrement * deltaT;
            this.currentYSpeed += this.ySpeedIncrement * deltaT;
            // Clamp the speeds if need be
            this.currentXSpeed= MathUtils.clamp(this.currentXSpeed, this.minXSpeed, this.maxXSpeed)
            this.currentYSpeed = MathUtils.clamp(this.currentYSpeed, this.minYSpeed, this.maxYSpeed);

            // Update position of the bubble - I'm scaling the Vec2.UP and Vec2.LEFT vectors to move the bubble up and to the left
            this.owner.position.add(Vec2.UP.scale(this.currentYSpeed * deltaT)).add(Vec2.LEFT.scale(this.currentXSpeed* deltaT));
        }
    }
    
}


