# Brilliant-Lunch
To match people for a networking lunch based on their availability

matchLunchEvent is used to find the suitable person who matches with the particular person or not and to categorize the events so as to render them accordingly.

620px as total width and 720px as height.
So, from 9 AM to 9 PM - 24 rows of 30 px with a unit duration gap of 30 mins.

Dynamically accessing the event arrays, the events are rendered into the DOM.
And based on the isSuitableMatchAvailable flag, the coloring of the events are done.

The two columns are categorized and splitted into in such a way that two events will not get overlapped onto each other comparing the 'start' of the current event with the 'end' of the previous event that was about to be rendered.

The last event under each column occupies the maximum available width based on the 'start' and 'end' parameters of the two events which are being compared.

To check the Lunch Event Mapper Rendering :-

Each lunch event is represented by a JavaScript object with a start and end attribute.
First object is 'Me' Person.

//Suitable Lunch Match
//var availableLunchEvents = [{start: 225, end: 285},{start: 210, end: 270},{start: 180, end: 240},{start: 240, end: 300},{start: 300, end: 360},{start: 270, end: 330}];

//No Suitable Lunch Match
//var availableLunchEvents = [{start: 225, end: 285},{start: 300, end: 360}, {start: 180, end: 240}];

//matchLunchEvent(availableLunchEvents);
