    /* Main Menu */
    const menuButton = document.querySelector('#header-menu');
    const mobileMenu = document.querySelector('#gnb');
    const iconOpen = menuButton?.querySelector('[data-state="open"]');
    const iconClosed = menuButton?.querySelector('[data-state="closed"]');
    const header = document.querySelector('header');

    if (menuButton && mobileMenu && iconOpen && iconClosed) {
        function setMenuState(isOpen) {
            menuButton.setAttribute('aria-expanded', String(isOpen));
            menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');

            header?.classList.toggle('is-menu-open', isOpen);
            mobileMenu.dataset.state = isOpen ? 'open' : '';

            iconOpen.hidden = isOpen;
            iconClosed.hidden = !isOpen;
        }

        setMenuState(false);

        menuButton.addEventListener('click', () => {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            setMenuState(!isOpen);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
                if (!isOpen) return;

                setMenuState(false);
                menuButton.focus();
            }
        });
    }

    /* Sub Menu */
    const mainMenus = document.querySelectorAll('.gnb__item--has-sub');
    mainMenus.forEach((mainMenu) => {
        const toggleButton = mainMenu.querySelector('.gnb__toggle');
        const subMenu = mainMenu.querySelector('.gnb__sublist');
        const toggleIcon = mainMenu.querySelector('.toggle-btn');

        if (!toggleButton || !subMenu) return;

        const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
        subMenu.hidden = !isOpen;
        toggleIcon?.classList.toggle('is-sub-open', isOpen);

        toggleButton.addEventListener('click', () => {
            const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
            const nextState = !isOpen;

            toggleButton.setAttribute('aria-expanded', String(nextState));
            toggleIcon?.classList.toggle('is-sub-open', nextState);
            subMenu.hidden = !nextState;
        });
    });