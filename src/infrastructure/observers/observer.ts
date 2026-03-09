import { DomainEvent } from "../../domain/events/events.js";

export type Observer = (event: DomainEvent) => void;

export const observers: Observer[] = [];

export function emitEvent(event: DomainEvent): void {
  observers.forEach((observer) => {
    try {
      observer(event);
    } catch (error) {
      console.error(`Observer error for event ${event.type}:`, error);
    }
  });
}