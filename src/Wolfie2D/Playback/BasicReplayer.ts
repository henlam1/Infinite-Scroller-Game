import EventQueue from "../Events/EventQueue";
import { GameEventType } from "../Events/GameEventType";
import Emitter from "../Events/Emitter";
import { InputHandlers } from "../Input/InputHandler";
import Replayer from "../DataTypes/Playback/Replayer";


import BasicRecording from "./BasicRecording";
import BasicLogItem from "./BasicLogItem";
import NullFunc from "../DataTypes/Functions/NullFunc";


export default class BasicReplayer implements Replayer<BasicRecording, BasicLogItem> {
    private eventQueue: EventQueue;
    private emitter: Emitter;

    private _active: boolean;
    private _frame: number;
    private _count: number;

    private recording: BasicRecording;
    private onEnd: () => void;

    public constructor() {
        this.eventQueue = EventQueue.getInstance();
        this.emitter = new Emitter();
        this._frame = 0;
        this._count = 0;
        this._active = false;
    }

    public active(): boolean {
        return this._active;
    }

    public update(deltaT: number): void {
        if (this._active) {

            while(this._count < this.recording.getSize() && this.recording.peekNext().frame * this.recording.peekNext().deltaT < this._frame * deltaT){
                let logItem = this.recording.dequeue();
                // Add the LogItem event to the EventQueue
                this.eventQueue.addEvent(logItem.event);
                this.recording.enqueue(logItem);
                this._count += 1;
            }
    
            // If we've iterated through the entire recording - end the replay
            if (this._count >= this.recording.getSize()) {
                this.stop();
            }

            this._frame += 1;
        }
    }

    /**
     * Starts replaying the HW3Scene.
     * 
     * @param recording the HW3Recording to start replaying
     * @param onEnd an optional callback function that gets called when the replay stops
     */
    public start(recording: BasicRecording, onEnd: () => void = NullFunc): void {
        // Clear any info about previous replay
        this._frame = 0;
        this._count = 0;
        this._active = true;
        this.recording = recording;
        this.onEnd = onEnd;

        // Disable all user inputs from the screen
        this.emitter.fireEvent(GameEventType.DISABLE_USER_INPUT, {inputs: [
            InputHandlers.MOUSE_DOWN, InputHandlers.MOUSE_UP, InputHandlers.CONTEXT_MENU, 
            InputHandlers.MOUSE_MOVE, InputHandlers.KEY_DOWN, InputHandlers.KEY_UP, 
            InputHandlers.ON_BLUR, InputHandlers.ON_WHEEL
        ]});
        
        // Change the scene to the initial
        this.emitter.fireEvent(GameEventType.CHANGE_SCENE, {scene: this.recording.scene(), init: this.recording.init()});
    
    }
    /**
     * @see BasicReplayer.stop()
     */
    public stop(): void {
        this._active = false;
        this.onEnd();
        this.emitter.fireEvent(GameEventType.ENABLE_USER_INPUT, {inputs: [
            InputHandlers.MOUSE_DOWN, InputHandlers.MOUSE_UP, InputHandlers.CONTEXT_MENU, 
            InputHandlers.MOUSE_MOVE, InputHandlers.KEY_DOWN, InputHandlers.KEY_UP, 
            InputHandlers.ON_BLUR, InputHandlers.ON_WHEEL
        ]});
    }
    /**
     * @see Replayer.destroy()
     */
    public destroy(): void {}
}