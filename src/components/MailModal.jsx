'use client';

// Basé sur un composant de : https://www.hover.dev/components/forms

import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiLoader } from 'react-icons/fi';

export default function MailModal({ isOpen, setIsOpen }) {
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const [questions, setQuestions] = useState(QUESTIONS);
    const [complete, setComplete] = useState(false);
    const [sending, setSending] = useState(false);
    const curQuestion = questions.find((q) => !q.complete);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const [error, setError] = useState('');

    const handleSubmitLine = (value) => {
        if (curQuestion) {
            if (curQuestion.key === "Ton email" && !isValidEmail(value)) {
                setError("L'adresse email est invalide.");
                return;
            }

            setError(''); // Réinitialiser l'erreur si tout est correct
            setQuestions((prev) =>
                prev.map((q) =>
                    q.key === curQuestion.key
                        ? { ...q, complete: true, value }
                        : q,
                ),
            );
        }
    };

    const handleReset = () => {
        setQuestions((prev) =>
            prev.map((q) => ({ ...q, value: '', complete: false })),
        );
        setComplete(false);
    };

    const handleSend = async () => {
        setSending(true);
        const formData = questions.reduce((acc, val) => {
            return { ...acc, [val.key]: val.value };
        }, {});

        try {
            const response = await fetch('/api/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData['Tu es'],
                    phone: formData['Téléphone'] || '',
                    email: formData["Ton email"],
                    message: formData['Ton message'],
                }),
            });

            if (response.ok) {
                setComplete(true);
                setTimeout(() => setIsOpen(false), 2000);
            } else {
                console.error('Erreur lors de l’envoi:', await response.json());
                setComplete(false);
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
            setComplete(false);
        } finally {
            setSending(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className='bg-slate-900/20 backdrop-blur p-2  fixed inset-0 z-50 grid place-items-center cursor-pointer'>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className='bg-customDarkGray text-white p-2 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden font-mono border-[1px] border-[#ffffff48]'>
                        <div
                            ref={containerRef}
                            onClick={() => inputRef.current?.focus()}
                            className='scrollbar-hide h-[400px] overflow-y-scroll'>
                            <TerminalHeader />
                            <TerminalBody
                                questions={questions}
                                setQuestions={setQuestions}
                                curQuestion={curQuestion}
                                complete={complete}
                                handleSubmitLine={handleSubmitLine}
                                handleReset={handleReset}
                                handleSend={handleSend}
                                inputRef={inputRef}
                                containerRef={containerRef}
                                error={error}
                                sending={sending}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const TerminalHeader = () => (
    <div className='w-full flex flex-col h-16 gap-4 sm:flex-row sm:justify-start sm:items-center sm:gap-10'>
        <div className='flex gap-2'>
            <div className='w-3 h-3 rounded-full bg-red-500' />
            <div className='w-3 h-3 rounded-full bg-yellow-500' />
            <div className='w-3 h-3 rounded-full bg-green-500' />
        </div>
        <span className='text-xs text-slate-200 font-semibold text-center'>
            contact@benjamin-vallon.fr
        </span>
    </div>
);

const TerminalBody = ({
    questions,
    curQuestion,
    complete,
    handleSubmitLine,
    handleReset,
    handleSend,
    inputRef,
    containerRef,
    error,
    sending
}) => {
    const [text, setText] = useState('');
    const [focused, setFocused] = useState(false);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [questions]);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmitLine(text);
        setText('');
        scrollToBottom();
    };

    return (
        <div className='text-slate-100 text-lg'>
            <InitialText />
            <PreviousQuestions questions={questions} />
            {curQuestion ? (
                <>
                    <p>
                        {curQuestion.text.replace(
                            '{name}',
                            questions[0]?.value || 'Inconnu',
                        )}
                        <span className='text-violet-300'>
                            {curQuestion.postfix}
                        </span>
                    </p>
                    <form onSubmit={onSubmit}>
                        <input
                            ref={inputRef}
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            type='text'
                            className='sr-only'
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                        <p>
                            <span className='text-emerald-400'>➜</span>{' '}
                            <span className='text-cyan-300'>~</span> {text}
                            {focused && (
                                <motion.span
                                    animate={{ opacity: [1, 1, 0, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1,
                                    }}
                                    className='inline-block w-2 h-5 bg-slate-400 translate-y-1 ml-0.5'
                                />
                            )}
                        </p>
                    </form>
                    {error && <p className='text-red-500'>{error}</p>}
                </>
            ) : (
                <Summary
                    questions={questions}
                    complete={complete}
                    handleReset={handleReset}
                    handleSend={handleSend}
                    sending={sending}
                />
            )}
        </div>
    );
};

const InitialText = () => (
    <>
        <p className='text-center text-xs sm:text-sm'>
            Hey, salut ! Je suis l'assistant de Benjamin. Ravi de te rencontrer. 😊
        </p>
        <p className='whitespace-nowrap overflow-hidden font-light'>
            ------------------------------------------------------------------------
        </p>
    </>
);

const PreviousQuestions = ({ questions }) =>
    questions.map(
        (q, i) =>
            q.complete && (
                <div key={i}>
                    <p>
                        {q.text.replace(
                            '{name}',
                            questions[0]?.value || 'Inconnu',
                        )}
                        <span className='text-violet-300'>{q.postfix}</span>
                    </p>
                    <p className='text-emerald-300'>
                        <FiCheckCircle className='inline-block mr-2' />
                        {q.value}
                    </p>
                </div>
            ),
    );

const Summary = ({ questions, complete, handleReset, handleSend, sending }) => (
    <>
        <p>Super ! Alors, je récapitule :</p>
        {questions.map((q) => (
            <p key={q.key}>
                <span className='text-blue-300'>{q.key}:</span>{' '}
                {q.value || 'Non renseigné'}
            </p>
        ))}
        <p className='text-orange-400'>
            Tu as bien pris connaissance de la{' '}
            <a
                href='/politique-de-confidentialite'
                target='blank'
                rel='noopener noreferrer'
                className='underline'>
                politique de confidentialité
            </a>{' '}
            ?
        </p>
        {complete ? (
            <p className='text-emerald-300'>
                <FiCheckCircle className='inline-block mr-2' />
                Le message a bien été envoyé, à bientôt. 😎
            </p>
        ) : (
            <div className='flex mt-4 justify-center items-center gap-10'>
                <button
                    onClick={handleReset}
                    className='px-3 py-1 bg-red-500 rounded text-white'>
                    Non
                </button>
                <button
                    onClick={handleSend}
                    className='px-3 py-1 bg-green-500 rounded text-white flex items-center justify-center'
                    disabled={sending}>
                    {sending ? (
                        <>
                            <FiLoader className='animate-spin mr-2' />
                            Envoi...
                        </>
                    ) : (
                        'Oui'
                    )}
                </button>
            </div>
        )}
    </>
);

const QUESTIONS = [
    {
        key: 'Tu es',
        text: 'Comment tu ',
        postfix: "t'appelles ?",
        complete: false,
        value: '',
    },
    {
        key: 'Ton message',
        text: `Enchanté {name}, quel est le `,
        postfix: "message à faire passer ?",
        complete: false,
        value: '',
    },
    {
        key: "Ton email",
        text: "C'est noté ! Pour transmettre le message, je vais avoir besoin de ton ",
        postfix: 'email.',
        complete: false,
        value: '',
    },
];
