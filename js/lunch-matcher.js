function matchLunchEvent(availableLunchEvents) {
    var selfPerson = [],
        suitableListedPersons = [],
        notSuitableListedPersons = [],
        suitablePersons = [],
        notSuitablePersons = [],
        lunchMatchScheduler = {},
        isSuitableMatchAvailable = false;
    
    selfPerson.push(availableLunchEvents[0]);
    
    for (var i = 1; i < availableLunchEvents.length; i += 1) {
        var overlapTime = 0;
        
        if (availableLunchEvents[i].start <= availableLunchEvents[0].start) {
            if (availableLunchEvents[i].end > availableLunchEvents[0].start) {
                overlapTime = availableLunchEvents[i].end - availableLunchEvents[0].start;
            }
        } else if (availableLunchEvents[i].start > availableLunchEvents[0].start) {
            if (availableLunchEvents[0].end > availableLunchEvents[i].start) {
                overlapTime = availableLunchEvents[0].end - availableLunchEvents[i].start;
            }
        }
        
        if (overlapTime >= 30) {
            suitableListedPersons.push(availableLunchEvents[i]);
        } else {
            notSuitableListedPersons.push(availableLunchEvents[i]);
        }
    }
    
    //Categorizing the events accordingly so that they shouldn't be overlapped
    if (suitableListedPersons.length > 0) {
        suitableListedPersons.sort(function (personA, personB) {return personA.start - personB.start});
        
        isSuitableMatchAvailable = true;
        suitablePersons.push(suitableListedPersons[0]);
        
        for (i = 1; i < suitableListedPersons.length; i += 1) {
            notSuitableListedPersons.push(suitableListedPersons[i]);
        }
    }
    
    notSuitableListedPersons.sort(function (personA, personB) {return personA.start - personB.start});
    
    notSuitablePersons.push(notSuitableListedPersons[0]);
    for (i = 1; i < notSuitableListedPersons.length; i += 1) {
        if (notSuitableListedPersons[i].start >= notSuitablePersons[notSuitablePersons.length - 1].end) {
            notSuitablePersons.push(notSuitableListedPersons[i]);
        } else {
            suitablePersons.push(notSuitableListedPersons[i]);
        }
    }
    
    lunchMatchScheduler.isSuitableMatchAvailable = isSuitableMatchAvailable;
    lunchMatchScheduler.notSuitablePersons = notSuitablePersons;
    lunchMatchScheduler.suitablePersons = suitablePersons;
    lunchMatchScheduler.selfPerson = selfPerson;
    
    LunchEventMapper.renderLunchEvents(lunchMatchScheduler);
}

//Suitable Lunch Match
//var availableLunchEvents = [{start: 225, end: 285},{start: 210, end: 270},{start: 180, end: 240},{start: 240, end: 300},{start: 300, end: 360},{start: 270, end: 330}];

//No Suitable Lunch Match
//var availableLunchEvents = [{start: 225, end: 285},{start: 300, end: 360}, {start: 180, end: 240}];

//matchLunchEvent(availableLunchEvents);