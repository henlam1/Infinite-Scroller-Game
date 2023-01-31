import Updateable from "../DataTypes/Interfaces/Updateable";
import GameEvent from "../Events/GameEvent";
import { GameEventType } from "../Events/GameEventType";
import Receiver from "../Events/Receiver";

import LogItem from "../DataTypes/Playback/LogItem";
import Recorder from "../DataTypes/Playback/Recorder";
import Recording from "../DataTypes/Playback/Recording";
import Replayer from "../DataTypes/Playback/Replayer";


export default class PlaybackManager implements Updateable {

    /** A Recorder object for an abstract Recording */
    protected recorder: Recorder<Recording<LogItem>, LogItem>;
    /** A flag indicating whether or not the playback system is recording */
    protected recording: boolean;

    /** A Replayer object for an abstract Recording */
    protected replayer: Replayer<Recording<LogItem>, LogItem>;
    /** A flag indicating whether or not the playback system is replaying a recording */
    protected replaying: boolean;

    /** The actual Recording object */
    protected lastRecording: Recording<LogItem>;

    /** A Receiver for receiving playback events from the rest of the engine */
    protected receiver: Receiver;


    public constructor() {
        this.recording = false;
        this.replaying = false;
        
        // Subscribe to all playback events - start, stop, play
        this.receiver = new Receiver();
        this.receiver.subscribe([GameEventType.START_RECORDING, GameEventType.STOP_RECORDING, GameEventType.PLAY_RECORDING]);
    }

    public update(deltaT: number): void {
        // Handles any events
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }

        // If the playback system has a recorder - update the recorder
        if (this.recorder !== undefined) {
            this.recorder.update(deltaT);
            this.recording = this.recorder.active();
        }
        // If the playback system has a replayer - update the replayer
        if (this.replayer !== undefined) {
            this.replayer.update(deltaT);
            this.replaying = this.replayer.active();
        }
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case GameEventType.START_RECORDING: {
                this.handleStartRecordingEvent(event);
                break;
            }
            case GameEventType.STOP_RECORDING: {
                this.handleStopRecordingEvent(event);
                break;
            }
            case GameEventType.PLAY_RECORDING: {
                this.handlePlayRecordingEvent(event);
                break;
            }
        }
    }
    /**
     * Handles a start recording event
     * @param event the start recording event
     * 
     * @remarks
     * 
     * When the playback system receives a start recording event, it will attempt to start
     * recording. Recording is done via the Recorder object associated with the Recording.
     */
    protected handleStartRecordingEvent(event: GameEvent): void {
        let recording: Recording<LogItem> = event.data.get("recording");
        if (recording !== undefined) {
            if (!this.replaying) {
                if (this.lastRecording !== undefined) this.lastRecording.destroy();
                this.lastRecording = recording;
                this.recorder = this.lastRecording.recorder();
                this.recorder.start(this.lastRecording);
                this.recording = this.recorder.active();
            } else {
                recording.destroy();
            }
        } 
    }
    /**
     * Handles a stop recording event
     * @param event the stop recording event
     * 
     * @remarks
     * 
     * When the playback system receives a stop recording event, the playback
     * system will tell the Recorder associated with the current recording 
     * to stop recording logging events to the current recording.
     */
    protected handleStopRecordingEvent(event: GameEvent): void {
        this.recorder.stop();
        this.recording = this.recorder.active();
    }
    /**
     * Handles a play recording event
     * @param event the play recording event
     * 
     * @remarks
     * 
     * When the playback system receives a play recording event, the playback
     * system will attempt to start replaying the current Recording using the
     * Replayer associated with the current Recording.
     */
    protected handlePlayRecordingEvent(event: GameEvent): void {
        if (!this.recording && this.lastRecording !== undefined) {
            this.replayer = this.lastRecording.replayer();
            this.replayer.start(this.lastRecording, event.data.get("onEnd"));
            this.replaying = this.replayer.active();
        }
    }
}
