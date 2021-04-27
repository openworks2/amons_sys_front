const digital = {
    id: undefined,
    init: function (id) {
        const _this = this;
        _this.id = id;

        _this.render();
    },
    render: function () {
        const _this = this;

        _this.start();

    },
    start: function () {
        const _this = this;
        setInterval(function () {
            _this.printClock();
        }, 1000);
    },
    printClock: function () {
        const _this = this;
        const _id = this.id;
        const clock = document.getElementById(_id) // 출력할 장소 선택

        const currentDate = new Date(); // 현재시간
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        const calendar = currentDate.getFullYear() + "-"
            + (currentMonth < 10 ? "0" + currentMonth : currentMonth)
            + "-" + (currentDay < 10 ? "0" + currentDay : currentDay) // 현재 날짜


        const currentHours = _this.addZeros(currentDate.getHours(), 2);
        const currentMinute = _this.addZeros(currentDate.getMinutes(), 2);
        const currentSeconds = _this.addZeros(currentDate.getSeconds(), 2);

        const timer = `<div class='calendar-box'> <p id="calendar-box"> ${calendar}</p></div>
        <div class='time-box'>
                <p id="time-box">${currentHours}:${currentMinute}:${currentSeconds}</p>
        </div>`;
        if (!clock) {
            clearTimeout(_this.start)
            return false
        }
        clock.innerHTML = timer; //날짜를 출력해 줌	
    },
    addZeros: function (num, digit) {
        // 자릿수 맞춰주기
        let zero = '';
        num = num.toString();
        if (num.length < digit) {
            for (let i = 0; i < digit - num.length; i++) {
                zero += '0';
            }
        }
        return zero + num;
    }
}

export default digital;