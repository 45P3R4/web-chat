const themes = [];
themes.push('lavender', 'sand', 'pink', 'green', 'old-pc');
if(localStorage.getItem('theme') == null)
    document.firstElementChild.setAttribute("data-theme", themes[0]);
else
    document.firstElementChild.setAttribute("data-theme", themes[localStorage.getItem('theme')]);


let currentTheme = 0;
const themeB = document.getElementById('themeButton');
themeB.onclick = changeTheme;

function changeTheme() {
    currentTheme = currentTheme < themes.length-1 ? ++currentTheme : 0;
    document.firstElementChild.setAttribute("data-theme", themes[currentTheme]);
    localStorage.setItem('theme', currentTheme);
}