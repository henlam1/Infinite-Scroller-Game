import Recording from "./Recording";

/**
 * An interface for a LogItem in an abstract Recording.
 * @author Peter Walsh
 */
export default interface LogItem {

    /** @return the frame this LogItem was logged at */
    get frame(): number;

    /** @return the amount of time that has pasted since the previous frame */
    get deltaT(): number;

}