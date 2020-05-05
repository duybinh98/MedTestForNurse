
export function convertDateTimeToDate(inputString) {
    return inputString.substring(8, 10) + '-' + inputString.substring(5, 7) + '-' + inputString.substring(0, 4);
}

export function convertDateTimeToTime(inputString) {
    return inputString.substring(11, 13) + ':' + inputString.substring(14, 16);
}

export function convertDateAndTimeToDateTime(inputDate, inputTime) {
    return inputDate.substring(6, 10) + '-' + inputDate.substring(3, 5) + '-' + inputDate.substring(0, 2) + 'T' + inputTime + ':00.000+0000'
}
export function getApiUrl() {
    // return "http://192.168.1.6:8080";
    return "https://medtest-backend.herokuapp.com";
}

export function convertMoney(_price) {
    let price = _price.toString()
    let index = price.length - 1
    let result = ''
    while (index >= 3) {
        // console.log(price+": "+price.substring(index-2,index+1)+', '+index)
        result = '.' + price.substring(index - 2, index + 1) + result
        index -= 3
    }
    result = price.substring(0, index + 1) + result
    return result
}

export function getStateName(status) {
    switch (status) {
        case 'pending':
            return 'Đang đợi y tá nhận đơn';
            break;
        case 'coordinatorlostsample':
            return 'Điều phối viên làm mất mẫu';
            break;
        case 'accepted':
            return 'Đang đợi lấy mẫu';
            break;
        case 'transporting':
            return 'Đang vận chuyển mẫu';
            break;
        case 'lostsample':
            return 'Đang đợi lấy lại mẫu';
            break;
        case 'waitingforresult':
            return 'Đang đợi kết quả';
            break;
        case 'closed':
            return 'Đã xong';
            break;
        case 'reaccepted':
            return 'Đã nhận đơn bị mất do điều phối viên';
            break;
        case 'retransporting':
            return 'Đang vận chuyển đơn bị mất do điều phối viên';
            break;
        case 'relostsample':
            return 'Đang đợi lấy lại mẫu do điều phối viên làm mất';
            break;
        case 'canceled':
            return 'Đã hủy';
            break;
    }

}
export function getStateColor(status) {
    switch (status) {
        case 'pending':
        case 'coordinatorlostsample':
            return '#ffd66f';
            break;
        case 'accepted':
        case 'transporting':
        case 'lostsample':
        case 'reaccepted':
        case 'retransporting':
        case 'relostsample':
            return '#a4d57b';
            break;
        case 'waitingforresult':
            return '#6398d6';
            break;
        case 'closed':
            // return '#000';
            return '#a4d57b';
            break;
        case 'canceled':
            return '#6398d6';
            break;

    }
}