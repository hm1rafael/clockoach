(function (clock) {
    document.querySelector('#start-btn').addEventListener('click', function () {
        clock.start()
    });
    document.querySelector('#stop-btn').addEventListener('click', function () {
        clock.stop();
    });
    document.querySelector('#reset-btn').addEventListener('click', function () {
        clock.reset();
    });
})(new Clock());