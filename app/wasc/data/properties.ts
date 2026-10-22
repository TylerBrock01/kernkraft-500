// data/properties.ts


export interface CatalogItem<TAttributes = Record<string, any>> {
    id: string;
    title: string;
    price: string;
    image: string;      // Portada principal
    images: string[];   // Galería de fotos
    description: string;
    category?: string;  // Opcional para clasificar

    // Objeto flexible para atributos específicos del dominio (recámaras, color, etc.)
    attributes: TAttributes;
}

// Definición específica para propiedades inmobiliarias
export interface PropertyAttributes {
    [key: string]: any; // Permite inyectar cualquier campo extra (ej. color, amenidades)
}

// export const propertiesData: CatalogItem<PropertyAttributes>[] = [
//     {
//         id: "1",
//         title: "Residencia Exclusiva en Zona Norte",
//         price: "$4,500,000 MXN",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
//         images: [
//             "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
//             "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
//             "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
//             "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
//         ],
//         description: "Hermosa residencia con acabados de lujo, alberca privada, amplia estancia y cocina integral equipada. Ubicada en una de las zonas de mayor plusvalía.",
//         attributes: {
//             location: "San Pedro, Zona Norte",
//             type: "Casa",
//             bedrooms: 4,
//             bathrooms: 4.5,
//             sqm: 350,
//             colorFachada: "Blanco Minimalista" // 👈 Atributo dinámico extra validado
//         }
//     },
//     {
//         id: "2",
//         title: "Departamento Moderno con Vista Panorámica",
//         price: "$2,800,000 MXN",
//         image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
//         images: [
//             "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
//             "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
//             "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
//         ],
//         description: "Espectacular departamento vertical con ventanales de piso a techo, seguridad 24/7, amenidades exclusivas y excelente conectividad urbana.",
//         attributes: {
//             location: "Centro Financiero",
//             type: "Departamento",
//             bedrooms: 2,
//             bathrooms: 2,
//             sqm: 120,
//             nivelPiso: 14 // 👈 Otro atributo extra dinámico
//         }
//     },
//     {
//         id: "3",
//         title: "Casa Campestre con Amplio Jardín",
//         price: "$3,900,000 MXN",
//         image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
//         images: [
//             "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
//             "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
//             "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
//         ],
//         description: "Ideal para familias que buscan tranquilidad. Espacios abiertos, terraza techada para eventos, jardín masivo y acabados en madera natural.",
//         attributes: {
//             location: "Suburbio Residencial",
//             type: "Casa",
//             bedrooms: 3,
//             bathrooms: 3,
//             sqm: 450,
//             acabadosPrincipal: "Madera de Encino" // 👈 Otro atributo dinámico
//         }
//     }
// ];