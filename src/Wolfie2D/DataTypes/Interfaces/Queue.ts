import Collection from "./Collection";

export default interface Queue<T> extends Collection {
    /**
     * Adds an item to the back of the queue
     * @param item The item to add to the back of the queue
     */
    enqueue(item: T): void;

    /**
     * Retrieves an item from the front of the queue
     * @returns The item at the front of the queue
     */
    dequeue(): T;

    /**
     * Returns the item at the front of the queue, but does not remove it
     * @returns The item at the front of the queue
     */
    peekNext(): T;

    /**
     * Returns true if the queue has items in it, false otherwise
     * @returns A boolean representing whether or not this queue has items
     */
    hasItems(): boolean;

    /**
     * Returns the number of elements in the queue.
     * @returns The size of the queue
     */
    getSize(): number;

    /**
     * Iterates through all of the items in this data structure.
     * @param func The function to evaluate of every item in the collection
     */
    forEach(func: Function): void;

    /**
     * Clears the contents of the data structure
     */
    clear(): void;
}