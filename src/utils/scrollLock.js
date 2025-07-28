// Utility to prevent background scrolling when modals are open
let scrollLockCount = 0;

export const lockScroll = () => {
    scrollLockCount++;
    if (scrollLockCount === 1) {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
};

export const unlockScroll = () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }
};

export const resetScrollLock = () => {
    scrollLockCount = 0;
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}; 