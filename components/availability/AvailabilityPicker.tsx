"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";

import type {
  AvailabilitySlot,
  AvailabilitySlotStatus,
  DoctorAvailability,
} from "../../lib/types";

type AvailabilityState =
  | { kind: "loading" }
  | { kind: "signin" }
  | { kind: "error"; message: string }
  | { kind: "ready"; data: DoctorAvailability };

interface AvailabilityPickerProps {
  doctorId: string;
  initialDate?: string;
  initialSlotId?: string;
  onSelect?: (slot: AvailabilitySlot) => void;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "UTC",
});

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const statusLabels: Record<AvailabilitySlotStatus, string> = {
  available: "Available",
  booked: "Booked",
  blocked: "Unavailable",
  past: "Past",
};

function getFormError(value: unknown): string {
  if (!value || typeof value !== "object") {
    return "We could not load appointment times. Please try again.";
  }

  const payload = value as { errors?: { formError?: unknown } };
  const formError = payload.errors?.formError;

  return typeof formError === "string"
    ? formError
    : "We could not load appointment times. Please try again.";
}

function isAvailabilityPayload(value: unknown): value is DoctorAvailability {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    typeof payload.doctorId === "string" &&
    typeof payload.schedulingTimeZone === "string" &&
    Array.isArray(payload.slots)
  );
}

function formatDate(date: string, formatter: Intl.DateTimeFormat) {
  return formatter.format(new Date(`${date}T00:00:00.000Z`));
}

export default function AvailabilityPicker({
  doctorId,
  initialDate,
  initialSlotId,
  onSelect,
}: AvailabilityPickerProps) {
  const headingId = useId();
  const [state, setState] = useState<AvailabilityState>({ kind: "loading" });
  const [selectedDate, setSelectedDate] = useState(initialDate ?? "");
  const [selectedSlotId, setSelectedSlotId] = useState(initialSlotId ?? "");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let timedOut = false;

    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 15_000);

    async function load() {
      try {
        const response = await fetch(
          `/api/doctors/${encodeURIComponent(doctorId)}/availability`,
          { signal: controller.signal, cache: "no-store" },
        );

        clearTimeout(timeout);

        if (response.status === 401) {
          if (active) {
            setState({ kind: "signin" });
          }
          return;
        }

        let payload: unknown;

        try {
          payload = await response.json();
        } catch {
          throw new Error("We could not load appointment times. Please try again.");
        }

        if (!response.ok) {
          throw new Error(getFormError(payload));
        }

        if (!isAvailabilityPayload(payload)) {
          throw new Error("The availability response was incomplete.");
        }

        if (active) {
          setState({ kind: "ready", data: payload });
        }
      } catch (error) {
        clearTimeout(timeout);

        if (!active || (controller.signal.aborted && !timedOut)) {
          return;
        }

        setState({
          kind: "error",
          message: timedOut
            ? "The request timed out. Please try again."
            : error instanceof Error
              ? error.message
              : "We could not load appointment times. Please try again.",
        });
      }
    }

    void load();

    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [doctorId, reloadKey]);

  const dates = useMemo(() => {
    if (state.kind !== "ready") {
      return [];
    }

    return Array.from(
      new Set(state.data.slots.map((slot) => slot.date)),
    ).sort();
  }, [state]);

  const activeDate =
    selectedDate && dates.includes(selectedDate)
      ? selectedDate
      : (dates[0] ?? "");

  const highlightedSlotId =
    state.kind === "ready" && initialSlotId
      ? (state.data.slots.find((slot) => slot.id === initialSlotId)?.id ??
        selectedSlotId)
      : selectedSlotId;

  const slotsForDate = useMemo(() => {
    if (state.kind !== "ready" || !activeDate) {
      return [];
    }

    return state.data.slots.filter((slot) => slot.date === activeDate);
  }, [state, activeDate]);

  function handleSelect(slot: AvailabilitySlot) {
    if (!slot.available) {
      return;
    }

    setSelectedSlotId(slot.id);
    onSelect?.(slot);
  }

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 id={headingId} className="text-lg font-semibold text-slate-900">
            Available appointment times
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {state.kind === "ready"
              ? `Times shown in ${state.data.schedulingTimeZone}.`
              : "Loading times in UTC."}
          </p>
        </div>

        {state.kind === "ready" && state.data.source === "mock" ? (
          <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
            Demo data
          </span>
        ) : null}
      </div>

      {state.kind === "loading" ? (
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4" role="status">
          <span className="sr-only">Loading appointment times…</span>
          {Array.from({ length: 8 }, (_, index) => (
            <span
              aria-hidden="true"
              className="h-16 animate-pulse rounded-xl bg-slate-100"
              key={index}
            />
          ))}
        </div>
      ) : null}

      {state.kind === "signin" ? (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-medium">Sign in to view appointment times.</p>
          <Link
            className="mt-2 inline-block font-semibold text-emerald-800 underline underline-offset-4"
            href="/login"
          >
            Go to login
          </Link>
        </div>
      ) : null}

      {state.kind === "error" ? (
        <div
          className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900"
          role="alert"
        >
          <p>{state.message}</p>
          <button
            className="mt-3 rounded-lg border border-rose-300 bg-white px-3 py-2 font-semibold text-rose-900 hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
            onClick={() => {
              setState({ kind: "loading" });
              setReloadKey((value) => value + 1);
            }}
            type="button"
          >
            Try again
          </button>
        </div>
      ) : null}

      {state.kind === "ready" ? (
        <div className="mt-5 space-y-5">
          {dates.length === 0 ? (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              No appointment times are scheduled in this period.
            </p>
          ) : (
            <>
              <div
                aria-label="Choose a date"
                className="flex flex-wrap gap-2"
                role="group"
              >
                {dates.map((date) => {
                  const isActive = date === activeDate;

                  return (
                    <button
                      aria-pressed={isActive}
                      className={`min-w-24 rounded-xl border px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                        isActive
                          ? "border-emerald-700 bg-emerald-700 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-emerald-600 hover:bg-emerald-50"
                      }`}
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      type="button"
                    >
                      <span className="block text-xs uppercase tracking-wide opacity-80">
                        {formatDate(date, dateFormatter)}
                      </span>
                      <span className="block text-sm font-semibold">
                        {formatDate(date, dayFormatter)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-800">
                  {formatDate(activeDate, fullDateFormatter)}
                </p>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {slotsForDate.map((slot) => {
                    const isSelected = slot.id === highlightedSlotId;
                    const isUnavailable = !slot.available;
                    const label = statusLabels[slot.status];

                    return (
                      <button
                        aria-label={`${slot.startTime}, ${label.toLowerCase()}`}
                        aria-pressed={isSelected}
                        className={`min-h-16 rounded-xl border px-3 py-2 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                          isSelected
                            ? "border-emerald-700 bg-emerald-700 text-white"
                            : isUnavailable
                              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500"
                              : "border-emerald-600 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                        }`}
                        disabled={isUnavailable}
                        key={slot.id}
                        onClick={() => handleSelect(slot)}
                        title={label}
                        type="button"
                      >
                        <span className="block text-sm font-semibold">
                          {slot.startTime}
                        </span>
                        <span className="mt-0.5 block text-xs">
                          {isSelected ? "Selected" : label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <p aria-live="polite" className="sr-only">
                {highlightedSlotId
                  ? `Selected time slot ${highlightedSlotId}.`
                  : "No time slot selected."}
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm border border-emerald-600 bg-emerald-50" />
                  Available
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm border border-slate-300 bg-slate-100" />
                  Booked or unavailable
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm border border-emerald-700 bg-emerald-700" />
                  Selected
                </span>
              </div>
            </>
          )}
        </div>
      ) : null}
    </section>
  );
}
