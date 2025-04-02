import React from 'react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ content }) {
    const { pending } = useFormStatus();
    return (
        <>
            <button
                type='submit'
                disabled={pending}
                className={`border p-2 ${
                    pending ? 'cursor-not-allowed opacity-50' : ''
                }`}>
                {pending ? 'Chargement...' : `${content}`}
            </button>
        </>
    );
}
