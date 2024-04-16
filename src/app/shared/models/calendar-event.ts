export class CalendarEvent {
    id: string = '';
    date: string = '';
    title: string = '';
    description: string = '';
    image: File | null = null;
    fee: number = 0;
    isHoliday: boolean = false;
}