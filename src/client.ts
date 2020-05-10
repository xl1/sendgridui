export type Client = {
    [key: string]: ClientLike
} & (<T>(data?: any) => Promise<T>);

interface ClientLike extends Client { }

export function createClient(base: string, headers: HeadersInit = {}): Client {
    return new Proxy<Client>({} as any, {
        get(_, p) {
            const name = p.toString();
            switch (name) {
                case 'GET':
                case 'HEAD':
                case 'DELETE':
                    return function <T>(data: Record<string, string>): Promise<T> {
                        const url = `${base}?${new URLSearchParams(data)}`;
                        return fetch(url, { headers, method: name }).then(r => r.json());
                    };
                case 'POST':
                case 'PUT':
                case 'PATCH':
                    return function <T>(data: unknown): Promise<T> {
                        return fetch(base, {
                            headers: {
                                ...headers,
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(data),
                        }).then(r => r.json());
                    };
                default:
                    return createClient(`${base}/${encodeURIComponent(name)}`, headers);
            }
        },
    });
}
