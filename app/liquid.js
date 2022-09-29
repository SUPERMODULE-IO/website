
   const colorswitch = document.querySelector("#colorswitch");

    var darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }

    const toggleDarkMode = function () {
      menu.classList.add('hidden');
      if (localStorage.theme == 'dark') {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      }
    }
    colorswitch.addEventListener("click", toggleDarkMode);
