import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from "@angular/core";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from "date-fns";
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from "angular-calendar";

declare const $: any;

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
  green: {
    primary: "#3a9c33",
    secondary: "#FDF1BA",
  },
  pink: {
    primary: "#f26de7",
    secondary: "#FDF1BA",
  },
  orange: {
    primary: "#fd7e14",
    secondary: "#FDF1BA",
  },
  prime: {
    primary: "#337ab7;",
    secondary: "#FDF1BA",
  },
  info: {
    primary: "#269abc",
    secondary: "#FDF1BA",
  },
  warning: {
    primary: "#d58512",
    secondary: "#FDF1BA",
  },
  purple: {
    primary: "#609",
    secondary: "#FDF1BA",
  },
  brown: {
    primary: "#613312",
    secondary: "#FDF1BA",
  },
  teal: {
    primary: "#008080",
    secondary: "#FDF1BA",
  },
};

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  bsInlineRangeValue: Date[];
  eventName: string;
  category: string;
  editEventName: string;
  editCategory: string;
  editAction;
  editCalendarEvent;

  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.handleEvent("Edited", event);
        $("#edit_event").modal("show");
        this.editedValue("Edited", event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        // this.handleEvent('Deleted', event);
      },
    },
  ];

  editedValue(action: string, event: CalendarEvent) {
    this.editAction = action;
    this.editCalendarEvent = event;
  }

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: "A 3 day event",
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: "An event with no end date",
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: "A long event that spans 2 months",
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: "A draggable and resizable event",
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  openAddEventModal() {
    this.eventName = "";
    this.bsInlineRangeValue = [];
    $("#add_event").modal("show");
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    // this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: "lg" });
  }

  addEvent(): void {
    if (this.category === "Danger") {
      this.events = [
        ...this.events,
        {
          title: this.eventName,
          start: startOfDay(this.bsInlineRangeValue[0]),
          end: endOfDay(this.bsInlineRangeValue[1]),
          color: colors.red,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    } else if (this.category === "Success") {
      this.events = [
        ...this.events,
        {
          title: this.eventName,
          start: startOfDay(this.bsInlineRangeValue[0]),
          end: endOfDay(this.bsInlineRangeValue[1]),
          color: colors.green,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    } else if (this.category === "Pink") {
      this.events = [
        ...this.events,
        {
          title: this.eventName,
          start: startOfDay(this.bsInlineRangeValue[0]),
          end: endOfDay(this.bsInlineRangeValue[1]),
          color: colors.pink,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    } else if (this.category === "Purple") {
      this.events = [
        ...this.events,
        {
          title: this.eventName,
          start: startOfDay(this.bsInlineRangeValue[0]),
          end: endOfDay(this.bsInlineRangeValue[1]),
          color: colors.purple,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    } else if (this.category === "Primary") {
      this.events = [
        ...this.events,
        {
          title: this.eventName,
          start: startOfDay(this.bsInlineRangeValue[0]),
          end: endOfDay(this.bsInlineRangeValue[1]),
          color: colors.prime,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    } else if (this.category === "Info") {
      this.events = [
        ...this.events,
        {
          title: this.eventName,
          start: startOfDay(this.bsInlineRangeValue[0]),
          end: endOfDay(this.bsInlineRangeValue[1]),
          color: colors.info,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    } else if (this.category === "Orange") {
      this.events = [
        ...this.events,
        {
          title: this.eventName,
          start: startOfDay(this.bsInlineRangeValue[0]),
          end: endOfDay(this.bsInlineRangeValue[1]),
          color: colors.orange,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    } else if (this.category === "Warning") {
      this.events = [
        ...this.events,
        {
          title: this.eventName,
          start: startOfDay(this.bsInlineRangeValue[0]),
          end: endOfDay(this.bsInlineRangeValue[1]),
          color: colors.yellow,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    } else if (this.category === "Brown") {
      this.events = [
        ...this.events,
        {
          title: this.eventName,
          start: startOfDay(this.bsInlineRangeValue[0]),
          end: endOfDay(this.bsInlineRangeValue[1]),
          color: colors.warning,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    } else if (this.category === "Teal") {
      this.events = [
        ...this.events,
        {
          title: this.eventName,
          start: startOfDay(this.bsInlineRangeValue[0]),
          end: endOfDay(this.bsInlineRangeValue[1]),
          color: colors.teal,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    }
    $("#add_event").modal("hide");
  }

  editEvent() {
    this.editCalendarEvent.title = this.editEventName;
    if (this.editCategory === "Danger") {
      this.editCalendarEvent.color = colors.red;
    } else if (this.editCategory === "Success") {
      this.editCalendarEvent.color = colors.green;
    } else if (this.editCategory === "Pink") {
      this.editCalendarEvent.color = colors.pink;
    } else if (this.editCategory === "Purple") {
      this.editCalendarEvent.color = colors.purple;
    } else if (this.editCategory === "Primary") {
      this.editCalendarEvent.color = colors.prime;
    } else if (this.editCategory === "Info") {
      this.editCalendarEvent.color = colors.info;
    } else if (this.editCategory === "Orange") {
      this.editCalendarEvent.color = colors.orange;
    } else if (this.editCategory === "Warning") {
      this.editCalendarEvent.color = colors.warning;
    } else if (this.editCategory === "Brown") {
      this.editCalendarEvent.color = colors.yellow;
    } else if (this.editCategory === "Teal") {
      this.editCalendarEvent.color = colors.teal;
    }

    // this.editCalendarEvent.start = startOfDay(this.bsInlineRangeValue[0]);
    // this.editCalendarEvent.end = endOfDay(this.bsInlineRangeValue[1]);
    this.handleEvent(this.editEventName, this.editCalendarEvent);
    $("#edit_event").modal("hide");
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit() {}
}
