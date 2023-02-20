/**
 * Events that get emitted in HW2.
*/
export const HW2Events = {
    /**
     * The event that gets emitted when the player collides with a mine
     * 
     * Has data: { mineId: mine.id }
    */
   PLAYER_MINE_COLLISION: "PLAYER_MINE_COLLISION", 

   /**
     * The event that gets emitted when the player collides with a bubble
     * 
     * Has data: { bubbleId: bubble.id }
    */
   PLAYER_BUBBLE_COLLISION: "PLAYER_BUBBLE_COLLISION", 

   /**
     * The event that gets emitted when the laser collides with a mine
     * 
     * Has data: { mineId: mine.id, laserId: laser.id }
    */
   LASER_MINE_COLLISION: "LASER_MINE_COLLISION",

    /**
     * The event that gets emitted when the charge of the player's laser beam changes
     * 
     * Has data: { curchrg: number, maxchrg: number }
     */
    CHARGE_CHANGE: "CHARGE_CHANGE",

    /**
     * The event that gets emitted when the health of the player changes
     * 
     * Has data: { curhp: number, maxhp: number }
     */
    HEALTH_CHANGE: "HEALTH_CHANGE",

    /**
     * The event that gets emitted when the air of the player changes
     * 
     * Has data: { curair: number, maxair: number }
     */
    AIR_CHANGE: "AIR_CHANGE",

    /**
     * The event that gets emitted when the player's health hits 0 (or minhealth)
     * 
     * Has data: {}
     */
	DEAD: "DEAD",

     /**
     * The event that gets emitted when the player stays alive
     * 
     * Has data: {}
     */
    ALIVE: "ALIVE",

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

    /**
     * The event that gets emitted when a mine explodes.
     * 
     * Has data: {}
     */
    MINE_EXPLODED: "MINE_EXPLODED",
    
} as const;