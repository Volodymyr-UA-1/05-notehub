import css from './NoteForm.module.css';
import { Formik } from 'formik';
import { useId } from "react";
import * as Yup from 'yup';

interface NoteFormProps {
    onCancel: () => void; // отримуємо функцію для кнопки Cancel
}
const validationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title must be at most 50 characters'),
    content: Yup.string()
        .max(500, 'Content must be at most 500 characters'),
    tag: Yup.string()
        .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
        .required('Tag is required'),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
    const fieldId = useId();

    return (
        <Formik
            initialValues={{ title: '', content: '', tag: 'Todo' }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <form className={css.form} onSubmit={handleSubmit}>
                    <div className={css.formGroup}>
                        <label htmlFor={`${fieldId}-title`}>Title</label>
                        <input
                            id={`${fieldId}-title`}
                            type="text"
                            name="title"
                            className={css.input}
                            onChange={handleChange}
                            value={values.title}
                        />
                        {touched.title && errors.title && (
                            <span className={css.error}>{errors.title}</span>
                        )}
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor={`${fieldId}-content`}>Content</label>
                        <textarea
                            id={`${fieldId}-content`}
                            name="content"
                            rows={8}
                            className={css.textarea}
                            onChange={handleChange}
                            value={values.content}
                        />
                        {touched.content && errors.content && (
                            <span className={css.error}>{errors.content}</span>
                        )}
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor={`${fieldId}-tag`}>Tag</label>
                        <select
                            id={`${fieldId}-tag`}
                            name="tag"
                            className={css.select}
                            onChange={handleChange}
                            value={values.tag}
                        >
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </select>
                        {touched.tag && errors.tag && (
                            <span className={css.error}>{errors.tag}</span>
                        )}
                    </div>

                    <div className={css.actions}>
                        <button
                            type="button"
                            className={css.cancelButton}
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button type="submit" className={css.submitButton} disabled={false}>
                            Create note
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
}