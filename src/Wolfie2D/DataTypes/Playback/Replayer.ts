import Updateable from "../Interfaces/Updateable";
import LogItem from "./LogItem";
import Recording from "./Recording";

/**
 * The definition for an abstract Replayer type for an abstract Recording type.
 * @author Peter Walsh
 * 
 * @param T the type of the abstract Recording
 * @param E the type of the abstract LogItems that can be logged to the abstract Recording type (T)
 * 
 * @see Recording
 * @see LogItem
 */
export default interface Replayer<T extends Recording<E>, E extends LogItem> extends Updateable {
    /**
     * @return true if this Replayer is playing a recording; false otherwise.
     */
    active(): boolean;

    /**
     * Tells this Replayer object to start playing a recording 
     * @param recording the recording to play
     * @param onEnd a callback function that gets called when the recording ends
     */
    start(recording: T, onEnd: () => void): void;

    /**
     * Tells this Replayer object to stop replaying the recording.
     */
    stop(): void;

    /** 
     * Destroy this replayer
     */
    destroy(): void;
}