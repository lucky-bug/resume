async function fetchData() {
    return {
        'welcome': await (await fetch('/data/welcome.json')).json(),
        'about': await (await fetch('/data/about.json')).json(),
        'educations': await (await fetch('/data/educations.json')).json(),
        'experiences': await (await fetch('/data/experiences.json')).json(),
        'languages': await (await fetch('/data/languages.json')).json(),
        'skills': await (await fetch('/data/skills.json')).json(),
        'projects': await (await fetch('/data/projects.json')).json(),
        'awards': await (await fetch('/data/awards.json')).json(),
    };
}

fetchData().then((data) => {
    window.data = data;
    renderDocument();
});
