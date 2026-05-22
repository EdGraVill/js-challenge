'use client';

import { type FC, useCallback, useRef } from 'react';

import './styles.css';

const Navbar: FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const switchModal = useCallback(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  return (
    <nav className="flex h-screen w-8 select-none flex-col-reverse items-center justify-between bg-[#21252b] py-8 text-neutral-300 hover:bg-neutral-900 landscape:h-8 landscape:w-screen landscape:flex-row landscape:px-8 landscape:py-0 landscape:hover:bg-[#21252b]">
      <h2 className="rotate-180 text-sm [writing-mode:vertical-lr] landscape:hidden">JS Challenge</h2>
      <button className="flex h-5 w-5 flex-col justify-evenly" onClick={switchModal}>
        <div className="h-0.5 w-full bg-neutral-300" />
        <div className="h-0.5 w-full bg-neutral-300" />
        <div className="h-0.5 w-full bg-neutral-300" />
      </button>
      <h2 className="rotate-180 text-sm text-transparent [writing-mode:vertical-lr] landscape:rotate-0 landscape:text-neutral-300 landscape:[writing-mode:unset]">
        JS Challenge
      </h2>
      <div className="hidden h-5 w-5 landscape:block" />
      <dialog
        className="fixed left-0 top-0 m-0 h-screen w-72 bg-white backdrop:fixed backdrop:bottom-0 backdrop:left-0 backdrop:right-0 backdrop:top-0 backdrop:animate-none backdrop:bg-[rgba(0,0,0,0.5)] open:animate-[show_0.5s_ease_normal] open:backdrop:animate-[showBackdrop_0.5s_ease_normal]"
        onClick={switchModal}
        ref={dialogRef}
      ></dialog>
    </nav>
  );
};

export default Navbar;
