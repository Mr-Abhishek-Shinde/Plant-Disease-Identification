import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Download_Icon from '../images/download_icon.png'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: '25px'
    },
    section: {
        margin: 8,
        padding: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: 'bold',
        textDecoration: 'underline'
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    body: {
        fontSize: 12,
        lineHeight: 1.5
    }
});

const MyPdfDocument = (props) => {
    const { predictedDiseaseData } = props;
    const content = (
        <Page style={styles.page}>
            <View style={{ position: 'absolute', top: '40%', left: '20%' }}>
                <Text style={{ fontSize: 72, color: 'rgba(0, 0, 0, 0.15)', transform: 'rotate(-45deg)' }}>AgroNexus</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Disease Details Report</Text>
                <Text style={styles.subtitle}>Plant Name: {predictedDiseaseData.plant_name}</Text>
                <Text style={styles.subtitle}>Disease Name: {predictedDiseaseData.disease_name}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Symptoms:</Text>
                <Text style={styles.body}>
                    {Object.entries(predictedDiseaseData.disease_symptoms).map(([key, value]) => (
                        <Text key={key} style={styles.body}>
                            {`${value}\n`}
                        </Text>
                    ))}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Disease causes:</Text>
                <Text style={styles.body}>
                    {Object.entries(predictedDiseaseData.disease_causes).map(([key, value]) => (
                        <Text key={key} style={styles.body}>
                            {`${value}\n`}
                        </Text>
                    ))}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Disease prevention:</Text>
                <Text style={styles.body}>
                    {Object.entries(predictedDiseaseData.disease_prevention).map(([key, value]) => (
                        <Text key={key} style={styles.body}>
                            {`${value}\n`}
                        </Text>
                    ))}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Disease control:</Text>
                <Text style={styles.body}>
                    {Object.entries(predictedDiseaseData.disease_control).map(([key, value]) => (
                        <Text key={key} style={styles.body}>
                            {`${value}\n`}
                        </Text>
                    ))}
                </Text>
            </View>
        </Page>
    );
    const pages = [content];

    return <Document>{pages}</Document>;
};

const GeneratePdfFile = (props) => {
    const { data } = props;
    return (
        <>
            <PDFDownloadLink document={<MyPdfDocument predictedDiseaseData={data} />} fileName="my-pdf.pdf"><img className='download-icon' src={Download_Icon
            } alt="Download" /></PDFDownloadLink>
        </>
    )
};

export default GeneratePdfFile;

