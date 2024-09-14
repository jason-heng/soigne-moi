import { FormState } from '@/_lib/to-form-state';
import { useEffect, useRef } from 'react';

export function useFormReset(formState: FormState) {
    const formRef = useRef<HTMLFormElement>(null);
    const prevTimestamp = useRef(formState.timestamp);

    useEffect(() => {
        if (!formRef.current) return;
        if (
            formState.status === 'SUCCESS' &&
            formState.timestamp !== prevTimestamp.current &&
            formState.reset
        ) {
            formRef.current.reset();

            prevTimestamp.current = formState.timestamp;
        }
    }, [formState.status, formState.timestamp]);

    return formRef;
};