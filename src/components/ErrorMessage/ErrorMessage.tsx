import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
    message?: string;
}

export default function ErrorMessage({
    message = "Something went wrong 😢",
}: ErrorMessageProps) {
    return <p className={css.errorMessage}>{message}</p>;
}