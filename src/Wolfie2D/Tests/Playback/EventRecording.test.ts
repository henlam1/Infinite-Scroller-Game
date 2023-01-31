import EventLogItem from "../../Playback/BasicLogItem";
import EventRecording from "../../Playback/BasicRecording"
import Scene from "../../Scene/Scene"


describe("EventRecording", () => {

    describe("constructor", () => {
        it("Should construct an empty recording", () => {
            let recording: EventRecording = new EventRecording(Scene, {});
            expect(recording.getSize()).toBe(0);
            expect(recording.hasItems()).toBe(false);
        });
    });

    describe("enqueue(item: EventLogItem): void", () => {
        it("Should add a log to the recording", () => {
            let recording: EventRecording = new EventRecording(Scene, {});
            let log: EventLogItem = new EventLogItem(0, 0, null);
            recording.enqueue(log);
            expect(recording.getSize()).toBe(1);
            expect(recording.hasItems()).toBe(true);
        });

        it("Should add multiple log items to the recording", () => {
            let recording: EventRecording = new EventRecording(Scene, {});
            let log1: EventLogItem = new EventLogItem(0, 0, null);
            let log2: EventLogItem = new EventLogItem(1, 1, null);
            let log3: EventLogItem = new EventLogItem(2, 2, null);
            recording.enqueue(log1);
            recording.enqueue(log2);
            recording.enqueue(log3);
            expect(recording.getSize()).toBe(3);
            expect(recording.hasItems()).toBe(true);
        })
    });

    describe("dequeue(): EventLogItem | null", () => {
        it("Should return null if there are no items in the recording", () => {
            let recording: EventRecording = new EventRecording(Scene, {});
            expect(recording.dequeue()).toBe(null);
        });
        it("Should return and remove the first log from the recording", () => {
            let recording: EventRecording = new EventRecording(Scene, {});
            let log1: EventLogItem = new EventLogItem(0, 0, null);
            recording.enqueue(log1);
            let log2 = recording.dequeue();
            expect(recording.getSize()).toBe(0);
            expect(recording.hasItems()).toBe(false);
            expect(log1).toBe(log2);
        });
    });

    describe("peekNext(): EventLogItem | null", () => {
        it("Should return null if there are no items in the recording", () => {
            let recording: EventRecording = new EventRecording(Scene, {});
            expect(recording.peekNext()).toBe(null);
        });
        it("Should return the first log in the recording", () => {
            let recording: EventRecording = new EventRecording(Scene, {});
            let log1: EventLogItem = new EventLogItem(0, 0, null);
            recording.enqueue(log1);
            let log2: EventLogItem = recording.peekNext();
            expect(log2).toBe(log1);
            expect(recording.hasItems()).toBe(true);
            expect(recording.getSize()).toBe(1);
        });
    });

    describe("clear(): void", () => {
        it("Should clear an empty recording", () => {
            let recording: EventRecording = new EventRecording(Scene, {});
            recording.clear();
            expect(recording.getSize()).toBe(0);
            expect(recording.hasItems()).toBe(false);
            expect(recording.peekNext()).toBe(null);
            expect(recording.dequeue()).toBe(null);
        });
        it("Should remove all items from the recording", () => {
            let recording: EventRecording = new EventRecording(Scene, {});

            let log1: EventLogItem = new EventLogItem(0, 0, null);
            let log2: EventLogItem = new EventLogItem(1, 1, null);
            let log3: EventLogItem = new EventLogItem(2, 2, null);

            recording.enqueue(log1);
            recording.enqueue(log2);
            recording.enqueue(log3);

            recording.clear();

            expect(recording.getSize()).toBe(0);
            expect(recording.hasItems()).toBe(false);
            expect(recording.peekNext()).toBe(null);
            expect(recording.dequeue()).toBe(null);
        })
    });

})