import Recording from "./Recording";
import LogItem from "./LogItem";
import Updateable from "../Interfaces/Updateable";

/**
 * The definition for an abstract Recorder type for an abstract Recording type.
 * @author Peter Walsh
 * 
 * @param T the type of the Recording the Recorder can record events to
 * @param E the type of the LogItems that can be logged to the Recording type (T)
 * 
 * @see Recording
 * @see LogItem
 */
export default interface Recorder<T extends Recording<E>, E extends LogItem> extends Updateable {
    /**
     * @returns true if this Recorder object is currently recording; false otherwise.
     */
    active(): boolean;

    /**
     * Tells this recorder object to start recording event data to the given Recording object.
     * @param recording the recording to record events to
     */
    start(recording: T): void;

    /**
     * Tells this recorder object to stop recording.
     */
    stop(): void;

    /**
     * Destroy this recorder
     */
    destroy(): void;
}