import AI from "../../Wolfie2D/DataTypes/Interfaces/AI";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Emitter from "../../Wolfie2D/Events/Emitter";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";

import { HW2Events } from "../HW2Events";

/**
 * A class representing the behavior for a laser beam
 * @author PeteyLumpkins
 */
export default class LaserBehavior implements AI {

    private owner: Graphic;
    private emitter: Emitter;

    // The start and end points of the laser
    private src: Vec2;
    private dst: Vec2;

    // The current charge of the laser beam
    private currentCharge: number;

    // The minimum and maximum charge values of the laser beam
    private minCharge: number;
    private maxCharge: number;

    // The minimum and maximum size of the laser beam
    private minSize: Vec2;
    private maxSize: Vec2;

    /**
     * @see AI.initializeAI
     */
    public initializeAI(owner: Graphic, options: Record<string, any>): void {
        this.owner = owner;
        this.emitter = new Emitter();

        this.src = Vec2.ZERO;
        this.dst = Vec2.ZERO;
        this.minSize = new Vec2(Number.NEGATIVE_INFINITY, 10);
        this.maxSize = new Vec2(Number.POSITIVE_INFINITY, 40);

        this.activate(options);
    }
    /**
     * @see AI.activate
     */
    public activate(options: Record<string, any>): void {
        // Setup the current, min, and max charge forr the laser
        this.minCharge = 0;
        this.maxCharge = 100;
        this.currentCharge = this.maxCharge;

        // Copy the values passed in for the src and dst
        this.src.copy(options.src);
        this.dst.copy(options.dst);

        // Set position of the laser
        this.owner.position.x = (this.dst.x + this.src.x) / 2
        this.owner.position.y = this.src.y;
        // Set size of the laser
        this.owner.size.x = this.dst.x - this.src.x;
        this.owner.size.y = MathUtils.changeRange(this.currentCharge, this.minCharge, this.maxCharge, this.minSize.y, this.maxSize.y);
        // Set the collision shape of the laser - it will be different each time the laser is fired
        this.owner.collisionShape = new AABB(this.owner.position.clone(), this.owner.size.clone().div(new Vec2(2, 2)));
    }
    /**
     * @see AI.update 
     */
    public update(deltaT: number): void {
        // Only update if the owner is visible
        if (this.owner.visible) {

            // Update the owner's position and size based on where the laser should start
            this.owner.position.x = (this.dst.x + this.src.x) / 2
            this.owner.position.y = this.src.y;
            this.owner.size.x = this.dst.x - this.src.x;
    
            // Set alpha of the laser
            this.owner.alpha = MathUtils.changeRange(this.currentCharge, this.minCharge, this.maxCharge, 0, 1);

            // Update the color of the laser
            this.owner.color.b = MathUtils.changeRange(this.maxCharge - this.currentCharge, this.minCharge, this.maxCharge, 0, 255);

            // If this is the first time the laser is fired - send the firing event.
            if (this.currentCharge === this.maxCharge) {
                this.emitter.fireEvent(HW2Events.FIRING_LASER, {laser: this.owner});
            }

            // Update the value of the charge on the laser
            this.currentCharge = MathUtils.clamp(this.currentCharge - 1, this.minCharge, this.maxCharge);

            // If the laser is all out of juice - make it invisible (return it to it's object pool)
            if (this.currentCharge <= this.minCharge) {
                this.owner.visible = false;
            }
        }
    }   

    /**
     * @see AI.handleEvent
     */
    public handleEvent(event: GameEvent): void { }
    /**
     * @see AI.destroy
     */
    public destroy(): void { }
}
