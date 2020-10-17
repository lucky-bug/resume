function extractData(data, path) {
    if (path === 'value') return data;

    let keys = path.split('.');
    let result = data;

    keys.forEach(key => {
        result = result[key];
    });

    return result;
}

function getTemplatesFrom(element) {
    return [...element.getElementsByTagName('template')];
}

function renderTemplate(element, data) {
    let subElements = getTemplatesFrom(element.content.firstElementChild);

    subElements.forEach(subElement => {
        subElement.outerHTML = renderTemplate(subElement, extractData(data, subElement.getAttribute('for')));
    });

    let html = '';

    if (Array.isArray(data)) {
        data.forEach(datum => {
            html += element.innerHTML.replace(/{{\s*([\w.]+)\s*}}/gmi, (...matches) => {
                return extractData(datum, matches[1]);
            });
        });
    } else {
        html += element.innerHTML.replace(/{{\s*([\w.]+)\s*}}/gmi, (...matches) => {
            return extractData(data, matches[1]);
        });
    }

    return html;
}

function renderDocument() {
    let templates = getTemplatesFrom(document);

    templates.forEach(template => {
        template.outerHTML = renderTemplate(template, extractData(window, template.getAttribute('for')));
    });
}
