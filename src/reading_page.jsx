import { PDFViewer } from "@embedpdf/react-pdf-viewer";
import { Header } from "./header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "./fetch_data";
import { Footer } from "./footer";

export function ReadBook() {

    const { id } = useParams();
    const [pdf, setPDF] = useState("");

    const loadPDF = async () => {
        const loadedPdf = await get(`book/pdf/${id}`);
        const path = loadedPdf.pdf;
        setPDF(path);
    }

    useEffect(() => {
        loadPDF();
    }, []);

    return (
        <div className="reading-page">
            <Header />
            <div className="pdf" style={{ height: '90dvh' }}>
                {pdf == "" ? null : <PDFViewer
                    style={{ height: '90dvh' }}
                    config={{
                        src: pdf,
                        theme: { preference: 'light' }
                    }}
                />}
            </div>
            <Footer />
        </div>
    );
}