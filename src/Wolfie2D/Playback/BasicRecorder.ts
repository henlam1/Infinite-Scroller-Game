import Receiver from "../Events/Receiver";
import { GameEventType } from "../Events/GameEventType";
import Recorder from "../DataTypes/Playback/Recorder";
import Updateable from "../DataTypes/Interfaces/Updateable";
import BasicRecording from "./BasicRecording";
import BasicLogItem from "./BasicLogItem";
import GameEvent from "../Events/GameEvent";


/**
 * A recorder for the HW3Recording. 
 * @see Recorder
 */
export default class BasicRecorder implements Recorder<BasicRecording, BasicLogItem> {
	private _active: boolean;
	private _receiver: Receiver;
	private _frame: number;
	private _recording: BasicRecording;

	public constructor(){
		this._receiver = new Receiver();
		this._frame = 0;
		this._recording = null;
		this._active = false;

		this._receiver.subscribe(
			[GameEventType.MOUSE_DOWN, GameEventType.MOUSE_UP, GameEventType.MOUSE_MOVE, 
			GameEventType.KEY_DOWN, GameEventType.KEY_UP, GameEventType.CANVAS_BLUR,
			GameEventType.WHEEL_DOWN, GameEventType.WHEEL_UP]
		);
	}

    /**
     * @see Updateable.update
     */
	public update(deltaT: number): void {

		if (!this._active) { this._receiver.ignoreEvents(); }
		else {
			this._frame += 1;
            // I need to figure out a better way to do this - shouldn't just add an empty event
            // like this. The reason I'm doing it is because if the player just decides to idle
            // and not press any keys, the recording ends immediatly.
            this._recording.enqueue(new BasicLogItem(this._frame, deltaT, new GameEvent("")));
			while(this._receiver.hasNextEvent()){
				this._recording.enqueue(new BasicLogItem(this._frame, deltaT, this._receiver.getNextEvent()));
			}
		}
	}
    /**
     * @see Recorder.start
     */
	public start(recording: BasicRecording): void {
		this._active = true;
		this._frame = 0;
		this._recording = recording;
	}
    /**
     * @see Recorder.stop
     */
	public stop(): void {
		this._active = false;
	}
    /**
     * @see Recorder.active
     */
	public active(): boolean {
		return this._active;
	}
    /**
     * Destroy the HW3Recorder
     */
    public destroy(): void {
        this._receiver.destroy();
    }
}