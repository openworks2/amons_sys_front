const analog = {
    id: undefined,
    init(id) {
        const _this = this;
        _this.id = id;

        _this.render();
    },
    render() {
        var _this = this;

        window.context = document.getElementById(this.id).getContext("2d");
        window.radius = document.getElementById(this.id).width / 2;

        setInterval(function (context, radius) {
            _this.makeClockTool(this.context, this.radius);
            _this.makeNumberTool(this.context, this.radius);
            _this.makeArrowTool(this.context, this.radius);
        }, 1000);

    },
    makeClockTool: function (context, radius) {
        // 1. 시계 틀 만들기
        var grad;
        context.beginPath();
        context.arc(radius, radius, radius, 0, Math.PI * 2);
        context.fillStyle = "#D2D2D2";
        context.fill();

        // grad = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        grad = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 2);
        // grad.addColorStop(0, '#414141');
        // grad.addColorStop(1, '#414141');
        grad.addColorStop(0, '#1c1c1c');
        grad.addColorStop(1, '#1c1c1c');
        context.strokeStyle = grad;
        context.lineWidth = 0;
        context.stroke();
    },
    makeNumberTool: function (context, radius) {
        // 2. 숫자 집어넣기
        context.font = 10 + "px Arial";
        for (var i = 0; i < 12; i++) {
            var x = 350 * Math.cos(Math.PI * (30 * i) / 180) + radius - 20;
            var y = 350 * Math.sin(Math.PI * (30 * i) / 180) + radius + 20;
            var number = 0;
            if (i <= 9) {
                number = i + 3;
            } else {
                number = i - 9;
            }
            context.fillText("", x, y);
        }
    },
    makeArrowTool: function (context, radius) {
        // 3. 시 분 초 침 만들기
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        // 초
            // context.beginPath();
            // context.moveTo(radius, radius);
            // context.lineTo(20* Math.cos(Math.PI* ((second* 6)- 90)/ 180)+ radius,
            //             20* Math.sin(Math.PI* ((second* 6)- 90)/ 180)+ radius);
            // context.lineWidth= 1;
            // context.strokeStyle= "#414141";
            // context.stroke();

        // 분
        context.beginPath();
        context.moveTo(radius, radius);
        context.lineTo(25 * Math.cos(Math.PI * (((minute * 6) - 90) + (second * (6 / 60))) / 180) + radius,
            25 * Math.sin(Math.PI * (((minute * 6) - 90) + (second * (6 / 60))) / 180) + radius);
        context.lineWidth = 2;
        context.strokeStyle = "#414141";
        context.lineCap = "round";
        context.stroke();

        // 시
        context.beginPath();
        context.moveTo(radius, radius);
        /*
        context.lineTo(20* Math.cos(Math.PI* (((hour* 30)- 90)+ (second* (6/ 60/ 60)))/ 180)+ radius,
                       20* Math.sin(Math.PI* (((hour* 30)- 90)+ (second* (6/ 60/ 60)))/ 180)+ radius);
        */
        context.lineTo(20 * Math.cos(Math.PI * (((hour * 30) - 90) + Math.PI * (minute * (6 / 30))) / 180) + radius,
            20 * Math.sin(Math.PI * (((hour * 30) - 90) + Math.PI * (minute * (6 / 30))) / 180) + radius);
        context.lineWidth = 2;
        context.strokeStyle = "#414141";
        context.lineCap = "round";
        context.stroke();
    },


}

export default analog;