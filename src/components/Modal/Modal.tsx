import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import NoteForm from '../NoteForm/NoteForm';

interface ModalProps {
    onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={onClose} // клік на бекдроп закриває модалку
        >
            <div
                className={css.modal}
                onClick={(e) => e.stopPropagation()} // щоб клік усередині модалки не закривав її
            >
                {/* Передаємо onClose у NoteForm */}
                <NoteForm onCancel={onClose} />
            </div>
        </div>,
        document.body
    );
}