export default function Heading({children}: {children: React.ReactNode}) {
    return (
        <h1 className={'text-2xl my-3 md:my-10 capitalize'}>{children}</h1>
    )
}