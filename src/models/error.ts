export type SendGridError = {
    field: string|null,
    message: string,
    error_id?: string,
    parameter?: string,
};

export type SendGridErrors = {
    errors: SendGridError[],
};
