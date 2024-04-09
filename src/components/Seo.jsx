
import { Helmet } from "react-helmet";
import { NAME_PAGE } from "../config";
import { colors } from "../stylesConfig";
function Seo(){
    return(
        <>
            <Helmet>
                <title>{NAME_PAGE}</title>
                <meta 
                name="author" 
                content="Josue Rodrigo Fierro Morfin"></meta>
                <meta name="description" content="Descubre la mejor selección de pijamas en nuestra tienda en línea.
                Ofrecemos una amplia variedad de pijamas suaves y cómodos para hombres, 
                mujeres y niños, fabricados con materiales de alta calidad como algodón orgánico, 
                seda y franela. Desde pijamas clásicos hasta pijamas con estampados divertidos y temáticos, 
                tenemos todo lo que necesitas para disfrutar de noches de sueño perfectas. ¡Explora nuestra colección hoy mismo y encuentra el pijama ideal para ti y tu familia!"/>
               <meta name="keywords" content="pijamas, pijamas para hombres,
                pijamas para mujeres, pijamas para niños, pijamas de algodón,
                pijamas de seda, pijamas de invierno, pijamas de verano,
                pijamas de una pieza, pijamas de dos piezas, pijamas temáticos,
                pijamas con estampados florales, pijamas con estampados de animales,
                pijamas con rayas, pijamas lisos, pijamas con botones,
                pijamas con cuello en V, pijamas con capucha,
                pijamas con pantalón corto, pijamas con pantalón largo,
                pijamas de algodón orgánico, pijamas de franela,
                pijamas de poliéster, pijamas de satén,
                pijamas de terciopelo,
                pijamas de lana,
                pijamas de Navidad, pijamas de Halloween, pijamas para regalar,
                pijamas para fiestas de pijamas, pijamas para toda la familia"/>
                <meta 
                property="og:title" 
                content={NAME_PAGE} />
                <meta property="og:description" 
                    content="Descubre la mejor selección de pijamas en nuestra tienda en línea. Ofrecemos una amplia variedad de pijamas para toda la familia, con estilos suaves, cómodos y de alta calidad. Desde pijamas clásicos hasta pijamas con estampados divertidos y temáticos, tenemos todo lo que necesitas para disfrutar de noches de sueño perfectas. Haz de la hora de dormir un momento especial con nuestros pijamas. ¡Explora nuestra colección hoy mismo!"/>
                <meta 
                name="apple-mobile-web-app-capable"
                content="yes"></meta>
                <meta 
                name="theme-color"
                content={colors.primaryColor}></meta>
                <meta 
                    name="viewport" 
                    content="width=device-width, initial-scale=1.0"></meta>
                <meta 
                    name="apple-mobile-web-app-title" 
                    content={NAME_PAGE}></meta>
                <meta name="application-name" content={NAME_PAGE}></meta>
                <meta name="msapplication-TileColor" content={colors.primaryColor}></meta>
                <meta name="robots" content="index, follow"></meta>
                {/* twitter */}
                <meta name="twitter:card" content="summary"></meta>
                <meta name="twitter:title" content={NAME_PAGE}></meta>
                <meta name="twitter:description" content="Descubre la mejor selección de pijamas en nuestra tienda en línea. Ofrecemos una amplia variedad de pijamas suaves y cómodos para hombres, mujeres y niños, fabricados con materiales de alta calidad como algodón orgánico, seda y franela. Desde pijamas clásicos hasta pijamas con estampados divertidos y temáticos, tenemos todo lo que necesitas para disfrutar de noches de sueño perfectas. ¡Explora nuestra colección hoy mismo y encuentra el pijama ideal para ti y tu familia!">
                </meta>
                {/* <meta name="twitter:image" content="https://www.ejemplo.com/imagenes/tienda-en-linea.jpg"> */}
                {/* <meta name="twitter:site" content="@tuusuario"></meta> 
                */}
                <meta rel="canonical" href="https://pijamasbonitas.com/"></meta>
            </Helmet>
        </>
    )
}
export default Seo;