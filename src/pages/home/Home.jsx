import './Home.css'

export const Home = () => {
    return (
        <div className="home_page">
            <h1 className="home_text">
                Wea de computacional.
            </h1>

            <div className="home_page_links">

            <a className="home_page_link"
                href={`${process.env.PUBLIC_URL}/img_process`}
            >Procesamiento de imagenes</a>

            <br />

            <a className="home_page_link"
                href={`${process.env.PUBLIC_URL}/img_filter`}
            >Filtrado de imagenes media y mediana</a>

                <a className="home_page_link"
                href={`${process.env.PUBLIC_URL}/img_spacial`}
            >Filtrado de imagenes espacial</a>

            </div>
        </div>
    )
}