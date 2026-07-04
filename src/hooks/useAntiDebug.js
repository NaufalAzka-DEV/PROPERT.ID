import { useEffect } from 'react';

export function useAntiDebug() {
  useEffect(() => {
    const blockContextMenu = (event) => {
      event.preventDefault();
    };

    const blockInspectShortcut = (event) => {
      const key = event.key.toLowerCase();
      const isInspectShortcut =
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        (event.ctrlKey && key === 'u');

      if (isInspectShortcut) {
        event.preventDefault();
        alert('Akses inspect element dinonaktifkan untuk mode presentasi.');
      }
    };

    window.addEventListener('contextmenu', blockContextMenu);
    window.addEventListener('keydown', blockInspectShortcut);

    return () => {
      window.removeEventListener('contextmenu', blockContextMenu);
      window.removeEventListener('keydown', blockInspectShortcut);
    };
  }, []);
}
