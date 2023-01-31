import LogItem from "./LogItem";
import Recorder from "./Recorder";
import Replayer from "./Replayer";

/**
 * An abstract representation of a recording of a game in Wolfie2D. 
 * @author Peter Walsh
 * 
 * @param T the type of the LogItems this Recording type holds
 * 
 * @remarks
 * 
 * A Recording is intended to maintain a collection of LogItems that can be used to replay an
 * instance of a game in Wolfie2D. Every Recording type has a mechanism to add LogItems to 
 * itself (a Recorder) and a mechanism for replaying those LogItems (a Replayer).
 * 
 * @see Recorder 
 * @see Replayer 
 * @see LogItem
 */
export default interface Recording<T extends LogItem> {
    /** 
     * @return the type of Recorder used to record this type of Recording
     */
    recorder(): Recorder<Recording<T>, T>

    /** 
     * @return the type of Replayer used to replay this type of Recording 
     */
    replayer(): Replayer<Recording<T>, T>;

    /** 
     * A lifecycle method. Gets called when this recording object is destroyed.
     */
    destroy(): void;
}