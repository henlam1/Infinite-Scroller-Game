import AI from "../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Emitter from "../../Wolfie2D/Events/Emitter";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Receiver from "../../Wolfie2D/Events/Receiver";
import Input from "../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../Wolfie2D/Timing/Timer";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";

import { HW2Events } from "../HW2Events";
import { HW2Controls } from "../HW2Controls";

export const PlayerAnimations = {
    IDLE: "IDLE",
    HIT: "HIT",
    DEATH: "DEATH"
} as const;

/**
 * A class for controlling the player in the HW2Scene.
 * @author PeteyLumpkins
 */
export default class PlayerController implements AI {
	/** The GameNode that owns this PlayerController AI */
	private owner: AnimatedSprite;

    private currentHealth: number;
    private maxHealth: number;
    private minHealth: number;

    private currentAir: number;
    private maxAir: number;
    private minAir: number;

    private currentSpeed: number;

    private currentCharge: number;
    private maxCharge: number;
    private minCharge: number;

	/** A timer for charging the player's laser cannon thing */
	private laserTimer: Timer;

	// A receiver and emitter to hook into the event queue
	private receiver: Receiver;
	private emitter: Emitter;

	/**
	 * This method initializes all variables inside of this AI class.
     * 
	 * @param owner The owner of this AI - i.e. the player
	 * @param options The list of options for ai initialization
	 */
	public initializeAI(owner: AnimatedSprite, options: Record<string,any>): void {
		this.owner = owner;

		this.receiver = new Receiver();
		this.emitter = new Emitter();

		this.laserTimer = new Timer(2500, this.handleLaserTimerEnd, false);
		
		this.receiver.subscribe(HW2Events.SHOOT_LASER);

		this.activate(options);
	}
	public activate(options: Record<string,any>): void {
		// Set the player's current health
        this.currentHealth = 10;

        // Set upper and lower bounds on the player's health
        this.minHealth = 0;
        this.maxHealth = 10;

        // Set the player's current air
        this.currentAir = 20;

        // Set upper and lower bounds on the player's air
        this.minAir = 0;
        this.maxAir = 20;

        this.currentCharge = 4;
        this.minCharge = 0;
        this.maxCharge = 4;

        // Set the player's movement speed
        this.currentSpeed = 300

        // Play the idle animation by default
		this.owner.animation.play(PlayerAnimations.IDLE);
	};
	/**
	 * Handles updates to the player 
	 * 
	 * @remarks
	 * 
	 * The PlayerController updates the player at every frame (each time the main
	 * GameLoop iterates). 
	 * 
	 * This method should handle all incoming user input events. Things like key-presses, 
	 * mouse-clicks, mouse-downs etc. In addition, this method should handle all events
	 * that the PlayerController's receiver is subscribed to.
	 * 
	 * This method is also responsible for updating the state of the player, and altering
	 * the rest of the game to changes in the state of the player. If the player's stats
	 * change, the UI needs to be notified so that it can reflect those changes. If the 
	 * player is dead, the scene needs to be notified so that it can change to GameOver scene.
	 * 
	 * @param deltaT - the amount of time that has passed since the last update
	 */
	public update(deltaT: number): void {
        // First, handle all events 
		while(this.receiver.hasNextEvent()){
			this.handleEvent(this.receiver.getNextEvent());
		}

        // If the player is out of hp - play the death animation
		if (this.currentHealth <= this.minHealth) { 
            this.emitter.fireEvent(HW2Events.DEAD);
            return;
        }

		// Get the player's input direction 
		let forwardAxis = (Input.isPressed(HW2Controls.MOVE_UP) ? 1 : 0) + (Input.isPressed(HW2Controls.MOVE_DOWN) ? -1 : 0);
		let horizontalAxis = (Input.isPressed(HW2Controls.MOVE_LEFT) ? -1 : 0) + (Input.isPressed(HW2Controls.MOVE_RIGHT) ? 1 : 0);

		// Handle trying to shoot a laser from the submarine
		if (Input.isMouseJustPressed() && this.currentCharge > 0) {
			this.currentCharge -= 1;
			this.emitter.fireEvent(HW2Events.SHOOT_LASER, {src: this.owner.position});
			this.emitter.fireEvent(HW2Events.CHARGE_CHANGE, {curchrg: this.currentCharge, maxchrg: this.maxCharge});
		}

		// Move the player
		let movement = Vec2.UP.scaled(forwardAxis * this.currentSpeed).add(new Vec2(horizontalAxis * this.currentSpeed, 0));
		this.owner.position.add(movement.scaled(deltaT));

		// Player looses a little bit of air each frame
		this.currentAir = MathUtils.clamp(this.currentAir - deltaT, this.minAir, this.maxAir);

		// If the player is out of air - start subtracting from the player's health
		this.currentHealth = this.currentAir <= this.minAir ? MathUtils.clamp(this.currentHealth - deltaT*2, this.minHealth, this.maxHealth) : this.currentHealth;
	}
	/**
	 * This method handles all events that the reciever for the PlayerController is
	 * subscribed to.
	 * 
	 * @see {AI.handleEvent}
	 * 
	 * @param event a GameEvent that the PlayerController is subscribed to
	 */
	public handleEvent(event: GameEvent): void {
		switch(event.type) {
			case HW2Events.SHOOT_LASER: {
				this.handleShootLaserEvent(event);
				break;
			}
			default: {
				throw new Error(`Unhandled event of type: ${event.type} caught in PlayerController`);
			}
		}
	}
	/**
	 * @see {AI.destroy}
	 */
	public destroy(): void {
		this.receiver.destroy()
	}

	/**
	 * This function handles when the player successfully shoots a laser.
	 * @param event 
	 */
	protected handleShootLaserEvent(event: GameEvent): void {
		this.laserTimer.reset();
		this.laserTimer.start();
	}

	/** 
	 * A callback function that increments the number of charges the player's laser cannon has.
	 * 
	 * @remarks 
	 * 
	 * This function 
	 * updates the total number of charges the player's laser cannon has
	 */
	protected handleLaserTimerEnd = () => {
		this.currentCharge = MathUtils.clamp(this.currentCharge + 1, this.minCharge, this.maxCharge);
		this.emitter.fireEvent(HW2Events.CHARGE_CHANGE, {curchrg: this.currentCharge, maxchrg: this.maxCharge});
		if (this.currentCharge < this.maxCharge) {
			this.laserTimer.start();
		}
	}

} 



