
export function convertDateTimeToDate(inputString){
    return inputString.substring(8,10)+'-'+inputString.substring(5,7)+'-'+inputString.substring(0,4);
}

export function convertDateTimeToTime(inputString){
    return inputString.substring(11,13)+':'+inputString.substring(14,16);
}

export function convertDateAndTimeToDateTime(inputDate,inputTime){
    return inputDate.substring(6,10)+'-'+inputDate.substring(3,5)+'-'+inputDate.substring(0,2)+'T'+inputTime+':00.000+0000'
}
