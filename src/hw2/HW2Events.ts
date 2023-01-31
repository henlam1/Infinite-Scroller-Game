/**
 * Events that get emitted in HW2.
 */
export const HW2Events = {
    /**
     * The event that gets emitted when the player collides with a mine
     * 
     * Has data: { id: number }
     */
	PLAYER_MINE_COLLISION: "PLAYER_MINE_COLLISION", 

    /**
     * The event that gets emitted when the charge of the player's laser beam changes
     * 
     * Has data: { curchrg: number, maxchrg: number }
     */
    CHARGE_CHANGE: "CHARGE_CHANGE",

    /**
     * The event that gets emitted when the player's health hits 0 (or minhealth)
     * 
     * Has data: {}
     */
	DEAD: "DEAD",

    /**
     * The event that gets emitted when the player succesfully fires their laser beam. The
     * data, "src" that gets sent is the position the laser was fired from (the origin point
     * of the laser)
     * 
     * Has data: { src: Vec2 }
     */
	SHOOT_LASER: "SHOOT_LASER",

    /**
     * The event that gets emitted when a laser first starts to fire.
     * 
     * Has data: { laser: GameNode }
     */
    FIRING_LASER: "LASER_FIRING",

    LASER_MINE_COLLISION: "LASER_MINE_COLLISION",

    MINE_EXPLODED: "MINE_EXPLODED"
    
} as const;