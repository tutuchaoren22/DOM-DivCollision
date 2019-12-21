var yellowBox = document.getElementsByClassName("yellow-box")[0];
var greenBox = document.getElementsByClassName("green-box")[0];
var areaBox = document.getElementsByClassName("area-box")[0];

function onMouseDown(e) {
    var posX = e.clientX - greenBox.offsetLeft;
    var posY = e.clientY - greenBox.offsetTop;
    console.log(posX)
    document.onmousemove = function(e) {
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
    };
}

function resetPosition(left, top, greenBox) {
    var width = areaBox.offsetWidth - yellowBox.offsetWidth;
    var height = areaBox.offsetHeight - yellowBox.offsetHeight;
    if ((0 < left && left <= width) && (0 < top && top <= height)) {
        greenBox.style.left = left + 'px';
        greenBox.style.top = top + 'px';
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
    var staticBoxLeft = staticBox.offsetLeft - staticBox.offsetWidth;
    var staticBoxTop = staticBox.offsetTop - staticBox.offsetHeight;
    var staticBoxRight = staticBox.offsetLeft + staticBox.offsetWidth;
    var staticBoxBottom = staticBox.offsetTop + staticBox.offsetHeight;
    return !(left < staticBoxLeft || top < staticBoxTop || left > staticBoxRight || top > staticBoxBottom)
}