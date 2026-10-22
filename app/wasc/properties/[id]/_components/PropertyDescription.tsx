export function PropertyDescription({ text }: { text?: string }) {
    return (
        <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
                Descripción de la propiedad
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {text || "Sin descripción detallada."}
            </p>
        </section>
    );
}