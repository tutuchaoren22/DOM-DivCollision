window.onload = function() {
    var yellowBox = document.getElementById("yellow-box");
    var greenBox = document.getElementById("green-box");
    var areaBox = document.getElementsByClassName("area-box")[0];
    greenBox.onmousedown = function(e) {
        e = e || event;
        var posX = e.clientX - this.offsetLeft;
        var posY = e.clientY - this.offsetTop;
        document.onmousemove = function(e) {
            e = e || event;
            var left = e.clientX - posX;
            var top = e.clientY - posY;
            resetPosition(left, top, greenBox);
            if (hasCollide(yellowBox, left, top)) {
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

    function resetPosition(left, top, greenBox) {
        var width = areaBox.offsetWidth - yellowBox.offsetWidth;
        var height = areaBox.offsetHeight - yellowBox.offsetHeight;
        if ((0 < left && left <= width) && (0 < top && top <= height)) {
            greenBox.style.left = left + 'px';
            greenBox.style.top = top + 'px'
        } else {
            greenBox.style.left = (function() {
                if (left > width) {
                    return width + 'px';
                } else if (left < 0) {
                    return 0 + 'px';
                } else {
                    return left + 'px';
                }
            }());
            greenBox.style.top = (function() {
                if (top > height) {
                    return height + 'px';
                } else if (top < 0) {
                    return 0 + 'px';
                } else {
                    return top + 'px';
                }
            }());
        }
    }

    function hasCollide(staticBox, left, top) {
        var l = staticBox.offsetLeft - staticBox.offsetWidth;
        var t = staticBox.offsetTop - staticBox.offsetHeight;
        var r = staticBox.offsetLeft + staticBox.offsetWidth;
        var b = staticBox.offsetTop + staticBox.offsetHeight;
        if (left < l || top < t || left > r || top > b) {
            return false;
        } else {
            return true;
        }
    }
};