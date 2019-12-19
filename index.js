window.onload = function() {
    var yellowBox = document.getElementById("yellow-box");
    var greenBox = document.getElementById("green-box");

    greenBox.onmousedown = function(e) {
        e = e || event;
        var posX = e.clientX - this.offsetLeft;
        var posY = e.clientY - this.offsetTop;
        document.onmousemove = function(e) {
            e = e || event;
            var left = e.clientX - posX;
            var top = e.clientY - posY;
            resetPosition(left, top, greenBox);
            if (hasCollide(yellowBox, left, top, greenBox)) {
                yellowBox.style.background = 'blue';
            } else {
                yellowBox.style.background = 'yellow';
            }
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
};

function resetPosition(left, top, greenBox) {
    if ((0 < left && left <= 920) && (0 < top && top <= 720)) {
        greenBox.style.left = left + 'px';
        greenBox.style.top = top + 'px'
    } else {
        greenBox.style.left = (function() {
            if (left > 920) {
                return 920 + 'px';
            } else if (left < 0) {
                return 0 + 'px';
            } else {
                return left + 'px';
            }
        }());
        greenBox.style.top = (function() {
            if (top > 720) {
                return 720 + 'px';
            } else if (top < 0) {
                return 0 + 'px';
            } else {
                return top + 'px';
            }
        }());
    }
}

function hasCollide(obj, left, top, obj1) {
    var l1 = obj.offsetLeft - obj.offsetWidth;
    var t1 = obj.offsetTop - obj.offsetHeight;
    var r1 = obj.offsetLeft + obj.offsetWidth;
    var b1 = obj.offsetTop + obj.offsetHeight;
    if (left < l1 || top < t1 || left > r1 || top > b1) {
        // obj.style.zIndex = 3;
        // obj1.style.zIndex = 1;
        return false;
    } else {
        // obj.style.zIndex = 1;
        // obj1.style.zIndex = 3;
        return true;
    }
}