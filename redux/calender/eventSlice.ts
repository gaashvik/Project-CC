import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";


export type CalendarEventType = {
  id: string;
  title: string;
  date: dayjs.Dayjs;
  from_time: string;
  to_time: string;
  type: string;
  description: string;
  user_id: string;
  created_at: string;
  modified_at: string;
};

type EventState={
    events:CalendarEventType[];
    isPopoverOpen: boolean;
    isEventSummaryOpen: boolean;
    selectedEvent: CalendarEventType | null;
}

const initialState:EventState={
    events:[],
    isPopoverOpen:false,
    isEventSummaryOpen:false,
    selectedEvent:null
}

const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers:{
        setEvents:(state,action)=>{
            state.events = action.payload
        },
        openPopOver:(state)=>{
            state.isPopoverOpen=true;
        },
        closePopOver:(state)=>{
            state.isPopoverOpen=false;
        },
        openEventSummary:(state,action:PayloadAction<CalendarEventType>)=>{
            const event = action.payload;
            state.isEventSummaryOpen=true;
            state.selectedEvent=event;
        },
        closeEventSummary:(state)=>{
             state.isEventSummaryOpen=false;
             state.selectedEvent = null;

        }
    }
})

export const {setEvents,openPopOver,closePopOver,openEventSummary,closeEventSummary} = eventSlice.actions;

export default eventSlice.reducer;