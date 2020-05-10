export type SendGridList = {
    id: number;
    name: string;
    recipient_count: number;
};

export type SendGridLists = {
    lists: SendGridList[];
};

export type SendGridCustomField = {
    id: number;
    name: string;
    type: string;
    value: string | null;
};

export type SendGridCustomFields = {
    custom_fields: SendGridCustomField[];
};

export type SendGridRecipient = {
    id: string;
    created_at: number;
    custom_fields: SendGridCustomField[];
    email: string;
    first_name: string | null;
    last_name: string | null;
    last_clicked: number | null;
    last_emailed: number | null;
    last_opened: number | null;
    updated_at: number;
};

export type SendGridRecipients = {
    recipients: SendGridRecipient[];
};
