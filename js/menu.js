(() => {
    let menu = document.querySelector('.menu');
    let menuOpen = false;
    let menuKeys = [false, false];

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Alt' && menuKeys[0] === false) menuKeys[0] = true;
        else if (e.key === 'm' && menuKeys[1] === false) menuKeys[1] = true;
        else menuKeys = [false, false];
        
        if (menuKeys[0] === true && menuKeys[1] === true) handleNav();
    })

    window.addEventListener('keyup', (e) => {
        if (e.key === 'm') menuKeys = [true, false];
        else menuKeys = [false, false];
    })

    function handleNav() {
        if (menuOpen) closeNav();
        else openNav();
        menuOpen = !menuOpen;
    }

    function closeNav() {
        menu.style.width = '0px';
    }

    function openNav() {
        menu.style.width = '300px';
    }
})();