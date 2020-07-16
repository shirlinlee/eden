export function getPosition(el) {
    var x = 0,
        y = 0;
    while (el != null && (el.tagName || '').toLowerCase() != 'html') {
        x += el.offsetLeft || 0;
        y += el.offsetTop || 0;
        el = el.parentElement;
    }
    return { x: parseInt(x, 10), y: parseInt(y, 10) };
}
