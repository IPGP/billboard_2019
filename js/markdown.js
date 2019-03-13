function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const classMap = {
    h1: 'headline hl3',
    h2: 'headline hl4',
    h3: 'headline hl5',
    img: 'media',
}
const bindings = Object.keys(classMap)
    .map(key => ({
        type: 'output',
        regex: new RegExp(`<${key}`, 'g'),
        replace: `<${key} class="${classMap[key]}"`
    }));
const converter = new showdown.Converter({
    extensions: [...bindings],
    noHeaderId: true // important to add this, else regex match doesn't work
});

function include(filename, id) {
    $.get(filename, function(response) {
        var text = response;
        var html = converter.makeHtml(text);
        var currentScript = $("script").last();
        // var div = currentScript.parent("div");
        var div = $("#" + id);
        div.html(html);
        // div.html(escapeHtml(html));
    }, "text");
}
