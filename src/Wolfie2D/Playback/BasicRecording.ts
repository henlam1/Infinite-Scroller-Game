import Scene from "../Scene/Scene";
import Recording from "../DataTypes/Playback/Recording";
import Queue from "../DataTypes/Interfaces/Queue";

import BasicRecorder from "./BasicRecorder";
import BasicReplayer from "./BasicReplayer";
import BasicLogItem from "./BasicLogItem";

/**
 * A data structure used to maintain the HW3 recording.
 */
export default class BasicRecording implements Recording<BasicLogItem>, Queue<BasicLogItem> {

    /** The initial scene that the recording starts from. */
    private _scene: new (...args: any) => Scene;
    /** The state of the initial scene that the recording starts from. */
    private _init: Record<string, any>;

    /** The sentinal node */
    private _sent: BasicLogItem;
    /** The number of items in the recording */
    private _size: number;

    /** A recorder object that can record this type of recording */
    private _recorder: BasicRecorder;
    /** A replayer object that can replay this type of recording */
    private _replayer: BasicReplayer;


    /**
     * @param scene the scene the recording should start at
     * @param init any initialization data for the scene
     */
    public constructor(scene: new (...args: any) => Scene, init: Record<string, any> = {}) {
        this._scene = scene;
        this._init = init;

        this._sent = new BasicLogItem(-1, -1, null);
        this.sent.next = this.sent;
        this.sent.prev = this.sent;
        this.size = 0;

        this._recorder = new BasicRecorder();
        this._replayer = new BasicReplayer();
    }

    /**
     * @returns a recorder object that can be used to record this type of recording
     */
    public recorder(): BasicRecorder { return this._recorder; }

    /** 
     * @returns a replayer object that can be used to replay this type of recording
     */
    public replayer(): BasicReplayer { return this._replayer; }
    
    /**
     * @returns the scene the recording should start at
     */
    public scene(): new (...args: any) => Scene { return this._scene; }

    /** 
     * @returns the initialization options that should be passed to the scenes initial recording
     */
    public init(): Record<string, any> { return this._init; }

    /** 
     * Destroy the HW3Recording
     */
    public destroy(): void {
        this._recorder.destroy();
        this._replayer.destroy();
    }

    /**
     * Adds an item to the back of the queue
     * @param item The item to add to the back of the queue
     */
    public enqueue(item: BasicLogItem): void {
        item.next = this.sent;
        item.prev = this.sent.prev;
        this.sent.prev.next = item;
        this.sent.prev = item;
        this.size += 1;
    }

    /**
     * Retrieves an item from the front of the queue
     * @returns The item at the front of the queue
     */
    public dequeue(): BasicLogItem | null { 
        if (!this.hasItems()) {
            return null;
        }

        let item: BasicLogItem = this.sent.next;
        this.sent.next = this.sent.next.next;
        this.sent.next.prev = this.sent;
        this.size -= 1;
        return item;
    }

    /**
     * Returns the item at the front of the queue, but does not remove it
     * @returns The item at the front of the queue; if the list is empty returns null.
     */
    public peekNext(): BasicLogItem | null { 
        if (!this.hasItems()) {
            return null;
        }
        return this.sent.next;
    }

    /**
     * Returns true if the queue has items in it, false otherwise
     * @returns A boolean representing whether or not this queue has items
     */
    public hasItems(): boolean { 
        return this.size > 0;
     }

    /**
     * Returns the number of elements in the queue.
     * @returns The size of the queue
     */
    public getSize(): number { return this.size; }

    /**
     * Iterates through all of the items in this data structure.
     * @param func The function to evaluate of every item in the collection
     */
    public forEach(func: (item: BasicLogItem, index?: number) => void): void {
        let next = this.sent.next;
        let index = 0;
        while(next !== this.sent) {
            func(next, index);
            next = next.next;
        }
    }

    /**
     * Clears the contents of the data structure
     */
    public clear(): void {
        this.sent.next = this.sent;
        this.sent.prev = this.sent;
        this.size = 0;
    }


    /** Protected getters and setters for workign with the size and sentinal node */

    protected get sent(): BasicLogItem { return this._sent; }
    protected get size(): number { return this._size; }
    protected set size(size: number) { this._size = size; }

}