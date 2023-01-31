import LogItem from "../DataTypes/Playback/LogItem";
import GameEvent from "../Events/GameEvent";

export default class BasicLogItem implements LogItem {

	/** The frame this LogItem was logged at */
	protected _frame: number;
	/** The amount of time that has passed since the previous frame */
	protected _deltaT: number;
	/** A game event that occured at during the frame */
	protected _event: GameEvent;

	/** The next LogItem */
	protected _next: BasicLogItem;
	/** The previous LogItem */
	protected _prev: BasicLogItem;

	public constructor(frame: number, deltaT: number, event: GameEvent){
		this.frame = frame;
		this.deltaT = deltaT;
		this.event = event;
	}

	/** @see LogItem.frame */
	public get frame(): number { return this._frame; }
	/** @see LogItem.deltaT */
	public get deltaT(): number { return this._deltaT; }

	protected set frame(value: number) { this._frame = value; }
	protected set deltaT(value: number) { this._deltaT = value; }

	public get event(): GameEvent { return this._event; }
	public set event(value: GameEvent) { this._event = value }

	public get next(): BasicLogItem { return this._next; }
	public set next(next: BasicLogItem) { this._next = next}

	public get prev(): BasicLogItem { return this._prev; }
	public set prev(next: BasicLogItem) { this._prev = next}
}