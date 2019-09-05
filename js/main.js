function LunchEventMapper () {};

LunchEventMapper.renderLunchEvents = function(lunchMatchScheduler) {
    //Resetting the previously rendered events
    LunchEventMapper.resetLunchEvents();
    
    var lunchEventElement = '<li class="lunch-schedule-event"><span>Brilliant Lunch</span></li>';
    var lunchEventsDOM = '';
    var lunchEventsArray = [];
    
    //Rendering the Lunch Events
    lunchEventsArray = lunchMatchScheduler.notSuitablePersons;
    for (var i = 0; i < lunchEventsArray.length; i += 1) {
        lunchEventsDOM += lunchEventElement;
    }
    $('.not-suitable-persons-events').html(lunchEventsDOM);
    
    lunchEventsArray = lunchMatchScheduler.suitablePersons;
    if (lunchEventsArray.length > 0) {
        lunchEventsDOM = '';
        for (i = 0; i < lunchEventsArray.length; i += 1) {
            lunchEventsDOM += lunchEventElement;
        }
        $('.suitable-persons-events').html(lunchEventsDOM);
    } else {
        $('.suitable-persons-events').parent().hide();
    }
    
    lunchEventsDOM = '';
    lunchEventElement = '<li class="lunch-schedule-event"><span>Me</span></li>';
    lunchEventsArray = lunchMatchScheduler.selfPerson;
    for (i = 0; i < lunchEventsArray.length; i += 1) {
        lunchEventsDOM += lunchEventElement;
    }
    $('.my-event').html(lunchEventsDOM);
    
    //To set the position of the events in the Scheduler
	LunchEventMapper.sizeLunchEvents(lunchMatchScheduler);
};

LunchEventMapper.sizeLunchEvents = function (lunchMatchScheduler) {
    var slotHeight = 30;
    var timelineStart = 0;
    var timelineUnitDuration = 30;
    var lunchEventsArray = [];
    var start = 0,
        duration = 0,
        eventTop = 0,
        eventHeight = 0;
    
    lunchEventsArray = lunchMatchScheduler.notSuitablePersons;
    for (var i = 0; i < lunchEventsArray.length; i += 1) {
        start = lunchEventsArray[i].start;
        duration = lunchEventsArray[i].end - start;
        eventTop = (slotHeight * (start - timelineStart)) / timelineUnitDuration;
        eventHeight = (slotHeight * duration) / timelineUnitDuration;
        
        $($('.not-suitable-persons-events').find('.lunch-schedule-event')[i]).attr('style', ('top: ' + (eventTop - 1) + 'px; height: ' + (eventHeight + 1) + 'px'));
    }
    
    lunchEventsArray = lunchMatchScheduler.suitablePersons;
    if (lunchEventsArray.length > 0) {
        for (i = 0; i < lunchEventsArray.length; i += 1) {
            start = lunchEventsArray[i].start;
            duration = lunchEventsArray[i].end - start;
            eventTop = (slotHeight * (start - timelineStart)) / timelineUnitDuration;
            eventHeight = (slotHeight * duration) / timelineUnitDuration;

            $($('.suitable-persons-events').find('.lunch-schedule-event')[i]).attr('style', ('top: ' + (eventTop - 1) + 'px; height: ' + (eventHeight + 1) + 'px'));
        }
        
        if (lunchMatchScheduler.isSuitableMatchAvailable) {
            $($('.suitable-persons-events').find('.lunch-schedule-event')[0]).addClass("available-matcher");
        }
    }
    
    lunchEventsArray = lunchMatchScheduler.selfPerson;
    for (i = 0; i < lunchEventsArray.length; i += 1) {
        start = lunchEventsArray[i].start;
        duration = lunchEventsArray[i].end - start;
        eventTop = (slotHeight * (start - timelineStart)) / timelineUnitDuration;
        eventHeight = (slotHeight * duration) / timelineUnitDuration;
        
        $($('.my-event').find('.lunch-schedule-event')[i]).attr('style', ('top: ' + (eventTop - 1) + 'px; height: ' + (eventHeight + 1) + 'px'));
        
        if (lunchMatchScheduler.isSuitableMatchAvailable) {
            $($('.my-event').find('.lunch-schedule-event')[0]).addClass("available-matcher");
        } else {
            $($('.my-event').find('.lunch-schedule-event')[0]).addClass("no-suitable-matcher-available");
        }
    }
    
    var lunchEventWidth = Math.floor($($('.my-event').find('.lunch-schedule-event')[0]).outerWidth());
    
    //Last Event to occupy the maximum available width
    if (lunchMatchScheduler.suitablePersons.length > 0) {
        if (lunchMatchScheduler.notSuitablePersons[lunchMatchScheduler.notSuitablePersons.length - 1].start >= lunchMatchScheduler.suitablePersons[lunchMatchScheduler.suitablePersons.length - 1].end) {
            if (lunchMatchScheduler.notSuitablePersons[lunchMatchScheduler.notSuitablePersons.length - 1].start >= lunchMatchScheduler.selfPerson[lunchMatchScheduler.selfPerson.length - 1].end) {
                $($('.not-suitable-persons-events').find('.lunch-schedule-event')[lunchMatchScheduler.notSuitablePersons.length - 1]).css('width', ((3 * lunchEventWidth) + 'px'));
            } else {
                $($('.not-suitable-persons-events').find('.lunch-schedule-event')[lunchMatchScheduler.notSuitablePersons.length - 1]).css('width', ((2 * lunchEventWidth) + 'px'));
            }
        } else {
            if (lunchMatchScheduler.suitablePersons[lunchMatchScheduler.suitablePersons.length - 1].start >= lunchMatchScheduler.selfPerson[lunchMatchScheduler.selfPerson.length - 1].end) {
                $($('.suitable-persons-events').find('.lunch-schedule-event')[lunchMatchScheduler.suitablePersons.length - 1]).css('width', ((2 * lunchEventWidth) + 'px'));
            }
        }
    } else {
        if (lunchMatchScheduler.notSuitablePersons[lunchMatchScheduler.notSuitablePersons.length - 1].start >= lunchMatchScheduler.selfPerson[lunchMatchScheduler.selfPerson.length - 1].end) {
            $($('.not-suitable-persons-events').find('.lunch-schedule-event')[lunchMatchScheduler.notSuitablePersons.length - 1]).css('width', ((2 * lunchEventWidth) + 'px'));
        }
    }
};

LunchEventMapper.resetLunchEvents = function () {
    $('.not-suitable-persons-events').empty();
    
    $('.suitable-persons-events').empty();
    $('.suitable-persons-events').parent().show();
    
    $('.my-event').empty();
};