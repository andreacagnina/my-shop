export interface ServerErrorProps {
    message?: string;
} //creao un customertype per ServerError

export function ServerError(props: ServerErrorProps) {
    return (
        <div className="bg-red-800 text-white rounded-xl p-3 my-6 text-center">
            {
                props.message || 'Server Error' // un modo più breve di usare il ternario props.message ? props.message : 'Server Error'
            }</div>
    );
}