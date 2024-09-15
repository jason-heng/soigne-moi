import { FormState } from '@/lib/to-form-state';

interface FieldErrorProps {
    formState: FormState;
    name: string;
};

export function FieldError({ formState, name }: FieldErrorProps) {
    return (
        <p className="text-xs text-red-400">
            {formState.fieldErrors[name]?.[0]}
        </p>
    );
};