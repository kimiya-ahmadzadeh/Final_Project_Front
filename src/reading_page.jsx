import PDFViewer from "@embedpdf/react-pdf-viewer";
import { Header } from "./header";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

export function ReadBook() {

    // const openRemotePdf = async () => {
    //     const registry = await viewerRef.current?.registry;
    //     const docManager = registry.getPlugin('document-manager').provides();

    //     docManager.openDocumentUrl({
    //         url: 'https://dn710201.ca.archive.org/0/items/calvaryscross0000vari/calvaryscross0000vari.pdf',
    //         autoActivate: true         // Switch tab to this document immediately
    //     });
    // };

    return (
        <div className="reading-page">
            <Header />
            <div className="pdf" style={{ height: '90dvh' }}>
                {/* <PDFViewer
                    style={{ height: '90dvh' }}
                    config={{
                        url: 'https://archive.org/download/shavingofshagpat0000geor_c2p1/shavingofshagpat0000geor_c2p1.pdf',
                        theme: { preference: 'light' }
                    }}
                /> */}
                {/* <iframe src="https://archive.org/download/shavingofshagpat0000geor_c2p1/shavingofshagpat0000geor_c2p1.pdf" height={'90%'} width={'100%'}></iframe> */}
                <EmbedPDF
                    mode="inline"
                    style={{ width: 900, height: 800 }}
                    documentURL="https://archive.org/download/shavingofshagpat0000geor_c2p1/shavingofshagpat0000geor_c2p1.pdf"
                />
            </div>
        </div>
    );
}